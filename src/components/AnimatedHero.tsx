'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';

export function AnimatedHero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* … your left-column content exactly as you have it … */}
        </motion.div>

        {/* Right */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
        >
          {/* … your right preview card content … */}
        </motion.div>
      </div>
    </section>
  );
}