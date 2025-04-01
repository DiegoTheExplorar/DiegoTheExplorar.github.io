import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const FooterContainer = styled.footer`
  background-color: var(--footer-bg);
  padding: 40px 20px;
  color: var(--light-text);
  border-top: 1px solid var(--border-color);
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 25px;
  margin-bottom: 20px;
`;

const SocialLink = styled.a`
  color: var(--light-text);
  font-size: 1.8rem;
  transition: color 0.3s ease, transform 0.3s ease;
  
  &:hover {
    color: var(--primary-color);
    transform: scale(1.1);
  }
`;

const CopyrightText = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SocialLinks>
          <SocialLink href="https://github.com/DiegoTheExplorar" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/arvind-natarajan-65aa77290/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </SocialLink>
          <SocialLink href="mailto:arvindnatarajan@gmail.com">
            <FaEnvelope />
          </SocialLink>
        </SocialLinks>
        <CopyrightText>
          &copy; {new Date().getFullYear()} Arvind Natarajan. All rights reserved.
        </CopyrightText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 