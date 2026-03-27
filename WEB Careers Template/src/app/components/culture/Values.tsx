import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Values() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const values = [
    {
      number: '01',
      value: 'Trust',
      description: 'We build trust through transparency, consistency, and always doing what we say. Every interaction with our users and team members is grounded in honesty and reliability.',
    },
    {
      number: '02',
      value: 'Excellence',
      description: 'We pursue mastery in everything we do and never settle for mediocrity. Our commitment to excellence drives us to constantly improve and deliver exceptional experiences.',
    },
    {
      number: '03',
      value: 'Growth',
      description: 'We invest in continuous learning and push ourselves beyond comfort zones. Personal and professional development is at the heart of our culture, encouraging innovation and creativity.',
    },
    {
      number: '04',
      value: 'Privacy',
      description: 'We champion user privacy as a fundamental right, not a feature. Protecting our users\' data is not just our business—it\'s our responsibility and our promise.',
    },
    {
      number: '05',
      value: 'Honesty',
      description: 'We communicate with candor and integrity in every interaction. Open, transparent communication builds stronger relationships and better solutions.',
    },
    {
      number: '06',
      value: 'Ownership',
      description: 'We take full responsibility for our work and its impact on users. Every team member is empowered to make decisions and see projects through to completion.',
    },
  ];

  return (
    <section ref={ref} className="bg-[#201c25] content-stretch flex flex-col items-start relative w-full p-[80px]">
      <div className="content-stretch flex flex-col gap-[48px] items-start max-w-[1280px] relative shrink-0 w-full mx-auto">
        <motion.div
          className="text-center mb-8 w-full"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            The Principles That Guide Us
          </h2>
        </motion.div>

        {values.map((item, index) => (
          <motion.div
            key={item.number}
            className="gap-x-[48px] gap-y-[48px] grid grid-cols-[repeat(2,minmax(0,1fr))] grid-rows-[_180px] pb-[49px] pt-[48px] relative shrink-0 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div aria-hidden="true" className="absolute border-[rgba(255,255,255,0.1)] border-b border-solid inset-0 pointer-events-none" />
            
            {/* Number */}
            <div className="col-1 justify-self-stretch opacity-10 relative row-1 self-center shrink-0">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative w-full">
                <div className="flex flex-col font-semibold h-[180px] justify-center leading-[0] not-italic relative shrink-0 text-[180px] text-white">
                  <p className="leading-[180px]">{item.number}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="col-2 justify-self-stretch relative row-1 self-center shrink-0">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative w-full">
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="flex flex-col font-bold justify-center leading-[0] not-italic relative shrink-0 text-[36px] text-white w-full">
                    <p className="leading-[40px]">{item.value}</p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
                  <div className="flex flex-col font-normal justify-center leading-[29.25px] not-italic relative shrink-0 text-[#9ca3af] text-[18px] w-full">
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}