import React, { createContext, useContext, useState } from 'react';
import type { Project, Tool } from '@/types';
import { mockProjects, mockTools } from '@/data/mockData';

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  tools: Tool[];
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
  getProjectById: (projectId: string) => Project | undefined;
  addToolToProject: (projectId: string, tool: Tool) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [tools] = useState<Tool[]>(mockTools);

  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const updateProject = (projectId: string, updates: Partial<Project>) => {
    setProjects(prev =>
      prev.map(p => (p.projectId === projectId ? { ...p, ...updates } : p))
    );
    if (currentProject?.projectId === projectId) {
      setCurrentProject(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const getProjectById = (projectId: string) => {
    return projects.find(p => p.projectId === projectId);
  };

  const addToolToProject = (projectId: string, tool: Tool) => {
    setProjects(prev =>
      prev.map(p =>
        p.projectId === projectId
          ? {
              ...p,
              workbench: {
                ...p.workbench,
                activeTools: [...p.workbench.activeTools, tool],
              },
            }
          : p
      )
    );
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        currentProject,
        tools,
        setCurrentProject,
        addProject,
        updateProject,
        getProjectById,
        addToolToProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};
