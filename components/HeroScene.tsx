"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { transitionRef } from "@/lib/transition";

// ─── Constants ────────────────────────────────────────────────────────────────
const CAMERA_Z    = 8;
const FOV_BASE    = 45;
const TARGET_ROWS = 13;
const C2S_GRID    = 1 / 32;
const MAX_COUNT   = 3500;
const LERP        = 0.065;

const DISC_R       = 2.96;
const DISC_TILT    = Math.PI * 0.30;
const DISC_LAYERS  = 4;
const LAYER_STEP   = 0.10;   // z-spacing between layers in local disc space
const CHAMFER_FRAC = 0.80;   // chamfer starts at 80% of max radius

const RING_R    = 2.31;
const RING_r    = 0.65;
const RING_TILT = Math.PI / 3;

const SPHERE_R  = 2.50;

// Grid mouse repulsion
const PUSH_XY   = 0.55;
const PUSH_Z    = 0.14;
const MOUSE_R   = 1.5;

// Shape mouse interaction (two-zone: attract + repel)
const S_REPEL_R   = 1.1;   // large repulsion zone
const S_ATTRACT_R = 2.5;
const S_PUSH_XY   = 0.70;  // strong scatter
const S_PUSH_Z    = 0.22;
const S_ATTRACT   = 0.09;

const TAU = Math.PI * 2;

// Per-state particle colors — animated in useFrame
// Sections alternate: hero=light, brand=dark, marketing=light, web=dark
// Particles shift: dark on light bg, light on dark bg
const COLOR_ON_LIGHT = new THREE.Color("#606060");
const COLOR_ON_DARK  = new THREE.Color("#999999");


function ease(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function sat(v: number): number { return Math.min(1, Math.max(0, v)); }

// ─── Grid params ──────────────────────────────────────────────────────────────
function useGridParams() {
  const { size } = useThree();
  return useMemo(() => {
    const worldH  = 2 * CAMERA_Z * Math.tan(FOV_BASE * Math.PI / 360);
    const worldW  = worldH * (size.width / size.height);
    const spacing = worldH / TARGET_ROWS;
    const rows    = TARGET_ROWS + 1;
    const cols    = Math.ceil(worldW / spacing) + 1;
    const count   = Math.min(rows * cols, MAX_COUNT);
    return { spacing, rows, cols, count, worldW };
  }, [size.width, size.height]);
}

// ─── Position builders ────────────────────────────────────────────────────────
function buildGrid(rows: number, cols: number, spacing: number): THREE.Vector3[] {
  const arr: THREE.Vector3[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (arr.length >= MAX_COUNT) break;
      arr.push(new THREE.Vector3(
        (c - cols / 2 + 0.5) * spacing,
        (r - rows / 2 + 0.5) * spacing,
        0,
      ));
    }
    if (arr.length >= MAX_COUNT) break;
  }
  return arr;
}

// 3D tilted disc — 4 layers with chamfered edge
function buildDisc(count: number): THREE.Vector3[] {
  const golden   = Math.PI * (3 - Math.sqrt(5));
  const cx       = Math.cos(DISC_TILT), sx = Math.sin(DISC_TILT);
  const perLayer = Math.floor(count / DISC_LAYERS);
  return Array.from({ length: count }, (_, i) => {
    const layer  = i % DISC_LAYERS;
    const iLocal = Math.floor(i / DISC_LAYERS);
    const r      = DISC_R * Math.sqrt((iLocal + 0.5) / Math.max(1, perLayer));
    const theta  = i * golden;
    const x0     = r * Math.cos(theta);
    const y0     = r * Math.sin(theta);
    // Layer offset along disc normal (z in local disc space before tilt)
    let lz = (layer - (DISC_LAYERS - 1) / 2) * LAYER_STEP;
    // Chamfer: taper lz to 0 at the outer edge
    const rFrac = r / DISC_R;
    if (rFrac > CHAMFER_FRAC) {
      const ct = (rFrac - CHAMFER_FRAC) / (1 - CHAMFER_FRAC);
      lz *= 1 - ct * ct;
    }
    // Apply disc tilt (X-axis rotation) + normal offset
    return new THREE.Vector3(x0, y0 * cx - lz * sx, y0 * sx + lz * cx);
  });
}

