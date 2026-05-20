import PretextDemo from "@/components/PretextDemo";

export const metadata = { title: "Pretext Test" };

export default function PretextTestPage() {
  return (
    <main style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#FFFFFF" }}>
      <PretextDemo standalone />
    </main>
  );
}
