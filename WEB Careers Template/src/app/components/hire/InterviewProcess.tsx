import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Phone, FileText, Code, Layers, Heart, Award, Clock } from 'lucide-react';

export function InterviewProcess() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
    <section ref={ref} className="py-20 bg-[#05183f]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
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
              animate={isInView ? { opacity: 1, y: 0 } : {}}
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
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
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
  );
}
