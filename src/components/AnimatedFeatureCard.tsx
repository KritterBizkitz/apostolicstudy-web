'use client';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

export function AnimatedFeatureCard({ children }: PropsWithChildren) {
  return (
    <motion.div
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.06] transition-colors"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
    >
      {children}
    </motion.div>
  );
}