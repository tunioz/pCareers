import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Linkedin, Twitter, Instagram, Github } from 'lucide-react';

export function Social() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const socials = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/company/pcloud',
      color: '#0077B5',
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: 'https://twitter.com/pcloud',
      color: '#1DA1F2',
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://instagram.com/pcloud',
      color: '#E4405F',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/pcloud',
      color: '#333',
    },
  ];

  return (
    <section ref={ref} className="bg-[#05183f] py-20 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Follow Us
          </h2>
          <p className="text-lg text-white/70">
            Join our community and stay updated with the latest from pCloud
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all">
                <social.icon className="text-white" size={32} />
              </div>
              <p className="text-white/70 text-sm text-center mt-3 group-hover:text-white transition-colors">
                {social.name}
              </p>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
