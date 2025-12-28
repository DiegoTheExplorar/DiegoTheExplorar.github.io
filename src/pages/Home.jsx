import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Typewriter from '../components/TypewriterText';
import ThreeParticles from '../components/ThreeParticles';


const HomeContainer = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 20px;
  position: relative;
  overflow: hidden;
  z-index: 1;

  @media screen and (min-width: 768px) {
    padding: 0 50px;
  }
`;

const HomeContent = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Name = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: var(--text-color);

  @media screen and (max-width: 768px) {
    font-size: 3rem;
  }

  @media screen and (max-width: 480px) {
    font-size: 2.5rem;
  }
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 20px;
  background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TypewriterContainer = styled(motion.div)`
  margin-bottom: 40px;
  text-align: center;
  font-size: 1.8rem;
  color: var(--primary-color);
  min-height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  .typewriter-cursor {
    border-right: 3px solid var(--primary-color);
    padding-right: 3px;
    animation: blinkCursor 0.8s step-end infinite;
    margin-left: 2px;
  }

  @keyframes blinkCursor {
    from, to { border-color: transparent }
    50% { border-color: var(--primary-color) }
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    min-height: 40px;
  }
`;

const IntroText = styled(motion.div)`
  max-width: 600px;
  margin: 40px auto;
  font-size: 1.2rem;
  line-height: 1.7;
  text-align: center;
  color: var(--text-secondary-color);

  @media screen and (max-width: 480px) {
    font-size: 1rem;
  }
`;

const HintText = styled(motion.p)`
  margin-top: 30px;
  font-size: 0.9rem;
  color: var(--accent-color);
  opacity: 0.7;
  font-style: italic;
  
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
  flex-wrap: wrap;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
`;

const Button = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 25px;
  border-radius: 5px;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  cursor: pointer;

  &.primary {
    background-color: var(--primary-color);
    color: var(--button-text-color, var(--secondary-color));

    &:hover {
      background-color: var(--accent-color);
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  }

  &.secondary {
    border: 2px solid var(--primary-color);
    color: var(--primary-color);
    background-color: transparent;

    &:hover {
      background-color: rgba(97, 219, 251, 0.1);
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  }

  svg {
    margin-left: 8px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(5px);
  }
`;

const BackgroundDecoration = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 40%;
  height: 70%;
  background: radial-gradient(circle, rgba(97, 219, 251, 0.1) 0%, rgba(18, 18, 18, 0) 70%);
  z-index: 0;
  pointer-events: none;

  @media screen and (max-width: 768px) {
    width: 60%;
    height: 40%;
  }
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/common/SEO';
import ContactModal from '../components/ContactModal';

const Home = () => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [particleSpeed, setParticleSpeed] = useState(1);
  const pressTimer = useRef(null);
  const navigate = useNavigate();

  // Long Press Logic
  const handlePressStart = () => {
    // Speed up particles immediately
    setParticleSpeed(8);

    // Start timer to navigate
    pressTimer.current = setTimeout(() => {
      // Navigate after 2 seconds of holding
      navigate('/game');
    }, 2000);
  };

  const handlePressEnd = () => {
    // Reset speed
    setParticleSpeed(1);
    // Cancel navigation if released too early
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
    }
  };

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (pressTimer.current) clearTimeout(pressTimer.current);
    };
  }, []);

  return (
    <HomeContainer
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
    >
      <SEO title="Home" description="Arvind Natarajan's Portfolio - AI Engineer & Full Stack Developer" />
      <ThreeParticles speedMultiplier={particleSpeed} />


      <HomeContent>
        <Name
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Arvind Natarajan
        </Name>

        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          AI Engineer & Full Stack Developer
        </Title>

        <TypewriterContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typewriter text="Building the future with AI" speed={50} />
        </TypewriterContainer>

        <IntroText
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Passionate about artificial intelligence and full-stack development.
          Creating innovative solutions that make a difference.
        </IntroText>

        <ButtonGroup
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button to="/projects" className="primary">
            View Projects <FaArrowRight />
          </Button>
          <Button as="button" onClick={() => setIsContactModalOpen(true)} className="secondary">
            Contact Me
          </Button>
        </ButtonGroup>

        <HintText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          (Press and hold anywhere for a surprise...)
        </HintText>
      </HomeContent>

      <BackgroundDecoration />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </HomeContainer>
  );
};

export default Home;