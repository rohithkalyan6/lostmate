import React from 'react';
import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const animations = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 }
};

const AnimatedPage = ({ children, className = '' }) => {
  return (
    <MotionDiv
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} // Smooth cubic-bezier easing
      className={className}
    >
      {children}
    </MotionDiv>
  );
};

export default AnimatedPage;
