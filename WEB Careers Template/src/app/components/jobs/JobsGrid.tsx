import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { JobCard, Job } from './JobCard';

interface JobsGridProps {
  jobs: Job[];
}

export function JobsGrid({ jobs }: JobsGridProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="py-12 bg-[#f4f4f4]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-[#3a3a3a]">
            Open Roles
          </h2>
          <span className="bg-[#0055d5] text-white text-lg font-bold px-5 py-2 rounded-full">
            {jobs.length}
          </span>
        </motion.div>

        {/* Unified Jobs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard key={job.id} job={job} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}