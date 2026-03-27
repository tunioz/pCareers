import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { LifeHero } from '../components/life/LifeHero';
import { PhotoGallery } from '../components/life/PhotoGallery';
import { TeamStories } from '../components/life/TeamStories';
import { TypicalDay } from '../components/life/TypicalDay';
import { Events } from '../components/life/Events';
import { Social } from '../components/life/Social';
import { LifeCTA } from '../components/life/LifeCTA';

export default function Life() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <LifeHero />
        <PhotoGallery />
        <TeamStories />
        <TypicalDay />
        <Events />
        <Social />
        <LifeCTA />
      </main>
      <Footer />
    </div>
  );
}
