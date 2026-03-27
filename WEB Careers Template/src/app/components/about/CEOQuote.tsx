import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import imgCTO from "figma:asset/730520420c00c079f95cb7b11c662d7901699eea.png";

export function CEOQuote() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-white py-32">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Content */}
          <motion.div
            className="flex-1 flex flex-col gap-12"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Heading */}
            <div className="flex flex-col">
              <h2 className="text-4xl lg:text-5xl font-bold text-[#05183f] leading-tight">
                <span>Founded </span>
                <span className="text-[#9ca3af]">in 2013</span>
                <span>, we</span>
              </h2>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#05183f] leading-tight">
                <span>are </span>
                <span className="text-[#9ca3af]">committed</span>
                <span> to the</span>
              </h2>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#05183f] leading-tight">
                <span>world's leading, </span>
                <span className="text-[#9ca3af]">secure,</span>
              </h2>
              <h2 className="text-4xl lg:text-5xl font-bold text-[#0055d5] leading-tight">
                cloud storage platform
              </h2>
            </div>

            {/* Quote with vertical border */}
            <div className="relative">
              <div 
                aria-hidden="true" 
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#f3f4f6]"
              />
              <div className="pl-5 relative">
                <p className="text-xl lg:text-2xl text-[#374151] leading-relaxed mb-6">
                  We are the go-to source for users who want to protect their privacy and control their data.
                </p>
                <p className="text-lg text-[#05183f] font-semibold">Tunio Zafer, CEO</p>
                <motion.div
                  className="absolute -left-8 -top-3 text-[#f3f4f6] text-[120px] font-bold italic leading-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  "
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Image Container */}
          <motion.div
            className="flex-1 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
              <img 
                src={imgCTO} 
                alt="Anton Titov, CEO & Co-Founder" 
                className="w-full h-auto"
              />
            </div>
            
            {/* Floating vertical text */}
            <motion.div
              className="absolute -right-4 top-1/2 -translate-y-1/2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="-rotate-90 whitespace-nowrap">
                <p className="text-[#d1d5db] text-[30px] font-bold tracking-[3px] uppercase">
                  Leadership
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}