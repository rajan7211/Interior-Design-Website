import React, { useEffect, useRef } from 'react';
import { useInView, animate, useReducedMotion } from 'motion/react';

export interface AnimatedCounterProps {
  value: number;
  from?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

/**
 * AnimatedCounter
 * Smoothly animates numbers from a starting value (default 0) to a target value
 * when entering the viewport.
 * 
 * Features:
 * - Triggers once when scrolled into view
 * - Smooth luxury deceleration curve
 * - Tabular numbers to eliminate jitter
 * - Full accessibility with screen-reader friendly text (WCAG compliant)
 * - Automatic bypass when prefers-reduced-motion is enabled
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  from = 0,
  prefix = '',
  suffix = '',
  duration = 1.8,
  delay = 0,
  className = '',
}) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    // Respect user's OS / browser reduced motion preference
    if (shouldReduceMotion) {
      node.textContent = `${prefix}${value}${suffix}`;
      return;
    }

    if (isInView) {
      const controls = animate(from, value, {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] as const, // Calm, editorial deceleration curve
        onUpdate: (latest) => {
          node.textContent = `${prefix}${Math.round(latest)}${suffix}`;
        },
        onComplete: () => {
          node.textContent = `${prefix}${value}${suffix}`;
        },
      });

      return () => controls.stop();
    }
  }, [isInView, value, from, prefix, suffix, duration, delay, shouldReduceMotion]);

  const initialText = shouldReduceMotion
    ? `${prefix}${value}${suffix}`
    : `${prefix}${from}${suffix}`;

  return (
    <span className={`inline-block ${className}`}>
      {/* Screen readers read the full target metric cleanly without rapid intermediate values */}
      <span className="sr-only">
        {prefix}{value}{suffix}
      </span>
      {/* Visual animated representation with tabular-nums to prevent layout width shift */}
      <span ref={nodeRef} aria-hidden="true" className="tabular-nums">
        {initialText}
      </span>
    </span>
  );
};

