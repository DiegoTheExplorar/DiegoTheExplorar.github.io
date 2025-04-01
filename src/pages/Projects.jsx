import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaPython, FaReact, FaRobot, FaTelegram, FaCloud, FaBrain } from 'react-icons/fa';
import { SiPytorch, SiFirebase } from 'react-icons/si';
import { FaTools } from 'react-icons/fa';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  
  @media (max-width: 768px) {
    padding: 80px 20px;
  }
`;

const ProjectsContent = styled.div`
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

const ProjectFilter = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 40px;
`;

const FilterButton = styled.button`
  background: ${props => props.active ? 'var(--primary-color)' : 'var(--card-bg)'};
  color: ${props => props.active ? 'var(--dark-text)' : 'var(--text-color)'};
  border: none;
  padding: 10px 20px;
  margin: 0 10px 10px 0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.active ? 'var(--primary-color)' : 'rgba(97, 219, 251, 0.2)'};
  }
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled(motion.div)`
  background-color: var(--card-bg);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ProjectImage = styled.div`
  height: 200px;
  overflow: hidden;
  position: relative;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  &:hover img {
    transform: scale(1.1);
  }
  
  .placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--card-bg) 0%, var(--secondary-color) 100%);
    
    svg {
      font-size: 4rem;
      color: var(--primary-color);
    }
  }
`;

const ProjectBody = styled.div`
  padding: 25px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: var(--primary-color);
`;

const ProjectDescription = styled.p`
  margin-bottom: 20px;
  flex: 1;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  gap: 10px;
`;

const TechItem = styled.span`
  background-color: rgba(97, 219, 251, 0.1);
  color: var(--primary-color);
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 5px;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: auto;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  padding: 8px 15px;
  background-color: ${props => props.primary === "true" ? 'var(--primary-color)' : 'transparent'};
  color: ${props => props.primary === "true" ? 'var(--dark-text)' : 'var(--text-color)'};
  border: ${props => props.primary === "true" ? 'none' : '1px solid var(--text-color)'};
  border-radius: 4px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  
  svg {
    margin-right: 5px;
  }
  
  &:hover {
    transform: translateY(-3px);
    background-color: ${props => props.primary === "true" ? 'var(--accent-color)' : 'rgba(255, 255, 255, 0.1)'};
    box-shadow: ${props => props.primary === "true" ? '0 5px 15px rgba(255, 107, 107, 0.3)' : 'none'};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
  color: var(--text-color);
  opacity: 0.7;
`;

const Projects = () => {
  const [filter, setFilter] = useState('all');
  
  const projectsData = [
    {
      id: 1,
      title: 'Klingon Heads Web Application',
      description: 'AI-driven English to Klingon translator that leverages PyTorch and Hugging Face\'s Transformer library within React. Employed GRU models with a BPE tokenizer and fine-tuned T5 transformers.',
      image: null,
      icon: <FaRobot />,
      category: ['ai', 'web'],
      technologies: [
        { name: 'PyTorch', icon: <SiPytorch /> },
        { name: 'React', icon: <FaReact /> },
        { name: 'Hugging Face', icon: <FaBrain /> }
      ],
      github: 'https://github.com/DiegoTheExplorar/Klingon-Heads',
      live: 'https://klingon-heads.vercel.app/'
    },
    {
      id: 2,
      title: 'MapMyMemories',
      description: 'A web application that allows users to upload and view their photos on a map. Features include Google authentication, country-based photo browsing, image gallery, and dark mode support.',
      image: null,
      icon: <FaCloud />,
      category: ['web'],
      technologies: [
        { name: 'React', icon: <FaReact /> },
        { name: 'Firebase', icon: <SiFirebase /> },
        { name: 'Tailwind CSS', icon: <FaTools /> }
      ],
      github: 'https://github.com/DiegoTheExplorar/MapMyMemories',
      live: 'https://map-my-memories-three.vercel.app/'
    },
    {
      id: 3,
      title: 'Telegram Wellness Bot',
      description: 'A supportive therapy bot on Telegram using Mixtral-8x7B. Utilized Azure services and GitHub Workflow CI/CD for automated deployments.',
      image: null,
      icon: <FaTelegram />,
      category: ['ai', 'mobile'],
      technologies: [
        { name: 'Python', icon: <FaPython /> },
        { name: 'Azure', icon: <FaCloud /> },
        { name: 'Hugging Face', icon: <FaBrain /> }
      ],
      github: 'https://github.com/DiegoTheExplorar/DiegoWellness',
      live: null
    }
  ];
  
  // Filter projects based on selected category
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category.includes(filter));
  
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
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <ProjectsContainer id="projects">
      <ProjectsContent>
        <SectionTitle
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </SectionTitle>
        
        <ProjectFilter>
          <FilterButton 
            active={filter === 'all'} 
            onClick={() => setFilter('all')}
          >
            All
          </FilterButton>
          <FilterButton 
            active={filter === 'ai'} 
            onClick={() => setFilter('ai')}
          >
            AI/ML
          </FilterButton>
          <FilterButton 
            active={filter === 'web'} 
            onClick={() => setFilter('web')}
          >
            Web
          </FilterButton>
          <FilterButton 
            active={filter === 'mobile'} 
            onClick={() => setFilter('mobile')}
          >
            Mobile
          </FilterButton>
        </ProjectFilter>
        
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            <ProjectsGrid
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={filter} // Re-render on filter change
              layout
            >
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  transition={{ duration: 0.3 }}
                  layout
                >
                  <ProjectImage>
                    {project.image ? (
                      <img src={project.image} alt={project.title} />
                    ) : (
                      <div className="placeholder">
                        {project.icon}
                      </div>
                    )}
                  </ProjectImage>
                  <ProjectBody>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>
                    <TechStack>
                      {project.technologies.map((tech, index) => (
                        <TechItem key={index}>
                          {tech.icon} {tech.name}
                        </TechItem>
                      ))}
                    </TechStack>
                    <ProjectLinks>
                      {project.github && (
                        <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                          <FaGithub /> GitHub
                        </ProjectLink>
                      )}
                      {project.live && (
                        <ProjectLink href={project.live} target="_blank" rel="noopener noreferrer" primary="true">
                          <FaExternalLinkAlt /> Live Demo
                        </ProjectLink>
                      )}
                    </ProjectLinks>
                  </ProjectBody>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          ) : (
            <NoResults>
              No projects found in this category.
            </NoResults>
          )}
        </AnimatePresence>
      </ProjectsContent>
    </ProjectsContainer>
  );
};

export default Projects; 