import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--navbar-height);
  background-color: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
`;

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  
  span {
    color: var(--text-color);
  }
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileIcon = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: flex;
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-color);
  }
`;

const NavLink = styled(Link)`
  margin-left: 30px;
  color: var(--text-color);
  position: relative;
  transition: color 0.3s ease;
  
  &:hover, &.active {
    color: var(--primary-color);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s ease;
  }
  
  &:hover::after, &.active::after {
    width: 100%;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  width: 100%;
  height: calc(100vh - var(--navbar-height));
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 40px;
  z-index: 99;
`;

const MobileNavLink = styled(Link)`
  margin: 15px 0;
  font-size: 1.2rem;
  color: var(--text-color);
  transition: color 0.3s ease;
  
  &:hover, &.active {
    color: var(--primary-color);
  }
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  useEffect(() => {
    // Close mobile menu when route changes
    setIsOpen(false);
  }, [location]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <NavContainer style={{ 
      background: scrollPosition > 50 ? 'rgba(18, 18, 18, 0.9)' : 'rgba(18, 18, 18, 0)',
      boxShadow: scrollPosition > 50 ? '0 2px 10px rgba(0, 0, 0, 0.3)' : 'none'
    }}>
      <NavContent>
        <Logo to="/">
          Arvind<span>Natarajan</span>
        </Logo>
        
        <LinksContainer>
          <NavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
            Home
          </NavLink>
          <NavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
            About
          </NavLink>
          <NavLink to="/experience" className={location.pathname === '/experience' ? 'active' : ''}>
            Experience
          </NavLink>
          <NavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
            Projects
          </NavLink>
          <NavLink to="/education" className={location.pathname === '/education' ? 'active' : ''}>
            Education
          </NavLink>
          <NavLink to="/skills" className={location.pathname === '/skills' ? 'active' : ''}>
            Skills
          </NavLink>
          <NavLink to="/certifications" className={location.pathname === '/certifications' ? 'active' : ''}>
            Certifications
          </NavLink>
        </LinksContainer>
        
        <MobileIcon onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileIcon>
      </NavContent>
      
      <AnimatePresence>
        {isOpen && (
          <MobileMenu
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100vh - var(--navbar-height))' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MobileNavLink to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </MobileNavLink>
            <MobileNavLink to="/experience" className={location.pathname === '/experience' ? 'active' : ''}>
              Experience
            </MobileNavLink>
            <MobileNavLink to="/projects" className={location.pathname === '/projects' ? 'active' : ''}>
              Projects
            </MobileNavLink>
            <MobileNavLink to="/education" className={location.pathname === '/education' ? 'active' : ''}>
              Education
            </MobileNavLink>
            <MobileNavLink to="/skills" className={location.pathname === '/skills' ? 'active' : ''}>
              Skills
            </MobileNavLink>
            <MobileNavLink to="/certifications" className={location.pathname === '/certifications' ? 'active' : ''}>
              Certifications
            </MobileNavLink>
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
};

export default Navbar; 