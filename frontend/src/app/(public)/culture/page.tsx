import type { Metadata } from 'next';
import { CultureHero } from '@/components/public/culture/CultureHero';
import { Manifesto } from '@/components/public/culture/Manifesto';
import { Values } from '@/components/public/culture/Values';
import { EngineeringPrinciples } from '@/components/public/culture/EngineeringPrinciples';
import { NotForEveryone } from '@/components/public/culture/NotForEveryone';
import { CEOQuote } from '@/components/public/culture/CEOQuote';
import { Growth } from '@/components/public/culture/Growth';
import { HowWeWork } from '@/components/public/culture/HowWeWork';
import { Benefits } from '@/components/public/culture/Benefits';
import { CultureCTA } from '@/components/public/culture/CultureCTA';

export const metadata: Metadata = {
  title: 'Our Culture | pCloud Careers',
  description: 'Discover what it is like to work at pCloud — our engineering principles, how we collaborate, growth opportunities, and what makes us different.',
  openGraph: {
    title: 'Our Culture | pCloud Careers',
    description: 'Discover what it is like to work at pCloud — our engineering principles, growth, and what makes us different.',
  },
};

export default function CulturePage() {
  return (
    <>
      <CultureHero />
      <Manifesto />
      <Values />
      <EngineeringPrinciples />
      <NotForEveryone />
      <CEOQuote />
      <Growth />
      <HowWeWork />
      <Benefits />
      <CultureCTA />
    </>
  );
}
