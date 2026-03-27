import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Clock, User, ChevronDown, Mail, Briefcase, MapPin, Linkedin, Twitter } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Category = 'All' | 'Infrastructure' | 'Security' | 'Performance' | 'Mobile' | 'Product Eng' | 'Culture';

interface BlogArticle {
  id: number;
  title: string;
  category: Category;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export default function Blog() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, margin: '-100px' });
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [visibleArticles, setVisibleArticles] = useState(6);
  const [activeSlide, setActiveSlide] = useState(0);

  const categories: Category[] = ['All', 'Infrastructure', 'Security', 'Performance', 'Mobile', 'Product Eng', 'Culture'];

  const articles: BlogArticle[] = [
    {
      id: 1,
      title: "How We Scaled to 500 Petabytes: The Architecture Behind pCloud's Storage Layer",
      category: 'Infrastructure',
      excerpt: 'Building a cloud storage platform that handles 500 petabytes requires careful architectural decisions. In this deep dive, we explore how we designed our distributed storage system to handle millions of users while maintaining 99.99% uptime. Learn about our custom storage nodes, replication strategies, and how we balance cost with performance.',
      author: 'Stefan Ivanov',
      date: 'March 15, 2026',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczODIwNjM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 2,
      title: 'Migration to gRPC: Modernizing Our Backend Communication',
      category: 'Infrastructure',
      excerpt: 'Transitioning from REST to gRPC across 200+ microservices presented unique challenges. This article covers our phased migration strategy, the tooling we built, performance improvements we achieved, and lessons learned about backwards compatibility in distributed systems.',
      author: 'Maria Dimitrova',
      date: 'March 10, 2026',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1683669446069-ab17a5453296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzgyMjU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 3,
      title: 'Distributed Caching Strategies for 99.9% Uptime',
      category: 'Infrastructure',
      excerpt: 'Caching is critical for performance at scale, but it comes with complexity. We share our approach to distributed caching using Redis Cluster, cache invalidation patterns, monitoring strategies, and how we ensure cache consistency across multiple data centers.',
      author: 'Georgi Petrov',
      date: 'March 5, 2026',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1649451844931-57e22fc82de3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhYmFzZSUyMG9wdGltaXphdGlvbiUyMGNvZGV8ZW58MXx8fHwxNzczODIyNTg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 4,
      title: 'Zero-Knowledge Encryption: Why pCloud Chose This Standard',
      category: 'Security',
      excerpt: 'Privacy is at the core of everything we do. This article explains what zero-knowledge encryption means, why it matters for user privacy, the technical challenges of implementing it at scale, and how we balance security with usability in our products.',
      author: 'Elena Todorova',
      date: 'February 28, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwbmV0d29yayUyMHByb3RlY3Rpb258ZW58MXx8fHwxNzczNzE4NDg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 5,
      title: 'Designing for Trust: UX Patterns in Privacy-First Applications',
      category: 'Security',
      excerpt: 'Building trust through design requires transparency and clarity. We explore how we communicate complex security concepts to users, design patterns that reinforce privacy, and usability testing results that shaped our security-focused interfaces.',
      author: 'Nikola Georgiev',
      date: 'February 22, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1597781914467-a5b93258e748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmNyeXB0aW9uJTIwc2VjdXJpdHklMjBsb2NrfGVufDF8fHx8MTc3MzgyMjU4OHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 6,
      title: 'Optimizing File Sync: Reducing P99 Latency by 40%',
      category: 'Performance',
      excerpt: 'File synchronization is the heart of our product. Learn how we analyzed performance bottlenecks, optimized our sync algorithm, reduced network overhead, and achieved significant latency improvements that directly impact user experience.',
      author: 'Ivan Stoyanov',
      date: 'February 18, 2026',
      readTime: '11 min read',
      image: 'https://images.unsplash.com/photo-1758577675588-c5bbbbbf8e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmb3JtYW5jZSUyMG9wdGltaXphdGlvbiUyMHNwZWVkfGVufDF8fHx8MTc3MzgyMjU4Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 7,
      title: 'Database Query Optimization at Scale',
      category: 'Performance',
      excerpt: 'As our database grew to billions of rows, query performance became critical. This post covers our journey optimizing PostgreSQL queries, index strategies, query planning, connection pooling, and how we monitor database health in production.',
      author: 'Dimitar Angelov',
      date: 'February 12, 2026',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1649698145660-d30f91023b52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0d2FyZSUyMGRldmVsb3BtZW50JTIwbGFwdG9wfGVufDF8fHx8MTc3Mzc0ODA3NHww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 8,
      title: 'Building pCloud Pass: From Concept to Launch',
      category: 'Product Eng',
      excerpt: 'Launching a new password manager requires careful planning and execution. We share our product development process, from initial research and competitive analysis to design iterations, beta testing, and the technical challenges of building a secure password vault.',
      author: 'Kristina Mihaylova',
      date: 'February 8, 2026',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1769152683420-f4eff91cb30b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwZGVzaWduJTIwZW5naW5lZXJpbmd8ZW58MXx8fHwxNzczODIyNTg3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 9,
      title: 'Feature Rollouts: A/B Testing in a Privacy-First World',
      category: 'Product Eng',
      excerpt: 'A/B testing is essential for product development, but how do you do it while respecting user privacy? We explain our privacy-preserving analytics approach, feature flag infrastructure, statistical methods, and how we make data-driven decisions without compromising user trust.',
      author: 'Aleksandar Nikolov',
      date: 'January 30, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMGlubm92YXRpb258ZW58MXx8fHwxNzczNzk2OTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 10,
      title: 'Rebuilding iOS App in SwiftUI: Lessons Learned',
      category: 'Mobile',
      excerpt: 'We rewrote our iOS app from UIKit to SwiftUI to take advantage of modern Apple frameworks. This article covers our migration strategy, architectural decisions, challenges with backwards compatibility, performance improvements, and what we would do differently.',
      author: 'Petya Georgieva',
      date: 'January 25, 2026',
      readTime: '10 min read',
      image: 'https://images.unsplash.com/photo-1730818028738-21c19c7103fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwaG9uZSUyMGFwcCUyMHNjcmVlbnxlbnwxfHx8fDE3NzM3ODkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 11,
      title: 'Cross-Platform State Management: React Native at pCloud',
      category: 'Mobile',
      excerpt: 'Managing state across iOS and Android while sharing business logic is complex. We discuss our approach to cross-platform development with React Native, state management patterns, native module integration, and how we maintain code quality across platforms.',
      author: 'Todor Kirilov',
      date: 'January 18, 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1757165792338-b4e8a88ae1c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzczNzg4MDMxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: 12,
      title: 'How We Run Hackathons: Building a Culture of Innovation',
      category: 'Culture',
      excerpt: 'Quarterly hackathons are central to our innovation culture. Learn how we organize company-wide innovation events, support teams in exploring new ideas, judge projects, and how several hackathon projects have evolved into production features used by millions.',
      author: 'Simeon Vasilev',
      date: 'January 10, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1638029202288-451a89e0d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2RpbmclMjBldmVudHxlbnwxfHx8fDE3NzM4MjI1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
  ];

  const featuredArticle = articles[0];

  const filteredArticles = activeCategory === 'All' 
    ? articles.slice(1) 
    : articles.filter(article => article.category === activeCategory);

  const displayedArticles = filteredArticles.slice(0, visibleArticles);
  const hasMore = visibleArticles < filteredArticles.length;

  const handleLoadMore = () => {
    setVisibleArticles(prev => prev + 6);
  };

  const jobs = [
    {
      id: 1,
      title: 'Senior Backend Engineer',
      department: 'Engineering',
      product: 'Platform/Core',
      description: 'Build scalable microservices powering millions of users',
    },
    {
      id: 2,
      title: 'Security Engineer',
      department: 'Security',
      product: 'Security',
      description: 'Protect user data with cutting-edge security practices',
    },
    {
      id: 3,
      title: 'Site Reliability Engineer (SRE)',
      department: 'Infrastructure',
      product: 'Platform/Core',
      description: 'Ensure 99.99% uptime for our global infrastructure',
    },
  ];

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
    if (carouselRef.current) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft = index * slideWidth;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-b from-[#0055d5] to-[#0044aa] pt-32 pb-24 rounded-br-[150px]"
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Under the hood
            </h1>
            <p className="text-xl lg:text-2xl text-white/90">
              Engineering insights from the pCloud team
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="bg-white py-20 -mt-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.h2
            className="text-sm tracking-[2.5px] uppercase font-semibold text-[#9ca3af] mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Featured
          </motion.h2>

          <Link to={`/blog/${featuredArticle.id}`}>
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              whileHover={{ y: -5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-[300px] lg:h-auto">
                  <ImageWithFallback
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6">
                    <span className="bg-[#0055d5] text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {featuredArticle.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl lg:text-4xl font-bold text-[#3a3a3a] mb-6">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-lg text-[#4b5563] leading-relaxed mb-8">
                    {featuredArticle.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 mb-8 text-[#6b7280]">
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <span className="text-sm">{featuredArticle.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span className="text-sm">{featuredArticle.readTime}</span>
                    </div>
                  </div>

                  <motion.span
                    className="text-[#0055d5] font-semibold text-lg hover:underline self-start"
                    whileHover={{ x: 5 }}
                  >
                    Read article →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Category Filters */}
      <section className="bg-[#f9fafb] py-12">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setVisibleArticles(6);
                }}
                className={`filter-pill px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === category
                    ? 'bg-[#0055d5] text-white'
                    : 'bg-white text-[#4b5563] hover:bg-[#e5e5e5]'
                }`}
                data-filter={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.h2
            className="text-4xl font-bold text-[#3a3a3a] mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Latest Articles
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedArticles.map((article, index) => (
              <Link key={article.id} to={`/blog/${article.id}`}>
                <motion.div
                  className="blog-card bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                  data-category={article.category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="filter-pill bg-[#0055d5] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="blog-card-title text-xl font-bold text-[#3a3a3a] mb-3 line-clamp-2">
                      {article.title}
                    </h3>

                    <div className="flex flex-col gap-2 mb-4 text-[#6b7280] text-sm">
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span>{article.date}</span>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>

                    <motion.span
                      className="text-[#0055d5] font-semibold text-sm hover:underline"
                      whileHover={{ x: 5 }}
                    >
                      Read article →
                    </motion.span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                id="loadMoreBtn"
                onClick={handleLoadMore}
                className="bg-[#0055d5] text-white px-8 h-[48px] rounded-full text-base font-semibold hover:bg-[#0044aa] transition-colors inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Articles
                <ChevronDown size={20} />
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Related Jobs */}
      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-20">
          <motion.div
            className="flex flex-col lg:flex-row gap-16 items-start"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Left Content */}
            <div className="flex flex-col items-start justify-center flex-1 max-w-[486px]">
              {/* Heading */}
              <div className="mb-6">
                <h2 className="text-5xl lg:text-[72px] font-bold text-[#3a3a3a] leading-[1]">
                  These problems excite you?
                </h2>
              </div>

              {/* Divider Line */}
              <div className="mb-9">
                <div className="bg-black h-[4px] w-24" />
              </div>

              {/* Description */}
              <div className="mb-10">
                <p className="text-xl text-[#4b5563] leading-[28px]">
                  We're looking for talented engineers to solve them
                </p>
              </div>

              {/* CTA Button */}
              <Link to="/jobs">
                <motion.button
                  className="bg-[#0055d5] text-white px-8 py-3 rounded-full text-base font-medium hover:bg-[#0044aa] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Open Roles
                </motion.button>
              </Link>
            </div>

            {/* Right Grid - Job Cards */}
            <div className="flex-1 w-full max-w-[730px]">
              <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" ref={carouselRef}
                onScroll={(e) => {
                  const container = e.currentTarget;
                  const scrollLeft = container.scrollLeft;
                  const itemWidth = container.offsetWidth;
                  const newIndex = Math.round(scrollLeft / itemWidth);
                  setActiveSlide(newIndex);
                }}
              >
                {jobs.map((job, index) => (
                  <Link key={job.id} to={`/jobs/${job.id}`} className="flex-shrink-0 w-full md:w-[355px] snap-center">
                    <motion.div
                      className="relative h-[357px] rounded-2xl overflow-hidden cursor-pointer group"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -5 }}
                    >
                      {/* Background Image */}
                      <div className="absolute inset-0">
                        <ImageWithFallback
                          src={
                            index === 0
                              ? 'https://images.unsplash.com/photo-1630091790659-85ec55570e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrZW5kJTIwZW5naW5lZXIlMjBjb2Rpbmd8ZW58MXx8fHwxNzczODI0ODk3fDA&ixlib=rb-4.1.0&q=80&w=1080'
                              : index === 1
                              ? 'https://images.unsplash.com/photo-1660644807804-ffacfd7a4137?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnNlY3VyaXR5JTIwcHJvZmVzc2lvbmFsJTIwd29ya2luZ3xlbnwxfHx8fDE3NzM3NjQ3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080'
                              : 'https://images.unsplash.com/photo-1638791859274-ff535025f92e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmZyYXN0cnVjdHVyZSUyMGVuZ2luZWVyJTIwZGF0YWNlbnRlcnxlbnwxfHx8fDE3NzM4MjQ4OTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
                          }
                          alt={job.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(30,58,138,0.8)] to-transparent flex flex-col justify-end p-6 group-hover:from-[rgba(30,58,138,0.9)] transition-colors">
                        <h3 className="text-xl font-bold text-white mb-2 leading-[28px]">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[#bfdbfe] text-sm leading-[20px]">
                            {job.department}
                          </span>
                          <span className="text-[#bfdbfe] text-sm leading-[20px]">
                            • {job.product}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              {/* Pagination Dots */}
              <div className="flex justify-center gap-2 mt-6">
                {jobs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleSlideChange(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeSlide === index
                        ? 'bg-[#0055d5] w-8'
                        : 'bg-[#d1d5db] hover:bg-[#9ca3af]'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="bg-[#f9fafb] py-16">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-[#3a3a3a] mb-6">
              Share our blog
            </h3>
            <div className="flex justify-center gap-4">
              <motion.button
                className="bg-[#0077b5] text-white p-4 rounded-full hover:bg-[#006399] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={24} />
              </motion.button>
              <motion.button
                className="bg-[#1da1f2] text-white p-4 rounded-full hover:bg-[#1a8cd8] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Share on Twitter"
              >
                <Twitter size={24} />
              </motion.button>
              <motion.button
                className="bg-[#4b5563] text-white p-4 rounded-full hover:bg-[#374151] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Share via Email"
              >
                <Mail size={24} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}