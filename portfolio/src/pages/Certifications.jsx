import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCertificate, FaExternalLinkAlt } from 'react-icons/fa';

const CertificationsContainer = styled.section`
  padding: 60px 20px;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const CertificationsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -10px;
    width: 80px;
    height: 4px;
    background: var(--primary-color);
  }
`;

const CertificationsDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 30px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-color);
`;

const CertificationsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CertificationCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
`;

const CertificateHeader = styled.div`
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
  padding: 20px;
  display: flex;
  align-items: center;
  
  .icon {
    width: 50px;
    height: 50px;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 15px;
    color: white;
    font-size: 1.5rem;
  }
  
  h3 {
    color: white;
    font-size: 1.3rem;
  }
`;

const CertificateBody = styled.div`
  padding: 25px;
  
  h4 {
    margin-bottom: 10px;
    font-size: 1.1rem;
    color: var(--primary-color);
  }
  
  p {
    margin-bottom: 15px;
    line-height: 1.6;
  }
  
  .date {
    font-size: 0.9rem;
    color: var(--accent-color);
    margin-bottom: 20px;
    display: block;
  }
  
  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 20px;
    
    span {
      background-color: rgba(97, 219, 251, 0.1);
      color: var(--primary-color);
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.8rem;
    }
  }
`;

const ViewCertificateLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 8px 15px;
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  
  svg {
    margin-left: 8px;
  }
  
  &:hover {
    background-color: var(--primary-color);
    color: var(--dark-text);
  }
`;

const Certifications = () => {
  const certificationsData = [
    {
      title: 'Orbital Achievement - Apollo 11',
      issuer: 'National University of Singapore',
      date: 'Aug 2023',
      description: 'Developed Klingon Heads, an AI-powered English to Klingon translator web application. Achieved Apollo 11 level (Highest Level) for exceptional project quality and innovation.',
      skills: ['React', 'PyTorch', 'Transformers', 'Machine Learning'],
      certificateLink: 'https://credentials.nus.edu.sg/bd28519f-4ea2-4c99-bd7a-5d9fcacb34cc'
    },
    {
      title: 'DevOps, MLOps, and DataOps',
      issuer: 'Duke University',
      date: 'January 2023',
      description: 'A comprehensive specialization covering CI/CD, containerization, model deployment, and infrastructure management.',
      skills: ['CI/CD', 'Docker', 'Kubernetes', 'MLOps', 'Model Deployment'],
      certificateLink: 'https://www.coursera.org/account/accomplishments/verify/YPN57DOJ9BS6'
    }
  ];
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  return (
    <CertificationsContainer id="certifications">
      <CertificationsContent>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Certifications
        </SectionTitle>
        
        <CertificationsDescription
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Continuous learning is essential in the tech industry. Here are some of the certifications 
          I've earned to enhance my skills and knowledge.
        </CertificationsDescription>
        
        <CertificationsGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {certificationsData.map((certification) => (
            <CertificationCard
              key={certification.title}
              variants={itemVariants}
            >
              <CertificateHeader>
                <div className="icon">
                  <FaCertificate />
                </div>
                <h3>{certification.title}</h3>
              </CertificateHeader>
              
              <CertificateBody>
                <h4>{certification.issuer}</h4>
                <span className="date">{certification.date}</span>
                <p>{certification.description}</p>
                
                <div className="skills">
                  {certification.skills.map((skill, index) => (
                    <span key={index}>{skill}</span>
                  ))}
                </div>
                
                <ViewCertificateLink href={certification.certificateLink} target="_blank" rel="noopener noreferrer">
                  View Certificate <FaExternalLinkAlt />
                </ViewCertificateLink>
              </CertificateBody>
            </CertificationCard>
          ))}
        </CertificationsGrid>
      </CertificationsContent>
    </CertificationsContainer>
  );
};

export default Certifications; 