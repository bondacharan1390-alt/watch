import { Hero3D } from '@/components/home/Hero3D';
import { BrandPhilosophy } from '@/components/home/BrandPhilosophy';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { ConfiguratorBanner } from '@/components/home/ConfiguratorBanner';
import { CraftsmanshipShowcase } from '@/components/home/CraftsmanshipShowcase';
import { Testimonials } from '@/components/home/Testimonials';
import { JournalPreview } from '@/components/home/JournalPreview';

export default function HomePage() {
  return (
    <>
      <Hero3D />
      <BrandPhilosophy />
      <FeaturedCollection />
      <ConfiguratorBanner />
      <CraftsmanshipShowcase />
      <Testimonials />
      <JournalPreview />
    </>
  );
}
