import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const benefits = [
    {
      title: 'Compensation & Financial',
      description:
        'Top 1% salary benchmarks with competitive equity packages, annual performance bonuses, profit sharing, and stock options. Your compensation grows as we grow.',
      image: 'https://images.unsplash.com/photo-1624953901718-e24ee7200b85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxhcnklMjBjb21wZW5zYXRpb24lMjBmaW5hbmNpYWwlMjBncm93dGh8ZW58MXx8fHwxNzczODM5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Health & Wellbeing',
      description:
        'Comprehensive health insurance covering medical, dental, and vision. Mental health support, therapy stipends, gym memberships, and wellness programs included.',
      image: 'https://images.unsplash.com/photo-1722605341966-a61a3de57ad8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzcyUyMG1lZGl0YXRpb24lMjBmaXRuZXNzfGVufDF8fHx8MTc3MzgzOTIzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Work-Life Balance',
      description:
        'Flexible working hours, remote-first culture, unlimited PTO policy, generous parental leave (6 months), and sabbatical options after 5 years.',
      image: 'https://images.unsplash.com/photo-1683885356374-a57b7e67ae37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrJTIwbGlmZSUyMGJhbGFuY2UlMjByZW1vdGV8ZW58MXx8fHwxNzczODM5MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Growth & Learning',
      description:
        '$3,000 annual learning budget, conference attendance, course reimbursement, book allowance, and access to premium learning platforms like O\'Reilly and Pluralsight.',
      image: 'https://images.unsplash.com/photo-1542725752-e9f7259b3881?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFybmluZyUyMGVkdWNhdGlvbiUyMGJvb2tzJTIwc3R1ZHl8ZW58MXx8fHwxNzczODM5MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Team & Social',
      description:
        'Team offsites, monthly social events, annual company retreat, celebration budget, charity matching, and strong community building activities.',
      image: 'https://images.unsplash.com/photo-1744891470331-c660191721b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY2VsZWJyYXRpb24lMjBzb2NpYWwlMjBldmVudHN8ZW58MXx8fHwxNzczODM5MjM5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      title: 'Workspace & Tools',
      description:
        '$2,000 equipment budget, latest MacBook Pro or custom PC build, ergonomic office setup, standing desks, premium software licenses, and co-working stipends.',
      image: 'https://images.unsplash.com/photo-1765366417030-16d9765d920a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3b3Jrc3BhY2UlMjBvZmZpY2UlMjBzZXR1cHxlbnwxfHx8fDE3NzM4MzkyMzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
        <motion.div
          ref={ref}
          className="flex flex-col gap-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Top Content */}
          <div className="flex flex-col items-start justify-center max-w-[600px]">
            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-5xl lg:text-[72px] font-bold text-[#3a3a3a] leading-[1]">
                We Take Care of <span className="text-[#0055d5]">Our People</span>
              </h2>
            </div>

            {/* Divider Line */}
            <div className="mb-6">
              <div className="bg-black h-[4px] w-24" />
            </div>

            {/* Description */}
            <div>
              <p className="text-xl text-[#4b5563] leading-[28px]">
                Comprehensive benefits that support your growth, wellbeing, and success
              </p>
            </div>
          </div>

          {/* Grid - Benefit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                className="relative h-[280px] rounded-2xl overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <ImageWithFallback
                    src={benefit.image}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,58,138,0.8)] to-transparent flex flex-col justify-end p-6 group-hover:from-[rgba(30,58,138,0.9)] transition-colors">
                  <h3 className="text-xl font-bold text-white mb-2 leading-[28px]">
                    {benefit.title}
                  </h3>
                  <p className="text-[#bfdbfe] text-sm leading-[20px]">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}