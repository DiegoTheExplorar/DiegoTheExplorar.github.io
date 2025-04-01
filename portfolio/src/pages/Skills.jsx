import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FaCode, FaLayerGroup, FaServer, FaRobot, FaTools, 
  FaPython, FaJava, FaJs, FaReact, FaDocker, FaBrain,
  FaCloud
} from 'react-icons/fa';
import { 
  SiKotlin, SiFirebase, SiPytorch, SiFlask, 
  SiThreedotjs, SiCplusplus
} from 'react-icons/si';

const SkillsContainer = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const SkillsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  margin-bottom: 50px;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -15px;
    width: 80px;
    height: 4px;
    background: var(--primary-color);
  }
`;

const SkillsDescription = styled(motion.p)`
  text-align: center;
  max-width: 700px;
  margin: 0 auto 50px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--text-color);
`;

const SkillCategoriesContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const SkillCategory = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  padding: 30px;
`;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
  
  .icon {
    width: 50px;
    height: 50px;
    background-color: rgba(97, 219, 251, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    margin-right: 15px;
    color: var(--primary-color);
    font-size: 1.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    color: var(--primary-color);
  }
`;

const SkillsList = styled.div``;

const SkillItem = styled(motion.div)`
  margin-bottom: 25px;
  
  .skill-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    
    .skill-name {
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      
      svg {
        margin-right: 8px;
        color: var(--primary-color);
      }
    }
    
    .skill-level {
      font-size: 0.9rem;
      color: var(--primary-color);
      font-weight: 500;
    }
  }
  
  .progress-container {
    width: 100%;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
    overflow: hidden;
  }
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background: linear-gradient(to right, var(--primary-color), var(--accent-color));
  border-radius: 5px;
  width: ${props => props.width}%;
`;

// Skill data with icons
const skillsData = [
  {
    category: 'Programming Languages',
    icon: <FaCode />,
    skills: [
      { name: 'Python', level: 90, icon: <FaPython /> },
      { name: 'Kotlin', level: 85, icon: <SiKotlin /> },
      { name: 'Java', level: 80, icon: <FaJava /> },
      { name: 'JavaScript', level: 85, icon: <FaJs /> },
      { name: 'C++', level: 70, icon: <SiCplusplus /> }
    ]
  },
  {
    category: 'Frameworks & Tools',
    icon: <FaLayerGroup />,
    skills: [
      { name: 'React', level: 85, icon: <FaReact /> },
      { name: 'Firebase', level: 80, icon: <SiFirebase /> },
      { name: 'PyTorch', level: 85, icon: <SiPytorch /> },
      { name: 'Hugging Face', level: 80, icon: <FaBrain /> },
      { name: 'Flask', level: 75, icon: <SiFlask /> }
    ]
  },
  {
    category: 'DevOps & Cloud',
    icon: <FaServer />,
    skills: [
      { name: 'Docker', level: 80, icon: <FaDocker /> },
      { name: 'CI/CD', level: 75, icon: <FaTools /> },
      { name: 'Kubernetes', level: 70, icon: <FaTools /> },
      { name: 'Azure', level: 75, icon: <FaCloud /> },
      { name: 'Git', level: 90, icon: <FaTools /> }
    ]
  },
  {
    category: 'AI & ML Concepts',
    icon: <FaRobot />,
    skills: [
      { name: 'Machine Learning', level: 85, icon: <FaRobot /> },
      { name: 'Deep Learning', level: 80, icon: <FaRobot /> },
      { name: 'Diffusion Models', level: 75, icon: <FaRobot /> },
      { name: 'RAG', level: 80, icon: <FaRobot /> },
      { name: 'Computer Vision', level: 85, icon: <FaRobot /> }
    ]
  }
];

const Skills = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const progressVariants = {
    hidden: { width: 0 },
    visible: width => ({
      width: `${width}%`,
      transition: { duration: 1, ease: 'easeOut' }
    })
  };
  
  return (
    <SkillsContainer id="skills">
      <SkillsContent>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </SectionTitle>
        
        <SkillsDescription
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          My technical toolkit spans languages, frameworks, and core concepts in software development and artificial intelligence.
        </SkillsDescription>
        
        <SkillCategoriesContainer
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skillsData.map((category, index) => (
            <SkillCategory
              key={index}
              variants={itemVariants}
            >
              <CategoryHeader>
                <div className="icon">{category.icon}</div>
                <h3>{category.category}</h3>
              </CategoryHeader>
              
              <SkillsList>
                {category.skills.map((skill, idx) => (
                  <SkillItem
                    key={idx}
                    variants={itemVariants}
                  >
                    <div className="skill-header">
                      <div className="skill-name">
                        {skill.icon} {skill.name}
                      </div>
                      <div className="skill-level">{skill.level}%</div>
                    </div>
                    <div className="progress-container">
                      <ProgressBar
                        custom={skill.level}
                        variants={progressVariants}
                        initial="hidden"
                        animate={controls}
                      />
                    </div>
                  </SkillItem>
                ))}
              </SkillsList>
            </SkillCategory>
          ))}
        </SkillCategoriesContainer>
      </SkillsContent>
    </SkillsContainer>
  );
};

export default Skills; 