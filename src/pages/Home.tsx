import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('/pattern.svg');
    opacity: 0.1;
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled(motion.create('h1'))`
  font-size: 4rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
  position: relative;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled(motion.create('p'))`
  font-size: 1.5rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 1.6;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0 1rem;
  }
`;

const ButtonGroup = styled(motion.create('div'))`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled(motion.create(Link))`
  padding: 1rem 2.5rem;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transform-style: preserve-3d;
  perspective: 1000px;

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
      rgba(255, 255, 255, 0.4),
      transparent
    );
    transition: 0.3s;
  }

  &:hover {
    transform: translateY(-4px) rotateX(2deg);
  }

  &:hover::before {
    left: 100%;
  }

  svg {
    width: 1.3rem;
    height: 1.3rem;
    transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover svg {
    transform: translateX(4px);
  }
`;

const PrimaryButton = styled(Button)`
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  color: white;
  box-shadow: 0 4px 20px rgba(var(--accent-color-rgb), 0.3);

  &:hover {
    box-shadow: 0 8px 30px rgba(var(--accent-color-rgb), 0.5);
  }
`;

const SecondaryButton = styled(Button)`
  background: rgba(255, 255, 255, 0.95);
  color: var(--text-primary);
  border: 2px solid var(--accent-color);
  backdrop-filter: blur(10px);

  &:hover {
    background: var(--accent-color);
    color: white;
    box-shadow: 0 8px 30px rgba(var(--accent-color-rgb), 0.3);
  }
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const FloatingElement = styled(motion.create('div'))`
  position: absolute;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  border-radius: 50%;
  opacity: 0.12;
  filter: blur(40px);
`;

const Home: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const floatingElements = [
    { size: 150, x: 10, y: 20 },
    { size: 200, x: 80, y: 40 },
    { size: 120, x: 30, y: 70 },
    { size: 180, x: 70, y: 80 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.3
      }
    }
  };

  return (
    <HomeContainer>
      <FloatingElements>
        {floatingElements.map((element, index) => (
          <FloatingElement
            key={index}
            style={{
              width: element.size,
              height: element.size,
              left: `${element.x}%`,
              top: `${element.y}%`,
              x: mousePosition.x * 40,
              y: mousePosition.y * 40
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 0.12,
              scale: 1,
              x: [0, 20, 0],
              y: [0, 20, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 0.3,
              ease: "easeInOut"
            }}
          />
        ))}
      </FloatingElements>

      <ContentWrapper>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Title variants={itemVariants}>
            프론트엔드 개발자
            <br />
            김재현입니다
          </Title>
          <Subtitle variants={itemVariants}>
            사용자 경험을 중요시하는 창의적인 웹 개발자입니다.
            <br />
            새로운 기술을 배우고 적용하는 것을 좋아합니다.
          </Subtitle>
          <ButtonGroup variants={itemVariants}>
            <PrimaryButton to="/projects">
              프로젝트 보기
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </PrimaryButton>
            <SecondaryButton to="/contact">
              연락하기
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </SecondaryButton>
          </ButtonGroup>
        </motion.div>
      </ContentWrapper>
    </HomeContainer>
  );
};

export default Home; 