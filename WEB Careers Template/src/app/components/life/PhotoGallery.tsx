import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { ChevronDown } from 'lucide-react';

type Category = 'all' | 'office' | 'team-building' | 'birthdays' | 'training' | 'off-sites';

export function PhotoGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState<Category>('all');
  const [showCount, setShowCount] = useState(12);

  const filters = [
    { id: 'all' as Category, label: 'All' },
    { id: 'office' as Category, label: 'Office Life' },
    { id: 'team-building' as Category, label: 'Team Building' },
    { id: 'birthdays' as Category, label: 'Birthdays' },
    { id: 'training' as Category, label: 'Training' },
    { id: 'off-sites' as Category, label: 'Off-sites' },
  ];

  const photos = [
    {
      id: 1,
      category: 'office' as Category,
      image: 'https://images.unsplash.com/photo-1758520145175-aa3b593b81af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2UlMjBwZW9wbGV8ZW58MXx8fHwxNzczODEwNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Daily Workspace',
      date: 'March 2026',
    },
    {
      id: 2,
      category: 'team-building' as Category,
      image: 'https://images.unsplash.com/photo-1770240090990-0653176ee415?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0eSUyMG91dGRvb3J8ZW58MXx8fHwxNzczODEwNzU0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Team Outdoor Activity',
      date: 'February 2026',
    },
    {
      id: 3,
      category: 'birthdays' as Category,
      image: 'https://images.unsplash.com/photo-1758520144658-c87be518b87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBiaXJ0aGRheSUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3MzgxMDc1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Birthday Celebration',
      date: 'March 2026',
    },
    {
      id: 4,
      category: 'training' as Category,
      image: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB0cmFpbmluZyUyMHdvcmtzaG9wfGVufDF8fHx8MTc3Mzc3MjIxN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Professional Workshop',
      date: 'January 2026',
    },
    {
      id: 5,
      category: 'off-sites' as Category,
      image: 'https://images.unsplash.com/photo-1764726354660-5e64ffbffe79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjB0ZWFtJTIwcmV0cmVhdHxlbnwxfHx8fDE3NzM4MTA3NTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Annual Retreat',
      date: 'December 2025',
    },
    {
      id: 6,
      category: 'office' as Category,
      image: 'https://images.unsplash.com/photo-1739298061766-e2751d92e9db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMG1lZXRpbmclMjBoYXBweXxlbnwxfHx8fDE3NzM4MTA3NTZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Team Collaboration',
      date: 'March 2026',
    },
    {
      id: 7,
      category: 'office' as Category,
      image: 'https://images.unsplash.com/photo-1590649681928-4b179f773bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtlcnMlMjBvZmZpY2UlMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc3MzgxMTEyN3ww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Coworkers Collaborating',
      date: 'March 2026',
    },
    {
      id: 8,
      category: 'birthdays' as Category,
      image: 'https://images.unsplash.com/photo-1758520145408-dedb359d1c49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY2VsZWJyYXRpb24lMjBwYXJ0eXxlbnwxfHx8fDE3NzM4MTExMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Team Party',
      date: 'February 2026',
    },
    {
      id: 9,
      category: 'office' as Category,
      image: 'https://images.unsplash.com/photo-1768659347602-f26468febe11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb2ZmZWUlMjBicmVhayUyMGNhc3VhbHxlbnwxfHx8fDE3NzM4MTExMjd8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Coffee Break',
      date: 'March 2026',
    },
    {
      id: 10,
      category: 'training' as Category,
      image: 'https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRyYWluaW5nJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc3MzczMTUyNnww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Training Presentation',
      date: 'February 2026',
    },
    {
      id: 11,
      category: 'team-building' as Category,
      image: 'https://images.unsplash.com/photo-1758582388621-6ea162744083?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBvdXRkb29yJTIwZnVufGVufDF8fHx8MTc3MzgxMTEyOHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Outdoor Team Building',
      date: 'January 2026',
    },
    {
      id: 12,
      category: 'office' as Category,
      image: 'https://images.unsplash.com/photo-1628270023331-231293242b75?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBkZXNrJTIwd29ya3NwYWNlJTIwc2V0dXB8ZW58MXx8fHwxNzczODExMTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Workspace Setup',
      date: 'March 2026',
    },
    {
      id: 13,
      category: 'office' as Category,
      image: 'https://images.unsplash.com/photo-1617225504130-fb45ba79da56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xsZWFndWVzJTIwd29ya2luZyUyMHRvZ2V0aGVyJTIwaGFwcHl8ZW58MXx8fHwxNzczODExMTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Happy Colleagues',
      date: 'March 2026',
    },
    {
      id: 14,
      category: 'team-building' as Category,
      image: 'https://images.unsplash.com/photo-1768508948485-a7adc1f3427f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBldmVudCUyMG5ldHdvcmtpbmd8ZW58MXx8fHwxNzczNzQzMzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Networking Event',
      date: 'February 2026',
    },
    {
      id: 15,
      category: 'team-building' as Category,
      image: 'https://images.unsplash.com/photo-1552846573-47e482355fa7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwZWF0aW5nJTIwbHVuY2glMjB0b2dldGhlcnxlbnwxfHx8fDE3NzM4MTExMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Team Lunch',
      date: 'March 2026',
    },
    {
      id: 16,
      category: 'off-sites' as Category,
      image: 'https://images.unsplash.com/photo-1760451747526-9e93d94a9843?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwb2Zmc2l0ZSUyMG1vdW50YWluJTIwcmV0cmVhdHxlbnwxfHx8fDE3NzM4MTExMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Mountain Retreat',
      date: 'December 2025',
    },
    {
      id: 17,
      category: 'training' as Category,
      image: 'https://images.unsplash.com/photo-1759884247160-27b8465544b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnJhaW5zdG9ybWluZyUyMHdoaXRlYm9hcmR8ZW58MXx8fHwxNzczODExMTMzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Brainstorming Session',
      date: 'February 2026',
    },
    {
      id: 18,
      category: 'office' as Category,
      image: 'https://images.unsplash.com/photo-1633457896836-f8d6025c85d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtJTIwbWVldGluZyUyMGRpc2N1c3Npb258ZW58MXx8fHwxNzczODExMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Team Discussion',
      date: 'March 2026',
    },
    {
      id: 19,
      category: 'office' as Category,
      image: 'https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBkaXZlcnNpdHklMjBpbmNsdXNpb258ZW58MXx8fHwxNzczODExMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Diverse Team',
      date: 'March 2026',
    },
    {
      id: 20,
      category: 'birthdays' as Category,
      image: 'https://images.unsplash.com/photo-1558670460-cad0c19b1840?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwcGFydHklMjBjZWxlYnJhdGlvbnxlbnwxfHx8fDE3NzM4MTEyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Company Celebration',
      date: 'February 2026',
    },
    {
      id: 21,
      category: 'training' as Category,
      image: 'https://images.unsplash.com/photo-1761250246894-ee2314939662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wbWVudCUyMHdvcmtzaG9wfGVufDF8fHx8MTc3MzgxMTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Development Workshop',
      date: 'January 2026',
    },
    {
      id: 22,
      category: 'team-building' as Category,
      image: 'https://images.unsplash.com/photo-1768350329806-2fea7b97e142?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzczODExMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Adventure Activity',
      date: 'February 2026',
    },
    {
      id: 23,
      category: 'off-sites' as Category,
      image: 'https://images.unsplash.com/photo-1694967450668-9055a350b73f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjByZXRyZWF0JTIwbmF0dXJlfGVufDF8fHx8MTc3MzgxMTI2NHww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Nature Retreat',
      date: 'November 2025',
    },
    {
      id: 24,
      category: 'birthdays' as Category,
      image: 'https://images.unsplash.com/photo-1765582782217-bd6e17a17d9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ0aGRheSUyMGNha2UlMjBjZWxlYnJhdGlvbiUyMG9mZmljZXxlbnwxfHx8fDE3NzM4MTEyNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Birthday Cake Moment',
      date: 'March 2026',
    },
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? photos 
    : photos.filter(photo => photo.category === activeFilter);

  const displayedPhotos = filteredPhotos.slice(0, showCount);
  const hasMore = showCount < filteredPhotos.length;

  const handleShowMore = () => {
    setShowCount(prev => prev + 12);
  };

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a] mb-8">
            Life at pCloud
          </h2>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((filter) => (
              <motion.button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setShowCount(12); // Reset count when filter changes
                }}
                className={`filter-pill px-6 py-3 rounded-full transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-[#0055d5] text-white'
                    : 'bg-[#f4f4f4] text-[#4b5563] hover:bg-[#e5e5e5]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Masonry Gallery Grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="24px">
            {displayedPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                className="gallery-card group relative rounded-2xl overflow-hidden cursor-pointer"
                data-category={photo.category}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.05, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
              >
                <ImageWithFallback
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-auto object-cover"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#05183f] via-[#05183f]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
                    <p className="text-sm text-white/70">{photo.date}</p>
                    <span className="inline-block mt-3 px-3 py-1 bg-[#E6FF00] text-[#05183f] rounded-full text-xs font-semibold">
                      {filters.find(f => f.id === photo.category)?.label}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        {/* Show More Button */}
        {hasMore && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.button
              onClick={handleShowMore}
              className="bg-[#0055d5] text-white px-8 h-[48px] rounded-full text-base font-semibold inline-flex items-center gap-3 hover:bg-[#0044aa] transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show More
              <ChevronDown size={20} />
            </motion.button>
            <p className="text-[#4b5563] text-sm mt-4">
              Showing {displayedPhotos.length} of {filteredPhotos.length} photos
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}