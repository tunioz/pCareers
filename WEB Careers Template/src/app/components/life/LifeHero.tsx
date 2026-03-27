import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function LifeHero() {
  return (
    <section className="relative bg-[#05183f] pt-32 pb-20 lg:py-40 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1690383922983-90d7a4658ef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWlsaW5nJTIwdGVhbSUyMG1lZXRpbmclMjBmYWNlcyUyMGhhcHB5JTIwY293b3JrZXJzfGVufDF8fHx8MTc3Mzg0MjU4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Team collaboration"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#05183f]/60" />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            More than a workplace
          </motion.h1>
          <motion.p
            className="text-xl lg:text-2xl text-white/80 leading-relaxed"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            See what life at pCloud really looks like
          </motion.p>
        </div>
      </div>
    </section>
  );
}