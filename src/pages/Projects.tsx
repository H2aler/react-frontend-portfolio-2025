import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useState as useReactState } from 'react';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, var(--background-color), var(--background-secondary));
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

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

const ProjectsContent = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
`;

const Description = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
`;

const FilterContainer = styled(motion.create('div'))`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
`;

const FilterButton = styled(motion.create('button'))<{ active: boolean }>`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: none;
  border-radius: 1.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  perspective: 1000px;
  align-items: stretch;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProjectCard = styled(motion.create('div'))`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  position: relative;
  transform-style: preserve-3d;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 550px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 0;
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 180px;
  position: relative;
  overflow: hidden;
  flex-shrink: 0;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.5));
    z-index: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProjectContent = styled.div`
  padding: 1.25rem;
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ProjectTitle = styled(motion.create('h3'))`
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: var(--text-primary);
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const ProjectDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  text-align: justify;
  flex: 1;
  overflow-y: auto;
  min-height: 0;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
`;

const Tech = styled(motion.create('span'))`
  padding: 0.35rem 0.75rem;
  background: rgba(var(--accent-color-rgb), 0.08);
  color: var(--accent-color);
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  border: 1px solid rgba(var(--accent-color-rgb), 0.15);
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  flex-shrink: 0;
`;

const ProjectLink = styled(motion.create('a'))`
  flex: 1;
  padding: 0.5rem 1rem;
  background: transparent;
  color: var(--text-primary);
  text-decoration: none;
  border: 1.5px solid var(--accent-color);
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  height: 2.5rem;
  min-height: 2.5rem;

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
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  svg {
    width: 1.1rem;
    height: 1.1rem;
  }
`;

const DemoLink = styled(ProjectLink)`
  background: var(--accent-color);
  color: white;

  &:hover {
    background: var(--primary-color);
  }
`;

const GithubLink = styled(ProjectLink)`
  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

// demo 링크의 첫 화면을 스크린샷으로 가져오는 유틸 함수
async function fetchScreenshot(url: string): Promise<string | null> {
  try {
    const res = await fetch(`/api/screenshot?url=${encodeURIComponent(url)}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.screenshot || null;
  } catch {
    return null;
  }
}

// GitHub 저장소의 og:image(OpenGraph) URL 생성 함수
function getGithubOgImageUrl(githubUrl: string): string {
  try {
    const url = new URL(githubUrl);
    const [owner, repo] = url.pathname.replace(/^\//, '').split('/');
    if (owner && repo) {
      return `https://opengraph.githubassets.com/1/${owner}/${repo}`;
    }
    return '/default-thumbnail.jpg';
  } catch {
    return '/default-thumbnail.jpg';
  }
}

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [thumbnails, setThumbnails] = useReactState<{ [key: string]: string }>({});

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

  const projects = [
    {
      title: 'HTML5 Portfolio',
      description: 'HTML5와 CSS3를 사용하여 만든 개인 포트폴리오 웹사이트입니다. 반응형 디자인과 모던한 UI/UX를 구현했습니다.',
      image: '',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      github: 'https://github.com/H2aler/my-frontend-portfolio-2025',
      demo: 'https://h2aler.github.io/my-frontend-portfolio-2025/',
      period: '2024.01 ~ 2024.02',
      role: '개인 프로젝트',
      category: 'web'
    },
    {
      title: 'Secure Future - 2032 보안 통합 관리 시스템',
      description: 'AI 기반 위협 예측, IoT 디바이스 통합 보안, 실시간 DLP 모니터링 등 최신 보안 기술을 통합한 차세대 보안 시스템입니다. Spring Boot와 TensorFlow를 활용해 실시간 네트워크 패턴 분석, 자동 대응, 동적 보안 정책 적용 등 고도화된 보안 기능을 제공합니다.',
      image: '',
      tech: ['Java', 'Spring Boot', 'TensorFlow', 'JPA/Hibernate', 'H2 Database', 'Lombok'],
      github: 'https://github.com/H2aler/secure-future',
      period: '2025.06.05 ~ 2025.06.09',
      role: 'Java 개발, 프론트엔드 개발',
      category: 'java'
    },
    {
      title: 'AI 오목',
      description: 'HTML5와 JavaScript로 구현된 인공지능 오목 게임입니다. 플레이어는 AI와 대결하며, 다양한 난이도에서 도전할 수 있습니다. 특히 고급 AI는 실시간 게임 상황을 분석하여 동적으로 게임 보드를 확장하는 독특한 전략을 구사합니다.',
      image: '',
      tech: ['HTML5', 'JavaScript', 'CSS3', 'responsive website'],
      demo: 'https://h2aler.github.io/HTML5_AI_GAME_TWO_MOBILE/',
      github: 'https://github.com/H2aler/HTML5_AI_GAME_TWO_MOBILE',
      period: '2025.04.16 ~ 2025.04.17',
      role: 'HTML5 게임 개발, 프론트엔드 개발',
      category: 'web'
    }
  ];

  // 프로젝트 썸네일 자동 로딩 (스크린샷)
  useEffect(() => {
    filteredProjects.forEach(async (project) => {
      const key = project.demo || project.github;
      if (!thumbnails[key]) {
        const shot = await fetchScreenshot(project.demo || project.github);
        if (shot) setThumbnails((prev) => ({ ...prev, [key]: shot }));
      }
    });
    // eslint-disable-next-line
  }, [filter, projects]);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
    <ProjectsContainer>
      <FloatingElements>
        <FloatingElement
          size={300}
          color="var(--accent-color)"
          animate={{
            x: mousePosition.x * 100,
            y: mousePosition.y * 100,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <FloatingElement
          size={200}
          color="var(--primary-color)"
          animate={{
            x: -mousePosition.x * 50,
            y: -mousePosition.y * 50,
          }}
          transition={{ type: "spring", stiffness: 50 }}
        />
      </FloatingElements>
      <ProjectsContent>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects
        </Title>
        <Description
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          
        </Description>
        <FilterContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <FilterButton
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All Projects
          </FilterButton>
          <FilterButton
            active={filter === 'web'}
            onClick={() => setFilter('web')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Web Development
          </FilterButton>
          <FilterButton
            active={filter === 'java'}
            onClick={() => setFilter('java')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Java
          </FilterButton>
        </FilterContainer>
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <ProjectImage>
                <img
                  src={project.github ? getGithubOgImageUrl(project.github) : '/default-thumbnail.jpg'}
                  alt={project.title}
                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
              </ProjectImage>
              <ProjectContent>
                <ProjectTitle
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {project.title}
                </ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.tech.map((tech, techIndex) => (
                    <Tech
                      key={techIndex}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {tech}
                    </Tech>
                  ))}
                </TechStack>
                <div style={{ marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <span>기간: {project.period}</span> | <span>역할: {project.role}</span>
                </div>
                <ProjectLinks>
                  {project.demo && (
                    <DemoLink
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Demo
                    </DemoLink>
                  )}
                  <GithubLink
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </GithubLink>
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Projects; 