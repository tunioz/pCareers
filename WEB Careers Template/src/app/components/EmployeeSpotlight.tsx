import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function EmployeeSpotlight() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentSlide, setCurrentSlide] = useState(0);

  const employees = [
    {
      name: 'Sarah Chen',
      role: 'Senior Security Engineer',
      photo: 'https://images.unsplash.com/photo-1573497701119-52dbe8832c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwYnVzaW5lc3MlMjBwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3NzM2NTU3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quote:
        "At pCloud, I get to work on cutting-edge encryption technology that protects millions of users. The team trusts me to make important decisions, and I have the autonomy to innovate. It's rare to find a company where your work has such a direct impact on user privacy and security.",
    },
    {
      name: 'Marcus Johnson',
      role: 'Principal Backend Engineer',
      photo: 'https://images.unsplash.com/photo-1769636930047-4478f12cf430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM2NTU3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      quote:
        'Building infrastructure that stores 500+ petabytes of data across 195 countries is incredibly challenging and rewarding. What I love most is the engineering culture—we move fast, iterate quickly, and everyone owns their impact. Plus, Swiss quality standards mean we never compromise on reliability.',
    },
    {
      name: 'Yuki Tanaka',
      role: 'Product Designer',
      photo: 'https://images.unsplash.com/photo-1770363758469-386b78e979e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGFzaWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNjQ4MjM3fDA&ixlib=rb-4.1.0&q=80&w=1080',
      quote:
        'What drew me to pCloud was the mission: making privacy accessible to everyone. As a designer, I appreciate how the team values user experience as much as security. We have the freedom to experiment, fail fast, and ship products that users truly love. The work-life balance is exceptional too.',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % employees.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + employees.length) % employees.length);
  };

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a]">
            The people building <span className="text-[#0055d5]">pCloud</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${currentSlide * 100}%` }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {employees.map((employee, index) => (
                <div key={employee.name} className="w-full flex-shrink-0 px-4">
                  <motion.div
                    className="grid lg:grid-cols-2 gap-12 items-center bg-[#f4f4f4] rounded-3xl p-8 lg:p-12"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    {/* Photo */}
                    <motion.div
                      className="relative aspect-[4/5] rounded-2xl overflow-hidden"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ImageWithFallback
                        src={employee.photo}
                        alt={employee.name}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Content */}
                    <div>
                      <motion.p
                        className="text-xl lg:text-2xl text-[#4b5563] italic mb-8 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.6 }}
                      >
                        "{employee.quote}"
                      </motion.p>
                      <motion.div
                        className="mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.7, duration: 0.6 }}
                      >
                        <h3 className="text-2xl font-bold text-[#3a3a3a]">{employee.name}</h3>
                        <p className="text-[#4b5563]">{employee.role}</p>
                      </motion.div>
                      <motion.a
                        href="#life"
                        className="inline-flex items-center gap-2 text-[#0055d5] font-semibold hover:gap-4 transition-all"
                        whileHover={{ x: 5 }}
                      >
                        Read story
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              onClick={prevSlide}
              className="bg-white border-2 border-[#0055d5] text-[#0055d5] w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#0055d5] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ←
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="bg-white border-2 border-[#0055d5] text-[#0055d5] w-12 h-12 rounded-full flex items-center justify-center hover:bg-[#0055d5] hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              →
            </motion.button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {employees.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-[#0055d5]' : 'bg-gray-300'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}