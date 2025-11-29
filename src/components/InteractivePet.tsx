import { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import PixelDragon from './PixelDragon';
import PetToggle from './PetToggle';

const PetContainer = styled(motion.div)<{ x: number; y: number }>`
  position: fixed;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  z-index: 9999;
  cursor: grab;
  user-select: none;
  pointer-events: auto;
  
  &:active {
    cursor: grabbing;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, rgba(96, 165, 250, 0.15) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  .dark &::before {
    background: radial-gradient(circle, rgba(96, 165, 250, 0.25) 0%, transparent 70%);
  }
`;

const PetCharacter = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 8px;
    background: radial-gradient(ellipse, rgba(0, 0, 0, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0.5;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.2);
  }

  &:hover::before {
    width: 70px;
    opacity: 0.7;
  }

  .dark &::before {
    background: radial-gradient(ellipse, rgba(96, 165, 250, 0.3) 0%, transparent 70%);
  }
`;

const SpeechBubble = styled(motion.div)<{ position: 'top' | 'bottom' | 'left' | 'right' }>`
  position: absolute;
  ${props => {
    switch (props.position) {
      case 'bottom':
        return `
          top: 110%;
          left: 50%;
          transform: translateX(-50%);
        `;
      case 'left':
        return `
          top: 50%;
          right: 110%;
          transform: translateY(-50%);
        `;
      case 'right':
        return `
          top: 50%;
          left: 110%;
          transform: translateY(-50%);
        `;
      default: // top
        return `
          bottom: 110%;
          left: 50%;
          transform: translateX(-50%);
        `;
    }
  }}
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.95));
  padding: 0.8rem 1.2rem;
  border-radius: 1.2rem;
  margin-bottom: 0.5rem;
  min-width: 180px;
  max-width: 300px;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-primary);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.5) inset;
  backdrop-filter: blur(15px);
  border: 1.5px solid rgba(var(--accent-color-rgb), 0.3);
  white-space: normal;
  text-align: center;
  line-height: 1.4;
  position: relative;
  overflow: hidden;
  opacity: 0.95;
  z-index: 10001;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { left: -100%; }
    50% { left: 100%; }
    100% { left: 100%; }
  }

  &::after {
    content: '';
    position: absolute;
    ${props => {
      switch (props.position) {
        case 'bottom':
          return `
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%) rotate(180deg);
          `;
        case 'left':
          return `
            left: 100%;
            top: 50%;
            transform: translateY(-50%) rotate(-90deg);
          `;
        case 'right':
          return `
            right: 100%;
            top: 50%;
            transform: translateY(-50%) rotate(90deg);
          `;
        default: // top
          return `
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
          `;
      }
    }}
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid rgba(255, 255, 255, 0.98);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  .dark & {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(30, 41, 59, 0.98));
    color: #f8fafc;
    border: 2px solid rgba(96, 165, 250, 0.6);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5),
                0 0 50px rgba(96, 165, 250, 0.3),
                0 0 0 1px rgba(96, 165, 250, 0.2) inset;
  }

  .dark &::after {
    border-top-color: rgba(15, 23, 42, 0.98);
  }

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 0.6rem 1rem;
    min-width: 150px;
    max-width: 220px;
  }
`;


interface Message {
  text: string;
  duration: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

const ParticleTrail = styled(motion.div)<{ x: number; y: number }>`
  position: fixed;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.9), rgba(96, 165, 250, 0.3));
  pointer-events: none;
  z-index: 9998;
  box-shadow: 0 0 8px rgba(96, 165, 250, 0.5);

  .dark & {
    background: radial-gradient(circle, rgba(96, 165, 250, 1), rgba(96, 165, 250, 0.4));
    box-shadow: 0 0 15px rgba(96, 165, 250, 0.8),
                0 0 30px rgba(96, 165, 250, 0.4);
  }
