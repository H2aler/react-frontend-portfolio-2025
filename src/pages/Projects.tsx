import { useState, useEffect } from 'react';
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
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-align: center;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  width: 100%;

  .dark & {
    background: linear-gradient(135deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 30px rgba(96, 165, 250, 0.4));
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Description = styled(motion.p)`
  font-size: 1.15rem;
  line-height: 1.8;
  color: var(--text-secondary);
  text-align: center;
  max-width: 700px;
  margin: 0 auto 1.5rem;

  .dark & {
    color: #cbd5e0;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ProjectCount = styled(motion.create('div'))`
  text-align: center;
  font-size: 1rem;
  font-weight: 600;
  color: var(--accent-color);
  margin-bottom: 2rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: inline-block;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  .dark & {
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(96, 165, 250, 0.3);
    color: #93c5fd;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3),
                0 0 20px rgba(96, 165, 250, 0.1);
  }
`;

const ProjectTabs = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  padding: 1.2rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 2rem;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);

  .dark & {
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(30px);
    border: 2px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.7),
                0 0 60px rgba(96, 165, 250, 0.15),
                inset 0 0 40px rgba(96, 165, 250, 0.05);
  }

  @media (max-width: 768px) {
    gap: 0.5rem;
    padding: 1rem;
  }
`;

const ProjectTab = styled(motion.create('button'))<{ active: boolean }>`
  padding: 0.85rem 1.8rem;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, var(--accent-color), var(--primary-color))' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: none;
  border-radius: 1.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  border: 2px solid ${props => props.active ? 'transparent' : 'rgba(var(--accent-color-rgb), 0.2)'};
  position: relative;
  overflow: hidden;
  box-shadow: ${props => props.active 
    ? '0 6px 20px rgba(var(--accent-color-rgb), 0.3)' 
    : '0 4px 15px rgba(0, 0, 0, 0.08)'};
  white-space: nowrap;

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
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: ${props => props.active 
      ? '0 10px 30px rgba(var(--accent-color-rgb), 0.4)' 
      : '0 8px 20px rgba(0, 0, 0, 0.12)'};
  }

  .dark & {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #60a5fa, #3b82f6)' 
      : 'rgba(30, 41, 59, 0.9)'};
    color: ${props => props.active ? '#ffffff' : '#e2e8f0'};
    border: 2px solid ${props => props.active 
      ? 'rgba(96, 165, 250, 0.5)' 
      : 'rgba(96, 165, 250, 0.2)'};
    box-shadow: ${props => props.active
      ? '0 10px 30px rgba(96, 165, 250, 0.5), 0 0 50px rgba(96, 165, 250, 0.25)'
      : '0 6px 20px rgba(0, 0, 0, 0.4)'};
  }

  .dark &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #93c5fd, #60a5fa)' 
      : 'rgba(51, 65, 85, 0.9)'};
    border-color: rgba(96, 165, 250, 0.6);
    box-shadow: ${props => props.active
      ? '0 15px 40px rgba(96, 165, 250, 0.7), 0 0 70px rgba(96, 165, 250, 0.4)'
      : '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 50px rgba(96, 165, 250, 0.2)'};
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }
`;

const ProjectsGrid = styled(motion.create('div'))`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2.5rem;
  margin-top: 2rem;
  perspective: 1000px;
  align-items: stretch;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProjectCard = styled(motion.create('div'))`
  background: rgba(255, 255, 255, 0.98);
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.5);
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
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(var(--accent-color-rgb), 0.1),
      transparent
    );
    transition: 0.6s;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    border-color: rgba(var(--accent-color-rgb), 0.3);
  }

  &:hover::before {
    left: 100%;
  }

  .dark & {
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(30px);
    border: 2px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.7),
                0 0 60px rgba(96, 165, 250, 0.15),
                inset 0 0 40px rgba(96, 165, 250, 0.05);
  }

  .dark &::before {
    background: linear-gradient(
      90deg,
      transparent,
      rgba(96, 165, 250, 0.15),
      transparent
    );
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.6);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.8),
                0 0 80px rgba(96, 165, 250, 0.3),
                inset 0 0 60px rgba(96, 165, 250, 0.08);
    transform: translateY(-12px) scale(1.03);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 220px;
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
    background: linear-gradient(to bottom, transparent 40%, rgba(0, 0, 0, 0.7));
    z-index: 1;
    transition: all 0.3s ease;
  }

  ${ProjectCard}:hover &::before {
    background: linear-gradient(to bottom, transparent 20%, rgba(0, 0, 0, 0.8));
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  ${ProjectCard}:hover img {
    transform: scale(1.1);
  }
`;

const ProjectContent = styled.div`
  padding: 1.8rem;
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
`;

const ProjectTitle = styled(motion.create('h3'))`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--text-primary);
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  flex-shrink: 0;
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    transform: translateX(5px);
  }

  .dark & {
    background: linear-gradient(135deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: drop-shadow(0 0 20px rgba(96, 165, 250, 0.3));
  }
`;

const ProjectDescription = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1.2rem;
  text-align: justify;
  flex: 1;
  overflow-y: auto;
  min-height: 0;

  .dark & {
    color: #cbd5e0;
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
`;

const Tech = styled(motion.create('span'))`
  padding: 0.4rem 0.9rem;
  background: rgba(var(--accent-color-rgb), 0.1);
  color: var(--accent-color);
  border-radius: 1.2rem;
  font-size: 0.85rem;
  font-weight: 600;
  border: 1px solid rgba(var(--accent-color-rgb), 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);

  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 15px rgba(var(--accent-color-rgb), 0.3);
  }

  .dark & {
    background: rgba(96, 165, 250, 0.2);
    color: #93c5fd;
    border: 1px solid rgba(96, 165, 250, 0.4);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4),
                0 0 20px rgba(96, 165, 250, 0.15);
  }

  .dark &:hover {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: #ffffff;
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4),
                0 0 25px rgba(96, 165, 250, 0.3);
  }
`;

const ProjectMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  flex-shrink: 0;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.85rem;

  .dark & {
    color: #cbd5e0;
  }
`;

const MetaIcon = styled.span`
  font-size: 1rem;
  flex-shrink: 0;
`;

const MetaText = styled.span`
  line-height: 1.4;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
  flex-shrink: 0;
`;

const ProjectLink = styled(motion.create('a'))`
  flex: 1;
  padding: 0.7rem 1.2rem;
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  text-decoration: none;
  border: 2px solid var(--accent-color);
  border-radius: 1rem;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  height: 2.8rem;
  min-height: 2.8rem;
  backdrop-filter: blur(10px);

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
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 20px rgba(var(--accent-color-rgb), 0.3);
  }

  svg {
    width: 1.2rem;
    height: 1.2rem;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(3px);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    color: #93c5fd;
    border: 2px solid #60a5fa;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4),
                0 0 20px rgba(96, 165, 250, 0.15);
  }

  .dark &:hover {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: #ffffff;
    border-color: rgba(96, 165, 250, 0.6);
    box-shadow: 0 10px 25px rgba(96, 165, 250, 0.5),
                0 0 40px rgba(96, 165, 250, 0.3);
    transform: translateY(-3px) scale(1.02);
  }
