import type { Metadata } from 'next';
import { PageHero } from '@/components/public/PageHero';
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
  title: 'Our Culture',
};

export default function CulturePage() {
  return (
    <>
      <PageHero
        label="CULTURE AT PCLOUD"
        heading="Build products that matter. With people who refuse to compromise."
        backgroundImage="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920"
        primaryCta={{ text: 'Explore Open Roles', href: '/careers' }}
        secondaryCta={{ text: 'See Our Benefits', href: '#benefits' }}
      />
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
