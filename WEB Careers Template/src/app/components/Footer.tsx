import { Linkedin, Twitter, Instagram, Github } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router';

export function Footer() {
  const navigation = {
    main: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Culture', href: '/culture' },
      { name: 'Open Roles', href: '/jobs' },
      { name: 'How We Hire', href: '/how-we-hire' },
      { name: 'Life at pCloud', href: '#life' },
      { name: 'Blog', href: '#blog' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#privacy' },
      { name: 'Terms of Service', href: '#terms' },
      { name: 'Sitemap', href: '#sitemap' },
    ],
    social: [
      { name: 'LinkedIn', icon: Linkedin, href: '#' },
      { name: 'Twitter', icon: Twitter, href: '#' },
      { name: 'Instagram', icon: Instagram, href: '#' },
      { name: 'GitHub', icon: Github, href: '#' },
    ],
  };

  return (
    <footer className="bg-[#05183f] text-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <motion.h3
              className="text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              pCloud
            </motion.h3>
            <motion.p
              className="text-white/70 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Swiss-based cloud storage provider with 13+ years of excellence in keeping the world's
              data safe, private, and accessible.
            </motion.p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              {navigation.main.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                      {link.name}
                    </a>
                  )}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              {navigation.legal.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <a href={link.href} className="text-white/70 hover:text-white transition-colors text-sm">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              {navigation.social.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="text-white/70 hover:text-white transition-colors"
                  aria-label={social.name}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -4 }}
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <motion.div
          className="border-t border-white/10 pt-8 text-center text-white/50 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © 2026 pCloud AG. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
}