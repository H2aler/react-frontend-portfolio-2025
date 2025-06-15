import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;

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

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
`;

const FloatingElement = styled(motion.create('div'))<{ size: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.15;
  transition: {
    duration: 4,
    repeat: Infinity,
    delay: index * 0.3,
    ease: "easeInOut"
  }
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Section = styled(motion.create('section'))`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1.5rem;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  }

  &:hover {
    transform: translateY(-3px) translateZ(0);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }
`;

const Title = styled(motion.create('h2'))`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: var(--text-primary);
  position: relative;
  display: inline-block;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;

  &::after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--accent-color), transparent);
    border-radius: 2px;
  }
`;

const Text = styled(motion.create('p'))`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  text-align: justify;
`;

const SkillsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2.5rem;
`;

const Skill = styled(motion.create('div'))`
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const SkillTitle = styled(motion.create('h4'))`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    width: 3px;
    height: 1.5rem;
    background: var(--accent-color);
    border-radius: 2px;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 1rem;
  position: relative;
  z-index: 1;
`;

const SkillItem = styled(motion.create('li'))`
  font-size: 1.1rem;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.5);
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transform: translateX(3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &::before {
    content: '▹';
    color: var(--accent-color);
    font-size: 1.2rem;
  }
`;

const Timeline = styled.div`
  position: relative;
  padding-left: 3rem;
  margin-top: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: linear-gradient(to bottom, var(--accent-color), var(--primary-color));
    border-radius: 3px;
    transform: translateX(-50%);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  }