`;

const InteractivePet = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [targetPosition, setTargetPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [bubblePosition, setBubblePosition] = useState<'top' | 'bottom' | 'left' | 'right'>('top');
  const [creatureType, setCreatureType] = useState<'dragon' | 'phoenix' | 'unicorn' | 'griffin'>('dragon');
  const [isVisible, setIsVisible] = useState(true);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isShaking, setIsShaking] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const messageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const particleIdRef = useRef(0);
  const lastPositionRef = useRef({ x: 100, y: 100 });
  const velocityRef = useRef({ x: 0, y: 0 });

  const messages: Message[] = [
    { text: '안녕하세요! 포트폴리오에 오신 걸 환영합니다! 👋', duration: 3000 },
    { text: '18개 이상의 프로젝트를 확인해보세요! 💻', duration: 3000 },
    { text: '저를 드래그해서 원하는 곳으로 이동시킬 수 있어요! 🖱️', duration: 3000 },
    { text: '클릭하면 다른 모습으로 변신합니다! ✨', duration: 2500 },
    { text: 'About 페이지: 프로필, 기술 스택, 경력 정보 📋', duration: 3000 },
    { text: 'React 18, TypeScript, Vite로 제작된 포트폴리오! 🚀', duration: 3000 },
    { text: 'Projects 페이지: Web, AI, Game 개발 프로젝트 🎯', duration: 3000 },
    { text: '2년+ 경력 | 프랑스 유학 | 3개 언어 구사 💼', duration: 3000 },
    { text: 'Contact 페이지에서 이메일, 전화, LinkedIn 확인! 📧', duration: 3000 },
    { text: 'Frontend + Backend + AI/ML 풀스택 개발자 🌟', duration: 3000 },
    { text: 'GitHub에서 더 많은 프로젝트를 확인하세요! 🔗', duration: 3000 },
    { text: '다크 모드 지원 | 반응형 디자인 | PWA 최적화 🎨', duration: 3000 },
    { text: '함께 일하고 싶으시다면 연락주세요! 💌', duration: 2500 },
    { text: '즉시 근무 가능 | 원격 근무 환영 🏠', duration: 3000 },
    { text: 'Spring Boot, Node.js, React 전문가 💪', duration: 3000 },
  ];

  const creatures: Array<'dragon' | 'phoenix' | 'unicorn' | 'griffin'> = ['dragon', 'phoenix', 'unicorn', 'griffin'];

  const collisionMessages = [
    '앗! 벽이에요! 💥',
    '아야! 부딪혔어요! 😵',
    '조심해주세요! 🤕',
    '으악! 😱',
    '이런! 벽에 부딪혔네요! 💫',
    '아프지 않아요... 괜찮아요... 😢',
    '천천히 움직여주세요! 🥺',
  ];

  const createCollisionEffect = (x: number, y: number) => {
    // 충돌 파티클 생성
    const particleCount = 8;
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const distance = 30 + Math.random() * 20;
      const particleX = x + Math.cos(angle) * distance;
      const particleY = y + Math.sin(angle) * distance;
      
      const newParticle: Particle = {
        id: particleIdRef.current++,
        x: particleX,
        y: particleY
      };
      setParticles(p => [...p, newParticle]);
      
      setTimeout(() => {
        setParticles(p => p.filter(particle => particle.id !== newParticle.id));
      }, 800);
    }

    // 흔들림 효과
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    // 충돌 메시지
    const randomIndex = Math.floor(Math.random() * collisionMessages.length);
    const randomMessage = collisionMessages[randomIndex];
    if (randomMessage) {
      setBubblePosition(calculateBubblePosition(x, y));
      setMessage(randomMessage);
    }
    
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    messageTimeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const checkCollision = (x: number, y: number, velocity: { x: number; y: number }) => {
    const threshold = 10; // 가장자리로부터의 거리
    const speedThreshold = 3; // 최소 속도
    const speed = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);

    if (speed < speedThreshold) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // 좌측 충돌
    if (x <= threshold && velocity.x < 0) {
      createCollisionEffect(x + 40, y + 40);
    }
    // 우측 충돌
    else if (x >= windowWidth - 100 - threshold && velocity.x > 0) {
      createCollisionEffect(x + 40, y + 40);
    }
    // 상단 충돌
    if (y <= threshold && velocity.y < 0) {
      createCollisionEffect(x + 40, y + 40);
    }
    // 하단 충돌
    else if (y >= windowHeight - 100 - threshold && velocity.y > 0) {
      createCollisionEffect(x + 40, y + 40);
    }
  };

  const calculateBubblePosition = (x: number, y: number): 'top' | 'bottom' | 'left' | 'right' => {
    const windowWidth = window.innerWidth;
    const bubbleWidth = 300; // max-width
    const bubbleHeight = 100; // 대략적인 높이

    // 상단 여백 체크
    if (y < bubbleHeight + 50) {
      // 상단에 공간 없음 -> 하단에 표시
      return 'bottom';
    }
    
    // 좌우 여백 체크
    if (x < bubbleWidth / 2 + 20) {
      // 왼쪽에 공간 없음 -> 오른쪽에 표시
      return 'right';
    }
    
    if (x > windowWidth - bubbleWidth / 2 - 20) {
      // 오른쪽에 공간 없음 -> 왼쪽에 표시
      return 'left';
    }

    // 기본값: 상단
    return 'top';
  };

  const showRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    const randomMessage = messages[randomIndex];
    
    if (!randomMessage) return;
    
    // 말풍선 위치 계산
    setBubblePosition(calculateBubblePosition(position.x, position.y));
    setMessage(randomMessage.text);
    
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }
    
    messageTimeoutRef.current = setTimeout(() => {
      setMessage(null);
    }, randomMessage.duration);
  };

  const moveToRandomPosition = () => {
    const maxX = window.innerWidth - 100;
    const maxY = window.innerHeight - 100;
    const bubbleHeight = 100;
    const margin = 20;
    
    // 말풍선이 보일 수 있는 안전한 위치들
    const positions = [
      // 왼쪽 영역 (말풍선이 오른쪽에 표시)
      { x: margin + 50, y: Math.max(200, maxY / 3) },
      { x: margin + 50, y: Math.max(200, maxY / 2) },
      { x: margin + 50, y: Math.max(200, (maxY * 2) / 3) },
      
      // 오른쪽 영역 (말풍선이 왼쪽에 표시)
      { x: maxX - margin - 50, y: Math.max(200, maxY / 3) },
      { x: maxX - margin - 50, y: Math.max(200, maxY / 2) },
      { x: maxX - margin - 50, y: Math.max(200, (maxY * 2) / 3) },
      
      // 중앙 상단 (말풍선이 아래에 표시될 수 있음)
      { x: maxX / 2, y: Math.max(bubbleHeight + 80, 200) },
      
      // 중앙 영역 (말풍선이 위에 표시)
      { x: maxX / 3, y: Math.max(bubbleHeight + 150, maxY / 2) },
      { x: (maxX * 2) / 3, y: Math.max(bubbleHeight + 150, maxY / 2) },
    ];
    
    const randomIndex = Math.floor(Math.random() * positions.length);
    const randomPosition = positions[randomIndex];
    if (randomPosition) {
      setTargetPosition(randomPosition);
    }
  };

  const handleClick = () => {
    if (!isDragging) {
      showRandomMessage();
      const randomIndex = Math.floor(Math.random() * creatures.length);
      const randomCreature = creatures[randomIndex];
      if (randomCreature) {
        setCreatureType(randomCreature);
      }
      
      // 클릭하면 살짝 점프
      const currentY = position.y;
      setPosition({ ...position, y: currentY - 20 });
      setTimeout(() => {
        setPosition({ ...position, y: currentY });
      }, 300);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y
    };
  };

  const handleToggle = () => {
    const newVisibility = !isVisible;
    
    // 사라질 때 작별 효과
    if (!newVisibility) {
      // 작별 메시지
      setBubblePosition(calculateBubblePosition(position.x, position.y));
      setMessage('안녕히 계세요! 다음에 또 만나요! 👋✨');
      
      // 사라지는 파티클 효과
      const particleCount = 12;
      for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
          const angle = (Math.PI * 2 * i) / particleCount;
          const distance = 40 + Math.random() * 30;
          const particleX = position.x + 40 + Math.cos(angle) * distance;
          const particleY = position.y + 40 + Math.sin(angle) * distance;
          
          const newParticle: Particle = {
            id: particleIdRef.current++,
            x: particleX,
            y: particleY
          };
          setParticles(p => [...p, newParticle]);
          
          setTimeout(() => {
            setParticles(p => p.filter(particle => particle.id !== newParticle.id));
          }, 1000);
        }, i * 50); // 순차적으로 생성
      }
      
      // 500ms 후 실제로 숨김
      setTimeout(() => {
        setIsVisible(newVisibility);
        localStorage.setItem('petVisible', String(newVisibility));
        setMessage(null);
      }, 600);
    } else {
      // 즉시 보이기
      setIsVisible(newVisibility);
      localStorage.setItem('petVisible', String(newVisibility));
      
      // 다시 보일 때 환영 메시지
      setTimeout(() => {
        setBubblePosition(calculateBubblePosition(position.x, position.y));
        setMessage('다시 만나서 반가워요! 👋');
        setTimeout(() => {
          setMessage(null);
        }, 2500);
      }, 500);
    }
  };

  // 마우스 이벤트 핸들러
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const newX = e.clientX - dragOffset.current.x;
        const newY = e.clientY - dragOffset.current.y;
        
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 100;
        
        const clampedX = Math.max(0, Math.min(newX, maxX));
        const clampedY = Math.max(0, Math.min(newY, maxY));

        // 속도 계산
        const deltaX = clampedX - lastPositionRef.current.x;
        const deltaY = clampedY - lastPositionRef.current.y;
        velocityRef.current = { x: deltaX, y: deltaY };

        // 충돌 감지
        checkCollision(clampedX, clampedY, velocityRef.current);

        lastPositionRef.current = { x: clampedX, y: clampedY };
        
        setPosition({
          x: clampedX,
          y: clampedY
        });
        setTargetPosition({
          x: clampedX,
          y: clampedY
        });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      velocityRef.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // 부드러운 이동 + 파티클 트레일
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setPosition(prev => {
          const dx = targetPosition.x - prev.x;
          const dy = targetPosition.y - prev.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 2) {
            return prev;
          }
          
          // 파티클 생성 (이동 중일 때만, 더 적게)
          if (distance > 5 && Math.random() > 0.85) {
            const newParticle: Particle = {
              id: particleIdRef.current++,
              x: prev.x + 40,
              y: prev.y + 40
            };
            setParticles(p => [...p, newParticle]);
            
            // 파티클 자동 제거
            setTimeout(() => {
              setParticles(p => p.filter(particle => particle.id !== newParticle.id));
            }, 1000);
          }
          
          const speed = 3;
          return {
            x: prev.x + (dx / distance) * speed,
            y: prev.y + (dy / distance) * speed
          };
        });
      }, 16);
      
      return () => clearInterval(interval);
    }
  }, [targetPosition, isDragging]);

  // 자동으로 돌아다니기
  useEffect(() => {
    // 초기 이동 (더 늦게)
    setTimeout(() => {
      moveToRandomPosition();
    }, 5000);

    moveIntervalRef.current = setInterval(() => {
      if (!isDragging) {
        moveToRandomPosition();
        
        // 메시지는 가끔만 (20% 확률)
        if (Math.random() > 0.8) {
          showRandomMessage();
        }
      }
    }, 10000); // 10초마다 이동

    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, []);

  // 로컬 스토리지에서 가시성 상태 복원
  useEffect(() => {
    const savedVisibility = localStorage.getItem('petVisible');
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === 'true');
    }
  }, []);

  // 초기 환영 메시지 (한 번만, 더 늦게)
  useEffect(() => {
    if (!isVisible) return;

    setTimeout(() => {
      setBubblePosition(calculateBubblePosition(position.x, position.y));
      setMessage('안녕하세요! 포트폴리오에 오신 걸 환영합니다! 👋');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }, 3000); // 3초 후에 한 번만

    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
      if (idleTimeoutRef.current) {
        clearTimeout(idleTimeoutRef.current);
      }
    };
  }, [isVisible]);

  return (
    <>
      {/* Toggle Button */}
      <PetToggle isVisible={isVisible} onToggle={handleToggle} />

      {/* Pet and Particles */}
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Particle Trail */}
            {particles.map(particle => (
              <ParticleTrail
                key={particle.id}
                x={particle.x}
                y={particle.y}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 0, opacity: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            ))}

      <PetContainer
        x={position.x}
        y={position.y}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        initial={{ scale: 0, opacity: 0, rotate: -180 }}
        animate={{
          scale: 1,
          opacity: 1,
          rotate: isDragging ? [0, -5, 5, -5, 5, 0] : 0,
        }}
        exit={{ 
          scale: 0,
          opacity: 0,
          rotate: 360,
          y: position.y - 100,
        }}
        transition={{
          rotate: {
            duration: 0.5,
            repeat: isDragging ? Infinity : 0,
          },
          scale: { duration: 0.5, type: "spring", stiffness: 200 },
          opacity: { duration: 0.5 },
          y: { duration: 0.5, ease: "easeOut" }
        }}
      >
      <AnimatePresence>
        {message && (
          <SpeechBubble
            position={bubblePosition}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            {message}
          </SpeechBubble>
        )}
      </AnimatePresence>

      <PetCharacter
        animate={{
          scale: isDragging ? 1.2 : 1,
          rotate: isDragging ? [0, -10, 10, -10, 10, 0] : isShaking ? [-15, 15, -15, 15, -10, 10, -5, 5, 0] : 0,
          x: isShaking ? [-5, 5, -5, 5, -3, 3, -1, 1, 0] : 0,
          y: isShaking ? [-3, 3, -3, 3, -2, 2, -1, 1, 0] : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          rotate: {
            duration: isShaking ? 0.5 : 0.5,
            repeat: isDragging ? Infinity : 0,
          },
          x: {
            duration: 0.5,
          },
          y: {
            duration: 0.5,
          }
        }}
      >
        <PixelDragon variant={creatureType} isFlying={!isDragging && !isShaking} />
      </PetCharacter>
    </PetContainer>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InteractivePet;

