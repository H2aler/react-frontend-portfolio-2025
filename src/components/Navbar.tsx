import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: var(--transition-normal);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  transition: var(--transition-normal);
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-color);
    transition: width 0.3s ease;
  }

  &:hover {
    color: var(--accent-color);
    &::after {
      width: 100%;
    }
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition-normal);
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background: var(--accent-color);
    transition: width 0.3s ease;
  }

  &.active {
    color: var(--accent-color);
    &::after {
      width: 100%;
    }
  }

  &:hover {
    color: var(--accent-color);
    &::after {
      width: 100%;
    }
  }
`;

const MobileMenuButton = styled(motion.create('button'))`
  display: none;
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  position: relative;
  cursor: pointer;
  padding: 0;
  z-index: 1002;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  span {
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--text-primary);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: center;
  }

  &.open {
    span:nth-of-type(1) {
      transform: translateY(14px) rotate(45deg);
    }
    span:nth-of-type(2) {
      opacity: 0;
      transform: scale(0);
    }
    span:nth-of-type(3) {
      transform: translateY(-14px) rotate(-45deg);
    }
  }
`;

const MobileNav = styled(motion.create('div'))`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 280px;
  background: #ffffff;
  padding: 6rem 2rem 2rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileNavLink = styled(motion.create(Link))`
  color: var(--text-primary);
  text-decoration: none;
  font-size: 1.3rem;
  font-weight: 500;
  padding: 0.8rem 1.2rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--accent-color);
    border-radius: 8px;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: -1;
    transform: scale(0.8);
  }

  &.active {
    color: #ffffff;
    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }

  &:hover {
    color: #ffffff;
    transform: translateX(5px);
    &::before {
      opacity: 1;
      transform: scale(1);
    }
  }

  span {
    font-size: 1.4rem;
    transition: transform 0.3s ease;
  }

  &:hover span {
    transform: scale(1.1);
  }
`;

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // 모바일 메뉴가 열려있을 때 body 스크롤 방지
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { path: '/', label: '홈', icon: '🏠' },
    { path: '/about', label: '소개', icon: '👋' },
    { path: '/projects', label: '프로젝트', icon: '💻' },
    { path: '/contact', label: '연락처', icon: '📧' }
  ];

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      x: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const linkVariants = {
    closed: {
      opacity: 0,
      x: 20,
      scale: 0.95
    },
    open: {
      opacity: 1,
      x: 0,
      scale: 1
    }
  };

  return (
    <NavContainer>
      <NavContent>
        <Logo to="/">Portfolio</Logo>
        <NavLinks>
          {navLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
            >
              {link.label}
            </NavLink>
          ))}
        </NavLinks>
        <MobileMenuButton 
          onClick={toggleMobileMenu}
          className={isMobileMenuOpen ? 'open' : ''}
          whileTap={{ scale: 0.95 }}
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>
      </NavContent>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileNav
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {navLinks.map((link, index) => (
              <MobileNavLink
                key={link.path}
                to={link.path}
                className={location.pathname === link.path ? 'active' : ''}
                onClick={toggleMobileMenu}
                variants={linkVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{link.icon}</span>
                {link.label}
              </MobileNavLink>
            ))}
          </MobileNav>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar; 