import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Globe, Smartphone, Monitor, Apple, Laptop } from 'lucide-react';

const platforms = [
  {
    name: 'Web',
    description: 'Accessible from any browser, anywhere',
    icon: Globe,
  },
  {
    name: 'iOS',
    description: 'Native app for iPhone and iPad',
    icon: Apple,
  },
  {
    name: 'Android',
    description: 'Native app for Android devices',
    icon: Smartphone,
  },
  {
    name: 'Windows',
    description: 'Desktop application for Windows',
    icon: Monitor,
  },
  {
    name: 'macOS',
    description: 'Desktop application for Mac',
    icon: Laptop,
  },
  {
    name: 'Linux',
    description: 'Desktop application for Linux',
    icon: Monitor,
  },
];

export function SupportedPlatforms() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-white to-[#f8f9fa]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#05183f] mb-4">
            Everywhere you are
          </h2>
          <p className="text-lg text-[#666666] max-w-3xl mx-auto leading-relaxed">
            Access pCloud from any device, anywhere. We support all major platforms so you're never limited to one operating system. Your files are always within reach.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={platform.name}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
              >
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-[#0055d5] to-[#17bed0] rounded-2xl flex items-center justify-center mb-6"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon size={32} className="text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-[#05183f]">
                    {platform.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}