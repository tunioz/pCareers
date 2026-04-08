'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './PhotoGallery.module.scss';
import type { GalleryCategory, GalleryPhotoWithCategory } from '@/types';

interface PhotoGalleryProps {
  categories: GalleryCategory[];
  photos: GalleryPhotoWithCategory[];
}

export function PhotoGallery({ categories, photos }: PhotoGalleryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [showCount, setShowCount] = useState(12);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filters: { id: string; label: string }[] = [
    { id: 'all', label: 'All' },
    ...categories.map((cat) => ({ id: cat.slug, label: cat.name })),
  ];

  const filtered = activeFilter === 'all'
    ? photos
    : photos.filter((p) => p.category_slug === activeFilter);
  const displayed = filtered.slice(0, showCount);
  const hasMore = showCount < filtered.length;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filtered.length) % filtered.length);
  }, [lightboxIndex, filtered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, goNext, goPrev]);

  const currentPhoto = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Life at pCloud
        </motion.h2>
        <motion.p
          className={styles.subheading}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.8 }}
        >
          More than a workplace
        </motion.p>

        <div className={styles.pills}>
          {filters.map((f) => (
            <motion.button
              key={f.id}
              className={`${styles.pill} ${activeFilter === f.id ? styles.pillActive : ''}`}
              onClick={() => { setActiveFilter(f.id); setShowCount(12); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <div className={styles.grid}>
          {displayed.map((photo, index) => (
            <motion.div
              key={photo.id}
              className={`${styles.gridItem} ${index === 2 || index === 5 ? styles.gridItemTall : ''}`}
              initial={false}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.04, duration: 0.5 }}
              onClick={() => openLightbox(filtered.indexOf(photo))}
            >
              <ImageWithFallback src={photo.image} alt={photo.alt_text || `pCloud life ${photo.id}`} />
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <div className={styles.showMore}>
            <motion.button
              className={styles.showMoreButton}
              onClick={() => setShowCount((prev) => prev + 12)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show more
              <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
            </motion.button>
          </div>
        )}

        <p className={styles.count}>
          Showing {displayed.length} of {filtered.length} photos
        </p>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentPhoto && lightboxIndex !== null && (
          <motion.div
            className={styles.lightbox}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
          >
            <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
              <X size={28} />
            </button>

            <button
              className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
              onClick={(e) => { e.stopPropagation(); goPrev(); }}
              aria-label="Previous"
            >
              <ChevronLeft size={36} />
            </button>

            <motion.div
              className={styles.lightboxContent}
              key={currentPhoto.id}
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentPhoto.image}
                alt={currentPhoto.alt_text || `pCloud life ${currentPhoto.id}`}
              />
              <div className={styles.lightboxCaption}>
                <span className={styles.lightboxCategory}>{currentPhoto.category_name}</span>
                <span className={styles.lightboxCounter}>
                  {lightboxIndex + 1} / {filtered.length}
                </span>
              </div>
            </motion.div>

            <button
              className={`${styles.lightboxNav} ${styles.lightboxNext}`}
              onClick={(e) => { e.stopPropagation(); goNext(); }}
              aria-label="Next"
            >
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
