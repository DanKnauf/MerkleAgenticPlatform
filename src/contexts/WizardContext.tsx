import React, { createContext, useContext, useState } from 'react';
import type { AIRecommendation, TeamMember } from '@/types';

interface WizardData {
  projectPrompt: string;
  aiRecommendations: AIRecommendation | null;
  selectedTeam: TeamMember[];
  selectedTools: string[];
  selectedIntegrations: string[];
  projectName: string;
  clientName: string;
}

interface WizardContextType {
  currentStep: number;
  wizardData: WizardData;
  isGenerating: boolean;
  setCurrentStep: (step: number) => void;
  updateWizardData: (data: Partial<WizardData>) => void;
  generateRecommendations: (prompt: string) => Promise<void>;
  nextStep: () => void;
  prevStep: () => void;
  resetWizard: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const initialWizardData: WizardData = {
  projectPrompt: '',
  aiRecommendations: null,
  selectedTeam: [],
  selectedTools: [],
  selectedIntegrations: [],
  projectName: '',
  clientName: '',
};

export const WizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [wizardData, setWizardData] = useState<WizardData>(initialWizardData);
  const [isGenerating, setIsGenerating] = useState(false);

  const updateWizardData = (data: Partial<WizardData>) => {
    setWizardData(prev => ({ ...prev, ...data }));
  };

  const generateRecommendations = async (prompt: string): Promise<void> => {
    setIsGenerating(true);
    updateWizardData({ projectPrompt: prompt });

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate mock recommendations based on prompt keywords
    const recommendations: AIRecommendation = {
      projectName: extractProjectName(prompt),
      roles: generateRoles(prompt),
      teamSize: 6,
      tools: generateTools(prompt),
      integrations: ['Jira', 'GitHub', 'Microsoft Teams', 'Confluence'],
      timeline: '6 months',
      resources: generateResources(prompt),
    };

    updateWizardData({
      aiRecommendations: recommendations,
      projectName: recommendations.projectName,
    });
    setIsGenerating(false);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const resetWizard = () => {
    setCurrentStep(1);
    setWizardData(initialWizardData);
  };

  return (
    <WizardContext.Provider
      value={{
        currentStep,
        wizardData,
        isGenerating,
        setCurrentStep,
        updateWizardData,
        generateRecommendations,
        nextStep,
        prevStep,
        resetWizard,
      }}
    >
      {children}
    </WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error('useWizard must be used within a WizardProvider');
  }
  return context;
};

// Helper functions to generate AI recommendations
function extractProjectName(prompt: string): string {
  const keywords = prompt.toLowerCase();
  if (keywords.includes('ecommerce') || keywords.includes('e-commerce')) {
    return 'E-commerce Platform Transformation';
  } else if (keywords.includes('data') || keywords.includes('migration')) {
    return 'Data Platform Modernization';
  } else if (keywords.includes('mobile') || keywords.includes('app')) {
    return 'Mobile Application Development';
  } else if (keywords.includes('ai') || keywords.includes('machine learning')) {
    return 'AI/ML Implementation Initiative';
  } else if (keywords.includes('customer') || keywords.includes('experience')) {
    return 'Customer Experience Enhancement';
  } else {
    return 'Digital Transformation Project';
  }
}

function generateRoles(prompt: string): string[] {
  const baseRoles = ['Product Owner', 'Technical Lead', 'Developer'];
  const keywords = prompt.toLowerCase();

  if (keywords.includes('design') || keywords.includes('ux') || keywords.includes('ui')) {
    baseRoles.push('UX/UI Designer');
  }
  if (keywords.includes('data') || keywords.includes('analytics')) {
    baseRoles.push('Data Architect', 'Data Analyst');
  }
  if (keywords.includes('security') || keywords.includes('compliance')) {
    baseRoles.push('Security Engineer');
  }
  if (keywords.includes('test') || keywords.includes('quality')) {
    baseRoles.push('QA Engineer');
  } else {
    baseRoles.push('QA Engineer');
  }

  baseRoles.push('Business Analyst', 'Scrum Master');

  return baseRoles;
}

function generateTools(prompt: string): string[] {
  const tools: string[] = [];
  const keywords = prompt.toLowerCase();

  // Always include basic tools
  tools.push('Meeting Scheduler Agent', 'Documentation Generator', 'Status Report Creator');

  if (keywords.includes('code') || keywords.includes('development')) {
    tools.push('Code Review Assistant', 'Claude Code Integration');
  }
  if (keywords.includes('design')) {
    tools.push('Visual QA Agent', 'Figma Integration');
  }
  if (keywords.includes('test')) {
    tools.push('Visual QA Agent');
  }
  if (keywords.includes('document') || keywords.includes('knowledge')) {
    tools.push('Use Case Documenter', 'Training Material Generator');
  }

  tools.push('Sprint Planning Assistant', 'Real-time Whiteboard');

  return [...new Set(tools)]; // Remove duplicates
}

function generateResources(prompt: string): string[] {
  const resources = [
    'Development environment setup',
    'Project documentation repository',
    'Communication channels',
    'Access to required tools and platforms',
  ];

  const keywords = prompt.toLowerCase();

  if (keywords.includes('cloud') || keywords.includes('aws') || keywords.includes('azure')) {
    resources.push('Cloud infrastructure provisioning');
  }
  if (keywords.includes('data')) {
    resources.push('Data storage and warehouse setup');
  }
  if (keywords.includes('security')) {
    resources.push('Security and compliance tools');
  }

  return resources;
}
