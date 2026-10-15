import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Calm, architectural bezier curve
const LUXURY_EASE = [0.21, 0.47, 0.32, 0.98] as const;

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  className?: string;
  viewportOnce?: boolean;
}

export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.75,
  direction = 'up',
  distance = 24,
  className = '',
  viewportOnce = true,
}) => {
  const getInitialOffset = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 };
      case 'down':
        return { y: -distance, x: 0 };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      case 'none':
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getInitialOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: viewportOnce, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface FadeInStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  viewportOnce?: boolean;
}

export const FadeInStagger: React.FC<FadeInStaggerProps> = ({
  children,
  className = '',
  staggerDelay = 0.12,
  initialDelay = 0,
  viewportOnce = true,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  distance?: number;
  duration?: number;
}> = ({ children, className = '', distance = 24, duration = 0.7 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: LUXURY_EASE,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface SmoothAccordionProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export const SmoothAccordion: React.FC<SmoothAccordionProps> = ({
  isOpen,
  children,
  className = '',
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: 'auto',
            opacity: 1,
            transition: {
              height: { duration: 0.5, ease: LUXURY_EASE },
              opacity: { duration: 0.4, delay: 0.1, ease: 'easeOut' },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.4, ease: LUXURY_EASE },
              opacity: { duration: 0.2 },
            },
          }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { AnimatedCounter } from './AnimatedCounter';
export type { AnimatedCounterProps } from './AnimatedCounter';
