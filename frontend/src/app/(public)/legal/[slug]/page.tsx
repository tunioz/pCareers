import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { queryOne, queryAll } from '@/lib/db';
import type { LegalPage } from '@/types';
import styles from '@/components/public/legal/LegalPage.module.scss';

export async function generateStaticParams() {
  const pages = queryAll<LegalPage>(
    'SELECT slug FROM legal_pages WHERE is_published = 1'
  );
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = queryOne<LegalPage>(
    'SELECT * FROM legal_pages WHERE slug = ? AND is_published = 1',
    [slug]
  );
  if (!page) {
    return { title: 'Not Found' };
  }
  return {
    title: `${page.title} | pCloud`,
    description: `${page.title} - pCloud AG legal information.`,
  };
}

export default async function LegalPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const page = queryOne<LegalPage>(
    'SELECT * FROM legal_pages WHERE slug = ? AND is_published = 1',
    [slug]
  );

  if (!page) {
    notFound();
  }

  const formattedDate = new Date(page.last_updated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>{page.title}</h1>
        <p className={styles.lastUpdated}>Last updated: {formattedDate}</p>
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
      </div>
    </div>
  );
}