type RingEntry = { phi: number; tubeA: number; pos: THREE.Vector3 };

// Ring with evenly-spaced toroidal angle phi — needed for sweep animation
function buildRingWithPhi(count: number): RingEntry[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cx = Math.cos(RING_TILT), sx = Math.sin(RING_TILT);
  return Array.from({ length: count }, (_, i) => {
    const phi  = (i / count) * TAU;          // evenly-spaced toroidal angle
    const tubeA = i * golden;                // golden-angle tube distribution
    const cp = Math.cos(tubeA), sp = Math.sin(tubeA);
    const ct = Math.cos(phi),   st = Math.sin(phi);
    const x0 = (RING_R + RING_r * cp) * ct;
    const y0 = (RING_R + RING_r * cp) * st;
    const z0 = RING_r * sp;
    return { phi, tubeA, pos: new THREE.Vector3(x0, y0 * cx - z0 * sx, y0 * sx + z0 * cx) };
  });
}

// Fibonacci sphere
function buildSphere(count: number): THREE.Vector3[] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    return new THREE.Vector3(
      Math.cos(theta) * r * SPHERE_R,
      y * SPHERE_R,
      Math.sin(theta) * r * SPHERE_R,
    );
  });
}

// ─── Camera rig ───────────────────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    const p   = Math.min(3, Math.max(0, transitionRef.progress));
    const cam = camera as THREE.PerspectiveCamera;
    let fov: number;
    if (p < 0.45) {
      fov = THREE.MathUtils.lerp(FOV_BASE, 34, ease(p / 0.45));
    } else if (p < 1) {
      fov = THREE.MathUtils.lerp(34, 43, ease((p - 0.45) / 0.55));
    } else {
      fov = 43;
    }
    if (Math.abs(cam.fov - fov) > 0.02) {
      cam.fov = THREE.MathUtils.lerp(cam.fov, fov, 0.05);
      cam.updateProjectionMatrix();
    }
  });
  return null;
}

