import { useState } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 6rem 2rem;
  background: var(--gradient-light);
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

const FloatingElement = styled(motion.div)<{ size: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  filter: blur(40px);
  opacity: 0.15;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Section = styled(motion.section)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1.5rem;
  padding: 2.5rem;
  margin-bottom: 2.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);

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
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
  }

  .dark & {
    background: rgba(30, 41, 59, 0.6);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(96, 165, 250, 0.2);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4),
                0 0 40px rgba(96, 165, 250, 0.1);
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.4);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5),
                0 0 60px rgba(96, 165, 250, 0.2);
  }

  .dark &::before {
    background: linear-gradient(90deg, #60a5fa, #3b82f6);
    box-shadow: 0 0 20px rgba(96, 165, 250, 0.5);
  }
`;

const Title = styled(motion.h2)`
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

  .dark & {
    background: linear-gradient(90deg, #60a5fa, #93c5fd);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 30px rgba(96, 165, 250, 0.3);
  }

  .dark &::after {
    background: linear-gradient(90deg, #60a5fa, transparent);
    box-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
  }
`;

const Text = styled(motion.p)`
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  text-align: justify;

  .dark & {
    color: #e2e8f0;
  }
`;

const ProfileSection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }
`;

const ProfileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border: 1px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5),
                0 0 40px rgba(96, 165, 250, 0.1);
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
                0 0 60px rgba(96, 165, 250, 0.25);
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid rgba(var(--accent-color-rgb), 0.2);

  .dark & {
    border-bottom-color: rgba(96, 165, 250, 0.3);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const ProfileAvatar = styled.div`
  font-size: 5rem;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.15));

  .dark & {
    filter: drop-shadow(0 8px 20px rgba(96, 165, 250, 0.4));
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  .dark & {
    background: linear-gradient(90deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const ProfileTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;

  .dark & {
    color: #cbd5e0;
  }
`;

const ProfileMotto = styled.div`
  font-size: 0.95rem;
  font-style: italic;
  color: var(--text-secondary);
  opacity: 0.8;

  .dark & {
    color: #94a3b8;
  }
`;

const ProfileStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1.5rem;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(var(--accent-color-rgb), 0.05);
  border-radius: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--accent-color-rgb), 0.1);
    transform: translateY(-3px);
  }

  .dark & {
    background: rgba(96, 165, 250, 0.1);
  }

  .dark &:hover {
    background: rgba(96, 165, 250, 0.15);
  }
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;

  .dark & {
    color: #94a3b8;
  }
`;

const StatValue = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);

  .dark & {
    color: #e2e8f0;
  }
`;

const IntroductionCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.9);
    border: 1px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5),
                0 0 40px rgba(96, 165, 250, 0.1);
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
                0 0 60px rgba(96, 165, 250, 0.25);
  }
`;

const IntroTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 1rem;
  margin-top: 1.5rem;

  &:first-of-type {
    margin-top: 0;
  }

  .dark & {
    color: #e2e8f0;
  }
`;

const IntroText = styled.p`
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
  margin-bottom: 1rem;
  text-align: justify;

  .dark & {
    color: #cbd5e0;
  }
`;

const Highlight = styled.span`
  color: var(--accent-color);
  font-weight: 600;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
    opacity: 0.3;
  }

  .dark & {
    color: #93c5fd;
  }

  .dark &::after {
    background: linear-gradient(90deg, #93c5fd, #60a5fa);
  }
`;

const SpecialtyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
`;

const SpecialtyItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(var(--accent-color-rgb), 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(var(--accent-color-rgb), 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(var(--accent-color-rgb), 0.1);
    border-color: rgba(var(--accent-color-rgb), 0.3);
    transform: translateY(-5px);
  }

  .dark & {
    background: rgba(96, 165, 250, 0.1);
    border-color: rgba(96, 165, 250, 0.2);
  }

  .dark &:hover {
    background: rgba(96, 165, 250, 0.15);
    border-color: rgba(96, 165, 250, 0.4);
  }
`;

const SpecialtyIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
`;

const SpecialtyLabel = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;

  .dark & {
    color: #e2e8f0;
  }
`;

const SpecialtyDesc = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;

  .dark & {
    color: #94a3b8;
  }
`;

const SkillsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2.5rem;
`;

const SkillTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 2rem;
`;

const SkillTab = styled(motion.button)<{ active: boolean }>`
  padding: 0.75rem 1.5rem;
  background: ${props => props.active 
    ? 'linear-gradient(135deg, var(--accent-color), var(--primary-color))' 
    : 'rgba(255, 255, 255, 0.8)'};
  color: ${props => props.active ? 'white' : 'var(--text-primary)'};
  border: none;
  border-radius: 2rem;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active 
    ? '0 4px 15px rgba(var(--accent-color-rgb), 0.3)' 
    : '0 2px 8px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(var(--accent-color-rgb), 0.4);
  }

  .dark & {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #60a5fa, #3b82f6)' 
      : 'rgba(30, 41, 59, 0.8)'};
    color: ${props => props.active ? '#ffffff' : '#e2e8f0'};
    box-shadow: ${props => props.active
      ? '0 8px 25px rgba(96, 165, 250, 0.4), 0 0 40px rgba(96, 165, 250, 0.2)'
      : '0 4px 15px rgba(0, 0, 0, 0.3)'};
  }

  .dark &:hover {
    box-shadow: 0 8px 30px rgba(96, 165, 250, 0.5), 0 0 50px rgba(96, 165, 250, 0.3);
  }
`;

const SkillGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const SkillBadge = styled(motion.div)`
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--accent-color-rgb), 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);

  &::before {
    content: '▹';
    color: var(--accent-color);
    font-weight: bold;
    font-size: 1.2rem;
  }

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 20px rgba(var(--accent-color-rgb), 0.2);
    border-color: var(--accent-color);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(96, 165, 250, 0.2);
    color: #e2e8f0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .dark &:hover {
    background: rgba(51, 65, 85, 0.8);
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 0 0 30px rgba(96, 165, 250, 0.2);
  }

  .dark &::before {
    color: #60a5fa;
    text-shadow: 0 0 10px rgba(96, 165, 250, 0.5);
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

  .dark &::before {
    background: linear-gradient(to bottom, #60a5fa, #3b82f6);
    box-shadow: 0 0 30px rgba(96, 165, 250, 0.5);
  }
`;

const TimelineItem = styled(motion.div)`
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

  .dark & {
    background: rgba(30, 41, 59, 0.7);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4),
                0 0 30px rgba(96, 165, 250, 0.1);
  }

  .dark &:hover {
    background: rgba(51, 65, 85, 0.8);
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.5),
                0 0 50px rgba(96, 165, 250, 0.2);
  }

  .dark &::before {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    border-color: #0f172a;
    box-shadow: 0 0 0 3px #60a5fa, 0 0 30px rgba(96, 165, 250, 0.6);
  }

  .dark &:hover::before {
    box-shadow: 0 0 0 4px #60a5fa, 0 0 50px rgba(96, 165, 250, 0.8);
  }
`;

const TimelineDate = styled(motion.div)`
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

  .dark & {
    background: rgba(96, 165, 250, 0.2);
    color: #93c5fd;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3),
                0 0 20px rgba(96, 165, 250, 0.2);
  }
`;

const TimelineTitle = styled(motion.h4)`
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

  .dark & {
    background: linear-gradient(90deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    text-shadow: 0 0 20px rgba(96, 165, 250, 0.4);
  }
`;

const TimelineDescription = styled(motion.p)`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 0.5rem;
  padding-left: 0.5rem;

  .dark & {
    color: #cbd5e0;
  }
`;

const TimelineCategory = styled.div`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--accent-color), var(--primary-color));
  color: white;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 700;
  margin-bottom: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  .dark & {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    box-shadow: 0 4px 12px rgba(96, 165, 250, 0.4);
  }
`;

const TimelineCompany = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const CompanyLogo = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));

  .dark & {
    filter: drop-shadow(0 4px 12px rgba(96, 165, 250, 0.3));
  }
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const TimelinePosition = styled.div`
  font-size: 0.9rem;
  color: var(--text-secondary);
  font-weight: 500;
  margin-top: 0.25rem;

  .dark & {
    color: #94a3b8;
  }
`;

const TimelineTechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const TechBadge = styled.span`
  padding: 0.35rem 0.75rem;
  background: rgba(var(--accent-color-rgb), 0.1);
  color: var(--accent-color);
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  border: 1px solid rgba(var(--accent-color-rgb), 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: var(--accent-color);
    color: white;
    transform: translateY(-2px);
  }

  .dark & {
    background: rgba(96, 165, 250, 0.15);
    color: #93c5fd;
    border: 1px solid rgba(96, 165, 250, 0.3);
  }

  .dark &:hover {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
    color: #ffffff;
  }
`;

const TimelineAchievement = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.05), rgba(var(--primary-color-rgb), 0.05));
  border-left: 3px solid var(--accent-color);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;

  .dark & {
    background: linear-gradient(135deg, rgba(96, 165, 250, 0.1), rgba(59, 130, 246, 0.1));
    border-left-color: #60a5fa;
    color: #e2e8f0;
  }
`;

