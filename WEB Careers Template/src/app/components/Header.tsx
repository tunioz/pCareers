import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'About', href: '/about' },
    { name: 'Culture', href: '/culture' },
    { name: 'Open Roles', href: '/jobs' },
    { name: 'Life', href: '/life' },
    { name: 'Blog', href: '/blog' },
    { name: 'Role Preview', href: '/role-preview' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/" className="text-2xl font-bold text-[#0055d5]">
              pCloud
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.href.startsWith('/') 
                ? location.pathname === link.href
                : false;
              
              return link.href.startsWith('/') ? (
                <motion.div key={link.name} whileHover={{ y: -2 }}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-colors ${
                      isActive 
                        ? 'text-[#0055d5] font-medium' 
                        : 'text-[#4b5563] hover:text-[#0055d5]'
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-[#4b5563] hover:text-[#0055d5] transition-colors"
                  whileHover={{ y: -2 }}
                >
                  {link.name}
                </motion.a>
              );
            })}
          </nav>

          {/* Right Side: CTA Button + User Icon */}
          <div className="hidden lg:flex items-center gap-4">
            <motion.button
              className="bg-[#0055d5] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#0044aa] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Join now
            </motion.button>
            
            <motion.button
              className="text-[#4b5563] hover:text-[#0055d5] transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="User account"
            >
              {/* Removed User icon */}
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[#4b5563] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-16 bg-white z-40"
          >
            <nav className="flex flex-col p-6 gap-4">
              {navLinks.map((link, index) => {
                const isActive = link.href.startsWith('/') 
                  ? location.pathname === link.href
                  : false;

                return link.href.startsWith('/') ? (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.href}
                      className={`block py-3 border-b border-gray-100 ${
                        isActive 
                          ? 'text-[#0055d5] font-semibold' 
                          : 'text-[#4b5563] hover:text-[#0055d5]'
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className="text-[#4b5563] hover:text-[#0055d5] py-3 border-b border-gray-100"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              <motion.button
                className="bg-[#0055d5] text-white px-6 py-3 rounded-full mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Join now
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}