// ─── Particles ────────────────────────────────────────────────────────────────
function Particles() {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const dummy   = useMemo(() => new THREE.Object3D(), []);
  const grid    = useGridParams();

  const gridPos     = useMemo(() => buildGrid(grid.rows, grid.cols, grid.spacing), [grid.rows, grid.cols, grid.spacing]);
  const discCanon   = useMemo(() => buildDisc(gridPos.length),       [gridPos.length]);
  const ringWithPhi = useMemo(() => buildRingWithPhi(gridPos.length), [gridPos.length]);
  const sphereCanon = useMemo(() => buildSphere(gridPos.length),      [gridPos.length]);
  const curPos      = useMemo(() => gridPos.map(p => p.clone()),      [gridPos]);
  const discSpinStart = useRef<number | null>(null);

  useEffect(() => {
    if (!meshRef.current) return;
    dummy.position.set(0, 0, -9999);
    dummy.scale.setScalar(0);
    dummy.updateMatrix();
    for (let i = grid.count; i < MAX_COUNT; i++) {
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    dummy.scale.setScalar(1);
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [grid.count, dummy]);

  const iPlane  = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
  const mouseW  = useMemo(() => new THREE.Vector3(), []);
  const mouseNDC = useRef({ x: 0, y: 0 });
  const tgt    = useMemo(() => new THREE.Vector3(), []);

  // Track mouse via document listener — bypasses canvas pointer-event blocks
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNDC.current.x =  (e.clientX / window.innerWidth)  * 2 - 1;
      mouseNDC.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(({ raycaster, camera, clock }) => {
    const { spacing, count } = grid;
    const rawP  = Math.min(3, Math.max(0, transitionRef.progress));
    const t_sec = clock.getElapsedTime();

    // Update raycaster from global mouse position (works across all sections)
    raycaster.setFromCamera(mouseNDC.current as THREE.Vector2, camera);
    raycaster.ray.intersectPlane(iPlane, mouseW);

    // All sections: 3D object stays horizontally centered
    const xOff = 0;

    // Vertical offset: lift toward top of section viewport (positive y = up in Three.js)
    let yOff = 0;
    if (rawP > 0.45 && rawP <= 1) {
      yOff = 0.85 * ease((rawP - 0.45) / 0.55);
    } else if (rawP > 1) {
      yOff = 0.85;
    }

    const gridSize = spacing * C2S_GRID;
    const cubeSize = gridSize;
    dummy.scale.setScalar(Math.max(0, cubeSize));

    // Whole-object parallax: object drifts gently with cursor position
    const parallaxFade = rawP > 0.45 ? sat((rawP - 0.45) / 0.3) : 0;
    const parallaxX = mouseW.x * 0.055 * parallaxFade;
    const parallaxY = mouseW.y * 0.035 * parallaxFade;

    // Ring spin — continuous Y-axis rotation throughout ring phases
    const ringAngle = t_sec * 0.38;
    const csr = Math.cos(ringAngle), ssr = Math.sin(ringAngle);

    // Disc spin — persists from ring→disc transition into disc→sphere
    if (rawP >= 1 && discSpinStart.current === null) discSpinStart.current = t_sec;
    if (rawP < 0.9) discSpinStart.current = null;
    const discAngle = discSpinStart.current !== null ? (t_sec - discSpinStart.current) * 0.28 : 0;
    const dca = Math.cos(discAngle), dsa = Math.sin(discAngle);

    for (let i = 0; i < count; i++) {
      const gp = gridPos[i];
      const dp = discCanon[i];
      const re = ringWithPhi[i];
      const sp = sphereCanon[i];

      // ── Shape position ─────────────────────────────────────────────────

      if (rawP < 0.45) {
        // Cubes converge to centre + zoom toward camera
        const ct = ease(rawP / 0.45);
        const zb = Math.sin(ct * Math.PI * 0.5) * 2.4;
        tgt.set(gp.x * (1 - ct), gp.y * (1 - ct), zb);

      } else if (rawP < 1) {
        // Spread from centre to spinning ring/torus
        const st  = ease((rawP - 0.45) / 0.55);
        const zb  = Math.cos(st * Math.PI * 0.5) * 2.4;
        const rpx = re.pos.x * csr - re.pos.z * ssr;
        const rpz = re.pos.x * ssr + re.pos.z * csr;
        tgt.set(
          rpx * st + xOff * st,
          re.pos.y * st,
          rpz * st + zb * (1 - st),
        );

      } else if (rawP < 2) {
        // Ring → Disc: lerp from spinning ring to spinning disc
        const t   = ease(rawP - 1);
        const rpx = re.pos.x * csr - re.pos.z * ssr;
        const rpz = re.pos.x * ssr + re.pos.z * csr;
        const rdx = dp.x * dca - dp.z * dsa;
        const rdz = dp.x * dsa + dp.z * dca;
        tgt.set(
          THREE.MathUtils.lerp(rpx, rdx, t) + xOff,
          THREE.MathUtils.lerp(re.pos.y, dp.y, t),
          THREE.MathUtils.lerp(rpz, rdz, t),
        );

      } else {
        // Disc → Sphere: coin-on-table spin
        const mt = ease(rawP - 2);
        const coinAngle = t_sec * 0.6 + Math.sin(mt * Math.PI) * Math.PI * 9;
        const cs_c = Math.cos(coinAngle), ss_c = Math.sin(coinAngle);

        const rdx = dp.x * cs_c - dp.z * ss_c;
        const rdy = dp.y;
        const rdz = dp.x * ss_c + dp.z * cs_c;

        const sx_f = sp.x * cs_c - sp.z * ss_c;
        const sz_f = sp.x * ss_c + sp.z * cs_c;

        tgt.set(
          THREE.MathUtils.lerp(rdx, sx_f, mt) + xOff,
          THREE.MathUtils.lerp(rdy, sp.y, mt),
          THREE.MathUtils.lerp(rdz, sz_f, mt),
        );
      }

      // Whole-object parallax offset + Brand section vertical lift
      tgt.x += parallaxX;
      tgt.y += parallaxY + yOff;

      // ── Mouse interaction ──────────────────────────────────────────────
      if (rawP < 0.45) {
        // Grid: repulsion from grid home
        const mix = 1 - rawP / 0.45;
        const dx2 = gp.x - mouseW.x;
        const dy2 = gp.y - mouseW.y;
        const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (dist < MOUSE_R && dist > 0.001) {
          const force = (1 - dist / MOUSE_R) * mix;
          const inv = 1 / dist;
          tgt.x += dx2 * inv * force * PUSH_XY;
          tgt.y += dy2 * inv * force * PUSH_XY;
          tgt.z += force * PUSH_Z;
        }
      } else {
        // Shape states: attract from far, repel when close
        const mi = rawP < 1 ? ease((rawP - 0.45) / 0.55) : 1;
        const atDx = mouseW.x - tgt.x;
        const atDy = mouseW.y - tgt.y;
        const atDist = Math.sqrt(atDx * atDx + atDy * atDy);
        const inv = atDist > 0.001 ? 1 / atDist : 0;
        if (atDist < S_REPEL_R && atDist > 0.001) {
          // Repulsion (dodge)
          const force = (1 - atDist / S_REPEL_R) * mi;
          tgt.x -= atDx * inv * force * S_PUSH_XY;
          tgt.y -= atDy * inv * force * S_PUSH_XY;
          tgt.z += force * S_PUSH_Z;
        } else if (atDist < S_ATTRACT_R && atDist > S_REPEL_R) {
          // Attraction (follow)
          const atForce = sat((S_ATTRACT_R - atDist) / (S_ATTRACT_R - S_REPEL_R)) * S_ATTRACT * mi;
          tgt.x += atDx * inv * atForce;
          tgt.y += atDy * inv * atForce;
        }
      }

      curPos[i].lerp(tgt, LERP);
      dummy.position.copy(curPos[i]);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Particle color tracks bg: dark→light→dark→light as sections alternate
    const mat = meshRef.current.material as THREE.MeshBasicMaterial;
    if (rawP <= 1) {
      mat.color.lerpColors(COLOR_ON_LIGHT, COLOR_ON_DARK, ease(rawP));
    } else if (rawP <= 2) {
      mat.color.lerpColors(COLOR_ON_DARK, COLOR_ON_LIGHT, ease(rawP - 1));
    } else {
      mat.color.lerpColors(COLOR_ON_LIGHT, COLOR_ON_DARK, ease(rawP - 2));
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, MAX_COUNT] as any}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial color="#606060" side={THREE.DoubleSide} />
    </instancedMesh>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 5, 4]} intensity={0.5} />
      <directionalLight position={[-3, -2, 2]} intensity={0.2} color="#d0d8e0" />
      <Environment preset="studio" />
      <CameraRig />
      <Particles />
    </>
  );
}

// ─── Morphing hero word ───────────────────────────────────────────────────────
function TiffanyHero({
  nameOpacity,
  scrollY,
}: {
  nameOpacity: import("framer-motion").MotionValue<number>;
  scrollY: import("framer-motion").MotionValue<number>;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: 0, y: 0 }); // normalised -1..+1
  const sx      = useRef(1);
  const sy      = useRef(1);
  const ox      = useRef(0);
  const oy      = useRef(0);
  const rafRef  = useRef(0);

  // 5d: scaleY stretch when scrollY is near 0 (pulled from top)
  // useTransform: at scrollY=0 → scaleY=1.0 (no stretch at rest);
  // on overscroll / pull-to-refresh the browser can give negative scrollY briefly.
  // We map scrollY [-60, 0] → scaleY [1.3, 1.0] so pulling up stretches the text.
  const stretchScaleY = useTransform(scrollY, [-60, 0, 80], [1.3, 1.0, 1.0]);
  const springScaleY  = useSpring(stretchScaleY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const { x: nx, y: ny } = mouse.current;
      const absX = Math.abs(nx);
      const absY = Math.abs(ny);

      // Subtle stretch — horizontal extremes → slightly wider; vertical → slightly taller
      const tSX = 1 + absX * 0.22 - absY * 0.07;
      const tSY = 1 + absY * 0.22 - absX * 0.07;
      // Strong drift toward mouse page position (TREEP-style)
      const tOX = nx * 90;
      const tOY = ny * 65;

      const L = 0.055;
      sx.current += (tSX - sx.current) * L;
      sy.current += (tSY - sy.current) * L;
      ox.current += (tOX - ox.current) * L;
      oy.current += (tOY - oy.current) * L;

      const el = textRef.current;
      if (el) {
        el.style.transform =
          `translate(calc(-50% + ${ox.current.toFixed(2)}px), calc(-50% + ${oy.current.toFixed(2)}px))` +
          ` scale(${sx.current.toFixed(4)}, ${sy.current.toFixed(4)})`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <motion.div
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        9,
        pointerEvents: "none",
        opacity:       nameOpacity,
        scaleY:        springScaleY,
        transformOrigin: "center center",
      }}
    >
      <div
        ref={textRef}
        style={{
          position:      "absolute",
          top:           "50%",
          left:          "50%",
          transform:     "translate(-50%, -50%)",
          fontFamily:    "var(--font-baskerville), Georgia, serif",
          fontSize:      "clamp(11rem, 24vw, 28rem)",
          fontWeight:    700,
          fontStyle:     "italic",
          lineHeight:    1,
          letterSpacing: "-0.02em",
          color:         "#1a1a1a",
          userSelect:    "none",
          whiteSpace:    "nowrap",
          willChange:    "transform",
          transformOrigin: "center center",
        }}
      >
        Tiffany
      </div>
    </motion.div>
  );
}