`;

const TimelineItem = styled(motion.create('div'))`
  position: relative;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  transition: all 0.2s ease;
  transform-style: preserve-3d;
  perspective: 1000px;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  transform: translateZ(0);
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  &:hover {
    transform: translateX(5px) rotateY(2deg) translateZ(0) scale(1.02);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    filter: contrast(1.1) brightness(1.05);
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  &::before {
    content: '';
    position: absolute;
    left: -3.5rem;
    top: 50%;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
    border: 3px solid white;
    box-shadow: 0 0 0 3px var(--accent-color), 0 0 20px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    transform: translateY(-50%) translateZ(0);
    z-index: 1;
    will-change: transform;
    backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  &:hover::before {
    transform: translateY(-50%) scale(1.2) translateZ(0);
    box-shadow: 0 0 0 4px var(--accent-color), 0 0 30px rgba(0, 0, 0, 0.3);
    filter: contrast(1.2) brightness(1.1);
  }

  &::after {
    content: '';
    position: absolute;
    left: -3.5rem;
    top: 50%;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background: white;
    transform: translateY(-50%) translateZ(0);
    z-index: 2;
    opacity: 0;
    transition: all 0.3s ease;
    will-change: transform, opacity;
    backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  &:hover::after {
    opacity: 1;
    transform: translateY(-50%) scale(1.5) translateZ(0);
    filter: contrast(1.2) brightness(1.1);
  }
`;

const TimelineDate = styled(motion.create('div'))`
  font-size: 1rem;
  color: var(--accent-color);
  font-weight: 700;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 2rem;
  width: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &::before {
    content: '📅';
    font-size: 1.2rem;
  }
`;

const TimelineTitle = styled(motion.create('h4'))`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
  will-change: transform;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  transform: translateZ(0);
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  &::before {
    content: '🎓';
    font-size: 1.2rem;
  }
`;

const TimelineDescription = styled(motion.create('p'))`
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 0.75rem;
  padding-left: 1.5rem;
  position: relative;
  transition: all 0.2s ease;
  will-change: transform;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  transform: translateZ(0);
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;

  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--accent-color);
    font-size: 1.2rem;
  }

  &:hover {
    transform: translateX(3px) translateZ(0);
    color: var(--text-primary);
    filter: contrast(1.1) brightness(1.05);
  }
`;

const About = () => {
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.2
      }
    }
  };

  return (
    <AboutContainer>
      <FloatingElements>
        <FloatingElement
          size={300}
          color="var(--accent-color)"
          animate={{
            x: mousePosition.x * 50,
            y: mousePosition.y * 50,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        />
        <FloatingElement
          size={200}
          color="var(--primary-color)"
          animate={{
            x: -mousePosition.x * 30,
            y: -mousePosition.y * 30,
          }}
          transition={{ type: "spring", stiffness: 100 }}
        />
      </FloatingElements>
      <ContentWrapper>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Section>
            <Title variants={itemVariants}>About Me</Title>
            <Text variants={itemVariants}>
              안녕하세요! 저는 사용자 경험을 중요시하는 프론트엔드 개발자입니다.
              웹 개발에 대한 열정과 창의적인 문제 해결 능력을 바탕으로
              사용자 친화적인 웹 애플리케이션을 개발하고 있습니다.
            </Text>
            <Text variants={itemVariants}>
              새로운 기술을 배우고 적용하는 것을 좋아하며,
              지속적인 성장과 발전을 추구합니다.
              팀 협업을 통해 더 나은 결과물을 만들어내는 것을 즐깁니다.
            </Text>
          </Section>

          <Section>
            <Title variants={itemVariants}>Skills</Title>
            <SkillsContainer>
              <Skill variants={itemVariants}>
                <SkillTitle>Frontend</SkillTitle>
                <SkillList>
                  <SkillItem>React</SkillItem>
                  <SkillItem>TypeScript</SkillItem>
                  <SkillItem>HTML5/CSS3</SkillItem>
                  <SkillItem>JavaScript (ES6+)</SkillItem>
                </SkillList>
              </Skill>
              <Skill variants={itemVariants}>
                <SkillTitle>Styling</SkillTitle>
                <SkillList>
                  <SkillItem>Styled Components</SkillItem>
                  <SkillItem>Emotion</SkillItem>
                  <SkillItem>Tailwind CSS</SkillItem>
                  <SkillItem>SASS/SCSS</SkillItem>
                </SkillList>
              </Skill>
              <Skill variants={itemVariants}>
                <SkillTitle>Tools & Others</SkillTitle>
                <SkillList>
                  <SkillItem>Git</SkillItem>
                  <SkillItem>Webpack</SkillItem>
                  <SkillItem>Vite</SkillItem>
                  <SkillItem>Jest</SkillItem>
                </SkillList>
              </Skill>
            </SkillsContainer>
          </Section>

          <Section>
            <Title variants={itemVariants}>Education & Experience</Title>
            <Timeline>
              <TimelineItem
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.02, rotateY: 2 }}
              >
                <TimelineDate>2024년 09월 01일 - 재직중</TimelineDate>
                <TimelineTitle>한불 언어마을</TimelineTitle>
                <TimelineDescription>웹 개발 및 유지보수</TimelineDescription>
                <TimelineDescription>번역 업무와 웹 개발, 유지보수</TimelineDescription>
                <TimelineDescription>반응형 웹 제작 및 관리</TimelineDescription>
              </TimelineItem>

              <TimelineItem
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.02, rotateY: 2 }}
              >
                <TimelineDate>2023년 4월 - 10월</TimelineDate>
                <TimelineTitle>세아상역(주)</TimelineTitle>
                <TimelineDescription>인턴: 김재현</TimelineDescription>
                <TimelineDescription>MS RPA 개발 및 유지보수</TimelineDescription>
              </TimelineItem>

              <TimelineItem
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.02, rotateY: 2 }}
              >
                <TimelineDate>2020 - 2023</TimelineDate>
                <TimelineTitle>프랑스 라로셸 대학교 공과대학</TimelineTitle>
                <TimelineDescription>전공: 컴퓨터공학</TimelineDescription>
                <TimelineDescription>부전공: 마케팅, 매니지먼트</TimelineDescription>
              </TimelineItem>

              <TimelineItem
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.02, rotateY: 2 }}
              >
                <TimelineDate>2017 - 2020</TimelineDate>
                <TimelineTitle>Fénelon/Vieljeux 고등학교</TimelineTitle>
                <TimelineDescription>전공: 이과 특별전공 - 엔지니어링</TimelineDescription>
                <TimelineDescription>(전기, 물리, Solid Works)</TimelineDescription>
              </TimelineItem>
            </Timeline>
          </Section>
        </motion.div>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About; 