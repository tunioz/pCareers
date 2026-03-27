import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { MessageCircle, Clock, Users, DollarSign, AlertCircle } from 'lucide-react';

export function OurCommitments() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const commitments = [
    {
      icon: MessageCircle,
      title: 'Respectful, Timely Feedback',
      description: 'We provide constructive feedback after each interview stage, regardless of outcome. You\'ll hear from us within the timelines we commit to, and we\'ll always be honest and respectful in our communication.',
    },
    {
      icon: Clock,
      title: 'Transparent Timeline and Process',
      description: 'We clearly communicate what to expect at each stage, how long the process will take, and what we\'re evaluating. No surprises, no hidden steps — just clarity from start to finish.',
    },
    {
      icon: Users,
      title: 'Diverse Interview Panel',
      description: 'You\'ll meet people from different backgrounds, roles, and perspectives. This helps us reduce bias, evaluate candidates fairly, and ensure inclusive hiring practices.',
    },
    {
      icon: DollarSign,
      title: 'Competitive Offers',
      description: 'We offer market-rate compensation that reflects your skills, experience, and the impact you\'ll make. Our packages include salary, equity, bonuses, and comprehensive benefits.',
    },
    {
      icon: AlertCircle,
      title: 'No Surprises',
      description: 'All requirements, expectations, and evaluation criteria are communicated upfront. We believe in transparency and want you to have all the information you need to make informed decisions.',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-[#f4f4f4]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3a3a3a] mb-4">Our Commitments to You</h2>
          <p className="text-lg text-[#4b5563] max-w-2xl mx-auto">
            We believe in treating every candidate with respect and transparency.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {commitments.map((commitment, index) => (
            <motion.div
              key={commitment.title}
              className="bg-white rounded-3xl p-6 border border-gray-200"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: '0 10px 30px rgba(0, 85, 213, 0.1)' }}
            >
              <motion.div
                className="w-14 h-14 rounded-full bg-[#0055d5] flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <commitment.icon className="text-white" size={28} />
              </motion.div>
              <h3 className="text-xl font-bold text-[#3a3a3a] mb-3">{commitment.title}</h3>
              <p className="text-[#4b5563] leading-relaxed">{commitment.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
