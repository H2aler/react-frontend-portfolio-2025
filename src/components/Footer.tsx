import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background: var(--gradient-primary);
  color: white;
  padding: 4rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-accent);
  }
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
`;

const FooterSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FooterTitle = styled.h3`
  color: white;
  font-size: 1.5rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.75rem;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 2px;
    background: var(--accent-color);
  }
`;

const FooterLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all var(--transition-normal);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: white;
    transform: translateX(4px);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const SocialLink = styled.a`
  color: rgba(255, 255, 255, 0.8);
  transition: all var(--transition-normal);
  padding: 0.5rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  
  &:hover {
    color: white;
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
`;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: '연락처',
      links: [
        { label: '이메일', href: 'mailto:max30105@gmail.com', icon: '✉️' },
        { label: '전화번호', href: 'tel:+82-10-7472-8983', icon: '📞' },
        { label: '위치', href: '#', icon: '📍' }
      ]
    },
    {
      title: '소셜 미디어',
      links: [
        { label: 'GitHub', href: 'https://github.com/h2aler/h2aler', icon: 'github' },
        { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jaehyun-kim-b10bb1258/', icon: 'linkedin' }
      ]
    },
    {
      title: '바로가기',
      links: [
        { label: '홈', href: '/react-frontend-portfolio-2025/#/', icon: '🏠' },
        { label: '소개', href: '/react-frontend-portfolio-2025/#/about', icon: '👋' },
        { label: '프로젝트', href: '/react-frontend-portfolio-2025/#/projects', icon: '💻' },
        { label: '연락처', href: '/react-frontend-portfolio-2025/#/contact', icon: '📝' }
      ]
    }
  ];
  
  return (
    <FooterContainer>
      <FooterContent>
        {footerSections.map((section, index) => (
          <FooterSection
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FooterTitle>{section.title}</FooterTitle>
            {section.title === '소셜 미디어' ? (
              <SocialLinks>
                {section.links.map(link => (
                  <SocialLink
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.icon === 'github' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    )}
                    {link.icon === 'linkedin' && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    )}
                  </SocialLink>
                ))}
              </SocialLinks>
            ) : (
              section.links.map(link => (
                <FooterLink
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <span>{link.icon}</span>
                  {link.label}
                </FooterLink>
              ))
            )}
          </FooterSection>
        ))}
      </FooterContent>
      
      <Copyright>
        © {currentYear} Jaehyun KIM. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer; 