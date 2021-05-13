import { motion } from "framer-motion";

export default function PageMotion({ children }) {
  const transition = { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] };

  const pageAnimation = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
    transition: { transition },
  };

  return (
    <motion.div
      exit="exit"
      animate="animate"
      initial="initial"
      transition="transition"
      variants={pageAnimation}
    >
      {children}
    </motion.div>
  );
}
