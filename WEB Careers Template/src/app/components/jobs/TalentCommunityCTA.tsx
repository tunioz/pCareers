import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Mail, User, CheckCircle } from 'lucide-react';

export function TalentCommunityCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      setSubmitted(true);
      setTimeout(() => {
        setName('');
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3a3a3a] mb-4">
            Don't see what you're looking for?
          </h2>
          <p className="text-lg text-[#4b5563]">
            Join Our Talent Community — we'll alert you when matching roles open
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {submitted ? (
            <motion.div
              className="bg-green-50 border-2 border-green-200 rounded-3xl p-8 flex items-center justify-center gap-3"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring' }}
            >
              <CheckCircle className="text-green-600" size={32} />
              <p className="text-green-800 text-lg font-medium">
                Thanks for joining our Talent Community!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-[#f4f4f4] rounded-3xl p-8">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" size={20} />
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-gray-200 focus:border-[#0055d5] focus:outline-none transition-colors"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4b5563]" size={20} />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-4 rounded-full bg-white border border-gray-200 focus:border-[#0055d5] focus:outline-none transition-colors"
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-[#0055d5] text-white py-4 rounded-full font-bold text-lg hover:bg-[#0044aa] transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
