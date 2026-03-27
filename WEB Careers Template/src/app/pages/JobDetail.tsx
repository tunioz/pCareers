import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { MapPin, DollarSign, Clock, Users, Briefcase, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function JobDetail() {
  const contentRef = useRef(null);
  const isContentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const relatedJobs = [
    {
      id: 1,
      title: 'Backend Developer',
      company: 'pCloud Engineering',
      location: 'Remote / Sofia',
      salary: '€45,000 - €65,000',
      type: 'Full-time',
    },
    {
      id: 2,
      title: 'DevOps Engineer',
      company: 'pCloud Engineering',
      location: 'Sofia, Bulgaria',
      salary: '€50,000 - €70,000',
      type: 'Full-time',
    },
    {
      id: 3,
      title: 'Product Manager',
      company: 'pCloud Product',
      location: 'Remote / Zurich',
      salary: '€60,000 - €85,000',
      type: 'Full-time',
    },
    {
      id: 4,
      title: 'Security Engineer',
      company: 'pCloud Security',
      location: 'Sofia, Bulgaria',
      salary: '€55,000 - €75,000',
      type: 'Full-time',
    },
  ];

  const hiringManager = {
    name: 'Alexandra Petrova',
    role: 'Engineering Manager',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#0055d5] to-[#0044aa] pt-32 pb-24 rounded-br-[150px]">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/80 text-sm tracking-[2.5px] uppercase font-semibold mb-6">
              pCloud Engineering
            </p>
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Senior Cloud<br />
              Engineer
            </h1>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <Link to="/" className="hover:text-white transition-colors">Home</Link>
              <span>»</span>
              <Link to="/jobs" className="hover:text-white transition-colors">Open Roles</Link>
              <span>»</span>
              <span className="text-white">Senior Cloud Engineer</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 -mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Job Description */}
          <motion.div
            ref={contentRef}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 lg:p-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isContentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="bg-[#0055d5] text-white px-4 py-2 rounded-full text-sm font-semibold">
                FULL-TIME
              </span>
              <span className="bg-[#E6FF00] text-[#05183f] px-4 py-2 rounded-full text-sm font-semibold">
                REMOTE
              </span>
              <span className="bg-[#f4f4f4] text-[#4b5563] px-4 py-2 rounded-full text-sm font-semibold">
                ENGINEERING
              </span>
              <span className="bg-[#f4f4f4] text-[#4b5563] px-4 py-2 rounded-full text-sm font-semibold">
                SENIOR
              </span>
            </div>

            {/* Job Overview */}
            <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6">Job Overview</h2>
            <p className="text-[#4b5563] text-lg leading-relaxed mb-8">
              We're looking for a talented Senior Cloud Engineer to join our growing Infrastructure team at pCloud. You will play a crucial role in building and maintaining the infrastructure that powers our secure cloud storage platform used by millions of users worldwide. You'll work with cutting-edge technologies, solve complex scalability challenges, and contribute to a product that values privacy and security above all.
            </p>

            {/* The Role */}
            <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6">The Role</h2>
            <p className="text-[#4b5563] text-lg leading-relaxed mb-6">
              As a Senior Cloud Engineer at pCloud, you will work on a variety of infrastructure challenges from building development tools, designing robust CI/CD pipelines, managing Kubernetes clusters, to implementing infrastructure as code. The role requires both deep technical expertise and the ability to mentor junior team members. You'll work closely with development teams across the organization, helping them deploy, scale, and monitor their services efficiently.
            </p>

            {/* Responsibilities */}
            <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6 mt-12">Your Responsibilities</h2>
            <ul className="space-y-4 mb-12">
              {[
                'Design, implement, and maintain scalable cloud infrastructure on AWS and private cloud environments',
                'Build and optimize CI/CD pipelines to support rapid development cycles',
                'Manage and orchestrate containerized applications using Kubernetes',
                'Implement infrastructure as code using Terraform, Ansible, or similar tools',
                'Monitor system performance and implement solutions to improve reliability and efficiency',
                'Work with development teams to design architectures that meet security, scalability, and performance requirements',
                'Automate operational tasks and create tools to improve team productivity',
                'Participate in on-call rotation to support production systems',
                'Mentor junior engineers and contribute to knowledge sharing initiatives',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="w-2 h-2 bg-[#0055d5] rounded-full mt-2.5 shrink-0" />
                  <span className="text-[#4b5563] text-lg leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Requirements */}
            <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6">What You'll Need</h2>
            <ul className="space-y-4 mb-12">
              {[
                '5+ years of experience in cloud infrastructure, DevOps, or site reliability engineering',
                'Strong experience with AWS services (EC2, S3, RDS, Lambda, CloudFormation, etc.)',
                'Proficiency with containerization (Docker) and orchestration (Kubernetes)',
                'Experience with infrastructure as code tools (Terraform, Ansible, CloudFormation)',
                'Strong scripting skills in Python, Bash, or similar languages',
                'Experience building and maintaining CI/CD pipelines (Jenkins, GitLab CI, GitHub Actions)',
                'Deep understanding of networking, security, and system architecture',
                'Experience with monitoring and logging tools (Prometheus, Grafana, ELK stack)',
                'Excellent problem-solving skills and attention to detail',
                'Strong communication skills and ability to work in a distributed team',
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isContentInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.1 + 0.5, duration: 0.6 }}
                >
                  <div className="w-2 h-2 bg-[#E6FF00] rounded-full mt-2.5 shrink-0" />
                  <span className="text-[#4b5563] text-lg leading-relaxed">{item}</span>
                </motion.li>
              ))}
            </ul>

            {/* Nice to Have */}
            <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6">Nice to Have</h2>
            <p className="text-[#4b5563] text-lg leading-relaxed mb-6">
              While not required, any of the following would be great additions to your profile:
            </p>
            <ul className="space-y-4 mb-12">
              {[
                'Experience with high-availability architectures and disaster recovery',
                'Knowledge of security best practices and compliance requirements (GDPR, SOC 2)',
                'Contributions to open-source infrastructure projects',
                'Experience with storage systems and distributed databases',
                'Certifications in AWS, Kubernetes, or related technologies',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#9ca3af] rounded-full mt-2.5 shrink-0" />
                  <span className="text-[#4b5563] text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* What We Offer */}
            <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6">What We Offer</h2>
            <ul className="space-y-4 mb-12">
              {[
                'Competitive salary and equity package (€55,000 - €75,000 based on experience)',
                'Flexible remote work or hybrid options from our Sofia office',
                'Generous vacation policy (25 days + public holidays)',
                'Professional development budget for courses, conferences, and certifications',
                'Latest tech equipment - MacBook Pro and accessories of your choice',
                'Lifetime pCloud Premium Plus account (2TB storage)',
                'Health insurance and wellness benefits',
                'Regular team events and company off-sites',
                'Opportunity to work on products used by millions globally',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#0055d5] rounded-full mt-2.5 shrink-0" />
                  <span className="text-[#4b5563] text-lg leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            {/* Application Process */}
            <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6">How to Apply</h2>
            <p className="text-[#4b5563] text-lg leading-relaxed mb-8">
              Our hiring process is designed to be respectful of your time while giving us a clear understanding of your skills:
            </p>
            <ol className="space-y-4 mb-12">
              {[
                'Submit your application with your CV and a brief cover letter explaining why you\'re excited about joining pCloud',
                'Phone screening (30 minutes) to discuss your background and answer any questions',
                'Technical interview (90 minutes) covering infrastructure design, problem-solving, and system architecture',
                'Practical assignment - a realistic infrastructure challenge to complete in your own time (2-4 hours)',
                'Final interview with the team lead and a peer engineer to discuss culture fit and answer your questions',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="bg-[#0055d5] text-white w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-[#4b5563] text-lg leading-relaxed pt-1">{item}</span>
                </li>
              ))}
            </ol>

            <motion.div
              className="mt-12"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <button className="bg-[#0055d5] text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-[#0044aa] transition-colors w-full lg:w-auto">
                Apply Now
              </button>
            </motion.div>
          </motion.div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Job Details Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-[#3a3a3a] mb-6">Job Details</h3>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <MapPin className="text-[#0055d5] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Location</p>
                    <p className="text-[#3a3a3a] font-semibold">Sofia / Remote</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <DollarSign className="text-[#0055d5] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Salary Range</p>
                    <p className="text-[#3a3a3a] font-semibold">€55,000 - €75,000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="text-[#0055d5] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Employment Type</p>
                    <p className="text-[#3a3a3a] font-semibold">Full-time</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="text-[#0055d5] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Team Size</p>
                    <p className="text-[#3a3a3a] font-semibold">12 Engineers</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Briefcase className="text-[#0055d5] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Experience</p>
                    <p className="text-[#3a3a3a] font-semibold">5+ Years</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Calendar className="text-[#0055d5] shrink-0 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-[#9ca3af] mb-1">Posted</p>
                    <p className="text-[#3a3a3a] font-semibold">March 10, 2026</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hiring Manager Card */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h3 className="text-2xl font-bold text-[#3a3a3a] mb-6">Hiring Manager</h3>
              
              <div className="flex items-center gap-4 mb-6">
                <ImageWithFallback
                  src={hiringManager.image}
                  alt={hiringManager.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-[#3a3a3a] font-bold text-lg">{hiringManager.name}</p>
                  <p className="text-[#9ca3af] text-sm">{hiringManager.role}</p>
                </div>
              </div>

              <motion.button
                className="bg-[#0055d5] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#0044aa] transition-colors w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contact
              </motion.button>
            </motion.div>

            {/* Company Culture */}
            <motion.div
              className="bg-gradient-to-br from-[#0055d5] to-[#0044aa] rounded-2xl shadow-lg p-8 text-white"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-4">Explore pCloud Culture</h3>
              <p className="text-white/90 mb-6">
                Learn more about our values, team, and what makes pCloud a great place to work.
              </p>
              <Link to="/culture">
                <motion.button
                  className="bg-white text-[#0055d5] px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#E6FF00] hover:text-[#05183f] transition-colors w-full"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Culture Page
                </motion.button>
              </Link>
            </motion.div>

            {/* Gallery Preview */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
                alt="pCloud Office"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#3a3a3a] mb-2">Behind-the-scenes</h3>
                <p className="text-[#4b5563] text-sm mb-4">
                  Take a glimpse into daily life at pCloud
                </p>
                <Link to="/life">
                  <button className="text-[#0055d5] text-sm font-semibold hover:underline">
                    View Gallery →
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Related Jobs Section */}
      <section className="bg-[#f9fafb] py-20 mt-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.h2
            className="text-4xl font-bold text-[#3a3a3a] text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Related Jobs
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedJobs.map((job, index) => (
              <motion.div
                key={job.id}
                className="bg-white rounded-2xl shadow-md p-8 hover:shadow-xl transition-shadow cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="bg-[#f3f4f6] rounded-full p-4">
                    <Briefcase className="text-[#9ca3af]" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[#9ca3af] text-sm mb-2">{job.company}</p>
                    <h3 className="text-xl font-bold text-[#3a3a3a] mb-3">{job.title}</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#6b7280] text-sm">
                        <MapPin size={14} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#6b7280] text-sm">
                        <DollarSign size={14} />
                        <span>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Link to="/jobs">
              <motion.button
                className="bg-[#0055d5] text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-[#0044aa] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View All Open Roles
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-[#0055d5] to-[#0044aa] py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to join our team?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              Create your free account now to see your matching jobs and take the first step in your pCloud journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="bg-[#E6FF00] text-[#05183f] px-10 h-[48px] rounded-full text-base font-semibold hover:bg-white transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Register
              </motion.button>
              <motion.button
                className="bg-transparent border-2 border-white text-white px-10 h-[48px] rounded-full text-base font-semibold hover:bg-white hover:text-[#0055d5] transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}