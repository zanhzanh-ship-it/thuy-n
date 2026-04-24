/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from 'motion/react';
import { Ship, Wind, Sun, Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const QuoteLine = ({ text, delay, className }: { text: string; delay: number; className?: string }) => {
  const words = text.split(' ');
  
  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
            visible: { 
              opacity: 1, 
              y: 0, 
              filter: 'blur(0px)',
              transition: { 
                delay: delay + (i * 0.1),
                duration: 0.8,
                ease: "easeOut"
              } 
            }
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio context or element for ambient sea sounds
    // Note: Using a looped ambient ocean sound
    const audio = new Audio('https://www.soundjay.com/nature/ocean-wave-1.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggleSound = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Playback blocked:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-[#1a2a6c] via-[#b21f1f] to-[#fdbb2d]">
      {/* Sound Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSound}
        className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer transition-colors border border-white/20"
        aria-label="Toggle Sound"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>

      {/* Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 w-96 h-96 rounded-full bg-orange-400 blur-3xl opacity-40"
      />
      
      <div className="absolute top-[20%] right-[15%] opacity-20">
        <Sun size={120} className="text-yellow-200 animate-pulse" />
      </div>

      {/* Quote Overlay */}
      <div className="relative z-20 text-center px-6 mb-32 max-w-2xl select-none">
        <QuoteLine 
          text="Bạn không thể" 
          delay={0.5} 
          className="text-2xl md:text-3xl font-sans font-medium text-white/90"
        />
        <QuoteLine 
          text="điều khiển" 
          delay={1.2} 
          className="text-5xl md:text-7xl font-serif italic text-yellow-300 my-2"
        />
        <QuoteLine 
          text="được hướng gió," 
          delay={2.0} 
          className="text-xl md:text-2xl font-sans tracking-widest text-white/80"
        />
        <div className="h-4" />
        <QuoteLine 
          text="nhưng bạn hoàn toàn có thể" 
          delay={3.0} 
          className="text-lg md:text-xl font-sans font-light text-white/70"
        />
        <QuoteLine 
          text="điều chỉnh" 
          delay={3.8} 
          className="text-5xl md:text-7xl font-serif italic text-yellow-300 my-2"
        />
        <QuoteLine 
          text="cánh buồm." 
          delay={4.6} 
          className="text-4xl md:text-5xl font-sans font-bold text-white uppercase tracking-tighter"
        />
      </div>

      {/* The Sea - Bottom Layers */}
      <div className="absolute bottom-0 w-full h-[30%] z-10">
        <Wave 
          color="#003366" 
          depth={1} 
          duration={8} 
          height="100%" 
          offset={0}
        />
        <Wave 
          color="#004d99" 
          depth={2} 
          duration={6} 
          height="80%" 
          offset={20}
        />
        <Wave 
          color="#0066cc" 
          depth={3} 
          duration={4} 
          height="60%" 
          offset={40}
        />
      </div>

      {/* Floating Boat */}
      <motion.div
        className="absolute bottom-[15%] z-15 left-0"
        animate={{ 
          x: ['-20vw', '120vw'],
          y: [0, -10, 0, 10, 0],
          rotate: [2, -2, 2]
        }}
        transition={{ 
          x: { duration: 25, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <div className="relative scale-[1.5] md:scale-[2.5]">
          <Ship size={48} className="text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]" />
          <motion.div 
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -left-2 top-8 w-12 h-1 bg-white/30 rounded-full blur-sm"
          />
        </div>
      </motion.div>

      {/* Decorative Wind Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-white/10"
          initial={{ x: -100, y: Math.random() * 600 }}
          animate={{ x: '110vw' }}
          transition={{ 
            duration: 10 + Math.random() * 10, 
            repeat: Infinity, 
            delay: i * 2,
            ease: "linear"
          }}
        >
          <Wind size={24 + Math.random() * 24} />
        </motion.div>
      ))}
    </div>
  );
}

function Wave({ color, duration, height, offset, depth }: { color: string; duration: number; height: string; offset: number; depth: number }) {
  return (
    <motion.div
      className="absolute bottom-0 w-[200%] h-full"
      style={{ backgroundColor: color, left: -offset, opacity: 1 - (depth * 0.15) }}
      initial={{ x: 0 }}
      animate={{ x: '-50%' }}
      transition={{ 
        duration, 
        repeat: Infinity, 
        ease: "linear" 
      }}
    >
      <svg 
        className="absolute bottom-full w-full h-20 fill-current" 
        viewBox="0 0 1440 320" 
        style={{ color }}
        preserveAspectRatio="none"
      >
        <path d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,149.3C672,149,768,203,864,213.3C960,224,1056,192,1152,170.7C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>
    </motion.div>
  );
}