const AchievementBadge = styled.span`
  padding: 0.25rem 0.75rem;
  background: var(--accent-color);
  color: white;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  white-space: nowrap;

  .dark & {
    background: linear-gradient(135deg, #60a5fa, #3b82f6);
  }
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const AchievementCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-align: center;
  position: relative;
  overflow: hidden;

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
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5),
                0 0 40px rgba(96, 165, 250, 0.1);
  }

  .dark &::before {
    background: linear-gradient(90deg, #60a5fa, #3b82f6);
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
                0 0 60px rgba(96, 165, 250, 0.25);
  }
`;

const AchievementIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));

  .dark & {
    filter: drop-shadow(0 4px 12px rgba(96, 165, 250, 0.3));
  }
`;

const AchievementTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.75rem;
  background: linear-gradient(90deg, var(--accent-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  .dark & {
    background: linear-gradient(90deg, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const AchievementDescription = styled.p`
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;

  .dark & {
    color: #cbd5e0;
  }
`;

const AchievementYear = styled.div`
  font-size: 0.85rem;
  color: var(--accent-color);
  font-weight: 600;
  padding: 0.5rem 1rem;
  background: rgba(var(--accent-color-rgb), 0.1);
  border-radius: 2rem;
  display: inline-block;

  .dark & {
    color: #93c5fd;
    background: rgba(96, 165, 250, 0.15);
  }
`;

const GitHubStatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const GitHubStatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  padding: 1rem;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  overflow: hidden;
  position: relative;

  &:hover {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.7);
    border: 1px solid rgba(96, 165, 250, 0.2);
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.4);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4),
                0 0 20px rgba(96, 165, 250, 0.15);
  }
`;

const StatImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 0.5rem;
  transition: opacity 0.3s ease;
  
  &[loading="lazy"] {
    min-height: 150px;
    background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
    background-size: 200% 100%;
  }

  .dark &[loading="lazy"] {
    background: linear-gradient(90deg, #1e293b 25%, #334155 50%, #1e293b 75%);
    background-size: 200% 100%;
  }
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const ContactCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .dark & {
    background: rgba(30, 41, 59, 0.8);
    border: 1px solid rgba(96, 165, 250, 0.3);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5),
                0 0 40px rgba(96, 165, 250, 0.1);
  }

  .dark &:hover {
    border-color: rgba(96, 165, 250, 0.5);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6),
                0 0 60px rgba(96, 165, 250, 0.25);
  }
`;

const ContactIcon = styled.div`
  font-size: 2.5rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1));
  color: var(--accent-color);

  svg {
    width: 2.5rem;
    height: 2.5rem;
  }

  .dark & {
    color: #60a5fa;
    filter: drop-shadow(0 4px 12px rgba(96, 165, 250, 0.3));
  }
`;

const ContactLabel = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  .dark & {
    color: #94a3b8;
  }
`;

const ContactValue = styled.a`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
  word-break: break-all;
  transition: all 0.3s ease;

  &:hover {
    color: var(--accent-color);
  }

  .dark & {
    color: #e2e8f0;
  }

  .dark &:hover {
    color: #60a5fa;
  }
`;

const ContactDescription = styled.div`
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;

  .dark & {
    color: #94a3b8;
  }
`;

const AvailabilityNote = styled(motion.div)`
  margin-top: 3rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(var(--accent-color-rgb), 0.1), rgba(var(--primary-color-rgb), 0.1));
  border-radius: 1rem;
  border: 2px solid var(--accent-color);
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  line-height: 1.8;

  .dark & {
    background: linear-gradient(135deg, rgba(96, 165, 250, 0.15), rgba(59, 130, 246, 0.15));
    border-color: #60a5fa;
    color: #e2e8f0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5),
                0 0 40px rgba(96, 165, 250, 0.2);
  }
`;

