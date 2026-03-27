import { motion } from 'motion/react';
import svgPaths from '../../imports/svg-anhsrd4we6';
import imgHeroSection from 'figma:asset/e5ae15a34b3ed6bfb93f98b7ffbdccbdfa45a73c.png';
import { Link } from 'react-router';

function ArrowSvg() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16.0033">
        <g>
          <path d={svgPaths.p12c2fd00} fill="white" />
        </g>
      </svg>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative shrink-0 w-full min-h-screen">
      {/* Background Image with Gradient Overlay */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <img alt="" className="absolute max-w-none object-cover size-full" src={imgHeroSection} />
        <div className="absolute bg-gradient-to-r from-[#0055d5] from-[40%] inset-0 to-[40%] to-[rgba(0,85,213,0)]" />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-end size-full min-h-screen pt-20">
        <div className="content-stretch flex flex-col items-start justify-end p-6 lg:p-20 relative w-full">
          <div className="max-w-[1280px] w-full mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              {/* Left Column - Main Content */}
              <motion.div
                className="flex flex-col gap-6 items-start self-end"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Label */}
                <motion.div
                  className="font-semibold text-xs text-white tracking-[1.2px] uppercase opacity-80"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  CAREER OPPORTUNITIES
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  className="text-5xl lg:text-7xl font-bold text-white leading-tight"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >We keep the world's memories, work, and ideas - safe, private, and always accessible.<br /></motion.h1>

                {/* Description */}
                <motion.p
                  className="text-lg text-white/90 max-w-md leading-relaxed"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Join our team of innovators building privacy-first cloud solutions trusted by millions worldwide.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  className="flex gap-4 w-full"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  <Link to="/jobs">
                    <motion.button
                      className="bg-[#05183f] text-white px-8 h-[56px] rounded-full font-semibold flex items-center hover:bg-[#041230] transition-colors shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >See open roles</motion.button>
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}