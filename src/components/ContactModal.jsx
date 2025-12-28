import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaEnvelope, FaTimes } from 'react-icons/fa';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled(motion.div)`
  background: var(--card-bg);
  padding: 40px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid var(--primary-color);
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  color: var(--text-color);
  font-size: 1.2rem;
  padding: 5px;
  transition: color 0.3s ease;
  
  &:hover {
    color: var(--accent-color);
  }
`;

const ModalTitle = styled.h3`
  margin-bottom: 30px;
  color: var(--primary-color);
  font-size: 1.8rem;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const OptionButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  font-size: 1.1rem;
  
  svg {
    margin-right: 10px;
    font-size: 1.4rem;
  }
  
  &.linkedin {
    background-color: #0077b5;
    color: white;
    
    &:hover {
      background-color: #005582;
      transform: translateY(-2px);
    }
  }
  
  &.email {
    background-color: var(--card-bg);
    border: 2px solid var(--text-color);
    color: var(--text-color);
    
    &:hover {
      background-color: var(--text-color);
      color: var(--bg-color);
      transform: translateY(-2px);
    }
  }
`;

const ContactModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <ModalContainer
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <CloseButton onClick={onClose}>
                            <FaTimes />
                        </CloseButton>

                        <ModalTitle>Get in Touch</ModalTitle>

                        <OptionsContainer>
                            <OptionButton
                                href="https://www.linkedin.com/in/arvind-natarajan-65aa77290/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="linkedin"
                            >
                                <FaLinkedin /> LinkedIn
                            </OptionButton>

                            <OptionButton
                                href="mailto:arvindnatarajan2002@gmail.com"
                                className="email"
                            >
                                <FaEnvelope /> Email Me
                            </OptionButton>
                        </OptionsContainer>
                    </ModalContainer>
                </Overlay>
            )}
        </AnimatePresence>
    );
};

export default ContactModal;