// ─── Gallery — fixed-position image slots, randomly populated on mouse move ────
const GALLERY_PATHS = [
  "/home/gallery/gallery-1.jpg",
  "/home/gallery/gallery-2.jpg",
  "/home/gallery/gallery-4.jpg",
  "/home/gallery/gallery-5.jpg",
  "/home/gallery/gallery-6.jpg",
  "/home/gallery/gallery-7.jpg",
  "/home/gallery/gallery-8.jpg",
  "/home/gallery/gallery-11.jpg",
  "/home/gallery/gallery-12.jpg",
  "/home/gallery/gallery-13.jpg",
  "/home/gallery/gallery-14.jpg",
  "/home/gallery/gallery-15.jpg",
  "/home/gallery/gallery-16.jpg",
  "/home/gallery/gallery-17.jpg",
  "/home/gallery/gallery-18.jpg",
  "/home/gallery/gallery-19.jpg",
  "/home/gallery/gallery-21.jpg",
  "/home/gallery/gallery-22.jpg",
  "/home/gallery/gallery-23.jpg",
  "/home/gallery/gallery-24.jpg",
];


type SlotEntry = { top: string; left: string; src: string; randPct: number };

// Per-slot unique float direction so each image drifts independently
type FloatConfig = { vx: number; vy: number };

