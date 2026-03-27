import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function EngineeringPrinciples() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const principles = [
    {
      number: '01',
      principle: 'Security first',
      description:
        'Every feature, every line of code, every decision starts with security as the foundation.',
    },
    {
      number: '02',
      principle: 'Privacy by design',
      description:
        'User privacy is not an afterthought—it is architected into every system from day one.',
    },
    {
      number: '03',
      principle: 'Simplicity over complexity',
      description:
        'Simple systems are easier to secure, maintain, and scale. We favor elegance over complexity.',
    },
    {
      number: '04',
      principle: 'Reliability at scale',
      description:
        'Build systems that work flawlessly for one user and 24 million users alike.',
    },
    {
      number: '05',
      principle: 'Own what you build',
      description:
        'Engineers take full ownership of their code—from conception to deployment to maintenance.',
    },
    {
      number: '06',
      principle: 'Build for the long term',
      description:
        'We make decisions that will stand the test of time, not just meet quarterly goals.',
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
            Our <span className="text-[#0055d5]">engineering principles</span>
          </h2>
        </motion.div>

        {principles.map((item, index) => (
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
                    <p className="leading-[40px]">{item.principle}</p>
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