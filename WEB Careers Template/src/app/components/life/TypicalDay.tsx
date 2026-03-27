import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function TypicalDay() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const schedule = [
    {
      time: '9:00 AM',
      activity: 'Finance Reporting',
      description: 'Monthly financial review and budget analysis with the leadership team',
      color: '#E6FF00', // Yellow
    },
    {
      time: '12:00 PM',
      activity: 'Payroll Processing',
      description: 'Ensuring timely and accurate compensation for our global team',
      color: '#17bed0', // Cyan
    },
    {
      time: '6:00 PM',
      activity: 'Charity Bike Race',
      description: 'Team building event supporting local community initiatives',
      color: '#8b5cf6', // Purple
    },
  ];

  return (
    <section ref={ref} className="bg-[#ff6b5f] py-0 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Side - Image */}
        <motion.div
          className="relative min-h-[400px] lg:min-h-[600px]"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1601612858161-5e007f0303b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGNsaW1iaW5nJTIwcm9wZSUyMG91dGRvb3IlMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzczOTMyNjU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Antoaneta - Finance Team"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-[280px]">
            <p className="text-lg font-bold text-[#05183f] mb-1">Antoaneta</p>
            <p className="text-sm text-[#4b5563]">Finance Team</p>
          </div>
        </motion.div>

        {/* Right Side - Timeline */}
        <div className="relative py-16 px-8 lg:px-16 flex flex-col justify-center">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              A Typical Day at pCloud
            </h2>
          </motion.div>

          {/* Timeline Items */}
          <div className="relative space-y-8">
            {schedule.map((item, index) => (
              <motion.div
                key={item.time}
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                {/* Curved Connector Line */}
                {index < schedule.length - 1 && (
                  <svg
                    className="absolute left-[60px] top-[50px] w-[80px] h-[80px] pointer-events-none"
                    style={{ zIndex: 0 }}
                  >
                    <path
                      d="M 0 0 Q 40 40, 0 80"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      opacity="0.3"
                    />
                  </svg>
                )}

                <div className="flex items-start gap-6 relative z-10">
                  {/* Time Badge */}
                  <div
                    className="px-5 py-2.5 rounded-full font-bold text-[#05183f] text-sm whitespace-nowrap flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  >
                    {item.time}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.activity}</h3>
                    <p className="text-white/90 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}