import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingAnimation = styled.div`
  width: 60px;
  height: 60px;
  position: relative;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: var(--primary-color);
    opacity: 0.6;
    animation: pulse 2s ease-in-out infinite;
  }

  &::after {
    animation-delay: -1s;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(0);
      opacity: 0.8;
    }
    50% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;

const LoadingText = styled.h2`
  margin-top: 20px;
  color: var(--primary-color);
  font-weight: 300;
  letter-spacing: 2px;
`;

const LoadingScreen = () => {
  return (
    <LoadingContainer>
      <LoadingAnimation />
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingScreen; 