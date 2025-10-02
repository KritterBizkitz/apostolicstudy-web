'use client';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';

type RevealBoxProps = PropsWithChildren<{
  delay?: number;
  immediate?: boolean;
}>;

export function RevealBox({ children, delay = 0, immediate = false }: RevealBoxProps) {
  const initialState = { opacity: 0, y: 14 };
  const visibleState = { opacity: 1, y: 0 };

  const motionProps = immediate
    ? { initial: initialState, animate: visibleState }
    : { initial: initialState, whileInView: visibleState, viewport: { once: true, amount: 0.3 } };

  return (
    <motion.div
      {...motionProps}
      transition={{ duration: 0.4, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}
