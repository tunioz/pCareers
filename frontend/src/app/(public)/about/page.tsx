import type { Metadata } from 'next';
import { AboutHero } from '@/components/public/about/AboutHero';
import { WhatWeDo } from '@/components/public/about/WhatWeDo';
import { Timeline } from '@/components/public/about/Timeline';
import { AntonQuote } from '@/components/public/about/AntonQuote';
import { WhyTrust } from '@/components/public/about/WhyTrust';
import { SupportedPlatforms } from '@/components/public/about/SupportedPlatforms';
import { Strengths } from '@/components/public/about/Strengths';
import { AboutCTA } from '@/components/public/about/AboutCTA';

export const metadata: Metadata = {
  title: 'About Us',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhatWeDo />
      <Timeline />
      <AntonQuote />
      <WhyTrust />
      <SupportedPlatforms />
      <Strengths />
      <AboutCTA />
    </>
  );
}
