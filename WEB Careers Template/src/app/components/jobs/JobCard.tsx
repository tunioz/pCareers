import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export interface Job {
  id: string;
  title: string;
  department: string;
  product: string;
  seniority: string;
  backgroundImage: string;
  isNew?: boolean;
  isHighPriority?: boolean;
  tags: string[];
}

interface JobCardProps {
  job: Job;
  index: number;
}

export function JobCard({ job, index }: JobCardProps) {
  return (
    <motion.div
      className="relative h-[320px] rounded-3xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
        >
          <ImageWithFallback
            src={job.backgroundImage}
            alt={job.title}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.9)]" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {/* Top: Badges */}
        <div>
          {(job.isNew || job.isHighPriority) && (
            <div className="flex gap-2">
              {job.isNew && (
                <motion.span
                  className="bg-amber-400 text-[#05183f] text-xs font-bold px-3 py-1.5 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.3, type: 'spring' }}
                >
                  NEW
                </motion.span>
              )}
              {job.isHighPriority && (
                <motion.span
                  className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05 + 0.4, type: 'spring' }}
                >
                  HIGH PRIORITY
                </motion.span>
              )}
            </div>
          )}
        </div>

        {/* Bottom: Job Info */}
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">
              {job.department}
            </span>
            <span className="bg-[#E6FF00]/90 text-[#05183f] text-xs font-bold px-3 py-1 rounded-full">
              {job.product}
            </span>
          </div>

          {/* Job Title */}
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#E6FF00] transition-colors">
            {job.title}
          </h3>

          {/* Seniority */}
          <p className="text-white/80 text-sm mb-3">{job.seniority}</p>

          {/* CTA */}
          <motion.div
            className="flex items-center gap-2 text-white font-medium text-sm"
            initial={{ x: 0 }}
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            View Details
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}