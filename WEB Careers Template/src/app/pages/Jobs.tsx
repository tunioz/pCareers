import { useState, useMemo, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Upload, X } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { JobsHero } from '../components/jobs/JobsHero';
import { FilterTags } from '../components/jobs/FilterTags';
import { FilterControls } from '../components/jobs/FilterControls';
import { JobsGrid } from '../components/jobs/JobsGrid';
import { WhyJoin } from '../components/jobs/WhyJoin';
import { Job } from '../components/jobs/JobCard';

// Job listings data
const allJobs: Job[] = [
  // pCloud Drive
  {
    id: '1',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    product: 'pCloud Drive',
    seniority: 'Senior',
    backgroundImage: 'https://images.unsplash.com/photo-1565229284535-2cbbe3049123?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBwcm9ncmFtbWluZyUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NzM1Nzc3ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isNew: true,
    tags: ['React', 'TypeScript'],
  },
  {
    id: '2',
    title: 'Backend Engineer - Storage Systems',
    department: 'Engineering',
    product: 'pCloud Drive',
    seniority: 'Mid-level',
    backgroundImage: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHNlcnZlcnMlMjBkYXRhfGVufDF8fHx8MTc3MzU5NzQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Go'],
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    department: 'Infrastructure',
    product: 'pCloud Drive',
    seniority: 'Senior',
    backgroundImage: 'https://images.unsplash.com/photo-1762163516269-3c143e04175c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwY2VudGVyJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzczNTc5NzQzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    isHighPriority: true,
    tags: ['DevOps'],
  },
  {
    id: '4',
    title: 'iOS Developer',
    department: 'Mobile',
    product: 'pCloud Drive',
    seniority: 'Mid-level',
    backgroundImage: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lfGVufDF8fHx8MTc3MzY0MDQ0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['iOS'],
  },
  
  // pCloud Encryption
  {
    id: '5',
    title: 'Security Engineer - Encryption',
    department: 'Security',
    product: 'pCloud Encryption',
    seniority: 'Senior',
    backgroundImage: 'https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZW5jcnlwdGlvbiUyMGRpZ2l0YWx8ZW58MXx8fHwxNzczNjcxNjEwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    isNew: true,
    isHighPriority: true,
    tags: ['Security'],
  },
  {
    id: '6',
    title: 'Cryptography Researcher',
    department: 'Security',
    product: 'pCloud Encryption',
    seniority: 'Staff',
    backgroundImage: 'https://images.unsplash.com/photo-1767972464040-8bfee42d7bed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwc2VjdXJpdHklMjBsb2NrfGVufDF8fHx8MTc3MzU5MTIwOXww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['Security'],
  },
  
  // pCloud Pass
  {
    id: '7',
    title: 'Full Stack Engineer - Password Manager',
    department: 'Engineering',
    product: 'pCloud Pass',
    seniority: 'Senior',
    backgroundImage: 'https://images.unsplash.com/photo-1580894912989-0bc892f4efd0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyaW5nJTIwY29kZXxlbnwxfHx8fDE3NzM2NzE2MTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    isNew: true,
    tags: ['React', 'Go', 'Pass'],
  },
  {
    id: '8',
    title: 'Mobile Developer - Pass',
    department: 'Mobile',
    product: 'pCloud Pass',
    seniority: 'Mid-level',
    backgroundImage: 'https://images.unsplash.com/photo-1762341119237-98df67c9c3c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMHBob25lfGVufDF8fHx8MTc3MzY0MDQ0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['iOS', 'Pass'],
  },
  
  // pCloud Business
  {
    id: '9',
    title: 'Product Manager - B2B',
    department: 'Business',
    product: 'pCloud Business',
    seniority: 'Senior',
    backgroundImage: 'https://images.unsplash.com/photo-1758518732175-5d608ba3abdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzczNTgyMjI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    tags: [],
  },
  
  // Platform/Core
  {
    id: '10',
    title: 'Principal Engineer - Infrastructure',
    department: 'Infrastructure',
    product: 'Platform/Core',
    seniority: 'Principal',
    backgroundImage: 'https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBibHVlfGVufDF8fHx8MTc3MzY3MTYxMnww&ixlib=rb-4.1.0&q=80&w=1080',
    isHighPriority: true,
    tags: ['DevOps'],
  },
  {
    id: '11',
    title: 'QA Automation Engineer',
    department: 'Quality',
    product: 'Platform/Core',
    seniority: 'Mid-level',
    backgroundImage: 'https://images.unsplash.com/photo-1646153114001-495dfb56506d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3MzYyNzExN3ww&ixlib=rb-4.1.0&q=80&w=1080',
    tags: ['TypeScript'],
  },
  {
    id: '12',
    title: 'Product Designer',
    department: 'Design',
    product: 'Platform/Core',
    seniority: 'Senior',
    backgroundImage: 'https://images.unsplash.com/photo-1772272935464-2e90d8218987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwaW50ZXJmYWNlfGVufDF8fHx8MTc3MzY0MTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    isNew: true,
    tags: [],
  },
];

const filterTagsList = ['React', 'Go', 'DevOps', 'Security', 'iOS', 'Pass', 'Drive', 'TypeScript'];

export default function Jobs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [department, setDepartment] = useState('All');
  const [product, setProduct] = useState('All');
  const [seniority, setSeniority] = useState('All');
  const [viewMode, setViewMode] = useState<'product' | 'department'>('product');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Filter jobs based on all active filters
  const filteredJobs = useMemo(() => {
    return allJobs.filter((job) => {
      // Tag filter
      if (activeTags.length > 0) {
        const hasMatchingTag = activeTags.some(
          (tag) =>
            job.tags.includes(tag) ||
            job.product.toLowerCase().includes(tag.toLowerCase()) ||
            job.title.toLowerCase().includes(tag.toLowerCase())
        );
        if (!hasMatchingTag) return false;
      }

      // Department filter
      if (department !== 'All' && job.department !== department) return false;

      // Product filter
      if (product !== 'All' && job.product !== product) return false;

      // Seniority filter
      if (seniority !== 'All' && job.seniority !== seniority) return false;

      return true;
    });
  }, [activeTags, department, product, seniority]);

  const hasActiveFilters =
    activeTags.length > 0 || department !== 'All' || product !== 'All' || seniority !== 'All';

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleClearAll = () => {
    setActiveTags([]);
    setDepartment('All');
    setProduct('All');
    setSeniority('All');
  };

  const handleViewModeToggle = () => {
    setViewMode((prev) => (prev === 'product' ? 'department' : 'product'));
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
    <div className="min-h-screen">
      <Header />
      <main>
        <JobsHero />
        <FilterTags tags={filterTagsList} activeTags={activeTags} onTagToggle={handleTagToggle} />
        <FilterControls
          department={department}
          product={product}
          seniority={seniority}
          viewMode={viewMode}
          resultsCount={filteredJobs.length}
          onDepartmentChange={setDepartment}
          onProductChange={setProduct}
          onSeniorityChange={setSeniority}
          onViewModeToggle={handleViewModeToggle}
          onClearAll={handleClearAll}
          hasActiveFilters={hasActiveFilters}
        />
        <JobsGrid jobs={filteredJobs} />
        
        {/* Talent Community Section */}
        <section ref={ref} className="py-20 bg-[#0055d5] relative overflow-hidden">
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
        </section>

        <WhyJoin />
      </main>
      <Footer />
    </div>
  );
}