import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CultureHero } from '../components/culture/CultureHero';
import { Manifesto } from '../components/culture/Manifesto';
import { Values } from '../components/culture/Values';
import { Growth } from '../components/culture/Growth';
import { HowWeWork } from '../components/culture/HowWeWork';
import { Benefits } from '../components/culture/Benefits';
import { CultureCTA } from '../components/culture/CultureCTA';
import { EngineeringPrinciples } from '../components/about/EngineeringPrinciples';
import { CEOQuote } from '../components/about/CEOQuote';

export default function Culture() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <CultureHero />
        <Manifesto />
        <Values />
        <EngineeringPrinciples />
        <CEOQuote />
        <Growth />
        <HowWeWork />
        <Benefits />
        <CultureCTA />
      </main>
      <Footer />
    </div>
  );
}