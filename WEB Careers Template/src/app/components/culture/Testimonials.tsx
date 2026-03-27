import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      quote:
        "What I love most about pCloud is the trust they place in engineers. I'm not just executing someone else's vision—I own the entire feature from concept to deployment. The autonomy is incredible, and the support from leadership is unmatched. This is where I've grown the most in my career.",
      name: 'Elena Rodriguez',
      role: 'Senior Backend Engineer',
      photo: 'https://images.unsplash.com/photo-1675186914580-94356f7c012c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwcHJvZmVzc2lvbmFsJTIwd29tYW4lMjBzbWlsaW5nfGVufDF8fHx8MTc3MzY3MDg1OXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      quote:
        "The culture here is genuinely different. People challenge you to be better, not to put you down, but because they believe in your potential. The learning budget and mentorship program helped me transition from mid-level to senior in 18 months. I can't imagine working anywhere else.",
      name: 'David Kim',
      role: 'Product Designer',
      photo: 'https://images.unsplash.com/photo-1766066014773-0074bf4911de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHRlY2glMjBwcm9mZXNzaW9uYWwlMjBhc2lhbnxlbnwxfHx8fDE3NzM2NzA4NjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      quote:
        "I joined pCloud for the mission—protecting user privacy—but stayed for the people and the culture. Every day I work on problems that matter, with a team that values transparency and honest communication. The work-life balance is real, not just a recruiting pitch.",
      name: 'Amara Okafor',
      role: 'DevOps Engineer',
      photo: 'https://images.unsplash.com/photo-1689857538296-b6e1a392a91d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBlbmdpbmVlciUyMHBvcnRyYWl0JTIwYmxhY2t8ZW58MXx8fHwxNzczNjcwODYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      quote:
        "After years at big tech companies drowning in process, pCloud is refreshing. We move fast, ship frequently, and actually ship features that users love. No endless meetings, no bureaucracy—just smart people solving hard problems together. This is what engineering should feel like.",
      name: 'Marcus Chen',
      role: 'Principal Engineer',
      photo: 'https://images.unsplash.com/photo-1769636930047-4478f12cf430?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25maWRlbnQlMjBwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM2NTU3NzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      quote:
        "The team collaboration at pCloud is exceptional. Cross-functional teams that actually work together, not just coordinate. Engineers, designers, and PMs sit together, debate ideas, and ship products collaboratively. It's the healthiest engineering culture I've experienced.",
      name: 'Sofia Martinez',
      role: 'Frontend Engineer',
      photo: 'https://images.unsplash.com/photo-1750175473842-353543b839db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMGVuZ2luZWVyJTIwaGlzcGFuaWN8ZW58MXx8fHwxNzczNjcwODYyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      quote:
        "What sets pCloud apart is the high standards combined with genuine care for employees. They push you to deliver excellence but also ensure you have the resources, time, and support to actually do it. It's demanding and rewarding in the best possible way.",
      name: 'James Wilson',
      role: 'Engineering Manager',
      photo: 'https://images.unsplash.com/photo-1737575655055-e3967cbefd03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wZXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM1OTE3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const handleSlideChange = (index: number) => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const itemWidth = container.offsetWidth;
      container.scrollTo({
        left: itemWidth * index,
        behavior: 'smooth',
      });
    }
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
            What <span className="text-[#0055d5]">Our People</span> Say
          </h2>
        </motion.div>

        <div
          className="flex gap-8 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
          ref={carouselRef}
          onScroll={(e) => {
            const container = e.currentTarget;
            const scrollLeft = container.scrollLeft;
            const itemWidth = container.offsetWidth;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setActiveSlide(newIndex);
          }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-[#f4f4f4] rounded-3xl overflow-hidden group flex-shrink-0 w-full md:w-[400px] snap-center"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Photo */}
              <div className="relative h-64 overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <motion.div
                  className="text-[#0055d5] mb-4"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.1 + 0.3, type: 'spring' }}
                >
                  <Quote size={32} />
                </motion.div>
                <p className="text-[#4b5563] italic mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-bold text-[#3a3a3a]">{testimonial.name}</h4>
                  <p className="text-sm text-[#4b5563]">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                activeSlide === index
                  ? 'bg-[#0055d5] w-8'
                  : 'bg-[#d1d5db] hover:bg-[#9ca3af]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}