import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AboutHero } from '../components/about/AboutHero';
import { WhatWeDo } from '../components/about/WhatWeDo';
import { Timeline } from '../components/about/Timeline';
import { AntonQuote } from '../components/about/AntonQuote';
import { WhyTrust } from '../components/about/WhyTrust';
import { SupportedPlatforms } from '../components/about/SupportedPlatforms';
import { Strengths } from '../components/about/Strengths';
import { AboutCTA } from '../components/about/AboutCTA';

export default function About() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AboutHero />
        <WhatWeDo />
        <Timeline />
        <AntonQuote />
        <WhyTrust />
        <SupportedPlatforms />
        <Strengths />
        <AboutCTA />
      </main>
      <Footer />
    </div>
  );
}