import type { Metadata } from 'next';
import { queryAll } from '@/lib/db';
import type { Post, Job } from '@/types';
import { HeroSection } from '@/components/public/home/HeroSection';
import { ImpactNumbers } from '@/components/public/home/ImpactNumbers';
import { WhoWeAre } from '@/components/public/home/WhoWeAre';
import { GlobalPresence } from '@/components/public/home/GlobalPresence';
import { WhyPCloud } from '@/components/public/home/WhyPCloud';
import { EngineeringProof } from '@/components/public/home/EngineeringProof';
import { OpenRoles } from '@/components/public/home/OpenRoles';
import { EmployeeSpotlight } from '@/components/public/home/EmployeeSpotlight';
import { BlogTeaser } from '@/components/public/home/BlogTeaser';
import { TalentCommunity } from '@/components/public/TalentCommunity';

export const metadata: Metadata = {
  title: {
    absolute: 'Careers at pCloud \u2014 Build What Matters',
  },
  description:
    'Build secure cloud storage used by 24 million people. See open engineering roles at pCloud.',
};

export default function HomePage() {
  const posts = queryAll<Post>(
    'SELECT * FROM posts WHERE is_published = 1 ORDER BY created_at DESC LIMIT 3'
  );

  const jobs = queryAll<Job>(
    'SELECT * FROM jobs WHERE is_published = 1 ORDER BY created_at DESC'
  );

  return (
    <>
      <HeroSection />
      <ImpactNumbers />
      <WhoWeAre />
      <GlobalPresence />
      <WhyPCloud />
      <EngineeringProof />
      <OpenRoles jobs={jobs} />
      <EmployeeSpotlight />
      <BlogTeaser posts={posts} />
      <TalentCommunity />
    </>
  );
}
