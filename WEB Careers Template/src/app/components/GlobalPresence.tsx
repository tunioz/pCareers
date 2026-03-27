import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';

export function GlobalPresence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const locations = [
    { name: 'Zurich', country: 'Switzerland', type: 'HQ', x: 50, y: 40 },
    { name: 'Luxembourg', country: 'Luxembourg', type: 'Data Center', x: 48, y: 42 },
    { name: 'Dallas', country: 'USA', type: 'Data Center', x: 25, y: 48 },
    { name: 'Singapore', country: 'Singapore', type: 'Office', x: 75, y: 62 },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#05183f]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Built from the heart of Europe. Trusted <span className="text-[#17bed0]">worldwide.</span>
          </h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-[#17bed0] hover:text-[#14a8b8] transition-colors text-lg font-medium group"
            >
              Read more 
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className="relative bg-white/5 rounded-3xl p-8 lg:p-16 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="relative w-full h-[400px] lg:h-[500px]">
            {/* Dotted world map background */}
            <div className="absolute inset-0 opacity-30">
              <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Create dotted world map pattern */}
                <defs>
                  <pattern id="dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                    <circle cx="4" cy="4" r="1" fill="#ffffff" />
                  </pattern>
                </defs>
                
                {/* Continents using dotted pattern - simplified shapes */}
                {/* North America */}
                <path d="M 100 80 Q 150 60 200 80 L 220 100 Q 230 120 220 140 L 200 160 Q 180 180 150 180 L 120 170 Q 90 150 100 120 Z" fill="url(#dots)" />
                
                {/* South America */}
                <path d="M 180 200 Q 200 190 220 200 L 230 250 Q 240 300 220 330 L 200 340 Q 180 330 170 310 L 160 260 Q 165 220 180 200 Z" fill="url(#dots)" />
                
                {/* Europe */}
                <path d="M 400 80 Q 440 70 480 85 L 500 100 Q 510 120 500 140 L 480 150 Q 450 160 420 150 L 395 130 Q 385 105 400 80 Z" fill="url(#dots)" />
                
                {/* Africa */}
                <path d="M 420 160 Q 460 150 500 165 L 520 200 Q 530 260 510 310 L 480 340 Q 450 350 430 340 L 410 310 Q 400 260 405 210 Z" fill="url(#dots)" />
                
                {/* Asia */}
                <path d="M 520 60 Q 600 50 680 70 L 750 90 Q 800 110 820 140 L 840 180 Q 850 220 830 250 L 800 270 Q 760 280 720 270 L 680 250 Q 640 230 600 210 L 560 180 Q 520 150 520 110 Z" fill="url(#dots)" />
                
                {/* Australia */}
                <path d="M 700 300 Q 740 290 780 300 L 800 320 Q 810 340 800 360 L 770 375 Q 740 380 710 370 L 690 350 Q 685 325 700 300 Z" fill="url(#dots)" />
                
                {/* Additional detail dots */}
                <circle cx="150" cy="120" r="1.5" fill="#0055d5" opacity="0.6" />
                <circle cx="450" cy="110" r="1.5" fill="#0055d5" opacity="0.6" />
                <circle cx="650" cy="150" r="1.5" fill="#0055d5" opacity="0.6" />
                <circle cx="750" cy="340" r="1.5" fill="#0055d5" opacity="0.6" />
              </svg>
            </div>

            {/* Location pins with labels */}
            {locations.map((location, index) => (
              <motion.div
                key={location.name}
                className="absolute"
                style={{ left: `${location.x}%`, top: `${location.y}%` }}
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
              >
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.1 }}
                >
                  {/* Connection line from label to pin */}
                  <svg className="absolute -bottom-8 left-1/2 -translate-x-1/2" width="2" height="32" style={{ zIndex: 1 }}>
                    <line x1="1" y1="0" x2="1" y2="32" stroke="#0055d5" strokeWidth="2" />
                  </svg>
                  
                  {/* Label */}
                  <motion.div
                    className={`absolute bottom-8 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap shadow-lg ${
                      location.type === 'HQ' 
                        ? 'bg-[#05183f] text-white border-2 border-[#0055d5]' 
                        : 'bg-[#0055d5] text-white'
                    }`}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <div className="text-center">
                      {location.type === 'HQ' ? 'DATA CENTER' : 'ACCELERATING SERVERS'}
                    </div>
                    {/* Small arrow pointing down */}
                    <div className={`absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent ${
                      location.type === 'HQ' ? 'border-t-[#05183f]' : 'border-t-[#0055d5]'
                    }`} />
                  </motion.div>
                  
                  {/* Pin point */}
                  <motion.div
                    className="relative z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    <div className="w-3 h-3 bg-[#0055d5] rounded-full border-2 border-white shadow-lg" />
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 bg-[#0055d5] rounded-full"
                      animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    />
                  </motion.div>
                  
                  {/* Hover Tooltip */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                    <div className="bg-white text-[#05183f] px-4 py-2 rounded-lg text-sm whitespace-nowrap shadow-xl border border-[#0055d5]">
                      <div className="font-bold">{location.name}</div>
                      <div className="text-xs opacity-70">{location.type}</div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-white/80 mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            Serving 24M+ users across 195+ countries from trusted global locations
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}