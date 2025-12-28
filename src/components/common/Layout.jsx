import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Section = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

export const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 50px;
  text-align: center;
  position: relative;
  color: var(--text-color);

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -15px;
    width: 60px;
    height: 4px;
    background: var(--primary-color);
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const Card = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;
