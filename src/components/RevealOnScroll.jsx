import { motion as Motion, useReducedMotion } from "motion/react";

function RevealOnScroll({ children, delay = 0, className = "", style }) {
  const prefersReduced = useReducedMotion();

  return (
    <Motion.div
      className={className}
      style={style}
      initial={prefersReduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </Motion.div>
  );
}

export default RevealOnScroll;
