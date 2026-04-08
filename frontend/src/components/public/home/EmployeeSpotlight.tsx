'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ImageWithFallback } from '../ImageWithFallback';
import styles from './EmployeeSpotlight.module.scss';

const employees = [
  {
    name: 'Ivelina Bahchevanova',
    role: 'Senior QA Engineer',
    photo: '/images/employee-ivelina.jpg',
    quote: "At pCloud, I get to work on cutting-edge encryption technology that protects millions of users. The team trusts me to make important decisions, and I have the autonomy to innovate.",
  },
  {
    name: 'Marcus Johnson',
    role: 'Principal Backend Engineer',
    photo: '/images/employee-marcus.jpg',
    quote: 'Building infrastructure that stores 500+ petabytes of data across 175+ countries is incredibly challenging and rewarding. What I love most is the engineering culture.',
  },
  {
    name: 'Yuki Tanaka',
    role: 'Product Designer',
    photo: '/images/employee-yuki.jpg',
    quote: "What drew me to pCloud was the mission: making privacy accessible to everyone. As a designer, I appreciate how the team values user experience as much as security.",
  },
];

export function EmployeeSpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % employees.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + employees.length) % employees.length);

  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.heading}>
            The people building <span className={styles.headingHighlight}>pCloud</span>
          </h2>
        </motion.div>

        <div className={styles.carousel}>
          <motion.div
            className={styles.carouselTrack}
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {employees.map((employee) => (
              <div key={employee.name} className={styles.slide}>
                <motion.div
                  className={styles.slideInner}
                  initial={false}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <div className={styles.photoWrapper}>
                    <ImageWithFallback src={employee.photo} alt={employee.name} />
                  </div>
                  <div className={styles.quoteContent}>
                    <p className={styles.quote}>&ldquo;{employee.quote}&rdquo;</p>
                    <div>
                      <h3 className={styles.name}>{employee.name}</h3>
                      <p className={styles.role}>{employee.role}</p>
                    </div>
                    <Link href="/life" className={styles.storyLink}>
                      Read story
                      <span>&rsaquo;</span>
                    </Link>
                  </div>
                </motion.div>
              </div>
            ))}
          </motion.div>

          <div className={styles.navButtons}>
            <button onClick={prevSlide} className={styles.navButton} aria-label="Previous">
              <svg viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" /></svg>
            </button>
            <button onClick={nextSlide} className={styles.navButton} aria-label="Next">
              <svg viewBox="0 0 14 14"><path d="M5 2l5 5-5 5" /></svg>
            </button>
          </div>

          <div className={styles.indicators}>
            {employees.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`${styles.indicator} ${currentSlide === index ? styles.indicatorActive : ''}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
