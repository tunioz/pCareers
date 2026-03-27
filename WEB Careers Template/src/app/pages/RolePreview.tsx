import { Briefcase, Target, Users, GraduationCap, CheckCircle, Gift, Share2, Bookmark, Phone, FileText, Code, Layers, Heart, Award, Clock, Zap, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react'; 
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export default function RolePreview() {
  const processRef = useRef(null);
  const isProcessInView = useInView(processRef, { once: true, margin: '-100px' });
  
  const valuesRef = useRef(null);
  const isValuesInView = useInView(valuesRef, { once: true, margin: '-100px' });

  const pcloudBarRef = useRef(null);
  const isPCloudBarInView = useInView(pcloudBarRef, { once: true, margin: '-100px' });

  const talentCommunityRef = useRef(null);
  const isTalentCommunityInView = useInView(talentCommunityRef, { once: true, margin: '-100px' });

  // Form state for Talent Community section
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cv, setCv] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setName('');
      setEmail('');
      setCv(null);
      setSubmitted(false);
    }, 3000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCv(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setCv(null);
  };

  const stages = [
    {
      number: '01',
      icon: Phone,
      title: 'Screening',
      duration: '15 minutes',
      description: 'Initial intro call to discuss your background, assess role fit, and answer your questions about pCloud.',
      focus: 'Background review, motivation, and initial alignment',
      timeline: 'Response within 3 business days',
    },
    {
      number: '02',
      icon: FileText,
      title: 'Phone Interview',
      duration: '30 minutes',
      description: 'Deeper conversation about your experience, role expectations, and how your skills align with our needs.',
      focus: 'Role fit, technical background, and career goals',
      timeline: 'Response within 5 business days',
    },
    {
      number: '03',
      icon: Code,
      title: 'Technical / Case Study',
      duration: '60 minutes',
      description: 'Hands-on assessment to evaluate your technical skills or domain expertise through real-world scenarios.',
      focus: 'Problem-solving, technical depth, and approach to challenges',
      timeline: 'Response within 5 business days',
    },
    {
      number: '04',
      icon: Layers,
      title: 'System Design / Creative',
      duration: '60 minutes',
      description: 'Advanced technical or creative discussion to understand your architectural thinking and design approach.',
      focus: 'High-level design, scalability, and creative problem-solving',
      timeline: 'Response within 7 business days',
    },
    {
      number: '05',
      icon: Heart,
      title: 'Culture Fit',
      duration: '60 minutes',
      description: 'Team meeting to assess values alignment, working style, and how you collaborate with others.',
      focus: 'Values, collaboration, and team dynamics',
      timeline: 'Response within 5 business days',
    },
    {
      number: '06',
      icon: Award,
      title: 'Final Review',
      duration: 'Internal process',
      description: 'Leadership evaluates all interview feedback to make the final hiring decision and prepare offer.',
      focus: 'Holistic assessment and offer preparation',
      timeline: 'Decision within 3-5 business days',
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16 lg:pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#17bed0]/5 via-white to-[#17bed0]/5 py-12 lg:py-16">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl lg:text-6xl mb-6 text-[#05183f]">Senior Backend Engineer</h1>
              
              {/* Meta Pills Row */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  'Engineering',
                  'pCloud Drive',
                  'Full-time',
                  'Senior',
                  'Sofia / Remote',
                  'Posted 2 days ago'
                ].map((pill, index) => (
                  <motion.span
                    key={pill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="px-4 py-2 bg-white border border-[#17bed0]/20 rounded-full text-sm text-[#05183f]"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>

              {/* Buttons Row */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#17bed0] text-white px-8 h-[56px] rounded-full hover:bg-[#0c8a9d] transition-colors"
                >
                  Apply Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-[#17bed0] text-[#17bed0] px-8 h-[56px] rounded-full hover:bg-[#17bed0]/5 transition-colors flex items-center gap-2"
                >
                  <Share2 size={20} />
                  Share
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="border-2 border-[#17bed0] text-[#17bed0] px-8 h-[56px] rounded-full hover:bg-[#17bed0]/5 transition-colors flex items-center gap-2"
                >
                  <Bookmark size={20} />
                  Save
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Two-Column Layout */}
        <section className="py-16 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className="grid lg:grid-cols-[1fr_350px] gap-12">
              {/* LEFT COLUMN */}
              <div className="space-y-12">
                {/* A. About the Role */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#17bed0]/10 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="text-[#17bed0]" size={24} />
                    </div>
                    <h2 className="text-3xl text-[#05183f]">About the Role</h2>
                  </div>
                  <p className="text-lg text-[#4b5563] leading-relaxed ml-16">
                    You'll build and evolve the core storage infrastructure that 24 million people depend on every day. From optimizing file synchronization across distributed systems to designing the APIs that power our desktop, mobile, and web clients — your code will directly impact how people store, share, and protect their most important files.
                  </p>
                </motion.div>

                {/* B. The Challenges */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#ff6b5f]/10 flex items-center justify-center flex-shrink-0">
                      <Target className="text-[#ff6b5f]" size={24} />
                    </div>
                    <h2 className="text-3xl text-[#05183f]">The Challenges</h2>
                  </div>
                  <ul className="ml-16 space-y-3">
                    {[
                      'Optimize file sync for 250TB+ daily traffic across 195+ countries',
                      'Design distributed caching reducing P99 latency by 40%',
                      'Build next-gen chunked upload for 50GB files with 99.92% reliability',
                      'Implement real-time collaboration with conflict resolution',
                      'Migrate to event-driven architecture without downtime'
                    ].map((challenge, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="text-lg text-[#4b5563] flex items-start gap-3"
                      >
                        <span className="text-[#ff6b5f] flex-shrink-0">•</span>
                        {challenge}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* C. Your Team */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0">
                      <Users className="text-[#8b5cf6]" size={24} />
                    </div>
                    <h2 className="text-3xl text-[#05183f]">Your Team</h2>
                  </div>
                  <div className="ml-16 bg-white border border-[#e9ecef] rounded-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Team Photo */}
                      <div className="min-h-[300px] bg-gradient-to-br from-[#17bed0]/20 to-[#8b5cf6]/20">
                        <img
                          src="https://images.unsplash.com/photo-1764690690771-b4522d66b433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGVuZ2luZWVyaW5nJTIwdGVhbSUyMG1eXRpbmclMjBvZmZpY2V8ZW58MXx8fHwxNzczOTI5MzQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                          alt="Backend Engineering Team"
                          className="w-full h-full object-cover min-h-[300px]"
                        />
                      </div>
                      {/* Team Info */}
                      <div className="p-8 flex flex-col justify-center">
                        <p className="text-sm text-[#17bed0] mb-2">Backend Engineering · 18 engineers</p>
                        <p className="text-xl mb-4 text-[#05183f]">Led by Alex Petrov, VP Engineering</p>
                        <blockquote className="text-[#4b5563] italic mb-6 border-l-4 border-[#17bed0] pl-4">
                          "We don't just write code — we build the infrastructure that people trust with their memories, their work, their lives."
                        </blockquote>
                        <div className="flex flex-wrap gap-2">
                          {['Go', 'PostgreSQL', 'Redis', 'gRPC', 'Kafka', 'Docker', 'Kubernetes'].map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-[#f8f9fa] text-[#05183f] text-sm font-mono rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* D. What You'll Learn */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#E6FF00]/20 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="text-[#05183f]" size={24} />
                    </div>
                    <h2 className="text-3xl text-[#05183f]">What You'll Learn</h2>
                  </div>
                  <div className="ml-16 bg-white border-l-4 border-[#17bed0] p-6 rounded-r-2xl shadow-sm">
                    <p className="text-lg text-[#4b5563] leading-relaxed">
                      You'll gain deep expertise in distributed systems at a scale few companies in Europe can offer. Work with cutting-edge infrastructure that powers millions of users, learn from industry experts, and contribute to projects that shape the future of cloud storage.
                    </p>
                  </div>
                </motion.div>

                {/* E. What We're Looking For */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#10b981]/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-[#10b981]" size={24} />
                    </div>
                    <h2 className="text-3xl text-[#05183f]">What We're Looking For</h2>
                  </div>
                  <div className="ml-16 space-y-6">
                    {/* Required */}
                    <ul className="space-y-3">
                      {[
                        '5+ years building production systems in Go, Rust, or Java',
                        'Strong expertise in distributed systems, databases, and scalability',
                        'Experience designing APIs, async messaging (Kafka, RabbitMQ), containerization',
                        'Proactive, collaborative mindset — thrives in cross-functional teams',
                        'Passion for maintainable, well-tested code and mentoring junior engineers'
                      ].map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="text-lg text-[#4b5563] flex items-start gap-3"
                        >
                          <span className="text-[#10b981] flex-shrink-0 text-xl">✓</span>
                          {item}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Nice to Have */}
                    <div>
                      <h3 className="text-xl mb-3 text-[#05183f]">Nice to Have</h3>
                      <ul className="space-y-3">
                        {[
                          'Cloud infrastructure experience (AWS, GCP) and storage systems',
                          'Open-source contributions or published technical content'
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="text-lg text-[#4b5563] flex items-start gap-3"
                          >
                            <span className="text-[#17bed0] flex-shrink-0 text-xl">+</span>
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* F. What We Offer */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#ff6b5f]/10 flex items-center justify-center flex-shrink-0">
                      <Gift className="text-[#ff6b5f]" size={24} />
                    </div>
                    <h2 className="text-3xl text-[#05183f]">What We Offer</h2>
                  </div>
                  <div className="ml-16 space-y-6">
                    <p className="text-lg text-[#4b5563]">
                      Competitive compensation in the top 25th percentile for Sofia tech market, plus comprehensive benefits:
                    </p>
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        {
                          title: 'Remote Flexibility',
                          description: 'Work from Sofia office or any location with flexible arrangements'
                        },
                        {
                          title: 'Health & Wellness',
                          description: 'Comprehensive medical coverage and mental wellness programs'
                        },
                        {
                          title: 'Learning Budget',
                          description: '€3,000 annual budget for courses, conferences, and development'
                        },
                        {
                          title: 'Stock Options',
                          description: 'Participate in pCloud\'s success with competitive equity'
                        },
                        {
                          title: 'Team & Culture',
                          description: 'Collaborative environment with quarterly team retreats'
                        },
                        {
                          title: 'PTO & Sabbatical',
                          description: '25 days PTO + sabbatical options after 5 years'
                        }
                      ].map((benefit, index) => (
                        <motion.div
                          key={benefit.title}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white border border-[#e9ecef] rounded-xl p-6 hover:border-[#17bed0] hover:shadow-lg transition-all"
                        >
                          <h3 className="text-lg mb-2 text-[#05183f]">{benefit.title}</h3>
                          <p className="text-[#4b5563]">{benefit.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* G. Working Process Highlights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#8b5cf6]/10 flex items-center justify-center flex-shrink-0">
                      <Zap className="text-[#8b5cf6]" size={24} />
                    </div>
                    <h2 className="text-3xl text-[#05183f]">Working Process Highlights</h2>
                  </div>
                  <div className="ml-16 space-y-4">
                    <p className="text-lg text-[#4b5563] mb-6">
                      We follow modern development practices that empower engineers to do their best work:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        {
                          label: 'Sprint Cycle',
                          detail: '2-week sprints with clear goals and ownership'
                        },
                        {
                          label: 'Code Review',
                          detail: 'Thorough peer reviews with constructive feedback'
                        },
                        {
                          label: 'Daily Standups',
                          detail: '15-minute sync-ups, async-friendly for remote team'
                        },
                        {
                          label: 'Tech Debt Time',
                          detail: '20% of sprint capacity for refactoring and improvements'
                        },
                        {
                          label: 'Documentation',
                          detail: 'Strong documentation culture using Notion and Confluence'
                        },
                        {
                          label: 'Testing Standards',
                          detail: 'Automated tests required, 85%+ coverage for critical paths'
                        }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-r from-[#8b5cf6]/5 to-transparent border-l-4 border-[#8b5cf6] p-4 rounded-r-lg"
                        >
                          <h4 className="font-semibold text-[#05183f] mb-1">{item.label}</h4>
                          <p className="text-[#4b5563] text-sm">{item.detail}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* RIGHT COLUMN - Sidebar */}
              <div className="lg:sticky lg:top-[120px] self-start space-y-6">
                {/* Card 1: Ready to Apply */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="backdrop-blur-[6px] bg-[rgba(5,24,63,0.95)] rounded-xl p-6 shadow-sm relative border border-white/10"
                >
                  <h3 className="text-xl font-semibold mb-4 text-[#E6FF00]">Ready to Apply?</h3>
                  <p className="text-sm text-white/80 mb-6 leading-relaxed">
                    Join our team and help build infrastructure that 24M+ users depend on.
                  </p>
                  <div className="space-y-3">
                    <button className="w-full bg-[#E6FF00] text-[#05183f] h-[48px] rounded-full hover:bg-[#d4ed00] transition-colors font-semibold text-sm">
                      Apply Now
                    </button>
                    <button className="w-full text-[#E6FF00] hover:text-[#d4ed00] h-[48px] transition-colors text-sm border border-[#E6FF00] rounded-full hover:border-[#d4ed00]">
                      Share This Role
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section ref={processRef} className="py-20 bg-[#05183f]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our 6-Stage Process</h2>
              <p className="text-lg text-white/80 max-w-3xl mx-auto">
                We believe in evaluating candidates fairly across multiple dimensions. Each stage builds on the previous one, giving both us and you a chance to assess fit.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.number}
                  className="bg-white/5 backdrop-blur-sm rounded-3xl p-6 border border-white/10"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isProcessInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                >
                  {/* Stage Number */}
                  <div className="text-6xl font-bold text-white/10 mb-4">{stage.number}</div>
                  
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-[#E6FF00] flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <stage.icon className="text-[#05183f]" size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white">{stage.title}</h3>
                  </div>

                  {/* Duration */}
                  <div className="flex items-center gap-2 mb-3 text-[#E6FF00] text-sm font-medium">
                    <Clock size={14} />
                    {stage.duration}
                  </div>

                  {/* Description */}
                  <p className="text-white/70 text-sm mb-4 leading-relaxed">{stage.description}</p>

                  {/* Focus */}
                  <div className="mb-3">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Focus:</span>
                    <p className="text-white/80 text-sm mt-1">{stage.focus}</p>
                  </div>

                  {/* Timeline */}
                  <div className="pt-3 border-t border-white/10">
                    <span className="text-white/50 text-xs uppercase tracking-wide">Timeline:</span>
                    <p className="text-[#E6FF00] text-sm mt-1 font-medium">{stage.timeline}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Overall Timeline */}
            <motion.div
              className="bg-[#0055d5] rounded-3xl p-8 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isProcessInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-white mb-4">Overall Timeline</h3>
              <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                <div>
                  <div className="text-4xl font-bold text-[#E6FF00] mb-2">2–4 weeks</div>
                  <p className="text-white/80">From application to offer decision</p>
                </div>
                <div className="hidden md:block w-px h-16 bg-white/20" />
                <div>
                  <div className="text-2xl font-bold text-white mb-2">✓ Feedback Provided</div>
                  <p className="text-white/80">At each stage to all candidates</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section ref={valuesRef} className="py-20 bg-white">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            {/* Header */}
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a] mb-4">
                What We Value in Candidates
              </h2>
            </motion.div>

            {/* Horizontal Carousel */}
            <div className="overflow-x-auto scrollbar-hide -mx-6 px-6 lg:-mx-12 lg:px-12">
              <div className="flex gap-6 min-w-max pb-4">
                {[
                  {
                    title: 'Problem-Solving Ability',
                    description: 'We seek candidates who can identify complex challenges, break them down systematically, and develop innovative solutions that create real impact.',
                    image: 'https://images.unsplash.com/photo-1759643808386-66f61b88e29d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ibGVtJTIwc29sdmluZyUyMHN0cmF0ZWd5JTIwcHV6emxlfGVufDF8fHx8MTc3MzgzODc5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  },
                  {
                    title: 'Communication & Collaboration',
                    description: 'Clear communication and effective teamwork are essential. We value those who can articulate ideas, listen actively, and work seamlessly with diverse teams.',
                    image: 'https://images.unsplash.com/photo-1758873269276-9518d0cb4a0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGNvbW11bmljYXRpb24lMjBtZWV0aW5nfGVufDF8fHx8MTc3MzgzODc5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  },
                  {
                    title: 'Growth Mindset',
                    description: 'We look for continuous learners who embrace challenges, adapt quickly to new technologies, and constantly seek to improve their skills and knowledge.',
                    image: 'https://images.unsplash.com/photo-1746021375246-7dc8ab0583f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm93dGglMjBtaW5kc2V0JTIwbGVhcm5pbmclMjBib29rc3xlbnwxfHx8fDE3NzM4Mzg3OTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  },
                  {
                    title: 'Attention to Detail',
                    description: 'Precision and thoroughness matter. We value candidates who take pride in their work, ensuring quality and excellence in every deliverable.',
                    image: 'https://images.unsplash.com/photo-1673141531727-e4a7c642f3b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRlbnRpb24lMjBkZXRhaWwlMjBwcmVjaXNpb24lMjBxdWFsaXR5fGVufDF8fHx8MTc3MzgzODc5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  },
                  {
                    title: 'Passion for Quality',
                    description: 'A commitment to excellence drives everything we do. We seek those who are dedicated to shipping high-quality work that users love and trust.',
                    image: 'https://images.unsplash.com/photo-1761178334145-76c3d8ac30dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleGNlbGxlbmNlJTIwcXVhbGl0eSUyMGF3YXJkJTIwYWNoaWV2ZW1lbnR8ZW58MXx8fHwxNzczODM4Nzk3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="bg-[#e5e7eb] w-[320px] h-[380px] rounded-3xl overflow-hidden p-8 flex flex-col justify-end relative flex-shrink-0"
                    initial={{ opacity: 0, x: -30 }}
                    animate={isValuesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                  >
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <ImageWithFallback
                        src={value.image}
                        alt={value.title}
                        className="absolute h-full left-[-75%] max-w-none top-0 w-[250%] object-cover"
                      />
                    </div>
                    <div className="absolute bg-gradient-to-b from-[24%] from-[rgba(0,38,77,0)] inset-0 opacity-60 to-[#00264d]" />
                    <div className="relative z-10 pb-2">
                      <h3 className="text-2xl font-bold text-white leading-tight mb-3">{value.title}</h3>
                      <p className="text-white/90 text-sm leading-relaxed">{value.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <motion.div
              className="flex justify-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={isValuesInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[0, 1, 2, 3, 4].map((index) => (
                <button
                  key={index}
                  className="w-2.5 h-2.5 rounded-full bg-[#d1d5db] hover:bg-[#0055d5] transition-colors"
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* PCloud Bar Section */}
        <section ref={pcloudBarRef} className="py-20 bg-[#f4f4f4]">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isPCloudBarInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-[#3a3a3a] mb-4">The pCloud Bar</h2>
              <p className="text-lg text-[#4b5563] max-w-3xl mx-auto">
                Standards we evaluate against, not a checklist. We're looking for top 1% talent, but we value diverse backgrounds and experiences.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Technical Excellence',
                  description: 'Deep expertise in your domain, proven track record of solving complex technical challenges, and continuous learning.',
                },
                {
                  title: 'Product Thinking',
                  description: 'Understanding user needs, thinking holistically about features, and balancing technical decisions with business impact.',
                },
                {
                  title: 'Ownership & Initiative',
                  description: 'Taking responsibility for outcomes, driving projects forward independently, and going beyond assigned tasks.',
                },
                {
                  title: 'Communication Clarity',
                  description: 'Articulating complex ideas simply, writing clearly, and communicating effectively across technical and non-technical audiences.',
                },
                {
                  title: 'Collaborative Impact',
                  description: 'Elevating team performance, sharing knowledge generously, and creating positive working relationships.',
                },
                {
                  title: 'Values Alignment',
                  description: 'Commitment to privacy, security, quality, and user trust — the core principles that define pCloud.',
                },
              ].map((criterion, index) => (
                <motion.div
                  key={criterion.title}
                  className="bg-white rounded-3xl p-6 border border-gray-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={isPCloudBarInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0, 85, 213, 0.1)' }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <CheckCircle className="text-[#0055d5]" size={24} />
                    </motion.div>
                    <div>
                      <h3 className="text-lg font-bold text-[#3a3a3a] mb-2">{criterion.title}</h3>
                      <p className="text-[#4b5563] leading-relaxed">{criterion.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Talent Community Section */}
        <section ref={talentCommunityRef} className="py-20 bg-[#0055d5] relative overflow-hidden">
          {/* Background Pattern */}
          <motion.div
            className="absolute inset-0 opacity-10"
            initial={{ opacity: 0 }}
            animate={isTalentCommunityInView ? { opacity: 0.1 } : {}}
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
              animate={isTalentCommunityInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">Ready to build something that <span className="text-[#E6FF00]">matters</span>?</h2>
            </motion.div>

            {!submitted ? (
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-4"
                initial={{ opacity: 0, y: 30 }}
                animate={isTalentCommunityInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                  <motion.div
                    className="flex-1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTalentCommunityInView ? { opacity: 1, x: 0 } : {}}
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
                    animate={isTalentCommunityInView ? { opacity: 1, x: 0 } : {}}
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
                    animate={isTalentCommunityInView ? { opacity: 1, x: 0 } : {}}
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
                    animate={isTalentCommunityInView ? { opacity: 1, y: 0 } : {}}
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
                  animate={isTalentCommunityInView ? { opacity: 1 } : {}}
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
      </main>
      <Footer />
    </div>
  );
}