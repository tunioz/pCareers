export const revalidate = 60;
import type { Metadata } from 'next';
import { queryAll } from '@/lib/db';
import { PhotoGallery } from '@/components/public/life/PhotoGallery';
import { TeamStories } from '@/components/public/life/TeamStories';
import { TypicalDay } from '@/components/public/life/TypicalDay';
import { Events } from '@/components/public/life/Events';
import { LifeCTA } from '@/components/public/life/LifeCTA';
import type { GalleryCategory, GalleryPhotoWithCategory, TeamStory } from '@/types';

export const metadata: Metadata = {
  title: 'Life at pCloud',
  description: 'See what life at pCloud really looks like. Meet our team, explore our culture, and discover what makes pCloud a great place to work.',
};

export default async function LifePage() {
  const categories = await queryAll<GalleryCategory>(
    'SELECT * FROM gallery_categories ORDER BY sort_order ASC'
  );

  const photos = await queryAll<GalleryPhotoWithCategory>(
    `SELECT p.*, c.name as category_name, c.slug as category_slug
     FROM gallery_photos p
     JOIN gallery_categories c ON p.category_id = c.id
     WHERE p.is_published = 1
     ORDER BY p.sort_order ASC`
  );

  const stories = await queryAll<TeamStory>(
    'SELECT * FROM team_stories WHERE is_published = 1 ORDER BY sort_order ASC'
  );

  return (
    <>
      <PhotoGallery categories={categories} photos={photos} />
      <TeamStories stories={stories} />
      <TypicalDay />
      <Events />
      <LifeCTA />
    </>
  );
}
