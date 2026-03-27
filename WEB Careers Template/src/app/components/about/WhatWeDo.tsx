import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Cloud, Lock, Key } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function WhatWeDo() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const products = [
    {
      icon: Cloud,
      name: 'pCloud Storage',
      description:
        'Seamlessly store, sync, and access your files from any device with our flagship cloud storage platform built for speed and reliability.',
      image: 'https://images.unsplash.com/photo-1506399558188-acca6f8cbf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbG91ZCUyMGNvbXB1dGluZyUyMHRlY2hub2xvZ3klMjBzZXJ2ZXJzfGVufDF8fHx8MTc3MzYzNTY2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#0055d5',
    },
    {
      icon: Lock,
      name: 'pCloud Encryption',
      description:
        'Military-grade zero-knowledge encryption that ensures only you can access your sensitive files, even we cannot see them.',
      image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWN1cmUlMjBlbmNyeXB0aW9uJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzM2NjYyODh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#E6FF00',
    },
    {
      icon: Key,
      name: 'pCloud Pass',
      description:
        'Secure password manager integrated with your cloud storage, protecting your credentials with the same zero-knowledge encryption.',
      image: 'https://images.unsplash.com/photo-1639503547276-90230c4a4198?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXNzd29yZCUyMHNlY3VyaXR5JTIwbWFuYWdlcnxlbnwxfHx8fDE3NzM2NjkyNzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#0055d5',
    },
  ];

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-[#3a3a3a] mb-4">Cloud storage built on <span className="text-[#0055d5]">security, privacy, and reliable.</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              className="group relative overflow-hidden rounded-3xl bg-[#f4f4f4]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
            >
              {/* Image Background */}
              <div className="relative h-64 overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-30"
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#f4f4f4]" />
              </div>

              {/* Content */}
              <div className="relative p-8 -mt-20">
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: product.color,
                    color: product.color === '#E6FF00' ? '#05183f' : 'white',
                  }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <product.icon size={32} />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#3a3a3a] mb-4">{product.name}</h3>
                <p className="text-[#4b5563] leading-relaxed">{product.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}