const About = () => {
  const [activeSkillTab, setActiveSkillTab] = useState('frontend');

  const skillsData = {
    frontend: ['React 18/19', 'TypeScript 5.x', 'Next.js 14/15', 'JavaScript ES2024', 'HTML5', 'React Router v6', 'Redux Toolkit', 'Zustand'],
    graphics: ['Three.js', 'React Three Fiber', 'React Three Drei', 'GSAP', 'Framer Motion', 'WebGL Shaders', '3D Scene Management', 'Interactive 3D'],
    game: ['Godot Engine 4.x', 'Unity', 'GDScript', 'C#', 'Game Physics', 'AI Systems', 'Quest Systems', 'Mobile Development'],
    styling: ['CSS3', 'Emotion', 'Styled Components', 'Tailwind CSS 4.x', 'PostCSS', 'SASS/SCSS', 'Responsive Design', 'Lucide React'],
    ai: ['TensorFlow.js', 'PyTorch', 'Transformers', 'ONNX Runtime', 'Hugging Face', 'Computer Vision', 'NLP', 'Neural Machine Translation'],
    backend: ['Node.js', 'Python Flask', 'Java Spring Boot', 'Socket.io', 'RESTful API', 'PostgreSQL', 'SQLAlchemy', 'Redis'],
    realtime: ['WebSocket', 'Web Audio API', 'Tone.js', 'Canvas API', 'WebRTC', 'MediaStream API', 'FFT Analysis', 'Real-time Streaming'],
    gis: ['OpenLayers 8.x', 'Proj4', 'Geospatial Data', 'Map Visualization', 'Location-based Services', 'Distance Calculation', 'Marker Management', 'Spatial Search'],
    rpa: ['Selenium', 'PyAutoGUI', 'BeautifulSoup4', 'Pandas', 'Schedule', 'Loguru', 'WebDriver Manager', 'Process Automation'],
    data: ['NumPy', 'Pandas', 'Plotly & Dash', 'Matplotlib', 'Data Preprocessing', 'Statistical Analysis', 'Time Series', 'Data Pipeline'],
    devops: ['Docker', 'Docker Compose', 'Nginx', 'GitHub Actions', 'Gunicorn', 'Prometheus', 'dotenv', 'AWS/Azure/GCP'],
    tools: ['Vite 5.x', 'Webpack 5', 'npm/yarn/pnpm', 'ESLint', 'Git & GitHub', 'Nodemon', 'ts-node', 'Chrome DevTools'],
    testing: ['Pytest', 'Jest', 'Black & Flake8', 'MyPy', 'TDD', 'Integration Testing', 'Code Coverage', 'Performance Testing'],
    security: ['JWT', 'Flask-JWT-Extended', 'Flask-Bcrypt', 'OAuth 2.0', 'CORS', 'Session Management', 'API Security', 'Rate Limiting'],
    i18n: ['Flask-Babel', 'SentencePiece', 'Multi-language Support', 'Translation Models', 'Corpus Collection', 'Language Detection', 'RTL Support', 'Localization'],
    performance: ['Web Vitals', 'Code Splitting', 'SEO Optimization', 'PWA', 'Image Optimization', 'Bundle Optimization', 'Caching Strategies', 'Model Quantization']
  };

  const skillCategories = [
    { id: 'frontend', label: 'Frontend', icon: '💻' },
    { id: 'graphics', label: '3D Graphics', icon: '🎨' },
    { id: 'game', label: 'Game Dev', icon: '🎮' },
    { id: 'styling', label: 'Styling', icon: '✨' },
    { id: 'ai', label: 'AI & ML', icon: '🤖' },
    { id: 'backend', label: 'Backend', icon: '🔧' },
    { id: 'realtime', label: 'Real-time', icon: '⚡' },
    { id: 'gis', label: 'GIS', icon: '🗺️' },
    { id: 'rpa', label: 'RPA', icon: '🔄' },
    { id: 'data', label: 'Data Science', icon: '📊' },
    { id: 'devops', label: 'DevOps', icon: '🚀' },
    { id: 'tools', label: 'Tools', icon: '🛠️' },
    { id: 'testing', label: 'Testing', icon: '🧪' },
    { id: 'security', label: 'Security', icon: '🔐' },
    { id: 'i18n', label: 'i18n', icon: '🌍' },
    { id: 'performance', label: 'Performance', icon: '⚡' }
  ];

  const floatingElements = [
    { size: 200, color: '#FF6B6B', x: 10, y: 20 },
    { size: 150, color: '#4ECDC4', x: 80, y: 60 },
    { size: 180, color: '#45B7D1', x: 40, y: 80 }
  ];

  return (
    <AboutContainer>
      <FloatingElements>
        {floatingElements.map((element, index) => (
          <FloatingElement
            key={index}
            size={element.size}
            color={element.color}
            animate={{
              x: [element.x, element.x + 20, element.x],
              y: [element.y, element.y + 20, element.y],
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
        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>About Me</Title>
          
          <ProfileSection>
            <ProfileCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ProfileHeader>
                <ProfileAvatar>👨‍💻</ProfileAvatar>
                <ProfileInfo>
                  <ProfileName>김재현 (KIM JAEHYUN)</ProfileName>
                  <ProfileTitle>Frontend Developer | Full-Stack Enthusiast</ProfileTitle>
                  <ProfileMotto>"강점을 창조하는 개발자 · Creating Strength from Weakness"</ProfileMotto>
                </ProfileInfo>
              </ProfileHeader>

              <ProfileStats>
                <StatItem>
                  <StatIcon>🎓</StatIcon>
                  <StatLabel>Education</StatLabel>
                  <StatValue>프랑스 대학교 졸업</StatValue>
                </StatItem>
                <StatItem>
                  <StatIcon>💼</StatIcon>
                  <StatLabel>Experience</StatLabel>
                  <StatValue>2년+ 개발 경력</StatValue>
                </StatItem>
                <StatItem>
                  <StatIcon>🌍</StatIcon>
                  <StatLabel>Languages</StatLabel>
                  <StatValue>한국어, 영어, 프랑스어</StatValue>
                </StatItem>
                <StatItem>
                  <StatIcon>🚀</StatIcon>
                  <StatLabel>Projects</StatLabel>
                  <StatValue>18+ 프로젝트</StatValue>
                </StatItem>
              </ProfileStats>
            </ProfileCard>

            <IntroductionCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <IntroTitle>🎯 Who Am I?</IntroTitle>
              <IntroText>
                안녕하세요! 저는 <Highlight>최신 웹 기술에 열정</Highlight>을 가진 프론트엔드 개발자입니다. 
                한국에서 중학교를 졸업한 후 <Highlight>프랑스에서 고등학교와 대학교를 졸업</Highlight>하며 
                글로벌 관점과 다문화 경험을 쌓았습니다.
              </IntroText>
              
              <IntroTitle>💡 What I Do?</IntroTitle>
              <IntroText>
                사용자 중심의 직관적인 인터페이스와 <Highlight>성능 최적화</Highlight>를 통해 
                탁월한 사용자 경험을 제공하는 것을 목표로 합니다. 
                <Highlight>React 생태계와 TypeScript</Highlight>를 활용한 현대적인 웹 애플리케이션 개발에 
                전문성을 가지고 있으며, AI/ML, 3D Graphics, Game Development 등 
                다양한 도메인에서 프로젝트 경험을 보유하고 있습니다.
              </IntroText>

              <IntroTitle>🚀 My Vision</IntroTitle>
              <IntroText>
                지속적인 학습과 기술 혁신을 통해 더 나은 개발자로 성장하고 있으며, 
                <Highlight>풀스택 개발자</Highlight>로서의 역량을 확장해 나가고 있습니다. 
                팀과의 협업을 통해 시너지를 창출하고, 사용자에게 가치를 전달하는 
                서비스를 만드는 것이 저의 목표입니다.
              </IntroText>

              <SpecialtyGrid>
                <SpecialtyItem>
                  <SpecialtyIcon>🎨</SpecialtyIcon>
                  <SpecialtyLabel>UI/UX Design</SpecialtyLabel>
                  <SpecialtyDesc>현대적이고 직관적인 인터페이스</SpecialtyDesc>
                </SpecialtyItem>
                <SpecialtyItem>
                  <SpecialtyIcon>⚡</SpecialtyIcon>
                  <SpecialtyLabel>Performance</SpecialtyLabel>
                  <SpecialtyDesc>최적화된 빠른 웹 애플리케이션</SpecialtyDesc>
                </SpecialtyItem>
                <SpecialtyItem>
                  <SpecialtyIcon>🤝</SpecialtyIcon>
                  <SpecialtyLabel>Collaboration</SpecialtyLabel>
                  <SpecialtyDesc>효과적인 팀워크와 커뮤니케이션</SpecialtyDesc>
                </SpecialtyItem>
                <SpecialtyItem>
                  <SpecialtyIcon>📚</SpecialtyIcon>
                  <SpecialtyLabel>Continuous Learning</SpecialtyLabel>
                  <SpecialtyDesc>끊임없는 학습과 기술 탐구</SpecialtyDesc>
                </SpecialtyItem>
              </SpecialtyGrid>
            </IntroductionCard>
          </ProfileSection>
        </Section>

        <Section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>Skills</Title>
          <SkillsContainer>
            <SkillTabs>
              {skillCategories.map((category) => (
                <SkillTab
                  key={category.id}
                  active={activeSkillTab === category.id}
                  onClick={() => setActiveSkillTab(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon} {category.label}
                </SkillTab>
              ))}
            </SkillTabs>
            
            <SkillGrid
              key={activeSkillTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              {skillsData[activeSkillTab as keyof typeof skillsData]?.map((skill, index) => (
                <SkillBadge
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </SkillBadge>
              ))}
            </SkillGrid>
          </SkillsContainer>
        </Section>

        <Section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Title>Education & Experience</Title>
          <Timeline>
            <TimelineItem
              whileHover={{ x: 5, scale: 1.02, rotateY: 2 }}
            >
              <TimelineCategory>💼 Experience</TimelineCategory>
              <TimelineDate>2024년 09월 - 현재</TimelineDate>
              <TimelineCompany>
                <CompanyLogo>🏢</CompanyLogo>
                <CompanyInfo>
                  <TimelineTitle>한불 언어마을</TimelineTitle>
                  <TimelinePosition>프론트엔드 개발자 & 번역가</TimelinePosition>
                </CompanyInfo>
              </TimelineCompany>
              <TimelineTechStack>
                <TechBadge>React</TechBadge>
                <TechBadge>TypeScript</TechBadge>
                <TechBadge>i18n</TechBadge>
                <TechBadge>Git</TechBadge>
              </TimelineTechStack>
              <TimelineDescription>✨ React 기반 반응형 웹 애플리케이션 개발 및 유지보수</TimelineDescription>
              <TimelineDescription>✨ TypeScript를 활용한 타입 안정성 확보 및 코드 품질 향상</TimelineDescription>
              <TimelineDescription>✨ 성능 최적화 및 사용자 경험(UX) 개선 작업</TimelineDescription>
              <TimelineDescription>✨ 다국어 지원 시스템 구축 및 번역 업무 병행</TimelineDescription>
              <TimelineDescription>✨ Git을 통한 버전 관리 및 협업 워크플로우 구축</TimelineDescription>
              <TimelineAchievement>
                <AchievementBadge>🎯 주요 성과</AchievementBadge>
                <span>웹사이트 성능 30% 향상 | 다국어 지원 시스템 구축 완료</span>
              </TimelineAchievement>
            </TimelineItem>

            <TimelineItem
              whileHover={{ x: 5, scale: 1.02, rotateY: 2 }}
            >
              <TimelineCategory>💼 Experience</TimelineCategory>
              <TimelineDate>2023년 04월 - 10월 (6개월)</TimelineDate>
              <TimelineCompany>
                <CompanyLogo>🏭</CompanyLogo>
                <CompanyInfo>
                  <TimelineTitle>세아상역(주)</TimelineTitle>
                  <TimelinePosition>개발 인턴</TimelinePosition>
                </CompanyInfo>
              </TimelineCompany>
              <TimelineTechStack>
                <TechBadge>Power Automate</TechBadge>
                <TechBadge>RPA</TechBadge>
                <TechBadge>Automation</TechBadge>
                <TechBadge>Agile</TechBadge>
              </TimelineTechStack>
              <TimelineDescription>✨ Microsoft Power Automate를 활용한 RPA 솔루션 개발</TimelineDescription>
              <TimelineDescription>✨ 업무 자동화 프로세스 설계 및 구현</TimelineDescription>
              <TimelineDescription>✨ 기존 시스템 유지보수 및 성능 개선</TimelineDescription>
              <TimelineDescription>✨ 사내 업무 효율성 향상을 위한 자동화 도구 제작</TimelineDescription>
              <TimelineAchievement>
                <AchievementBadge>🎯 주요 성과</AchievementBadge>
                <span>업무 자동화로 처리 시간 50% 단축 | 추천서 보유</span>
              </TimelineAchievement>
            </TimelineItem>

            <TimelineItem
              whileHover={{ x: 5, scale: 1.02, rotateY: 2 }}
            >
              <TimelineCategory>🎓 Education</TimelineCategory>
              <TimelineDate>2020년 09월 - 2023년 06월</TimelineDate>
              <TimelineCompany>
                <CompanyLogo>🇫🇷</CompanyLogo>
                <CompanyInfo>
                  <TimelineTitle>프랑스 라로셸 대학교 공과대학</TimelineTitle>
                  <TimelinePosition>La Rochelle Université - Institut Universitaire de Technologie</TimelinePosition>
                </CompanyInfo>
              </TimelineCompany>
              <TimelineTechStack>
                <TechBadge>Computer Science</TechBadge>
                <TechBadge>Marketing</TechBadge>
                <TechBadge>Management</TechBadge>
              </TimelineTechStack>
              <TimelineDescription>✨ 전공: 컴퓨터공학 (Computer Science)</TimelineDescription>
              <TimelineDescription>✨ 부전공: 마케팅, 매니지먼트</TimelineDescription>
              <TimelineDescription>✨ 웹 개발, 알고리즘, 데이터베이스, 소프트웨어 공학 이수</TimelineDescription>
              <TimelineDescription>✨ 팀 프로젝트를 통한 협업 및 문제 해결 능력 배양</TimelineDescription>
              <TimelineAchievement>
                <AchievementBadge>🏆 학위</AchievementBadge>
                <span>공과대학 학사 학위 취득 | 프랑스어 능통</span>
              </TimelineAchievement>
            </TimelineItem>

            <TimelineItem
              whileHover={{ x: 5, scale: 1.02, rotateY: 2 }}
            >
              <TimelineCategory>🎓 Education</TimelineCategory>
              <TimelineDate>2017년 09월 - 2020년 06월</TimelineDate>
              <TimelineCompany>
                <CompanyLogo>🇫🇷</CompanyLogo>
                <CompanyInfo>
                  <TimelineTitle>Fénelon/Vieljeux 고등학교</TimelineTitle>
                  <TimelinePosition>Lycée Fénelon Notre-Dame de La Rochelle (프랑스)</TimelinePosition>
                </CompanyInfo>
              </TimelineCompany>
              <TimelineTechStack>
                <TechBadge>Engineering</TechBadge>
                <TechBadge>Physics</TechBadge>
                <TechBadge>CAD/CAM</TechBadge>
              </TimelineTechStack>
              <TimelineDescription>✨ 전공: 이과 특별전공 - 엔지니어링 과학 (Sciences de l'Ingénieur)</TimelineDescription>
              <TimelineDescription>✨ 전기공학, 물리학, CAD/CAM (SolidWorks) 학습</TimelineDescription>
              <TimelineDescription>✨ 논리적 사고와 문제 해결 능력의 기초 확립</TimelineDescription>
              <TimelineAchievement>
                <AchievementBadge>🏆 졸업</AchievementBadge>
                <span>바칼로레아(Baccalauréat) 취득 | 공학 기초 확립</span>
              </TimelineAchievement>
            </TimelineItem>
          </Timeline>
        </Section>

        {/* Achievements Section */}
        <Section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Title>Achievements & Highlights</Title>
          <AchievementsGrid>
            <AchievementCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementIcon>🎓</AchievementIcon>
              <AchievementTitle>프랑스 대학교 졸업</AchievementTitle>
              <AchievementDescription>
                프랑스 라로셸 대학교 공과대학 컴퓨터공학 전공 졸업
              </AchievementDescription>
              <AchievementYear>2020 - 2023</AchievementYear>
            </AchievementCard>

            <AchievementCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementIcon>🌍</AchievementIcon>
              <AchievementTitle>3개 국어 능통</AchievementTitle>
              <AchievementDescription>
                한국어(Native), 영어(Fluent), 프랑스어(Fluent)
              </AchievementDescription>
              <AchievementYear>글로벌 커뮤니케이션</AchievementYear>
            </AchievementCard>

            <AchievementCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementIcon>💼</AchievementIcon>
              <AchievementTitle>세아상역 인턴십</AchievementTitle>
              <AchievementDescription>
                RPA 솔루션 개발 및 업무 자동화 시스템 구축
              </AchievementDescription>
              <AchievementYear>2023.04 - 10</AchievementYear>
            </AchievementCard>

            <AchievementCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementIcon>🚀</AchievementIcon>
              <AchievementTitle>18개+ 프로젝트</AchievementTitle>
              <AchievementDescription>
                Web, AI/ML, Game, RPA 등 다양한 도메인의 프로젝트 경험
              </AchievementDescription>
              <AchievementYear>2024 - 현재</AchievementYear>
            </AchievementCard>

            <AchievementCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementIcon>💻</AchievementIcon>
              <AchievementTitle>풀스택 개발 역량</AchievementTitle>
              <AchievementDescription>
                Frontend (React, TypeScript) + Backend (Node.js, Flask, Spring Boot)
              </AchievementDescription>
              <AchievementYear>전문 기술 스택</AchievementYear>
            </AchievementCard>

            <AchievementCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AchievementIcon>🎨</AchievementIcon>
              <AchievementTitle>현대적 UI/UX</AchievementTitle>
              <AchievementDescription>
                Framer Motion, Three.js, GSAP 등 최신 애니메이션 라이브러리 활용
              </AchievementDescription>
              <AchievementYear>디자인 시스템</AchievementYear>
            </AchievementCard>
          </AchievementsGrid>
        </Section>

        {/* GitHub Stats Section - Compact */}
        <Section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Title>GitHub Stats</Title>
          <GitHubStatsGrid>
            <GitHubStatCard
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <StatImage
                src="https://github-readme-stats.vercel.app/api?username=H2aler&show_icons=true&theme=radical&hide_border=true&bg_color=0d1117&title_color=60a5fa&icon_color=60a5fa&text_color=e2e8f0"
                alt="GitHub Stats"
                loading="lazy"
                decoding="async"
              />
            </GitHubStatCard>

            <GitHubStatCard
              whileHover={{ y: -3, scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <StatImage
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=H2aler&layout=compact&theme=radical&hide_border=true&bg_color=0d1117&title_color=60a5fa&text_color=e2e8f0&langs_count=6"
                alt="Top Languages"
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // API 실패 시 즉시 fallback UI 표시 (재시도 없음)
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.langs-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'langs-fallback';
                    // 다크 모드 감지
                    const isDark = document.documentElement.classList.contains('dark');
                    const textColor = isDark ? '#e2e8f0' : 'var(--text-secondary)';
                    const primaryColor = isDark ? '#f8fafc' : 'var(--text-primary)';
                    const linkColor = isDark ? '#60a5fa' : '#60a5fa';
                    
                    fallback.style.cssText = `
                      padding: 2rem;
                      text-align: center;
                      color: ${textColor};
                      min-height: 150px;
                      display: flex;
                      flex-direction: column;
                      justify-content: center;
                      align-items: center;
                    `;
                    fallback.innerHTML = `
                      <div style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.8;">💻</div>
                      <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 0.75rem; color: ${primaryColor};">Top Languages</div>
                      <div style="font-size: 0.95rem; line-height: 1.8; opacity: 0.9;">
                        <div style="margin-bottom: 0.5rem;">TypeScript</div>
                        <div style="margin-bottom: 0.5rem;">JavaScript</div>
                        <div style="margin-bottom: 0.5rem;">Python</div>
                        <div style="margin-bottom: 0.5rem;">Java</div>
                        <div style="font-size: 0.85rem; margin-top: 1rem; opacity: 0.7;">
                          <a href="https://github.com/H2aler?tab=repositories" 
                             target="_blank" 
                             rel="noopener noreferrer" 
                             style="color: ${linkColor}; text-decoration: none; transition: opacity 0.2s;">
                            저장소에서 확인 →
                          </a>
                        </div>
                      </div>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
            </GitHubStatCard>
          </GitHubStatsGrid>
        </Section>

        {/* Contact & Availability Section */}
        <Section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Title>Contact & Availability</Title>
          <ContactGrid>
            <ContactCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ContactIcon>📧</ContactIcon>
              <ContactLabel>Email</ContactLabel>
              <ContactValue href="max30105@gmail.com">
                max30105@gmail.com  
              </ContactValue>
              <ContactDescription>업무 관련 문의 환영합니다</ContactDescription>
            </ContactCard>

            <ContactCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ContactIcon>📱</ContactIcon>
              <ContactLabel>Phone</ContactLabel>
              <ContactValue href="tel:+821074728983">
                +82 10-7472-8983
              </ContactValue>
              <ContactDescription>평일 09:00 - 18:00</ContactDescription>
            </ContactCard>

            <ContactCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ContactIcon>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </ContactIcon>
              <ContactLabel>LinkedIn</ContactLabel>
              <ContactValue href="https://www.linkedin.com/in/jaehyun-kim-b10bb1258/" target="_blank" rel="noopener noreferrer">
              https://www.linkedin.com/in/jaehyun-kim-b10bb1258/
              </ContactValue>
              <ContactDescription>프로페셔널 네트워크</ContactDescription>
            </ContactCard>

            <ContactCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ContactIcon>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </ContactIcon>
              <ContactLabel>GitHub</ContactLabel>
              <ContactValue href="https://github.com/H2aler" target="_blank" rel="noopener noreferrer">
                github.com/H2aler
              </ContactValue>
              <ContactDescription>27개 공개 저장소</ContactDescription>
            </ContactCard>

            <ContactCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ContactIcon>📍</ContactIcon>
              <ContactLabel>Location</ContactLabel>
              <ContactValue as="div">
                서울, 대한민국
              </ContactValue>
              <ContactDescription>재택/출근 협의 가능</ContactDescription>
            </ContactCard>

            <ContactCard
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <ContactIcon>⏰</ContactIcon>
              <ContactLabel>Availability</ContactLabel>
              <ContactValue as="div">
                즉시 근무 가능
              </ContactValue>
              <ContactDescription>협의 후 시작일 조정 가능</ContactDescription>
            </ContactCard>
          </ContactGrid>

          <AvailabilityNote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            💼 풀타임 정규직 포지션을 찾고 있습니다. 프론트엔드 또는 풀스택 개발자로 성장할 수 있는 기회를 기대합니다!
          </AvailabilityNote>
        </Section>
      </ContentWrapper>
    </AboutContainer>
  );
};

export default About; 