import { motion } from 'motion/react';
import { useRef, useState } from 'react';
import { Link, useParams } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { Clock, User, ChevronRight, Linkedin, Twitter, Mail, Link2, Check } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

type Category = 'All' | 'Infrastructure' | 'Security' | 'Performance' | 'Mobile' | 'Product Eng' | 'Culture';

interface BlogArticle {
  id: number;
  title: string;
  category: Category;
  excerpt: string;
  author: string;
  authorTitle: string;
  authorBio: string;
  authorImage: string;
  date: string;
  readTime: string;
  image: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string[];
    }[];
    conclusion: string;
  };
  tableOfContents: string[];
}

export default function BlogPost() {
  const { id } = useParams();
  const [copiedLink, setCopiedLink] = useState(false);

  // All articles data
  const articles: BlogArticle[] = [
    {
      id: 1,
      title: "How We Scaled to 500 Petabytes: The Architecture Behind pCloud's Storage Layer",
      category: 'Infrastructure',
      excerpt: 'Building a cloud storage platform that handles 500 petabytes requires careful architectural decisions.',
      author: 'Stefan Ivanov',
      authorTitle: 'Principal Infrastructure Engineer',
      authorBio: 'Stefan leads the infrastructure team at pCloud, focusing on distributed systems and scalability. With over 12 years of experience in building large-scale storage systems, he has been instrumental in designing pCloud\'s storage architecture that now serves millions of users globally.',
      authorImage: 'https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBzb2Z0d2FyZSUyMGVuZ2luZWVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzczNzc5MzcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'March 15, 2026',
      readTime: '12 min read',
      image: 'https://images.unsplash.com/photo-1744868562210-fffb7fa882d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZXJ2ZXIlMjByb29tJTIwZGF0YSUyMGNlbnRlciUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzczODIwNjM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      tableOfContents: [
        'The Challenge of Petabyte-Scale Storage',
        'Distributed Storage Architecture',
        'Data Replication Strategy',
        'Performance Optimization',
        'Lessons Learned'
      ],
      content: {
        introduction: 'When we started pCloud in 2013, we never imagined we would one day be managing over 500 petabytes of user data. Reaching this milestone wasn\'t just about adding more hard drives—it required fundamental architectural decisions about how we store, replicate, and retrieve data at massive scale. In this article, I\'ll take you through the technical journey of building a storage system that serves millions of users while maintaining 99.99% uptime.',
        sections: [
          {
            title: 'The Challenge of Petabyte-Scale Storage',
            content: [
              'Building storage infrastructure at petabyte scale introduces challenges that don\'t exist at smaller scales. When you\'re dealing with millions of files across thousands of servers, even rare edge cases become frequent occurrences. Hardware failures, network partitions, and data consistency issues all become daily realities that your architecture must handle gracefully.',
              'One of our key realizations was that traditional approaches to storage don\'t scale linearly. As data volume grows, the complexity increases exponentially. We needed a system that could handle not just the storage capacity, but also the metadata management, indexing, and quick retrieval of billions of files across multiple data centers.',
              'The economics of storage at this scale also matter significantly. We had to balance the cost of storage hardware, network bandwidth, and data center operations while still providing fast, reliable access to user data. This led us to develop a tiered storage approach where frequently accessed data is kept on faster SSDs, while archival data moves to more cost-effective spinning disks.'
            ]
          },
          {
            title: 'Distributed Storage Architecture',
            content: [
              'At the heart of our infrastructure is a custom-built distributed storage system. We decided early on that off-the-shelf solutions wouldn\'t meet our specific needs for user file storage. Our architecture is based on storage nodes that form clusters, with each cluster capable of operating independently while still being part of the larger system.',
              'Each storage node runs our custom storage daemon that handles file operations, replication, and health monitoring. Files are split into chunks and distributed across multiple nodes using a consistent hashing algorithm. This approach allows us to add or remove storage capacity without massive data migrations, and it provides built-in redundancy.',
              'The metadata layer is separated from the data layer, using PostgreSQL clusters with streaming replication. This separation allows us to scale metadata operations independently from data operations. We use sharding based on user ID to distribute metadata load, with each shard capable of handling millions of users.',
              'One unique aspect of our architecture is how we handle user file hierarchies. Instead of storing files in traditional directory structures, we use a graph-based approach where each file and folder is a node with relationships. This makes operations like moving folders with thousands of files instant, as we only need to update relationship pointers rather than moving actual data.'
            ]
          },
          {
            title: 'Data Replication Strategy',
            content: [
              'Data durability is paramount in cloud storage. We use a multi-layered replication strategy to ensure that user data is never lost. Every file chunk is replicated to at least three different storage nodes, with each replica placed in a different failure domain (different rack, different data center zone, or different geographic location for premium accounts).',
              'Replication is handled asynchronously to maintain write performance. When a user uploads a file, we immediately write it to one primary node and return success to the client. Background processes then handle replicating the data to secondary nodes. We use vector clocks to track replication state and detect conflicts in the rare cases where they occur.',
              'For cross-datacenter replication, we use a hub-and-spoke model where each datacenter maintains a complete copy of data for users in that region, with periodic synchronization to other regions. This gives us geographic redundancy while minimizing cross-region bandwidth costs. In the event of a datacenter failure, we can redirect traffic to another region with minimal disruption.'
            ]
          },
          {
            title: 'Performance Optimization',
            content: [
              'Achieving low latency at petabyte scale requires obsessive attention to performance. We\'ve implemented multiple layers of caching, from in-memory caches for frequently accessed metadata to CDN integration for popular public files. Our monitoring shows that over 85% of read requests are served from cache, significantly reducing load on storage nodes.',
              'For file uploads, we use a technique called "chunked deduplication" where we split files into chunks and check if identical chunks already exist in the system. This not only saves storage space but also makes uploads nearly instant for files we\'ve seen before. Combined with client-side delta sync, we\'ve reduced sync times by 40% compared to our previous implementation.',
              'Network optimization is another crucial factor. We use protocol buffers for internal communication between services, reducing serialization overhead. For user-facing APIs, we employ HTTP/2 multiplexing to reduce connection overhead and implement smart retry logic with exponential backoff to handle transient failures gracefully.',
              'Database query optimization has been critical as our metadata stores have grown. We\'ve implemented aggressive indexing strategies, query caching, and read replicas to distribute query load. For complex operations like searching across millions of files, we use Elasticsearch clusters that are kept in sync with our primary database through change data capture streams.'
            ]
          },
          {
            title: 'Lessons Learned',
            content: [
              'Building and operating storage infrastructure at this scale has taught us many lessons. First, operational simplicity is worth more than clever optimizations. We\'ve refactored several "clever" systems that were difficult to debug and maintain in favor of simpler, more straightforward approaches.',
              'Second, monitoring and observability are not optional—they\'re essential. We instrument everything and use distributed tracing to track requests across our entire stack. When issues occur (and they will), having detailed telemetry makes the difference between a 5-minute incident and a 5-hour outage.',
              'Third, gradual rollouts and feature flags are crucial. Every significant change to our storage system goes through weeks of testing in production with small percentages of traffic before full rollout. We\'ve caught numerous issues this way that never appeared in our staging environments.',
              'Finally, the human element matters as much as the technical one. We\'ve invested heavily in documentation, runbooks, and training to ensure our team can operate these complex systems effectively. Our on-call rotation includes regular chaos engineering exercises where we intentionally break things to practice incident response.'
            ]
          }
        ],
        conclusion: 'Scaling to 500 petabytes has been a challenging but rewarding journey. While the technical challenges are significant, they\'re all solvable with the right architecture, careful planning, and a strong engineering team. As we continue to grow, we\'re already planning for the next milestone: 1 exabyte of storage. The principles we\'ve learned—simplicity, redundancy, monitoring, and gradual rollouts—will continue to guide us. If you\'re interested in working on infrastructure challenges at this scale, we\'re always looking for talented engineers to join our team.'
      }
    },
    {
      id: 2,
      title: 'Migration to gRPC: Modernizing Our Backend Communication',
      category: 'Infrastructure',
      excerpt: 'Transitioning from REST to gRPC across 200+ microservices presented unique challenges.',
      author: 'Maria Dimitrova',
      authorTitle: 'Staff Backend Engineer',
      authorBio: 'Maria is a backend engineering specialist with 10 years of experience building microservices architectures. She led the gRPC migration initiative at pCloud and has been instrumental in modernizing our backend infrastructure.',
      authorImage: 'https://images.unsplash.com/photo-1593636583886-0bf6a98a8a36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBlbmdpbmVlciUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MzgyNTM1Nnww&ixlib=rb-4.1.0&q=80&w=1080',
      date: 'March 10, 2026',
      readTime: '9 min read',
      image: 'https://images.unsplash.com/photo-1683669446069-ab17a5453296?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGluZnJhc3RydWN0dXJlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MzgyMjU4N3ww&ixlib=rb-4.1.0&q=80&w=1080',
      tableOfContents: [
        'Why We Chose gRPC',
        'Migration Strategy',
        'Performance Improvements',
        'Challenges and Solutions'
      ],
      content: {
        introduction: 'After years of using REST APIs for internal service communication, we made the decision to migrate to gRPC. This wasn\'t a decision we took lightly—with over 200 microservices in production, the migration required careful planning and execution. In this article, I\'ll share why we made this choice, how we approached the migration, and the results we achieved.',
        sections: [
          {
            title: 'Why We Chose gRPC',
            content: [
              'Our REST-based architecture served us well for years, but as our system grew, we started hitting limitations. JSON serialization overhead was adding measurable latency to service-to-service calls. With services calling each other thousands of times per second, even milliseconds of overhead per call adds up quickly.',
              'gRPC offered several advantages: binary serialization with Protocol Buffers is significantly faster than JSON, HTTP/2 multiplexing reduces connection overhead, and strongly typed service contracts caught integration issues at compile time rather than runtime. The built-in support for streaming was also attractive for several of our use cases.'
            ]
          },
          {
            title: 'Migration Strategy',
            content: [
              'We adopted a gradual migration approach. Our strategy was to support both REST and gRPC endpoints simultaneously, allowing services to migrate at their own pace. We built a proxy layer that could translate between REST and gRPC, ensuring that migrated services could still communicate with legacy services.',
              'Each service team was responsible for migrating their service, but we provided extensive tooling and libraries to make the process as smooth as possible. We created code generators that would scaffold gRPC services from existing REST API definitions, reducing the amount of manual work required.'
            ]
          },
          {
            title: 'Performance Improvements',
            content: [
              'The results exceeded our expectations. After migrating our most critical services, we measured a 35% reduction in average latency and a 50% reduction in CPU usage for serialization/deserialization. Network bandwidth usage decreased by about 30% due to more efficient binary encoding.',
              'The performance improvements weren\'t just technical wins—they translated directly to better user experience. Page load times decreased, and we were able to handle more requests with the same hardware, resulting in significant cost savings.'
            ]
          },
          {
            title: 'Challenges and Solutions',
            content: [
              'The migration wasn\'t without challenges. One major issue was debugging—binary protocols are harder to inspect than JSON. We solved this by building comprehensive logging and tracing into our gRPC infrastructure, and we created tools for converting protobuf messages to human-readable formats for debugging.',
              'Another challenge was handling backwards compatibility during the migration period. We had to carefully version our protobuf definitions and ensure that changes didn\'t break existing clients. This required discipline and thorough testing, but our investment in automated integration tests paid off.'
            ]
          }
        ],
        conclusion: 'Migrating to gRPC was one of the best technical decisions we\'ve made. The performance improvements have been substantial, and the type safety of Protocol Buffers has prevented countless bugs. While the migration required significant effort, the benefits continue to compound as we build new services on top of this solid foundation.'
      }
    }
  ];

  const article = articles.find(a => a.id === parseInt(id || '1')) || articles[0];

  // Get related articles (same category, different id)
  const relatedArticles = articles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

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
      title: 'Infrastructure Engineer',
      department: 'Infrastructure',
      product: 'Platform/Core',
      description: 'Design and maintain our distributed storage infrastructure',
    }
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const scrollToSection = (index: number) => {
    const element = document.getElementById(`section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <section className="bg-[#f9fafb] py-6 mt-20">
        <div className="max-w-[900px] mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-[#6b7280]">
            <Link to="/blog" className="hover:text-[#0055d5] transition-colors">
              Blog
            </Link>
            <ChevronRight size={16} />
            <Link to="/blog" className="hover:text-[#0055d5] transition-colors">
              {article.category}
            </Link>
            <ChevronRight size={16} />
            <span className="text-[#3a3a3a]">{article.title}</span>
          </div>
        </div>
      </section>

      {/* Article Header */}
      <section className="bg-white py-12">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-[#0055d5] text-white px-4 py-2 rounded-full text-sm font-semibold inline-block mb-6">
              {article.category}
            </span>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a] mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 text-[#6b7280] mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <ImageWithFallback
                    src={article.authorImage}
                    alt={article.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-[#3a3a3a] font-semibold">{article.author}</div>
                  <div className="text-sm">{article.authorTitle}</div>
                </div>
              </div>
              <div className="h-12 w-px bg-[#e5e7eb]" />
              <div className="flex items-center gap-4">
                <span>{article.date}</span>
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-white pb-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            className="rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ImageWithFallback
              src={article.image}
              alt={article.title}
              className="w-full h-[500px] object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-[#f9fafb] py-8">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-lg font-bold text-[#3a3a3a] mb-4">In this article</h3>
            <ul className="space-y-2">
              {article.tableOfContents.map((item, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(index)}
                    className="text-[#0055d5] hover:underline text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-white py-16">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.article
            className="prose prose-lg max-w-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Introduction */}
            <p className="text-xl text-[#4b5563] leading-relaxed mb-12">
              {article.content.introduction}
            </p>

            {/* Content Sections */}
            {article.content.sections.map((section, index) => (
              <div key={index} id={`section-${index}`} className="mb-12">
                <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6">
                  {section.title}
                </h2>
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-lg text-[#4b5563] leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            {/* Conclusion */}
            <div className="bg-[#f9fafb] p-8 rounded-2xl mb-12">
              <h2 className="text-3xl font-bold text-[#3a3a3a] mb-6">Conclusion</h2>
              <p className="text-lg text-[#4b5563] leading-relaxed">
                {article.content.conclusion}
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Author Bio */}
      <section className="bg-[#f9fafb] py-16">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-[#3a3a3a] mb-8">About the Author</h3>
            <div className="bg-white rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={article.authorImage}
                  alt={article.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#3a3a3a] mb-2">{article.author}</h4>
                <p className="text-[#0055d5] font-semibold mb-4">{article.authorTitle}</p>
                <p className="text-[#4b5563] leading-relaxed">{article.authorBio}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Sharing */}
      <section className="bg-white py-12">
        <div className="max-w-[900px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-[#3a3a3a] mb-6">Share this article</h3>
            <div className="flex gap-4">
              <motion.button
                className="bg-[#0077b5] text-white px-6 py-3 rounded-full hover:bg-[#006399] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin size={20} />
                LinkedIn
              </motion.button>
              <motion.button
                className="bg-[#1da1f2] text-white px-6 py-3 rounded-full hover:bg-[#1a8cd8] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter size={20} />
                Twitter
              </motion.button>
              <motion.button
                className="bg-[#4b5563] text-white px-6 py-3 rounded-full hover:bg-[#374151] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                Email
              </motion.button>
              <motion.button
                onClick={handleCopyLink}
                className="bg-[#f3f4f6] text-[#3a3a3a] px-6 py-3 rounded-full hover:bg-[#e5e7eb] transition-colors flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {copiedLink ? <Check size={20} /> : <Link2 size={20} />}
                {copiedLink ? 'Copied!' : 'Copy Link'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#f9fafb] py-16">
          <div className="max-w-[1200px] mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-bold text-[#3a3a3a] mb-12">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedArticles.map((relArticle, index) => (
                  <Link key={relArticle.id} to={`/blog/${relArticle.id}`}>
                    <motion.div
                      className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer h-full"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-48">
                        <ImageWithFallback
                          src={relArticle.image}
                          alt={relArticle.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#0055d5] text-white px-3 py-1 rounded-full text-xs font-semibold">
                            {relArticle.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-[#3a3a3a] mb-3 line-clamp-2">
                          {relArticle.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-[#6b7280] mb-4">
                          <User size={14} />
                          <span>{relArticle.author}</span>
                          <span>•</span>
                          <Clock size={14} />
                          <span>{relArticle.readTime}</span>
                        </div>
                        <motion.span
                          className="text-[#0055d5] font-semibold text-sm"
                          whileHover={{ x: 5 }}
                        >
                          Read article →
                        </motion.span>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Jobs */}
      <section className="bg-white py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-bold text-[#3a3a3a] mb-4 text-center">
              Interested in solving these problems?
            </h3>
            <p className="text-xl text-[#4b5563] mb-12 text-center">
              Join our team of talented engineers
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[900px] mx-auto">
              {jobs.map((job, index) => (
                <Link key={job.id} to={`/jobs/${job.id}`}>
                  <motion.div
                    className="bg-[#f9fafb] rounded-2xl p-8 hover:shadow-xl transition-shadow cursor-pointer"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -5 }}
                  >
                    <h4 className="text-2xl font-bold text-[#3a3a3a] mb-3">
                      {job.title}
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="bg-white text-[#4b5563] px-3 py-1 rounded-full text-sm font-semibold">
                        {job.department}
                      </span>
                      <span className="bg-white text-[#4b5563] px-3 py-1 rounded-full text-sm font-semibold">
                        {job.product}
                      </span>
                    </div>
                    <p className="text-[#6b7280] mb-6">{job.description}</p>
                    <motion.span
                      className="text-[#0055d5] font-semibold"
                      whileHover={{ x: 5 }}
                    >
                      View role →
                    </motion.span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
