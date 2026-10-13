import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

// interface MagneticButtonProps {
//   children: React.ReactNode;
//   className?: string;
//   onClick?: () => void;
// }

const MagneticButton = ({
  children,
  className = "",
  onClick,
}) => {
  const buttonRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for cursor position relative to button center
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Angle for chromatic gradient rotation
  const gradientAngle = useMotionValue(0);

  // Spring physics for smooth, elastic movement
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Smooth gradient angle
  const smoothAngle = useSpring(gradientAngle, { damping: 20, stiffness: 80 });

  // Text follows with more intensity
  const textX = useSpring(useTransform(mouseX, (v) => v * 0.4), springConfig);
  const textY = useSpring(useTransform(mouseY, (v) => v * 0.4), springConfig);

  // Shine position
  const shineX = useMotionValue(50);
  const shineY = useMotionValue(50);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    // Magnetic pull strength
    const strength = 0.35;
    mouseX.set(distX * strength);
    mouseY.set(distY * strength);

    // Calculate angle for gradient rotation (liquid metal effect)
    const angle = Math.atan2(distY, distX) * (180 / Math.PI) + 180;
    gradientAngle.set(angle);

    // Shine position
    const normX = ((e.clientX - rect.left) / rect.width) * 100;
    const normY = ((e.clientY - rect.top) / rect.height) * 100;
    shineX.set(normX);
    shineY.set(normY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`magnetic-button ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Chromatic glow effect */}
      <motion.div
        className="magnetic-button-chromatic-glow"
        animate={{
          opacity: isHovered ? 1 : 0.4,
          scale: isHovered ? 1.05 : 1,
        }}
        style={{
          "--gradient-angle": smoothAngle,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Chromatic border */}
      <motion.div
        className="magnetic-button-chrome"
        animate={{
          scale: isHovered ? 1.01 : 1,
        }}
        style={{
          "--gradient-angle": smoothAngle,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Shine overlay */}
      <motion.div
        className="magnetic-button-shine"
        style={{
          "--shine-x": useTransform(shineX, (v) => `${v}%`),
          "--shine-y": useTransform(shineY, (v) => `${v}%`),
        } }
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Text content */}
      <motion.span
        className="magnetic-button-text"
        style={{
          x: textX,
          y: textY,
        }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
};

export default MagneticButton;