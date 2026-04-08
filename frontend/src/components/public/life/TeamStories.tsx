'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './TeamStories.module.scss';
import type { TeamStory } from '@/types';

interface TeamStoriesProps {
  stories: TeamStory[];
}

export function TeamStories({ stories }: TeamStoriesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeStory, setActiveStory] = useState<TeamStory | null>(null);

  useEffect(() => {
    if (!activeStory) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveStory(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeStory]);

  if (stories.length === 0) return null;

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.h2
          className={styles.heading}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Our <span className={styles.highlight}>Team</span> Stories
        </motion.h2>

        <div className={styles.grid}>
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              className={styles.card}
              initial={false}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * index, duration: 0.6 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.avatar}>
                  {story.photo ? (
                    <ImageWithFallback src={story.photo} alt={story.name} />
                  ) : (
                    <div className={styles.avatarFallback}>
                      {story.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={styles.info}>
                  <p className={styles.name}>{story.name}</p>
                  <p className={styles.role}>{story.role}</p>
                </div>
              </div>
              <p className={styles.quote}>
                &ldquo;{story.quote.length > 150 ? `${story.quote.slice(0, 150)}...` : story.quote}&rdquo;
              </p>
              <button
                className={styles.readMore}
                onClick={() => setActiveStory(story)}
              >
                Read story <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      <AnimatePresence>
        {activeStory && (
          <motion.div
            className={styles.modal}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              className={styles.modalCard}
              initial={false}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.modalClose}
                onClick={() => setActiveStory(null)}
                aria-label="Close"
              >
                <X size={24} />
              </button>

              <div className={styles.modalHeader}>
                <div className={styles.modalAvatar}>
                  {activeStory.photo ? (
                    <ImageWithFallback src={activeStory.photo} alt={activeStory.name} />
                  ) : (
                    <div className={styles.avatarFallback}>
                      {activeStory.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <h3 className={styles.modalName}>{activeStory.name}</h3>
                  <p className={styles.modalRole}>{activeStory.role}</p>
                </div>
              </div>

              <div className={styles.modalBody}>
                <p className={styles.modalQuote}>
                  &ldquo;{activeStory.quote}&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
