import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link } from 'react-router';

export function BlogTeaser() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const blogPosts = [
    {
      category: 'Infrastructure',
      title: "How We Scaled to 500 Petabytes: The Architecture Behind pCloud's Storage Layer",
      author: 'Alex Rivera',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1695668548342-c0c1ad479aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwaW5mcmFzdHJ1Y3R1cmUlMjBzZXJ2ZXIlMjByb29tfGVufDF8fHx8MTc3MzY1NTc3Mnww&ixlib=rb-4.1.0&q=80&w=1080',
      categoryColor: '#0055d5',
    },
    {
      category: 'Security',
      title: 'Zero-Knowledge Encryption: Why pCloud Chose This Standard',
      author: 'Dr. Maria Schmidt',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1768839721176-2fa91fdce725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwZW5jcnlwdGlvbiUyMGNvZGV8ZW58MXx8fHwxNzczNjU1NzcyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      categoryColor: '#E6FF00',
    },
    {
      category: 'Culture',
      title: 'How We Run Hackathons: Building a Culture of Innovation',
      author: 'James Park',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1515355252367-42ae86cb92f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzM2NTMwNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      categoryColor: '#0055d5',
    },
  ];

  return (
    <section ref={ref} id="blog" className="py-20 bg-[#f4f4f4]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a]">
            From the <span className="text-[#0055d5]">engineering blog</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.div
                  className="w-full h-full"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                {/* Category Pill */}
                <motion.div
                  className="absolute top-4 left-4 px-4 py-2 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: post.categoryColor,
                    color: post.categoryColor === '#E6FF00' ? '#05183f' : 'white',
                  }}
                  initial={{ scale: 0, x: -20 }}
                  animate={isInView ? { scale: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                >
                  {post.category}
                </motion.div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#3a3a3a] mb-4 line-clamp-2 group-hover:text-[#0055d5] transition-colors">
                  {post.title}
                </h3>
                <div className="flex items-center justify-between text-sm text-[#4b5563] mb-4">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <motion.div
                  className="flex items-center text-[#0055d5] font-semibold group-hover:gap-2 transition-all"
                  whileHover={{ x: 5 }}
                >
                  Read article
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link to="/blog">
            <motion.button
              className="px-8 h-[48px] bg-[#0055d5] text-white rounded-full font-semibold text-base hover:bg-[#0044aa] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              All blog posts
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}