`;

const DemoLink = styled(ProjectLink)`
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  color: white;
  border-color: transparent;

  &:hover {
    background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
    box-shadow: 0 10px 30px rgba(var(--accent-color-rgb), 0.4);
  }

  .dark & {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: #ffffff;
    border: 2px solid rgba(96, 165, 250, 0.5);
    box-shadow: 0 8px 20px rgba(96, 165, 250, 0.4),
                0 0 35px rgba(96, 165, 250, 0.3);
  }

  .dark &:hover {
    background: linear-gradient(135deg, #93c5fd, #60a5fa);
    box-shadow: 0 10px 30px rgba(96, 165, 250, 0.6),
                0 0 50px rgba(96, 165, 250, 0.5);
  }
`;

const GithubLink = styled(ProjectLink)`
  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .dark &:hover {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: #ffffff;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4),
                0 0 30px rgba(96, 165, 250, 0.4);
  }

  &.private {
    cursor: not-allowed;
    opacity: 0.7;
    
    &:hover {
      transform: none;
      background: transparent;
    }

    .dark &:hover {
      transform: none;
      background: transparent;
    }
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
      title: 'React Portfolio 2025',
      description: 'React 18, TypeScript, Emotion을 활용한 현대적인 포트폴리오 웹사이트입니다. Framer Motion으로 부드러운 애니메이션을 구현하고, 다크모드, SEO 최적화, PWA 기능을 지원합니다. Vite 빌드 시스템으로 빠른 개발 환경을 구축했습니다.',
      image: '',
      tech: ['React 18', 'TypeScript', 'Emotion', 'Framer Motion', 'Vite', 'React Router v6'],
      github: 'https://github.com/H2aler/react-frontend-portfolio-2025',
      demo: 'https://h2aler.github.io/react-frontend-portfolio-2025/',
      period: '2024.12 ~ 2025.01',
      role: '풀스택 개발 (개인 프로젝트)',
      category: 'web'
    },
    {
      title: 'Ko.planet - 다국어 번역 시스템',
      description: '한국어, 영어, 프랑스어 간 실시간 번역을 제공하는 AI 기반 번역 시스템입니다. mBART 모델을 학습시켜 ONNX로 최적화하고, Flask 백엔드와 React 프론트엔드로 구성했습니다. Docker Compose로 마이크로서비스 아키텍처를 구현하고, 웹 크롤링을 통한 자동 코퍼스 수집 시스템을 구축했습니다. (Private Repository - 면접 시 데모 가능)',
      image: '',
      tech: ['React 19', 'Flask', 'PyTorch', 'Transformers', 'ONNX', 'Docker', 'Selenium', 'i18n'],
      period: '2024.10 ~ 2024.12',
      role: 'AI 모델 학습, 풀스택 개발',
      category: 'ai'
    },
    {
      title: 'Universe Map - 3D 우주 시뮬레이션',
      description: 'Next.js 15와 Three.js를 활용한 인터랙티브 3D 우주 지도입니다. React Three Fiber로 태양계 행성들을 실시간 렌더링하고, 물리 기반 궤도 운동을 구현했습니다. Tailwind CSS 4.x와 Framer Motion으로 현대적인 UI/UX를 제공하며, 성능 모니터링 시스템을 통합했습니다.',
      image: '',
      tech: ['Next.js 15', 'Three.js', 'React Three Fiber', 'TypeScript', 'Tailwind CSS 4', 'Framer Motion'],
      period: '2024.11 ~ 2024.12',
      role: '3D 그래픽 개발, 프론트엔드 개발',
      category: 'web'
    },
    {
      title: 'AI Vision Advanced - 실시간 객체 인식',
      description: 'TensorFlow.js와 COCO-SSD, MobileNet을 활용한 브라우저 기반 실시간 객체 인식 시스템입니다. Socket.io로 실시간 양방향 통신을 구현하고, Zustand로 상태 관리를 최적화했습니다. React Dropzone으로 이미지 업로드를 지원하며, Express 백엔드와 통합했습니다.',
      image: '',
      tech: ['React', 'TensorFlow.js', 'Socket.io', 'Zustand', 'Express', 'TypeScript', 'Computer Vision'],
      github: 'https://github.com/H2aler/AI_Vision_Advanced',
      demo: 'https://h2aler.github.io/AI_Vision_Advanced/',
      period: '2024.08 ~ 2024.09',
      role: 'AI 비전 시스템 개발, 풀스택 개발',
      category: 'ai'
    },
    {
      title: 'Data Art - 실시간 음향 시각화',
      description: 'Web Audio API와 Canvas를 활용한 실시간 음향 분석 및 시각화 도구입니다. FFT 분석으로 주파수 도메인 처리를 수행하고, 3D 산점도와 큐브로 음향 데이터를 시각화합니다. 스펙트럼 확산, 엔트로피, 주파수 변조 등 고급 음향 분석 기능을 제공합니다.',
      image: '',
      tech: ['JavaScript', 'Web Audio API', 'Canvas API', 'FFT Analysis', '3D Visualization', 'Real-time Processing'],
      period: '2024.08 ~ 2024.08',
      role: '오디오 처리, 데이터 시각화 개발',
      category: 'web'
    },
    {
      title: 'True or False - AI 진실 탐지 시스템',
      description: 'BERT와 다양한 ML 모델을 활용한 AI 기반 진실 탐지 시스템입니다. Flask로 RESTful API를 구축하고, 웹 스크래핑을 통한 실시간 팩트 체킹을 지원합니다. Plotly와 Dash로 분석 결과를 시각화하며, Redis 캐싱과 Prometheus 모니터링을 통합했습니다.',
      image: '',
      tech: ['Python', 'Flask', 'BERT', 'Scikit-learn', 'Plotly', 'Redis', 'Docker', 'NLP'],
      github: 'https://github.com/H2aler/True_or_false',
      period: '2024.07 ~ 2024.09',
      role: 'AI 모델 개발, 백엔드 개발',
      category: 'ai'
    },
    {
      title: 'WebGIS - OpenLayers 지도 서비스',
      description: 'OpenLayers 8.x를 활용한 인터랙티브 WebGIS 시스템입니다. Proj4로 좌표 변환을 처리하고, 거리 계산, 마커 관리, 공간 검색 기능을 구현했습니다. Vite로 빌드 최적화를 진행하고, 반응형 지도 인터페이스를 제공합니다.',
      image: '',
      tech: ['OpenLayers 8', 'Proj4', 'JavaScript', 'Vite', 'Geospatial', 'Location-based Services'],
      github: 'https://github.com/H2aler/WebGIS',
      demo: 'https://h2aler.github.io/WebGIS/',
      period: '2024.09 ~ 2024.10',
      role: 'GIS 개발, 프론트엔드 개발',
      category: 'web'
    },
    {
      title: 'Secret of Maths - 수학 기호 음악 변환',
      description: 'Tesseract.js OCR과 Tone.js를 활용하여 수학 기호를 음악으로 변환하는 AI 시스템입니다. Express 서버로 이미지 처리를 수행하고, Canvas API로 기호를 인식합니다. 각 수학 기호를 고유한 음계와 리듬으로 매핑하여 독특한 음악 경험을 제공합니다.',
      image: '',
      tech: ['Node.js', 'Express', 'Tesseract.js', 'Tone.js', 'Canvas', 'OCR', 'Audio Synthesis'],
      period: '2024.07 ~ 2024.07',
      role: 'OCR 시스템 개발, 오디오 처리',
      category: 'ai'
    },
    {
      title: 'RPA 자동화 시스템',
      description: 'Selenium과 PyAutoGUI를 활용한 웹 및 데스크톱 자동화 시스템입니다. BeautifulSoup4로 웹 스크래핑을 수행하고, Pandas로 Excel 데이터를 처리합니다. Schedule로 작업 스케줄링을 구현하고, Loguru로 상세한 로깅 시스템을 구축했습니다.',
      image: '',
      tech: ['Python', 'Selenium', 'PyAutoGUI', 'BeautifulSoup4', 'Pandas', 'Schedule', 'RPA'],
      period: '2024.06 ~ 2024.07',
      role: 'RPA 시스템 개발, 프로세스 자동화',
      category: 'automation'
    },
    {
      title: 'NowHere - 시뮬레이션 게임',
      description: 'Godot Engine 4.x와 Unity로 개발한 3D 시뮬레이션 게임입니다. GDScript와 C#으로 게임 로직을 구현하고, 고급 AI 시스템, 물리 엔진, 퀘스트 시스템을 통합했습니다. Android와 PC 플랫폼을 지원하며, GitHub Actions로 자동 빌드 파이프라인을 구축했습니다.',
      image: '',
      tech: ['Godot 4', 'Unity', 'GDScript', 'C#', 'Game Physics', 'AI System', 'Mobile Development'],
      period: '2024.05 ~ 2024.08',
      role: '게임 개발, AI 시스템 구현',
      category: 'game'
    },
    {
      title: 'Creation of Adam - 인터랙티브 아트',
      description: 'React와 GSAP, Framer Motion을 활용한 미켈란젤로의 "천지창조" 인터랙티브 웹 경험입니다. 고급 애니메이션 기법으로 예술 작품에 생명을 불어넣고, 사용자 인터랙션에 반응하는 동적 요소들을 구현했습니다. Vite로 최적화된 빌드 환경을 구축했습니다.',
      image: '',
      tech: ['React', 'GSAP', 'Framer Motion', 'JavaScript', 'Vite', 'Interactive Design'],
      period: '2024.05 ~ 2024.05',
      role: '인터랙티브 개발, 애니메이션 구현',
      category: 'web'
    },
    {
      title: 'Lotte Cinema Ticket Checker',
      description: 'React와 TypeScript, Styled Components를 활용한 롯데시네마 영화표 확인 시스템입니다. 반응형 디자인으로 모바일 환경을 최적화하고, Web Vitals로 성능을 모니터링합니다. CRA PWA 템플릿을 사용하여 오프라인 지원을 구현했습니다.',
      image: '',
      tech: ['React', 'TypeScript', 'Styled Components', 'PWA', 'Web Vitals', 'Responsive Design'],
      period: '2024.03 ~ 2024.04',
      role: '프론트엔드 개발',
      category: 'web'
    },
    {
      title: 'HTML5 Portfolio',
      description: 'HTML5와 CSS3를 사용하여 만든 개인 포트폴리오 웹사이트입니다. 순수 JavaScript로 인터랙티브한 UI를 구현하고, 반응형 디자인과 모던한 UI/UX를 적용했습니다. CSS Grid와 Flexbox를 활용한 레이아웃 설계를 진행했습니다.',
      image: '',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      github: 'https://github.com/H2aler/my-frontend-portfolio-2025',
      demo: 'https://h2aler.github.io/my-frontend-portfolio-2025/',
      period: '2024.01 ~ 2024.02',
      role: '프론트엔드 개발 (개인 프로젝트)',
      category: 'web'
    },
    {
      title: 'Secure Future - 2032 보안 통합 관리 시스템',
      description: 'AI 기반 위협 예측, IoT 디바이스 통합 보안, 실시간 DLP 모니터링 등 최신 보안 기술을 통합한 차세대 보안 시스템입니다. Spring Boot와 TensorFlow를 활용해 실시간 네트워크 패턴 분석, 자동 대응 시스템, 동적 보안 정책 적용 등 고도화된 보안 기능을 제공합니다.',
      image: '',
      tech: ['Java', 'Spring Boot', 'TensorFlow', 'JPA/Hibernate', 'H2 Database', 'REST API'],
      github: 'https://github.com/H2aler/secure-future',
      period: '2024.06 ~ 2024.06',
      role: 'Java 백엔드 개발, 프론트엔드 개발',
      category: 'java'
    },
    {
      title: 'AI 오목 게임',
      description: 'HTML5와 JavaScript로 구현된 인공지능 오목 게임입니다. Minimax 알고리즘과 Alpha-Beta Pruning을 활용하여 실시간 게임 상황을 분석하고, 동적으로 게임 보드를 확장하는 독특한 전략을 구사합니다. 완전 반응형 디자인으로 모바일 환경을 최적화했습니다.',
      image: '',
      tech: ['HTML5', 'JavaScript ES6+', 'CSS3', 'Canvas API', 'AI Algorithm', 'Responsive Design'],
      github: 'https://github.com/H2aler/HTML5_AI_GAME_TWO_MOBILE',
      demo: 'https://h2aler.github.io/HTML5_AI_GAME_TWO_MOBILE/',
      period: '2024.04 ~ 2024.04',
      role: 'HTML5 게임 개발, AI 알고리즘 구현',
      category: 'game'
    },
    {
      title: '한불 언어마을 웹사이트',
      description: 'React와 TypeScript를 활용한 다국어 교육 기관 웹사이트입니다. 반응형 디자인으로 모든 디바이스에서 최적의 사용자 경험을 제공하며, 다국어 지원 시스템(한국어/프랑스어)을 구축했습니다. 성능 최적화를 통해 페이지 로딩 속도를 개선하고, SEO 최적화로 검색 엔진 노출을 향상시켰습니다.',
      image: '',
      tech: ['React', 'TypeScript', 'Responsive Design', 'i18n', 'SEO', 'Performance Optimization'],
      period: '2024.09 ~ 현재',
      role: '프론트엔드 개발 및 유지보수',
      category: 'web'
    },
    {
      title: 'Quantum-Neural Visualization Tool',
      description: '양자 신경망을 실시간으로 시각화하는 인터랙티브 웹 애플리케이션입니다. Three.js와 WebGL을 활용하여 복잡한 양자 상태와 신경망 구조를 3D로 렌더링합니다. 사용자가 파라미터를 조정하면 실시간으로 시각화가 업데이트되며, 교육 및 연구 목적으로 활용할 수 있습니다.',
      image: '',
      tech: ['JavaScript', 'Three.js', 'WebGL', 'Canvas API', 'Quantum Computing', 'Neural Networks'],
      github: 'https://github.com/H2aler/quantum-neural-viz',
      demo: 'https://h2aler.github.io/quantum-neural-viz/',
      period: '2024.06 ~ 2024.07',
      role: '3D 시각화 개발, 알고리즘 구현',
      category: 'web'
    },
    {
      title: 'WebGIS React - 지도 서비스 (React)',
      description: 'React와 OpenLayers를 결합한 차세대 WebGIS 시스템입니다. 컴포넌트 기반 아키텍처로 재사용성을 높이고, React Hooks로 상태 관리를 최적화했습니다. 실시간 지도 업데이트, 레이어 관리, 공간 분석 기능을 제공합니다.',
      image: '',
      tech: ['React', 'OpenLayers', 'TypeScript', 'Hooks', 'Geospatial', 'Component Architecture'],
      github: 'https://github.com/H2aler/WebGIS_React',
      demo: 'https://h2aler.github.io/WebGIS_React/',
      period: '2024.10 ~ 2024.11',
      role: 'React GIS 개발, 프론트엔드 개발',
      category: 'web'
    }
  ];

  // 프로젝트 썸네일 자동 로딩 (스크린샷)
  useEffect(() => {
    filteredProjects.forEach(async (project) => {
      const key = project.demo || project.github || '';
      if (key && !thumbnails[key]) {
        const shot = await fetchScreenshot(key);
        if (shot) setThumbnails((prev) => ({ ...prev, [key]: shot }));
      }
    });
    // eslint-disable-next-line
  }, [filter, projects]);

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

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
          다양한 기술 스택과 도메인에서 진행한 프로젝트들입니다
        </Description>
        <ProjectCount
          key={`count-${filter}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          총 {filteredProjects.length}개의 프로젝트
        </ProjectCount>
        <ProjectTabs>
          <ProjectTab
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌐 All Projects
          </ProjectTab>
          <ProjectTab
            active={filter === 'web'}
            onClick={() => setFilter('web')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            💻 Web Development
          </ProjectTab>
          <ProjectTab
            active={filter === 'ai'}
            onClick={() => setFilter('ai')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🤖 AI & ML
          </ProjectTab>
          <ProjectTab
            active={filter === 'game'}
            onClick={() => setFilter('game')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 Game Dev
          </ProjectTab>
          <ProjectTab
            active={filter === 'automation'}
            onClick={() => setFilter('automation')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🔄 RPA
          </ProjectTab>
          <ProjectTab
            active={filter === 'java'}
            onClick={() => setFilter('java')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ☕ Java
          </ProjectTab>
        </ProjectTabs>
        <ProjectsGrid
          key={filter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <ProjectImage>
                <img
                  src={project.github ? getGithubOgImageUrl(project.github) : '/default-thumbnail.jpg'}
                  alt={project.title}
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
                <ProjectMeta>
                  <MetaItem>
                    <MetaIcon>📅</MetaIcon>
                    <MetaText>{project.period}</MetaText>
                  </MetaItem>
                  <MetaItem>
                    <MetaIcon>👤</MetaIcon>
                    <MetaText>{project.role}</MetaText>
                  </MetaItem>
                </ProjectMeta>
                <ProjectLinks>
                  {project.demo && (
                    <DemoLink
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      🚀 Demo
                    </DemoLink>
                  )}
                  {project.github ? (
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
                  ) : (
                    <GithubLink
                      href="#"
                      className="private"
                      onClick={(e: React.MouseEvent) => e.preventDefault()}
                      title="Private Repository - 면접 시 공개 가능"
                    >
                      🔒 Private
                    </GithubLink>
                  )}
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