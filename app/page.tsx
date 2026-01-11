import Hero from '@/components/Hero';
import RigsSection from '@/components/RigsSection';

export default function Home() {
  return (
    <div className="flex flex-col gap-0 bg-background min-h-screen">
      <Hero />
      <RigsSection />
    </div>
  );
}
