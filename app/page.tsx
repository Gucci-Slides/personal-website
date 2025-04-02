'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Helper Functions ---
function getRandomHexColor(): string {
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 16).toString(16);
  }
  return color.toUpperCase();
}

function getContrastColor(hex: string): '#000000' | '#FFFFFF' {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1);
  }
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  if (hex.length !== 6) {
    return '#000000'; // Default to black on error
  }
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // Calculate luminance (per ITU-R BT.709)
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  // Use white text on dark backgrounds (luminance < 0.6) and black text on light backgrounds
  return luminance < 0.6 ? '#FFFFFF' : '#000000'; 
}

const TARGET_COLOR = '#7CABCE';

// --- Preloader Component ---
interface PreloaderProps {
  onComplete: () => void;
  onColorGenerated: (color: string) => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, onColorGenerated }) => {
  const [step, setStep] = useState(0);
  const [bgColor, setBgColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#FFFFFF');

  const cycleDuration = 350; // ms between color changes
  const finalDisplayDuration = 400; // ms to display final color before exit

  useEffect(() => {
    // Reset step if component re-mounts (optional, good practice)
    // setStep(0);
    // setBgColor('#000000');
    // setTextColor('#FFFFFF');

    // State update logic based on step
    let timeoutId: NodeJS.Timeout | null = null;
    if (step < 9) {
      const newColor = getRandomHexColor();
      onColorGenerated(newColor);
      timeoutId = setTimeout(() => {
        setBgColor(newColor);
        setTextColor(getContrastColor(newColor));
        setStep(prevStep => prevStep + 1);
      }, cycleDuration);

    } else if (step === 9) {
      const finalColor = TARGET_COLOR;
      setBgColor(finalColor);
      setTextColor(getContrastColor(finalColor));
      timeoutId = setTimeout(() => { onComplete(); }, finalDisplayDuration);
    }

    // Cleanup timeout
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  // Note: Removed reset logic from deps for simplicity now
  }, [step, onComplete, onColorGenerated]); // Effect runs when step changes

  // Calculate progress percentage for the loading bar
  const progressPercent = Math.min(100, (step / 9) * 100);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 1 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Hex Code Display */}
      {step > 0 && (
          <motion.p
            key={bgColor} // Re-trigger animation on color change
            initial={{ opacity: 0 }} // Fade in each hex code
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }} // Quick fade
            className="text-4xl md:text-6xl font-mono font-semibold tabular-nums tracking-wider"
            style={{ color: textColor }} // Dynamic text color for contrast
          >
            {bgColor}
          </motion.p>
      )}

      {/* Loading Bar Container */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-500 bg-opacity-30">
        {/* Loading Bar Fill */}
        <motion.div
          className="h-full"
          style={{ backgroundColor: textColor }} // Use contrast color for fill
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: cycleDuration / 1000, ease: "linear" }} // Sync with cycle duration
        />
      </div>
    </motion.div>
  );
};

// --- Home Component ---
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);

  const handlePreloadComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleColorGenerated = useCallback((color: string) => {
    setGeneratedColors(prevColors =>
        prevColors.length < 9 ? [...prevColors, color] : prevColors
    );
  }, []);

  // --- ARLISS text animation setup ---
  const text = "ARLISS";
  const letters = Array.from(text);
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.1, 
        staggerChildren: 0.08,
      },
    },
  };
  const letterVariant = { 
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0, transition: { type: "spring", damping: 12, stiffness: 100 } },
  };

  // --- Generate CSS Variables ---
  const colorStyleVariables = generatedColors.reduce((acc, color, index) => {
    acc[`--generated-color-${index}`] = color;
    return acc;
  }, {} as Record<string, string>);

  return (
    <>
      <AnimatePresence mode='wait'>
        {isLoading && (
            <Preloader 
                key="preloader" 
                onComplete={handlePreloadComplete} 
                onColorGenerated={handleColorGenerated}
            />
        )}
      </AnimatePresence>

      {!isLoading && (
        // Main container - single screen, centered content
        <motion.div
            key="main-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col items-center justify-center w-full text-black h-screen overflow-hidden p-4 bg-white"
            style={colorStyleVariables} // Apply variables for children
        >
          {/* Corner Titles / Links - Magazine Style */}
          <p 
            className="absolute top-4 left-4 md:top-8 md:left-8 text-sm md:text-base font-medium tracking-wider uppercase"
            style={{ color: generatedColors.length > 0 ? `var(--generated-color-0)` : '#000000' }}
          >
            <span>Software Engineer</span>
          </p>
          
          {/* Removed Twitter Link */}

          <p 
            className="absolute bottom-4 right-4 md:bottom-8 md:right-8 text-sm md:text-base font-medium tracking-wider uppercase"
            style={{ color: generatedColors.length > 1 ? `var(--generated-color-1)` : '#000000' }}
          >
            Web Design
          </p>

          {/* ARLISS Text Block - Centered */}
          <div className="text-center">
            <motion.h1
                className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[12rem] xl:text-[15rem] font-extrabold leading-none flex items-baseline justify-center"
                variants={sentence} 
                initial="hidden"
                animate="visible"
              >
                {letters.map((char, index) => (
                  <motion.span
                      key={char + "-" + index}
                      variants={letterVariant}
                      style={{ color: generatedColors.length > 0 ? `var(--generated-color-${index % generatedColors.length})` : '#000000' }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
          </div>

        </motion.div>
      )}
    </>
  );
}
