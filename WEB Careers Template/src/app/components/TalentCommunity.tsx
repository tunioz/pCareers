import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowRight, Upload, X } from 'lucide-react';

export function TalentCommunity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        setName('');
        setCv(null);
      }, 5000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCv(file);
    }
  };

  const removeFile = () => {
    setCv(null);
  };

  return (
    <section ref={ref} className="py-20 bg-[#0055d5] relative overflow-hidden">
      {/* Background Pattern */}
      <motion.div
        className="absolute inset-0 opacity-10"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.1 } : {}}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </motion.div>

      <div className="max-w-[800px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Don't see what you're <span className="text-[#E6FF00]">looking for</span>?</h2>
        </motion.div>

        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-6 py-4 rounded-full text-[#3a3a3a] placeholder:text-[#9ca3af] border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:border-transparent"
                />
              </motion.div>
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-6 py-4 rounded-full text-[#3a3a3a] placeholder:text-[#9ca3af] border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:border-transparent"
                />
              </motion.div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <motion.div
                className="flex-1"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.55, duration: 0.6 }}
              >
                <label className="block">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="cv-upload"
                  />
                  <div
                    className="w-full px-6 py-4 rounded-full bg-white text-[#3a3a3a] border-2 border-white/30 hover:border-[#E6FF00] transition-colors cursor-pointer flex items-center justify-between"
                  >
                    {cv ? (
                      <>
                        <span className="truncate text-sm">{cv.name}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeFile();
                          }}
                          className="ml-2 text-[#3a3a3a] hover:text-[#0055d5]"
                        >
                          <X size={18} />
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="text-[#9ca3af] flex items-center gap-2">
                          <Upload size={18} />
                          Attach CV
                        </span>
                      </>
                    )}
                  </div>
                </label>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <motion.button
                  type="submit"
                  className="bg-[#E6FF00] text-[#05183f] px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 hover:bg-[#d4e600] transition-colors whitespace-nowrap h-full"
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Apply
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            </div>

            <motion.p
              className="text-center text-white/80 text-sm mt-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Join our Talent Community—we'll alert you to matching roles as they open.
            </motion.p>
          </motion.form>
        ) : (
          <motion.div
            className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-12"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
          >
            <motion.div
              className="w-20 h-20 bg-[#E6FF00] rounded-full flex items-center justify-center mx-auto mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <svg
                className="w-10 h-10 text-[#05183f]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Thanks for joining!</h3>
            <p className="text-white/80">Check your inbox for a confirmation email.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}