import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function LifeGallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Asymmetric grid patterns - each image has height: 'small', 'medium', or 'large'
  const galleryImages = [
    { url: 'https://images.unsplash.com/photo-1758691736843-90f58dce465e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMG9mZmljZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzM4NDk0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Team collaboration', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1693386556810-43d9451bdda5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVjaCUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3Mzg0OTQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Diverse team meeting', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1763307411477-6bb3254f1496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBjcmVhdGl2ZSUyMHNwYWNlfGVufDF8fHx8MTc3MzgwMjExM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Creative office space', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1758691737584-a8f17fb34475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY2VsZWJyYXRpb24lMjB3b3JrcGxhY2V8ZW58MXx8fHwxNzczODQ5NDQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Team celebration', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtd29yayUyMGNvbGxhYm9yYXRpb258ZW58MXx8fHwxNzczNzg0MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Office teamwork', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1758520144658-c87be518b87e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBzb2NpYWwlMjBldmVudHxlbnwxfHx8fDE3NzM4NDk3MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Social event', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1770777843445-2a1621b1201d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwd29ya3NwYWNlJTIwZW52aXJvbm1lbnR8ZW58MXx8fHwxNzczODQ5NzA1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Tech workspace', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1663780852938-f44b86ec3060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtlcnMlMjBicmFpbnN0b3JtaW5nfGVufDF8fHx8MTc3Mzg0OTcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Brainstorming session', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1676276374324-db790020bdbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wYW55JTIwY3VsdHVyZSUyMHRlYW18ZW58MXx8fHwxNzczNzUwOTQwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Company culture', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1664809304765-1956ce420a91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBpbm5vdmF0aW9ufGVufDF8fHx8MTc3Mzg0OTcwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Workplace innovation', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1555432782-efda97a5088a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjB0ZWFtJTIwaGFwcGluZXNzfGVufDF8fHx8MTc3Mzg0OTk4OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Team happiness', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1758873268631-fa944fc5cad2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBkaXZlcnNpdHklMjBpbmNsdXNpb258ZW58MXx8fHwxNzczODExMjYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Diversity inclusion', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1638202677704-b74690bb8fa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwdGVhbSUyMGNvZGluZ3xlbnwxfHx8fDE3NzM4NDk5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Coding together', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1763191213523-1489179a1088?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMG9mZmljZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzM3NTYxNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Office design', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1771211390539-4025ef9d387b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwbHVuY2glMjBicmVha3xlbnwxfHx8fDE3NzM4NDk5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Lunch break', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1768659347602-f26468febe11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb2ZmZWUlMjBjdWx0dXJlfGVufDF8fHx8MTc3Mzg0OTk5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Coffee culture', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1672854207187-e70df893755b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZW1vdGUlMjB3b3JrJTIwc2V0dXB8ZW58MXx8fHwxNzczODQ5OTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Remote work setup', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1768796370577-c6e8b708b980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnVpbGRpbmclMjBhY3Rpdml0eXxlbnwxfHx8fDE3NzM4MzUzMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Team building', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1616386261012-8a328c89d5b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3Mzg0OTk5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Tech workspace', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1655746340587-9d1aaad92b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb2xsYWJvcmF0aW9uJTIwc3BhY2V8ZW58MXx8fHwxNzczODQ5OTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Collaboration space', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1771924368572-2ba8c7f6c79d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwc3VjY2VzcyUyMGNlbGVicmF0aW9ufGVufDF8fHx8MTc3Mzc2NDMyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Success celebration', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1626187777040-ffb7cb2c5450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZSUyMG1vZGVybnxlbnwxfHx8fDE3NzM3OTg5NDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Coworking space', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1571624436279-b272aff752b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBtZWV0aW5nJTIwcm9vbXxlbnwxfHx8fDE3NzM3MzcwNjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Meeting room', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1531539427495-97c44a449837?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwc3RhcnR1cCUyMGN1bHR1cmV8ZW58MXx8fHwxNzczODQ5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Startup culture', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1758876022104-368b0f3fb6c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjB3ZWxsYmVpbmd8ZW58MXx8fHwxNzczODQ5OTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Workplace wellbeing', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1760624189524-ee4f0a1a3749?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJlc2VudGF0aW9uJTIwd29ya3xlbnwxfHx8fDE3NzM4NDk5OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Team presentation', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1765366417044-9e84ce8ec942?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBsb3VuZ2UlMjBhcmVhfGVufDF8fHx8MTc3Mzg0OTk5NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Lounge area', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b3Jrc3BhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzczODA2MTAyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Professional workspace', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1759884247160-27b8465544b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwZGlzY3Vzc2lvbiUyMHdoaXRlYm9hcmR8ZW58MXx8fHwxNzczODQ5OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Whiteboard discussion', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1666068467131-2c8a03ca84cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBwbGFudHMlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzczODQ5OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Office plants', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1603201667230-bd139210db18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHRlYW0lMjB3b3JrfGVufDF8fHx8MTc3Mzg0OTk5Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Creative work', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1632923945657-ccd98efe59e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBzdGFuZGluZyUyMGRlc2t8ZW58MXx8fHwxNzczODQ5OTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Standing desk', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1766074903112-79661da9ab45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwdmlkZW8lMjBjYWxsfGVufDF8fHx8MTc3Mzg0OTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Video call', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1637243218392-33e083e38b6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBlcmdvbm9taWNzfGVufDF8fHx8MTc3Mzg0OTk5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Ergonomic workspace', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1572521165329-b197f9ea3da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBuYXR1cmFsJTIwbGlnaHR8ZW58MXx8fHwxNzczODQ5OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Natural light', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1604805183300-20c7ca8818ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwaGFja2F0aG9uJTIwZXZlbnR8ZW58MXx8fHwxNzczODQ5OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Hackathon event', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1770672367845-8fff85a8a3d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JrcGxhY2UlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzczODQ5OTk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Workplace community', size: 'small' },
    { url: 'https://images.unsplash.com/photo-1758873268053-675432cd8922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjYXN1YWwlMjBmcmlkYXl8ZW58MXx8fHwxNzczODQ5OTk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Casual Friday', size: 'large' },
    { url: 'https://images.unsplash.com/photo-1523875194681-bedd468c58bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwcHJvamVjdCUyMHBsYW5uaW5nfGVufDF8fHx8MTc3MzgxOTc1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Project planning', size: 'medium' },
    { url: 'https://images.unsplash.com/photo-1625645207115-3818c67e5830?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBpbnNwaXJhdGlvbnxlbnwxfHx8fDE3NzM4NDk5OTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', alt: 'Workspace inspiration', size: 'small' },
  ];

  const getHeightClass = (size: string) => {
    switch (size) {
      case 'small':
        return 'h-[180px]';
      case 'medium':
        return 'h-[240px]';
      case 'large':
        return 'h-[320px]';
      default:
        return 'h-[240px]';
    }
  };

  return (
    <section ref={ref} className="py-20 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a] mb-4">
            Life at <span className="text-[#0055d5]">pCloud</span>
          </h2>
          <p className="text-xl text-[#4b5563] max-w-2xl mx-auto">
            Join a team that values creativity, collaboration, and making an impact
          </p>
        </motion.div>

        {/* Horizontal Scrolling Gallery - 3 Rows */}
        <motion.div
          className="relative mb-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex flex-col gap-2 w-max">
              {/* Row 1 - Large to Small pattern */}
              <div className="flex gap-2">
                {galleryImages.slice(0, 14).map((image, index) => (
                  <motion.div
                    key={`row1-${index}`}
                    className={`relative overflow-hidden rounded-xl group cursor-pointer flex-shrink-0 h-[160px] ${
                      index % 3 === 0 ? 'w-[300px]' : index % 3 === 1 ? 'w-[220px]' : 'w-[180px]'
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 + index * 0.02, duration: 0.5 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                  >
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0055d5]/90 via-[#0055d5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* Row 2 - Medium rhythm pattern */}
              <div className="flex gap-2">
                {galleryImages.slice(14, 27).map((image, index) => (
                  <motion.div
                    key={`row2-${index}`}
                    className={`relative overflow-hidden rounded-xl group cursor-pointer flex-shrink-0 h-[200px] ${
                      index % 4 === 0 ? 'w-[260px]' : index % 4 === 1 ? 'w-[190px]' : index % 4 === 2 ? 'w-[280px]' : 'w-[220px]'
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.2 + index * 0.02, duration: 0.5 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                  >
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0055d5]/90 via-[#0055d5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* Row 3 - Small to Large pattern */}
              <div className="flex gap-2">
                {galleryImages.slice(27, 40).map((image, index) => (
                  <motion.div
                    key={`row3-${index}`}
                    className={`relative overflow-hidden rounded-xl group cursor-pointer flex-shrink-0 h-[140px] ${
                      index % 3 === 0 ? 'w-[200px]' : index % 3 === 1 ? 'w-[260px]' : 'w-[230px]'
                    }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + index * 0.02, duration: 0.5 }}
                    whileHover={{ scale: 1.03, y: -8 }}
                  >
                    <motion.div
                      className="w-full h-full"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <ImageWithFallback
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0055d5]/90 via-[#0055d5]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Scroll indicator gradient on right edge */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <Link to="/life">
            <motion.button
              className="px-10 h-[48px] bg-[#0055d5] text-white rounded-full font-bold text-base inline-flex items-center gap-3 hover:bg-[#0044aa] transition-colors shadow-lg hover:shadow-xl"
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore life@pCloud
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}