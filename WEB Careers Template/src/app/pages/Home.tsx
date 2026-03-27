import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';
import { ImpactNumbers } from '../components/ImpactNumbers';
import { WhoWeAre } from '../components/WhoWeAre';
import { GlobalPresence } from '../components/GlobalPresence';
import { WhyPCloud } from '../components/WhyPCloud';
import { OpenRoles } from '../components/OpenRoles';
import { BlogTeaser } from '../components/BlogTeaser';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ImpactNumbers />
        <WhoWeAre />
        <GlobalPresence />
        <WhyPCloud />
        <OpenRoles />
        <BlogTeaser />
      </main>
      <Footer />
    </div>
  );
}