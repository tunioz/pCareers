import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Shield, Share2, History, RefreshCw, Download, KeyRound } from 'lucide-react';
import svgPaths from '../../../imports/svg-vrafpgntyr';

const features = [
  {
    number: '01',
    title: 'Zero-Knowledge Encryption',
    description: 'Your files are encrypted end-to-end. Only you hold the encryption keys - not even pCloud can access your data. Military-grade security for complete privacy.',
    icon: Shield,
  },
  {
    number: '02',
    title: 'Secure File Sharing',
    description: 'Control who accesses your files. Set password protection, expiration dates, and download limits. Share confidently knowing you maintain full control.',
    icon: Share2,
  },
  {
    number: '03',
    title: 'File Versioning',
    description: 'Accidentally deleted something? Restore previous versions of any file from your revision history. Keep multiple versions of important documents.',
    icon: History,
  },
  {
    number: '04',
    title: 'Auto Sync',
    description: 'Changes sync automatically across all your devices - phone, tablet, desktop. Work seamlessly from anywhere, always in sync.',
    icon: RefreshCw,
  },
  {
    number: '05',
    title: 'Offline Access',
    description: 'Download files for offline access. Work without internet and sync automatically when you\'re back online. Never miss a beat.',
    icon: Download,
  },
  {
    number: '06',
    title: 'Two-Factor Authentication',
    description: 'Add an extra layer of security to your account. Require a second verification method to prevent unauthorized access.',
    icon: KeyRound,
  },
];

function ArrowIcon() {
  return (
    <div className="relative shrink-0 size-[16px]">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <path d={svgPaths.p3a917a20} fill="white" />
      </svg>
    </div>
  );
}

export function WhyTrust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-[#05183f] py-32 px-20">
      <div className="max-w-[1280px] mx-auto">
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[60px] font-bold text-white leading-[60px]">
            Why users trust pCloud
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.number}
                className="flex flex-col gap-4 pt-8 border-t border-[#4b5563] relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-[#0055d5] to-[#17bed0] rounded-xl flex items-center justify-center mb-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <Icon size={24} className="text-white" />
                </motion.div>

                {/* Title */}
                <h3 className="text-[30px] font-bold text-white leading-9">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-[#9ca3af] text-base leading-[26px] pt-2">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}