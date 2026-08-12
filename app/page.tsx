import { Hero } from "@/components/hero/Hero";
import { ScratchReveal } from "@/components/hero/ScratchReveal";

export default function Home() {
  return (
    <ScratchReveal imageSrc="https://images.unsplash.com/photo-1754548930550-be9fa88874f4?w=1920&q=85&auto=format&fit=crop">
      <Hero />
    </ScratchReveal>
  );
}

