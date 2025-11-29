import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-light);
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

const Greeting = styled(motion.create('div'))`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-secondary);

  .dark & {
    color: #cbd5e0;
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

const Title = styled(motion.create('h1'))`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  line-height: 1.2;
  position: relative;

  .dark & {
    color: #f8fafc;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const NameHighlight = styled.span`
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
    border-radius: 2px;
    opacity: 0.3;
  }

  .dark & {
    background: linear-gradient(90deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark &::after {
    background: linear-gradient(90deg, #93c5fd, #60a5fa);
  }
`;

const RoleContainer = styled(motion.create('div'))`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const RoleTag = styled.div`
  padding: 0.5rem 1.2rem;
  background: rgba(var(--accent-color-rgb), 0.1);
  border: 1px solid rgba(var(--accent-color-rgb), 0.3);
  border-radius: 2rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--accent-color);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--accent-color-rgb), 0.2);
    transform: translateY(-2px);
  }

  .dark & {
    background: rgba(96, 165, 250, 0.15);
    border-color: rgba(96, 165, 250, 0.4);
    color: #93c5fd;
  }

  .dark &:hover {
    background: rgba(96, 165, 250, 0.25);
  }
`;

const Subtitle = styled(motion.create('div'))`
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
  line-height: 2;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  .dark & {
    color: #cbd5e0;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    padding: 0 1rem;
  }
`;

const SubtitleLine = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const Icon = styled.span`
  font-size: 1.3rem;
  flex-shrink: 0;
`;

const Highlight = styled.span`
  color: var(--accent-color);
  font-weight: 600;

  .dark & {
    color: #93c5fd;
  }
`;

const StatsContainer = styled(motion.create('div'))`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto 3rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const StatBox = styled(motion.create('div'))`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3),
                0 0 20px rgba(96, 165, 250, 0.1);
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4),
                0 0 40px rgba(96, 165, 250, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;

  .dark & {
    background: linear-gradient(90deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  .dark & {
    color: #94a3b8;
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

  .dark & {
    background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
    box-shadow: 0 8px 30px rgba(96, 165, 250, 0.4),
                0 0 60px rgba(96, 165, 250, 0.2);
    color: #ffffff;
    border: 1px solid rgba(96, 165, 250, 0.3);
  }

  .dark &:hover {
    box-shadow: 0 12px 40px rgba(96, 165, 250, 0.6),
                0 0 80px rgba(96, 165, 250, 0.3);
    transform: translateY(-6px) rotateX(2deg);
    border-color: rgba(96, 165, 250, 0.5);
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

  .dark & {
    background: rgba(30, 41, 59, 0.8);
    border: 2px solid rgba(96, 165, 250, 0.5);
    color: #f8fafc;
    backdrop-filter: blur(20px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3),
                inset 0 0 30px rgba(96, 165, 250, 0.05);
  }

  .dark &:hover {
    background: rgba(96, 165, 250, 0.15);
    border-color: #60a5fa;
    color: #60a5fa;
    box-shadow: 0 8px 30px rgba(96, 165, 250, 0.4),
                0 0 60px rgba(96, 165, 250, 0.2),
                inset 0 0 40px rgba(96, 165, 250, 0.1);
    transform: translateY(-6px) rotateX(2deg);
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
          <Greeting variants={itemVariants}>
            👋 안녕하세요!
          </Greeting>
          
          <Title variants={itemVariants}>
            저는 <NameHighlight>김재현</NameHighlight>입니다
          </Title>
          
          <RoleContainer variants={itemVariants}>
            <RoleTag>💻 Frontend Developer</RoleTag>
            <RoleTag>🚀 Full-Stack Enthusiast</RoleTag>
            <RoleTag>🌍 Global Perspective</RoleTag>
          </RoleContainer>

          <Subtitle variants={itemVariants}>
            <SubtitleLine>
              <Icon>🎨</Icon>
              사용자 경험을 중요시하는 <Highlight>창의적인 웹 개발자</Highlight>입니다
            </SubtitleLine>
            <SubtitleLine>
              <Icon>🇫🇷</Icon>
              프랑스에서 <Highlight>컴퓨터공학을 전공</Highlight>하고 돌아왔습니다
            </SubtitleLine>
            <SubtitleLine>
              <Icon>📚</Icon>
              새로운 기술을 배우고 적용하는 것을 <Highlight>좋아합니다</Highlight>
            </SubtitleLine>
          </Subtitle>

          <StatsContainer variants={itemVariants}>
            <StatBox
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatNumber>18+</StatNumber>
              <StatLabel>프로젝트</StatLabel>
            </StatBox>
            <StatBox
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatNumber>2+</StatNumber>
              <StatLabel>년 경력</StatLabel>
            </StatBox>
            <StatBox
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatNumber>3</StatNumber>
              <StatLabel>개 언어</StatLabel>
            </StatBox>
            <StatBox
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <StatNumber>16+</StatNumber>
              <StatLabel>기술 스택</StatLabel>
            </StatBox>
          </StatsContainer>

            <ButtonGroup variants={itemVariants}>
              <PrimaryButton to="/projects">
                프로젝트 보기
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </PrimaryButton>
              <SecondaryButton to="/about">
                자세히 보기
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 16v-4M12 8h.01"/>
                </svg>
              </SecondaryButton>
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