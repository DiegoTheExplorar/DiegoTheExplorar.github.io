import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBriefcase, FaLaptopCode, FaFlask, FaRobot } from 'react-icons/fa';

import { Section, Container, SectionTitle } from '../components/common/Layout';
import SEO from '../components/common/SEO';

const TimelineContainer = styled(motion.div)`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  
  &::after {
    content: '';
    position: absolute;
    width: 3px;
    background-color: var(--primary-color);
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    
    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
  left: ${props => props.$position === 'left' ? '0' : '50%'};
  
  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    padding-left: 70px;
    padding-right: 20px;
  }
  
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    right: ${props => props.$position === 'left' ? '-10px' : 'auto'};
    left: ${props => props.$position === 'right' ? '-10px' : 'auto'};
    background: var(--bg-color);
    border: 3px solid var(--primary-color);
    top: 22px;
    border-radius: 50%;
    z-index: 1;
    
    @media (max-width: 768px) {
      left: 21px;
      right: auto;
    }
  }
`;

const TimelineContent = styled.div`
  padding: 25px;
  background-color: var(--card-bg);
  position: relative;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .icon {
    position: absolute;
    width: 40px;
    height: 40px;
    background-color: var(--primary-color);
    top: -20px;
    right: ${props => props.$position === 'left' ? '20px' : 'auto'};
    left: ${props => props.$position === 'right' ? '20px' : 'auto'};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--dark-text);
    font-size: 1.2rem;
    
    @media (max-width: 768px) {
      left: 20px;
      right: auto;
    }
  }
  
  h3 {
    margin: 10px 0;
    font-size: 1.4rem;
    color: var(--primary-color);
  }
  
  h4 {
    margin-bottom: 15px;
    font-size: 1.1rem;
    font-weight: 500;
  }
  
  .date {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--accent-color);
    margin-bottom: 10px;
    display: block;
  }
  
  ul {
    list-style-type: disc;
    margin-left: 20px;
    
    li {
      margin-bottom: 10px;
      line-height: 1.6;
    }
  }
`;

const Experience = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const experienceData = [
    {
      title: "DevSecOps Engineer Intern",
      company: "IBM",
      location: "Singapore",
      period: "Jan 2026 - Present",
      description: [
        "Working on real-life hybrid cloud applications in a tech consulting environment"
      ],
      icon: <FaLaptopCode />,
      position: 'left'
    },
    {
      title: "Data Analytics Intern",
      company: "General Reinsurance AG",
      location: "Singapore",
      period: "Dec 2025 - Jan 2026",
      description: [
        "Conducted data analytics on insurance policy and claims data using R"
      ],
      icon: <FaFlask />,
      position: 'right'
    },
    {
      title: "AI Engineer",
      company: "Carecam",
      location: "Singapore",
      period: "Dec 2023 - Dec 2025",
      description: [
        "Implemented CV algorithms and proprietary algorithms in KMP for iOS use cases",
        "Developed POCs in Three.js and Swift, some of which made it to production",
        "Created end-to-end cloud-native AI video processing pipeline"
      ],
      icon: <FaRobot />,
      position: 'left'
    },
    {
      title: "AI Research Assistant",
      company: "National University of Singapore",
      location: "Singapore",
      period: "May 2024 - Aug 2024",
      description: [
        "Developing and implementing advanced machine learning models for natural language processing tasks",
        "Conducting research on state-of-the-art AI architectures and methodologies",
        "Collaborating with faculty members on research papers and technical documentation"
      ],
      icon: <FaFlask />,
      position: 'right'
    }
  ];

  return (
    <Section id="experience">
      <SEO title="Experience" description="My professional experience and work history in AI and software development." />
      <Container>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Professional Experience
        </SectionTitle>

        <TimelineContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {experienceData.map((exp, index) => (
            <TimelineItem
              key={index}
              $position={exp.position}
              variants={itemVariants}
            >
              <TimelineContent $position={exp.position}>
                <div className="icon">{exp.icon}</div>
                <span className="date">{exp.period}</span>
                <h3>{exp.title}</h3>
                <h4>
                  {exp.company === 'Carecam' ? (
                    <a href="https://carecam.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                      {exp.company}
                    </a>
                  ) : (
                    exp.company
                  )}
                </h4>
                <ul>
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </TimelineContent>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </Container>
    </Section>
  );
};

export default Experience; 