import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUniversity, FaGraduationCap, FaTrophy, FaUsers } from 'react-icons/fa';

const EducationContainer = styled.section`
  padding: 60px 20px;
  
  @media (max-width: 768px) {
    padding: 40px 20px;
  }
`;

const EducationContent = styled.div`
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

const EducationCards = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
`;

const EducationCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  display: flex;
  flex-direction: column;
`;

const CardHeader = styled.div`
  padding: 25px 25px 15px;
  position: relative;
  
  .icon {
    position: absolute;
    top: -10
    5px;
    left: 30px;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--dark-text);
    font-size: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
  
  h3 {
    font-size: 1.8rem;
    margin: 10px 0;
    color: var(--primary-color);
  }
  
  h4 {
    font-size: 1.2rem;
    color: var(--text-color);
    font-weight: 500;
    margin-bottom: 10px;
  }
  
  .date {
    font-size: 1rem;
    color: var(--accent-color);
    margin-bottom: 15px;
    display: block;
  }
`;

const CardBody = styled.div`
  padding: 0 25px 25px;
  flex: 1;
`;

const AchievementsList = styled.div`
  margin-top: 20px;
`;

const AchievementItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 12px;
  padding: 12px;
  background-color: rgba(97, 219, 251, 0.05);
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(97, 219, 251, 0.1);
    transform: translateX(5px);
  }
  
  .achievement-icon {
    margin-right: 15px;
    min-width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    font-size: 1.2rem;
  }
  
  .achievement-content {
    flex: 1;
    
    h5 {
      font-size: 1.1rem;
      margin-bottom: 5px;
      color: var(--text-color);
    }
    
    p {
      font-size: 0.95rem;
      color: var(--text-color);
      opacity: 0.8;
      line-height: 1.6;
    }
  }
`;

const EducationIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: var(--card-bg);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--primary-color);
  margin-right: 20px;
  flex-shrink: 0;
  overflow: visible;
  
  svg {
    width: 30px;
    height: 30px;
  }
`;

const TimelineItem = styled(motion.div)`
  padding: 10px 40px;
  padding-top: 30px;
  position: relative;
  background-color: inherit;
  width: 50%;
  left: ${props => props.position === 'left' ? '0' : '50%'};
  
  @media (max-width: 768px) {
    width: 100%;
    left: 0;
    padding-left: 70px;
    padding-right: 20px;
    padding-top: 30px;
  }
`;

const TimelineContent = styled.div`
  padding: 25px;
  background-color: var(--card-bg);
  position: relative;
  border-radius: 10px;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s ease;
  margin-top: 10px;
  
  &:hover {
    transform: translateY(-5px);
  }
  
  .icon {
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: var(--primary-color);
    top: -35px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    color: var(--dark-text);
    font-size: 1.5rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 2;
  }
  
  h3 {
    font-size: 1.8rem;
    margin: 10px 0;
    color: var(--primary-color);
  }
  
  h4 {
    font-size: 1.2rem;
    color: var(--text-color);
    font-weight: 500;
    margin-bottom: 10px;
  }
  
  .date {
    font-size: 1rem;
    color: var(--accent-color);
    margin-bottom: 15px;
    display: block;
  }
  
  p {
    font-size: 0.95rem;
    color: var(--text-color);
    opacity: 0.8;
    line-height: 1.6;
  }
`;

const Education = () => {
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
  
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };
  
  const educationData = [
    {
      id: 1,
      institution: 'National University of Singapore (NUS)',
      degree: 'Bachelor of Computing in Computer Science',
      date: 'Aug 2023 - May 2027',
      icon: <FaUniversity />,
      description: 'Pursuing a comprehensive computer science education with a focus on artificial intelligence and machine learning.',
      achievements: [
        {
          title: 'Executive Member of NUS AI Society',
          description: 'Led PyTorch and RAG workshops for fellow students.',
          icon: <FaUsers />
        },
        {
          title: 'Top 10 in Grey Hats Capture-The-Flag',
          description: 'Competed in cybersecurity challenges and placed in the top 10.',
          icon: <FaTrophy />
        },
        {
          title: 'Top 3 in NUS Health Hacker 2025 InterSystems track',
          description: 'Developed healthcare solutions using cutting-edge technologies.',
          icon: <FaTrophy />
        }
      ]
    },
    {
      id: 2,
      institution: 'St. Joseph\'s Institution (SJI)',
      degree: 'International Baccalaureate Diploma',
      date: 'Jan 2019 - Nov 2020',
      icon: <FaGraduationCap />,
      description: 'Completed the rigorous International Baccalaureate program with a focus on mathematics and computer science.',
      achievements: [
        {
          title: 'Academic piece on Mandelbrot and Julia Sets',
          description: 'Researched and wrote an in-depth analysis on computational mathematics and fractals.',
          icon: <FaGraduationCap />
        },
        {
          title: 'Teaching Assistant at Coding and Technology Club',
          description: 'Led workshops on Autodesk and Arduino for younger students.',
          icon: <FaUsers />
        }
      ]
    }
  ];
  
  return (
    <EducationContainer id="education">
      <EducationContent>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Education
        </SectionTitle>
        
        <EducationCards
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {educationData.map((education) => (
            <EducationCard
              key={education.id}
              variants={cardVariants}
            >
              <CardHeader>
                <div className="icon">{education.icon}</div>
                <h3>{education.institution}</h3>
                <h4>{education.degree}</h4>
                <span className="date">{education.date}</span>
                <p>{education.description}</p>
              </CardHeader>
              
              <CardBody>
                <h4>Achievements & Activities</h4>
                <AchievementsList>
                  {education.achievements.map((achievement, index) => (
                    <AchievementItem
                      key={index}
                      variants={itemVariants}
                    >
                      <div className="achievement-icon">
                        {achievement.icon}
                      </div>
                      <div className="achievement-content">
                        <h5>{achievement.title}</h5>
                        <p>{achievement.description}</p>
                      </div>
                    </AchievementItem>
                  ))}
                </AchievementsList>
              </CardBody>
            </EducationCard>
          ))}
        </EducationCards>
      </EducationContent>
    </EducationContainer>
  );
};

export default Education; 