function makeFloatConfig(seed: number): FloatConfig {
  // Deterministic pseudo-random based on slot index
  // vx, vy in range [-0.012, 0.012]
  const a = Math.sin(seed * 127.1) * 43758.5453;
  const b = Math.sin(seed * 311.7) * 43758.5453;
  const vx = ((a - Math.floor(a)) * 2 - 1) * 0.012;
  const vy = ((b - Math.floor(b)) * 2 - 1) * 0.012;
  return { vx, vy };
}

function GallerySlot({
  entry,
  active,
  alwaysShow,
  slotIndex,
}: {
  entry: SlotEntry;
  active: boolean;
  alwaysShow: boolean;
  slotIndex: number;
}) {
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const elRef = useRef<HTMLDivElement>(null);

  // 5b: floating animation state
  const floatPos   = useRef({ x: 0, y: 0 });
  const floatVel   = useRef(makeFloatConfig(slotIndex));
  const floatRaf   = useRef(0);

  const onLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const ratio       = img.naturalWidth / img.naturalHeight;
    const vpArea      = window.innerWidth * window.innerHeight;
    const targetArea  = vpArea * (entry.randPct / 100);
    setWidth(Math.sqrt(targetArea * ratio));
  };

  // 5b + 5c: RAF loop for floating + gyro — only runs on mobile (alwaysShow)
  useEffect(() => {
    if (!alwaysShow) {
      cancelAnimationFrame(floatRaf.current);
      // Reset position
      if (elRef.current) {
        elRef.current.style.transform = "translate(0px, 0px)";
      }
      return;
    }

    const BOUND = 10; // ±10px from origin
    const { vx: initVx, vy: initVy } = makeFloatConfig(slotIndex);
    floatVel.current = { vx: initVx, vy: initVy };

    const tick = () => {
      const pos = floatPos.current;
      const vel = floatVel.current;

      // Bounce when reaching bounds
      if (pos.x > BOUND || pos.x < -BOUND) vel.vx *= -1;
      if (pos.y > BOUND || pos.y < -BOUND) vel.vy *= -1;

      pos.x += vel.vx;
      pos.y += vel.vy;

      // Clamp
      pos.x = Math.max(-BOUND, Math.min(BOUND, pos.x));
      pos.y = Math.max(-BOUND, Math.min(BOUND, pos.y));

      // 5c: Add gyroscope offset from window globals
      const gyroX = (window as any).__gyroX ?? 0;
      const gyroY = (window as any).__gyroY ?? 0;

      if (elRef.current) {
        elRef.current.style.transform =
          `translate(${(pos.x + gyroX).toFixed(2)}px, ${(pos.y + gyroY).toFixed(2)}px)`;
      }

      floatRaf.current = requestAnimationFrame(tick);
    };

    floatRaf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(floatRaf.current);
  }, [alwaysShow, slotIndex]);

  const opacity = alwaysShow ? 1 : (visible ? 1 : 0);

  return (
    <div
      ref={elRef}
      onMouseEnter={() => !alwaysShow && setVisible(true)}
      onMouseLeave={() => !alwaysShow && setVisible(false)}
      style={{
        position:      "absolute",
        top:           entry.top,
        left:          entry.left,
        pointerEvents: active ? "auto" : "none",
        opacity,
        transition:    alwaysShow ? "none" : "opacity 0.2s ease",
        willChange:    alwaysShow ? "transform" : "opacity",
      }}
    >
      <img
        src={entry.src}
        alt=""
        onLoad={onLoad}
        style={{
          display: "block",
          width:   width ? `${width.toFixed(0)}px` : "auto",
          height:  "auto",
        }}
      />
    </div>
  );
}

