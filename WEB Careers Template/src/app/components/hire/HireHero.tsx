import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Link } from 'react-router';

export function HireHero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-[#05183f]">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758520144426-edf40a58f299?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqb2IlMjBpbnRlcnZpZXclMjBwcm9mZXNzaW9uYWwlMjBtZWV0aW5nfGVufDF8fHx8MTc3MzU4ODY5Nnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Professional meeting"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative">
        <div className="text-center max-w-4xl mx-auto">
          <motion.h1
            className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            How We Hire
          </motion.h1>
          <motion.p
            className="text-xl text-white/90 mt-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            A transparent, fair, and rigorous process
          </motion.p>
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              to="/open-roles"
              className="inline-block bg-[#17bed0] text-white px-8 h-[48px] leading-[48px] rounded-full hover:bg-[#14a8b8] transition-colors text-base font-medium"
            >
              View Open Roles
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}