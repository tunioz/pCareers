import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router';
import svgPaths from '../../imports/svg-uojxkafknl';

export function OpenRoles() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentPage, setCurrentPage] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'product' | 'department'>('all');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const jobs = [
    {
      id: '1',
      title: 'Senior Frontend Engineer',
      department: 'Engineering',
      product: 'pCloud Drive',
      seniority: 'Senior',
      category: 'product',
      backgroundImage: 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NzM1Nzc3ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isNew: true,
    },
    {
      id: '2',
      title: 'Security Engineer - Encryption',
      department: 'Security',
      product: 'pCloud Encryption',
      seniority: 'Senior',
      category: 'department',
      backgroundImage: 'https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZW5jcnlwdGlvbiUyMGRpZ2l0YWx8ZW58MXx8fHwxNzczNjcxNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      isNew: true,
      isHighPriority: true,
    },
    {
      id: '3',
      title: 'Product Designer',
      department: 'Design',
      product: 'Platform/Core',
      seniority: 'Senior',
      category: 'product',
      backgroundImage: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MzY0MTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
      isNew: true,
    },
    {
      id: '4',
      title: 'Backend Engineer - Storage',
      department: 'Engineering',
      product: 'pCloud Drive',
      seniority: 'Mid-level',
      category: 'product',
      backgroundImage: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHNlcnZlcnMlMjBkYXRhfGVufDF8fHx8MTc3MzU5NzQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      isNew: false,
    },
    {
      id: '5',
      title: 'DevOps Engineer',
      department: 'Infrastructure',
      product: 'Platform/Core',
      seniority: 'Senior',
      category: 'department',
      backgroundImage: 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzczNTc5NzQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      isHighPriority: true,
    },
    {
      id: '6',
      title: 'iOS Developer',
      department: 'Mobile',
      product: 'pCloud Drive',
      seniority: 'Mid-level',
      category: 'product',
      backgroundImage: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lfGVufDF8fHx8MTc3MzY0MDQ0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '7',
      title: 'Full Stack Engineer',
      department: 'Engineering',
      product: 'pCloud Pass',
      seniority: 'Senior',
      category: 'product',
      backgroundImage: 'https://images.unsplash.com/photo-1580894912989-0bc892f4efd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyaW5nJTIwY29kZXxlbnwxfHx8fDE3NzM2NzE2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      isNew: true,
    },
    {
      id: '8',
      title: 'QA Automation Engineer',
      department: 'Quality',
      product: 'Platform/Core',
      seniority: 'Mid-level',
      category: 'department',
      backgroundImage: 'https://images.unsplash.com/photo-1646153114001-495dfb56506d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzYyNzExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '9',
      title: 'Product Manager - B2B',
      department: 'Business',
      product: 'pCloud Business',
      seniority: 'Senior',
      category: 'product',
      backgroundImage: 'https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczNTgyMjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '10',
      title: 'Cryptography Researcher',
      department: 'Security',
      product: 'pCloud Encryption',
      seniority: 'Staff',
      category: 'department',
      backgroundImage: 'https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHklMjBsb2NrfGVufDF8fHx8MTc3MzU5MTIwOXww&ixlib=rb-4.1.0&q=80&w=1080',
      isNew: true,
    },
    {
      id: '11',
      title: 'UX Researcher',
      department: 'Design',
      product: 'Platform/Core',
      seniority: 'Mid-level',
      category: 'department',
      backgroundImage: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MzY0MTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  // Filter jobs based on active filter
  const filteredJobs = jobs.filter((job) => {
    if (activeFilter === 'all') return true;
    return job.category === activeFilter;
  });

  // Calculate pagination
  // First page shows 3 cards, subsequent pages show 4 cards
  const getPageJobs = () => {
    if (currentPage === 0) {
      return filteredJobs.slice(0, 3);
    } else {
      const startIndex = 3 + (currentPage - 1) * 4;
      return filteredJobs.slice(startIndex, startIndex + 4);
    }
  };

  const totalPages = Math.ceil((filteredJobs.length - 3) / 4) + 1;
  const currentPageJobs = getPageJobs();

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleDotClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
        setName('');
        setCv(null);
      }, 5000);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCv(file);
    }
  };

  const removeFile = () => {
    setCv(null);
  };

  return (
    <section ref={ref} id="roles" className="bg-[#f4f4f4] py-20">
      <div className="max-w-[1280px] mx-auto px-4 lg:px-4">
        {/* Heading */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a] mb-4 text-center">
            Open roles
          </h2>
          <p className="text-[#6b7280] text-center max-w-[857px]">
            Browse our open positions to explore what roles exist, what skills are needed, and how to start your journey with pCloud.
          </p>
        </motion.div>

        {/* Filter Chips */}
        <motion.div
          className="flex justify-center gap-3 mb-12 flex-wrap"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {/* Main filter categories */}
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#17bed0] text-white shadow-md'
                : 'bg-white text-[#3a3a3a] hover:bg-gray-50 border border-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveFilter('product')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeFilter === 'product'
                ? 'bg-[#17bed0] text-white shadow-md'
                : 'bg-white text-[#3a3a3a] hover:bg-gray-50 border border-gray-200'
            }`}
          >
            By product
          </button>
          <button
            onClick={() => setActiveFilter('department')}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
              activeFilter === 'department'
                ? 'bg-[#17bed0] text-white shadow-md'
                : 'bg-white text-[#3a3a3a] hover:bg-gray-50 border border-gray-200'
            }`}
          >
            By department
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-300 self-center"></div>

          {/* Specific tags */}
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#f4f4f4] text-[#4b5563] hover:bg-[#e5e5e5] transition-colors"
          >
            Engineering
          </button>
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#f4f4f4] text-[#4b5563] hover:bg-[#e5e5e5] transition-colors"
          >
            Security
          </button>
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#f4f4f4] text-[#4b5563] hover:bg-[#e5e5e5] transition-colors"
          >
            Design
          </button>
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#f4f4f4] text-[#4b5563] hover:bg-[#e5e5e5] transition-colors"
          >
            React
          </button>
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#f4f4f4] text-[#4b5563] hover:bg-[#e5e5e5] transition-colors"
          >
            TypeScript
          </button>
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium bg-[#f4f4f4] text-[#4b5563] hover:bg-[#e5e5e5] transition-colors"
          >
            Senior
          </button>
        </motion.div>

        {/* Cards Grid with Navigation */}
        <div className="relative flex items-center justify-center w-full mb-12">
          <motion.div 
            className="flex-1 max-w-full overflow-x-auto overflow-y-hidden scrollbar-hide"
            animate={{ x: currentPage === 0 ? 0 : -(currentPage * 4 - 1) * 25 + '%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex gap-6 h-[320px] min-w-max px-1">
              {/* Empty space on first page only */}
              <div className="w-[calc((100vw-1280px)/2+300px)] max-w-[300px] min-w-[200px] h-[320px] flex-shrink-0" />

              {/* Job Cards */}
              {filteredJobs.map((job, index) => (
                <Link to="/jobs" key={job.id} className="block flex-shrink-0 w-[300px]">
                  <motion.div
                    className="relative h-[320px] rounded-2xl overflow-hidden group cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1 * (index + 1), duration: 0.6 }}
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <ImageWithFallback
                        src={job.backgroundImage}
                        alt={job.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-[rgba(0,0,0,0.4)]" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                      {/* Top: Badges */}
                      <div className="flex gap-2">
                        {job.isNew && (
                          <span className="bg-amber-400 text-[#05183f] text-xs font-bold px-3 py-1.5 rounded-full">
                            NEW
                          </span>
                        )}
                        {job.isHighPriority && (
                          <span className="bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                            HIGH PRIORITY
                          </span>
                        )}
                      </div>

                      {/* Bottom: Job Info */}
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#17bed0] transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-white/80 text-sm mb-2">{job.seniority}</p>
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 rounded-full border border-white/30">
                            {job.department}
                          </span>
                          <span className="bg-[#17bed0]/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                            {job.product}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Left Arrow Button */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="absolute left-[-16px] top-[140px] bg-white/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-[40px] h-[40px] flex items-center justify-center shadow-lg transition-all z-10"
            aria-label="Previous"
          >
            <div className="w-[10px] h-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16">
                <path d={svgPaths.p23f92880} fill="#9CA3AF" />
              </svg>
            </div>
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
            className="absolute right-[-16px] top-[140px] bg-white/80 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed rounded-full w-[40px] h-[40px] flex items-center justify-center shadow-lg transition-all z-10"
            aria-label="Next"
          >
            <div className="w-[10px] h-[16px]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 16">
                <path d={svgPaths.p20766000} fill="#9CA3AF" />
              </svg>
            </div>
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mb-12">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full mx-1 transition-all ${
                currentPage === index ? 'bg-[#17bed0]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Talent Community Section */}
      <div className="py-20 bg-[#0055d5] relative overflow-hidden">
        {/* Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0" style={{ 
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </motion.div>

        <div className="max-w-[800px] mx-auto px-6 lg:px-12 relative z-10">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Don't see what you're <span className="text-[#E6FF00]">looking for</span>?</h2>
          </motion.div>

          {!submitted ? (
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-6 py-4 rounded-full text-[#3a3a3a] placeholder:text-[#9ca3af] border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:border-transparent"
                  />
                </motion.div>
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-6 py-4 rounded-full text-[#3a3a3a] placeholder:text-[#9ca3af] border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-[#E6FF00] focus:border-transparent"
                  />
                </motion.div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-stretch">
                <motion.div
                  className="flex-1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.55, duration: 0.6 }}
                >
                  <label className="block">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cv-upload"
                    />
                    <div
                      className="w-full px-6 py-4 rounded-full bg-white text-[#3a3a3a] border-2 border-white/30 hover:border-[#E6FF00] transition-colors cursor-pointer flex items-center justify-between"
                    >
                      {cv ? (
                        <>
                          <span className="truncate text-sm">{cv.name}</span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFile();
                            }}
                            className="ml-2 text-[#3a3a3a] hover:text-[#0055d5]"
                          >
                            <X size={18} />
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-[#9ca3af] flex items-center gap-2">
                            <Upload size={18} />
                            Attach CV
                          </span>
                        </>
                      )}
                    </div>
                  </label>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <motion.button
                    type="submit"
                    className="bg-[#E6FF00] text-[#05183f] px-8 py-4 rounded-full font-bold text-lg inline-flex items-center gap-2 hover:bg-[#d4e600] transition-colors whitespace-nowrap h-full"
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply
                  </motion.button>
                </motion.div>
              </div>

              <motion.p
                className="text-center text-white/80 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                Join our Talent Community—we'll alert you to matching roles as they open.
              </motion.p>
            </motion.form>
          ) : (
            <motion.div
              className="text-center bg-white/10 backdrop-blur-sm rounded-3xl p-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', duration: 0.6 }}
            >
              <motion.div
                className="w-20 h-20 bg-[#E6FF00] rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              >
                <svg
                  className="w-10 h-10 text-[#05183f]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <h3 className="text-2xl font-bold text-white mb-2">Thanks for joining!</h3>
              <p className="text-white/80">Check your inbox for a confirmation email.</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}