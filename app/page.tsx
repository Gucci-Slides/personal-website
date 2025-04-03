'use client'

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

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

// --- Preloader Component ---
interface PreloaderProps {
  onComplete: () => void;
  onColorGenerated: (color: string) => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete, onColorGenerated }) => {
  const [step, setStep] = useState(0);
  const [bgColor, setBgColor] = useState('#000000');
  const [textColor, setTextColor] = useState('#FFFFFF'); // Used for outline

  const cycleDuration = 350; 
  const finalDisplayDuration = 400;
  const textToOutline = "ARLISS";

  useEffect(() => {
    let colorUpdateTimeout: NodeJS.Timeout | null = null;
    let completionTimeout: NodeJS.Timeout | null = null;

    if (step < 9) {
      const newColor = getRandomHexColor();
      onColorGenerated(newColor); // Still pass up

      setBgColor(newColor);
      setTextColor(getContrastColor(newColor));

      colorUpdateTimeout = setTimeout(() => {
          setStep(prev => prev + 1);
      }, cycleDuration);

    } else if (step === 9) {
      completionTimeout = setTimeout(() => {
          onComplete();
      }, finalDisplayDuration);
    }

    // Cleanup
    return () => {
      if (colorUpdateTimeout) clearTimeout(colorUpdateTimeout);
      if (completionTimeout) clearTimeout(completionTimeout);
    };
  }, [step, onComplete, onColorGenerated, cycleDuration, finalDisplayDuration]); 

  const progressPercent = Math.min(100, (step / 9) * 100);

  const outlineStyle: Record<string, string> = {
    WebkitTextStroke: `1px ${textColor}`,
    textStroke: `1px ${textColor}`,
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bgColor }}
      initial={{ opacity: 1 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Removed Hex Code Display */}

      {/* Outlined Text Container */}
      <div className="text-center px-4">
          <h1 
            className="text-8xl sm:text-9xl md:text-[10rem] lg:text-[11rem] xl:text-[13rem] font-extrabold leading-none flex items-center justify-center"
            style={outlineStyle}
          >
              {Array.from(textToOutline).map((char, index) => (
                  <motion.span
                      key={char + "-" + index}
                      initial={{ color: 'transparent' }}
                      className="inline-block"
                  >
                      {char}
                  </motion.span>
              ))}
          </h1>
      </div>

      {/* Loading Bar Container (remains the same) */}
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-500 bg-opacity-30">
        <motion.div
          className="h-full"
          style={{ backgroundColor: textColor }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: cycleDuration / 1000, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
};

// --- Home Component ---
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [generatedColors, setGeneratedColors] = useState<string[]>([]);
  const [windowHeight, setWindowHeight] = useState(0);
  
  // Ref for the main scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  // --- Window Height Effect ---
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    handleResize(); // Set initial height
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- Framer Motion Scroll Animations ---
  const { scrollYProgress } = useScroll({ target: scrollContainerRef });

  const arlissOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const newHeaderOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  
  // --- Restore Corner Text Animation Transforms ---
  const titleMaxX = typeof window !== 'undefined' ? window.innerWidth * 0.45 : 300;
  const titleLeftX = useTransform(scrollYProgress, [0, 0.3], [0, titleMaxX]); // Moves right
  const titleRightX = useTransform(scrollYProgress, [0, 0.3], [0, -titleMaxX]); // Moves left

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
        // Wrap scroll container in motion.div for fade-in
        <motion.div
          key="scroll-container-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }} // Quick fade-in
        >
          {/* Main scrollable container - ADD REF */}
          <div 
              ref={scrollContainerRef}
              key="scroll-container"
              className="w-full text-black bg-white overflow-y-auto"
          >
            {/* Initial View Section */}
            <motion.div
                key="main-content-arliss"
                initial={{ opacity: 1 }}
                style={{ opacity: arlissOpacity }}
                // Remove relative positioning - not needed for fixed children
                className="flex flex-col items-center justify-center w-full h-screen overflow-hidden p-4"
            >
                {/* Corner Texts - Reverted to Fixed + X Transform */}
                <motion.p 
                  className="fixed top-4 left-4 md:top-8 md:left-8 z-10 pointer-events-none text-sm md:text-base font-medium tracking-wider uppercase"
                  initial={{ x: 0 }}
                  style={{
                    x: titleLeftX, // Re-enable X transform
                    color: generatedColors.length > 0 ? generatedColors[0] : '#000000' 
                  }}
                >
                  Software Engineer
                </motion.p>
                <motion.p 
                  className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-10 pointer-events-none text-sm md:text-base font-medium tracking-wider uppercase"
                  initial={{ x: 0 }}
                  style={{
                    x: titleRightX, // Re-enable X transform
                    color: generatedColors.length > 1 ? generatedColors[1] : '#000000' 
                  }}
                >
                  Web Design
                </motion.p>

                {/* ARLISS Text Block - Remains Centered */}
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
                                style={{ color: generatedColors.length > 0 ? generatedColors[index % generatedColors.length] : '#000000' }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.h1>
                </div>
            </motion.div>

            {/* Placeholder div 1 - Updated Header */}
            <div className="relative h-screen w-full bg-gray-100 flex items-center justify-center"> 
               <motion.h2 
                  className="text-5xl md:text-7xl font-bold text-center px-8"
                  // Apply scroll-linked opacity and 3rd generated color
                  style={{ 
                      opacity: newHeaderOpacity, 
                      color: generatedColors.length > 2 ? generatedColors[2] : '#000000' 
                  }} 
                >
                  COMING SOON
               </motion.h2>
            </div> 
            {/* Other Placeholders REMOVED */}
            {/* <div className="h-screen w-full bg-gray-200"></div> */}
            {/* <div className="h-screen w-full bg-gray-300"></div> */}
              
          </div>
        </motion.div>
      )}
    </>
  );
}
