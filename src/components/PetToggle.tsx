import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const ToggleButton = styled(motion.button)<{ isVisible: boolean }>`
  position: fixed;
  bottom: 30px;
  right: 90px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${props => props.isVisible 
    ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
    : 'linear-gradient(135deg, var(--accent-color), var(--primary-color))'};
  color: white;
  border: 3px solid white;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2),
              0 0 0 2px rgba(255, 255, 255, 0.3);
  z-index: 9998;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3),
                0 0 0 3px rgba(255, 255, 255, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }

  .dark & {
    border-color: rgba(15, 23, 42, 0.9);
    background: ${props => props.isVisible 
      ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
      : 'linear-gradient(135deg, #60a5fa, #3b82f6)'};
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5),
                ${props => props.isVisible 
                  ? '0 0 30px rgba(239, 68, 68, 0.5)' 
                  : '0 0 30px rgba(96, 165, 250, 0.5)'},
                0 0 0 2px rgba(96, 165, 250, 0.3);
  }

  .dark &:hover {
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6),
                ${props => props.isVisible 
                  ? '0 0 40px rgba(239, 68, 68, 0.7)' 
                  : '0 0 40px rgba(96, 165, 250, 0.7)'},
                0 0 0 3px rgba(96, 165, 250, 0.5);
  }

  @media (max-width: 768px) {
    width: 48px;
    height: 48px;
    bottom: 30px;
    right: 75px;
    font-size: 1.3rem;
  }
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  right: 70px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.85);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 8px solid rgba(0, 0, 0, 0.85);
    border-top: 6px solid transparent;
    border-bottom: 6px solid transparent;
  }

  .dark & {
    background: rgba(96, 165, 250, 0.95);
    box-shadow: 0 4px 15px rgba(96, 165, 250, 0.4);
  }

  .dark &::after {
    border-left-color: rgba(96, 165, 250, 0.95);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const IconWrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface PetToggleProps {
  isVisible: boolean;
  onToggle: () => void;
}

const PetToggle: React.FC<PetToggleProps> = ({ isVisible, onToggle }) => {
  return (
    <ToggleButton
      isVisible={isVisible}
      onClick={onToggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 1
      }}
      title={isVisible ? "도우미 숨기기" : "도우미 보이기"}
    >
      <AnimatePresence mode="wait">
        {isVisible ? (
          <IconWrapper
            key="hide"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            👻
          </IconWrapper>
        ) : (
          <IconWrapper
            key="show"
            initial={{ rotate: -180, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 180, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            🐉
          </IconWrapper>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isVisible && (
          <Tooltip
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.3, delay: 2 }}
          >
            도우미 부르기
          </Tooltip>
        )}
      </AnimatePresence>
    </ToggleButton>
  );
};

export default PetToggle;