function GalleryLayer({ nameOpacity }: { nameOpacity: import("framer-motion").MotionValue<number> }) {
  const [heroVisible, setHeroVisible] = useState(true);

  // 5a: mobile detection
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 5c: gyroscope listener — stores values in window globals for GallerySlot RAF loops
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onOrientation = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left/right tilt, -90 to 90
      const beta  = e.beta  ?? 45; // front/back tilt, 0=flat
      (window as any).__gyroX = gamma * 0.3;
      (window as any).__gyroY = (beta - 45) * 0.3;
    };
    window.addEventListener("deviceorientation", onOrientation, true);
    return () => window.removeEventListener("deviceorientation", onOrientation, true);
  }, []);

  useEffect(() => {
    return nameOpacity.on("change", v => setHeroVisible(v > 0.05));
  }, [nameOpacity]);

  const entries = useMemo<SlotEntry[]>(() => {
    const shuffled = [...GALLERY_PATHS].sort(() => Math.random() - 0.5);
    // Mobile: 10 photos only, in lower 45% of viewport (below the name)
    const count = isMobile ? 10 : shuffled.length;
    return shuffled.slice(0, count).map((src, k) => {
      let topPct: number, leftPct: number;
      if (isMobile) {
        topPct  = 55 + Math.random() * 35;          // 55–90% → below Tiffany name
        leftPct = (k % 5) * 20 + Math.random() * 16;
      } else {
        const col = k % 5;
        const row = Math.floor(k / 5);
        topPct  = row * 25 + 2 + Math.random() * 18;
        leftPct = col * 20 + 1 + Math.random() * 14;
      }
      return {
        src,
        top:     `${topPct.toFixed(1)}%`,
        left:    `${leftPct.toFixed(1)}%`,
        randPct: 3 + Math.random() * 3,
      };
    });
  }, [isMobile]);

  // nameOpacity fades 1→0 as scrollY goes 0→300 — photos disappear on scroll for both desktop and mobile
  const containerOpacity = nameOpacity;

  return (
    <motion.div
      style={{
        position:      "fixed",
        inset:         0,
        zIndex:        11,
        pointerEvents: "none",
        opacity:       containerOpacity,
      }}
    >
      {entries.map((entry, i) => (
        <GallerySlot
          key={i}
          entry={entry}
          // 5a: on mobile always active (no hover needed)
          active={isMobile ? true : heroVisible}
          alwaysShow={isMobile}
          slotIndex={i}
        />
      ))}
    </motion.div>
  );
}

