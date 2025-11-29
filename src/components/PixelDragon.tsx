import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const DragonSvg = styled(motion.svg)`
  width: 64px;
  height: 64px;
  filter: drop-shadow(0 0 8px rgba(96, 165, 250, 0.4));
  
  .dark & {
    filter: drop-shadow(0 0 10px rgba(96, 165, 250, 0.6))
            drop-shadow(0 0 20px rgba(96, 165, 250, 0.3));
  }
`;

interface PixelDragonProps {
  variant?: 'dragon' | 'phoenix' | 'unicorn' | 'griffin';
  isFlying?: boolean;
}

const PixelDragon: React.FC<PixelDragonProps> = ({ variant = 'dragon', isFlying = false }) => {
  const getPixelArt = () => {
    switch (variant) {
      case 'dragon':
        return (
          <DragonSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            {/* Dragon pixel art */}
            <g>
              {/* Body glow */}
              <rect x="10" y="14" width="2" height="2" fill="rgba(96, 165, 250, 0.3)" />
              <rect x="12" y="14" width="2" height="2" fill="rgba(96, 165, 250, 0.3)" />
              
              {/* Tail */}
              <rect x="2" y="18" width="2" height="2" fill="#4a9eff" />
              <rect x="4" y="18" width="2" height="2" fill="#5db0ff" />
              <rect x="4" y="16" width="2" height="2" fill="#6bc1ff" />
              <rect x="6" y="16" width="2" height="2" fill="#7dd3ff" />
              
              {/* Back leg */}
              <rect x="8" y="18" width="2" height="2" fill="#3d8ce8" />
              <rect x="8" y="20" width="2" height="2" fill="#3d8ce8" />
              <rect x="8" y="22" width="2" height="2" fill="#2a6bb5" />
              
              {/* Body */}
              <rect x="8" y="14" width="2" height="2" fill="#5db0ff" />
              <rect x="10" y="14" width="2" height="2" fill="#6bc1ff" />
              <rect x="12" y="14" width="2" height="2" fill="#7dd3ff" />
              <rect x="14" y="14" width="2" height="2" fill="#6bc1ff" />
              <rect x="8" y="16" width="2" height="2" fill="#4a9eff" />
              <rect x="10" y="16" width="2" height="2" fill="#5db0ff" />
              <rect x="12" y="16" width="2" height="2" fill="#6bc1ff" />
              <rect x="14" y="16" width="2" height="2" fill="#5db0ff" />
              
              {/* Chest (glowing) */}
              <rect x="10" y="16" width="2" height="2" fill="#ffeb3b" opacity="0.8" />
              <rect x="12" y="16" width="2" height="2" fill="#ffd700" opacity="0.8" />
              
              {/* Front leg */}
              <rect x="14" y="18" width="2" height="2" fill="#3d8ce8" />
              <rect x="14" y="20" width="2" height="2" fill="#3d8ce8" />
              <rect x="14" y="22" width="2" height="2" fill="#2a6bb5" />
              
              {/* Neck */}
              <rect x="16" y="12" width="2" height="2" fill="#5db0ff" />
              <rect x="16" y="14" width="2" height="2" fill="#6bc1ff" />
              
              {/* Head */}
              <rect x="18" y="10" width="2" height="2" fill="#6bc1ff" />
              <rect x="20" y="10" width="2" height="2" fill="#7dd3ff" />
              <rect x="18" y="12" width="2" height="2" fill="#7dd3ff" />
              <rect x="20" y="12" width="2" height="2" fill="#8ee5ff" />
              
              {/* Eye (glowing) */}
              <rect x="20" y="10" width="1" height="1" fill="#ffeb3b" />
              
              {/* Horn */}
              <rect x="20" y="8" width="2" height="2" fill="#a0e7ff" />
              <rect x="22" y="6" width="2" height="2" fill="#b8f0ff" />
              
              {/* Jaw */}
              <rect x="22" y="12" width="2" height="2" fill="#6bc1ff" />
              
              {/* Wings */}
              <rect x="10" y="10" width="2" height="2" fill="rgba(96, 165, 250, 0.7)" />
              <rect x="12" y="8" width="2" height="2" fill="rgba(96, 165, 250, 0.7)" />
              <rect x="14" y="6" width="2" height="2" fill="rgba(96, 165, 250, 0.7)" />
              <rect x="12" y="10" width="2" height="2" fill="rgba(96, 165, 250, 0.6)" />
              <rect x="14" y="8" width="2" height="2" fill="rgba(96, 165, 250, 0.6)" />
              <rect x="16" y="6" width="2" height="2" fill="rgba(96, 165, 250, 0.6)" />
              
              {/* Spikes on back */}
              <rect x="8" y="12" width="2" height="2" fill="#8ee5ff" />
              <rect x="10" y="12" width="2" height="2" fill="#a0e7ff" />
              <rect x="12" y="12" width="2" height="2" fill="#8ee5ff" />
              
              {/* Magic particles */}
              <motion.rect
                x="6" y="10" width="1" height="1" fill="#ffeb3b"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.rect
                x="18" y="8" width="1" height="1" fill="#ffeb3b"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.rect
                x="24" y="14" width="1" height="1" fill="#ffeb3b"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>
          </DragonSvg>
        );
      
      case 'phoenix':
        return (
          <DragonSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            {/* Phoenix pixel art */}
            <g>
              {/* Tail feathers (fire) */}
              <rect x="2" y="20" width="2" height="2" fill="#ff6b6b" />
              <rect x="4" y="18" width="2" height="2" fill="#ff8787" />
              <rect x="4" y="20" width="2" height="2" fill="#ffa07a" />
              <rect x="6" y="20" width="2" height="2" fill="#ffb347" />
              
              {/* Body */}
              <rect x="8" y="16" width="2" height="2" fill="#ff8c42" />
              <rect x="10" y="16" width="2" height="2" fill="#ffa07a" />
              <rect x="12" y="16" width="2" height="2" fill="#ffb347" />
              <rect x="8" y="18" width="2" height="2" fill="#ff6b6b" />
              <rect x="10" y="18" width="2" height="2" fill="#ff8787" />
              <rect x="12" y="18" width="2" height="2" fill="#ffa07a" />
              
              {/* Glowing core */}
              <rect x="10" y="16" width="2" height="2" fill="#ffeb3b" opacity="0.9" />
              
              {/* Wings (fire) */}
              <rect x="6" y="14" width="2" height="2" fill="rgba(255, 107, 107, 0.7)" />
              <rect x="8" y="12" width="2" height="2" fill="rgba(255, 135, 135, 0.7)" />
              <rect x="10" y="10" width="2" height="2" fill="rgba(255, 160, 122, 0.7)" />
              <rect x="14" y="14" width="2" height="2" fill="rgba(255, 107, 107, 0.7)" />
              <rect x="16" y="12" width="2" height="2" fill="rgba(255, 135, 135, 0.7)" />
              <rect x="18" y="10" width="2" height="2" fill="rgba(255, 160, 122, 0.7)" />
              
              {/* Neck */}
              <rect x="14" y="14" width="2" height="2" fill="#ffa07a" />
              <rect x="14" y="16" width="2" height="2" fill="#ffb347" />
              
              {/* Head */}
              <rect x="16" y="12" width="2" height="2" fill="#ffb347" />
              <rect x="18" y="12" width="2" height="2" fill="#ffc966" />
              <rect x="16" y="14" width="2" height="2" fill="#ffc966" />
              
              {/* Eye (glowing) */}
              <rect x="18" y="12" width="1" height="1" fill="#ffeb3b" />
              
              {/* Crest */}
              <rect x="16" y="10" width="2" height="2" fill="#ff6b6b" />
              <rect x="18" y="8" width="2" height="2" fill="#ff8787" />
              <rect x="20" y="10" width="2" height="2" fill="#ffa07a" />
              
              {/* Fire particles */}
              <motion.rect
                x="6" y="12" width="1" height="1" fill="#ff6b6b"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.rect
                x="20" y="14" width="1" height="1" fill="#ffa07a"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: 0.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>
          </DragonSvg>
        );
      
      case 'unicorn':
        return (
          <DragonSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            {/* Unicorn pixel art */}
            <g>
              {/* Tail */}
              <rect x="2" y="18" width="2" height="2" fill="#e0b0ff" />
              <rect x="4" y="18" width="2" height="2" fill="#dda0dd" />
              <rect x="4" y="16" width="2" height="2" fill="#da70d6" />
              
              {/* Back leg */}
              <rect x="8" y="18" width="2" height="2" fill="#f0e6ff" />
              <rect x="8" y="20" width="2" height="2" fill="#f0e6ff" />
              <rect x="8" y="22" width="2" height="2" fill="#d8c7e8" />
              
              {/* Body */}
              <rect x="6" y="14" width="2" height="2" fill="#f5f0ff" />
              <rect x="8" y="14" width="2" height="2" fill="#ffffff" />
              <rect x="10" y="14" width="2" height="2" fill="#f5f0ff" />
              <rect x="12" y="14" width="2" height="2" fill="#ffffff" />
              <rect x="6" y="16" width="2" height="2" fill="#f0e6ff" />
              <rect x="8" y="16" width="2" height="2" fill="#f5f0ff" />
              <rect x="10" y="16" width="2" height="2" fill="#ffffff" />
              <rect x="12" y="16" width="2" height="2" fill="#f5f0ff" />
              
              {/* Front leg */}
              <rect x="12" y="18" width="2" height="2" fill="#f0e6ff" />
              <rect x="12" y="20" width="2" height="2" fill="#f0e6ff" />
              <rect x="12" y="22" width="2" height="2" fill="#d8c7e8" />
              
              {/* Neck */}
              <rect x="14" y="12" width="2" height="2" fill="#f5f0ff" />
              <rect x="14" y="14" width="2" height="2" fill="#ffffff" />
              
              {/* Mane (rainbow) */}
              <rect x="12" y="10" width="2" height="2" fill="#ff6b9d" />
              <rect x="14" y="10" width="2" height="2" fill="#c77dff" />
              <rect x="16" y="10" width="2" height="2" fill="#7dd3fc" />
              
              {/* Head */}
              <rect x="16" y="12" width="2" height="2" fill="#ffffff" />
              <rect x="18" y="12" width="2" height="2" fill="#f5f0ff" />
              <rect x="16" y="14" width="2" height="2" fill="#f5f0ff" />
              
              {/* Eye */}
              <rect x="18" y="12" width="1" height="1" fill="#9d4edd" />
              
              {/* Horn (glowing) */}
              <rect x="18" y="10" width="2" height="2" fill="#ffd700" />
              <rect x="20" y="8" width="2" height="2" fill="#ffeb3b" />
              <rect x="22" y="6" width="2" height="2" fill="#fff9c4" />
              
              {/* Magic sparkles */}
              <motion.rect
                x="14" y="8" width="1" height="1" fill="#ff6b9d"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.rect
                x="20" y="6" width="1" height="1" fill="#c77dff"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: 0.7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.rect
                x="24" y="8" width="1" height="1" fill="#7dd3fc"
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.5, 0.5],
                }}
                transition={{
                  duration: 2,
                  delay: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>
          </DragonSvg>
        );
      
      case 'griffin':
        return (
          <DragonSvg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            {/* Griffin pixel art */}
            <g>
              {/* Lion tail */}
              <rect x="2" y="18" width="2" height="2" fill="#d4a574" />
              <rect x="4" y="18" width="2" height="2" fill="#c9964a" />
              <rect x="4" y="16" width="2" height="2" fill="#b8860b" />
              
              {/* Back leg (lion) */}
              <rect x="8" y="18" width="2" height="2" fill="#d4a574" />
              <rect x="8" y="20" width="2" height="2" fill="#c9964a" />
              <rect x="8" y="22" width="2" height="2" fill="#8b6914" />
              
              {/* Body (lion) */}
              <rect x="6" y="14" width="2" height="2" fill="#daa520" />
              <rect x="8" y="14" width="2" height="2" fill="#d4a574" />
              <rect x="10" y="14" width="2" height="2" fill="#c9964a" />
              <rect x="6" y="16" width="2" height="2" fill="#c9964a" />
              <rect x="8" y="16" width="2" height="2" fill="#daa520" />
              <rect x="10" y="16" width="2" height="2" fill="#d4a574" />
              
              {/* Transition to eagle */}
              <rect x="12" y="14" width="2" height="2" fill="#8b7355" />
              <rect x="12" y="16" width="2" height="2" fill="#a0826d" />
              
              {/* Front leg (eagle talon) */}
              <rect x="12" y="18" width="2" height="2" fill="#8b7355" />
              <rect x="12" y="20" width="2" height="2" fill="#6b5d4f" />
              <rect x="12" y="22" width="2" height="2" fill="#4a4035" />
              
              {/* Neck (eagle) */}
              <rect x="14" y="12" width="2" height="2" fill="#a0826d" />
              <rect x="14" y="14" width="2" height="2" fill="#8b7355" />
              
              {/* Wings */}
              <rect x="8" y="10" width="2" height="2" fill="rgba(139, 115, 85, 0.7)" />
              <rect x="10" y="8" width="2" height="2" fill="rgba(160, 130, 109, 0.7)" />
              <rect x="12" y="6" width="2" height="2" fill="rgba(180, 150, 120, 0.7)" />
              <rect x="14" y="10" width="2" height="2" fill="rgba(139, 115, 85, 0.7)" />
              <rect x="16" y="8" width="2" height="2" fill="rgba(160, 130, 109, 0.7)" />
              
              {/* Head (eagle) */}
              <rect x="16" y="10" width="2" height="2" fill="#f5deb3" />
              <rect x="18" y="10" width="2" height="2" fill="#ffe4b5" />
              <rect x="16" y="12" width="2" height="2" fill="#ffe4b5" />
              
              {/* Eye (glowing) */}
              <rect x="18" y="10" width="1" height="1" fill="#ffa500" />
              
              {/* Beak */}
              <rect x="20" y="12" width="2" height="2" fill="#daa520" />
              
              {/* Feather crest */}
              <rect x="16" y="8" width="2" height="2" fill="#d4a574" />
              <rect x="18" y="6" width="2" height="2" fill="#daa520" />
              
              {/* Golden particles */}
              <motion.rect
                x="10" y="6" width="1" height="1" fill="#ffd700"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.rect
                x="18" y="8" width="1" height="1" fill="#ffd700"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  delay: 0.7,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </g>
          </DragonSvg>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      animate={isFlying ? {
        y: [0, -8, 0],
        rotate: [0, -2, 2, 0],
      } : {}}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {getPixelArt()}
    </motion.div>
  );
};

export default PixelDragon;