// ─── Hero section ─────────────────────────────────────────────────────────────
export default function HeroScene() {
  const { scrollY } = useScroll();
  const nameOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const nameY       = useTransform(scrollY, [0, 300], [0, -20]);

  return (
    <>
      <GalleryLayer nameOpacity={nameOpacity} />
      <TiffanyHero nameOpacity={nameOpacity} scrollY={scrollY} />

      <div style={{ position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none" }}>
        <Canvas
          camera={{ position: [0, 0, CAMERA_Z], fov: FOV_BASE }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
          style={{ width: "100%", height: "100%" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
            gl.domElement.style.pointerEvents = "none";
          }}
        >
          <Scene />
        </Canvas>
      </div>

      {/* Brand & location — top center */}
      <motion.div
        style={{
          position:      "fixed",
          top:           "5.5rem",
          left:          0,
          right:         0,
          zIndex:        60,
          display:       "flex",
          justifyContent:"center",
          pointerEvents: "none",
          opacity:       nameOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <p
          className="font-poppins font-[300] text-[#999999] text-center"
          style={{ fontSize: "clamp(0.65rem, 0.85vw, 0.75rem)", letterSpacing: "0.18em" }}
        >
          Multidisciplinary Designer · Vancouver, BC
        </p>
      </motion.div>

      {/* Scroll indicator — bottom center */}
      <motion.div
        style={{
          position:      "fixed",
          bottom:        "2.5rem",
          left:          0,
          right:         0,
          zIndex:        10,
          display:       "flex",
          justifyContent:"center",
          pointerEvents: "none",
          opacity:       nameOpacity,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="flex items-center gap-3">
          <span className="w-4 h-px bg-[#CCCCCC]" />
          <span className="font-poppins tracking-[0.28em] uppercase text-[#BBBBBB]" style={{ fontSize: "clamp(0.5rem, 0.6vw, 0.6rem)" }}>
            Scroll
          </span>
          <span className="w-4 h-px bg-[#CCCCCC]" />
        </div>
      </motion.div>

      <div style={{ height: "100vh" }} aria-hidden="true" />
    </>
  );
}
