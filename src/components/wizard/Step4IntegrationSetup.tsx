import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Package,
  CheckCircle,
  ArrowLeft,
  Rocket,
  Github,
  MessageSquare,
  FileText,
  Trello,
  Figma as FigmaIcon,
} from 'lucide-react';
import { useWizard } from '@/contexts/WizardContext';
import { useProjects } from '@/contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';

interface Integration {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  category: 'project_management' | 'version_control' | 'communication' | 'documentation' | 'design';
  required: boolean;
}

const Step4IntegrationSetup: React.FC = () => {
  const { wizardData, prevStep, resetWizard } = useWizard();
  const { addProject } = useProjects();
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);

  const integrations: Integration[] = [
    {
      id: 'jira',
      name: 'Jira',
      icon: Trello,
      description: 'Project management and issue tracking',
      category: 'project_management',
      required: true,
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: Github,
      description: 'Version control and code collaboration',
      category: 'version_control',
      required: true,
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      icon: MessageSquare,
      description: 'Team communication and collaboration',
      category: 'communication',
      required: true,
    },
    {
      id: 'confluence',
      name: 'Confluence',
      icon: FileText,
      description: 'Documentation and knowledge base',
      category: 'documentation',
      required: false,
    },
    {
      id: 'figma',
      name: 'Figma',
      icon: FigmaIcon,
      description: 'Design collaboration and prototyping',
      category: 'design',
      required: false,
    },
  ];

  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(
    integrations.filter(i => i.required).map(i => i.id)
  );

  const toggleIntegration = (id: string) => {
    const integration = integrations.find(i => i.id === id);
    if (integration?.required) return; // Can't deselect required integrations

    setSelectedIntegrations(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleCreateProject = async () => {
    setIsCreating(true);

    // Simulate project creation
    await new Promise(resolve => setTimeout(resolve, 2000));

    const newProject = {
      projectId: `proj${Date.now()}`,
      name: wizardData.projectName,
      client: wizardData.clientName,
      description: wizardData.projectPrompt,
      status: 'active' as const,
      startDate: new Date(),
      targetEndDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000), // 6 months
      team: wizardData.selectedTeam,
      workbench: {
        activeTools: [],
        integrations: selectedIntegrations.map(id => ({
          integrationId: id,
          name: integrations.find(i => i.id === id)?.name || '',
          type: integrations.find(i => i.id === id)?.category || 'other',
          status: 'connected' as const,
          lastSync: new Date(),
          config: {},
        })),
        repositories: [],
      },
      metrics: {
        completion: 0,
        velocity: 0,
        aiUtilization: 0,
        tasksCompleted: 0,
        totalTasks: 0,
        issuesOpen: 0,
        commits: 0,
      },
      lastActivity: 'Just created',
    };

    addProject(newProject);
    setIsCreating(false);
    resetWizard();
    navigate(`/project/${newProject.projectId}/workbench`);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Configure Integrations
              </h2>
              <p className="text-gray-600 mt-1">
                Connect the tools and platforms your team will use
              </p>
            </div>
          </div>

          {/* Project Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-xs text-gray-600 mb-1">Project Name</p>
              <p className="text-sm font-semibold text-gray-900">
                {wizardData.projectName}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Client</p>
              <p className="text-sm font-semibold text-gray-900">
                {wizardData.clientName || 'Not specified'}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Team Size</p>
              <p className="text-sm font-semibold text-gray-900">
                {wizardData.selectedTeam.length} members
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Integrations</p>
              <p className="text-sm font-semibold text-gray-900">
                {selectedIntegrations.length} selected
              </p>
            </div>
          </div>
        </div>

        {/* Integrations Grid */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Available Integrations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {integrations.map((integration, index) => (
              <IntegrationCard
                key={integration.id}
                integration={integration}
                isSelected={selectedIntegrations.includes(integration.id)}
                onToggle={toggleIntegration}
                index={index}
              />
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-900">
              <span className="font-semibold">Note:</span> Required integrations are
              pre-selected and cannot be removed. You can add or configure additional
              integrations after project creation.
            </p>
          </div>
        </div>

        {/* Setup Progress */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What happens next?
          </h3>
          <div className="space-y-3">
            {[
              'Project workspace will be created',
              'Team members will be notified and added',
              'Integration channels and repositories will be initialized',
              'AI agents and recommended tools will be added to the toolbox',
              'Initial project board and backlog will be set up',
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{step}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={isCreating}
            className="btn-secondary flex items-center space-x-2 disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Step 4</span> of 4
            </div>
            <button
              onClick={handleCreateProject}
              disabled={isCreating}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              {isCreating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Project...</span>
                </>
              ) : (
                <>
                  <Rocket className="w-5 h-5" />
                  <span>Create Project</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface IntegrationCardProps {
  integration: Integration;
  isSelected: boolean;
  onToggle: (id: string) => void;
  index: number;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({
  integration,
  isSelected,
  onToggle,
  index,
}) => {
  const Icon = integration.icon;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={!integration.required ? { scale: 1.02 } : {}}
      onClick={() => onToggle(integration.id)}
      disabled={integration.required}
      className={`relative text-left p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? 'bg-green-50 border-green-500'
          : 'bg-white border-gray-200 hover:border-gray-300'
      } ${integration.required ? 'cursor-default' : 'cursor-pointer'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${
              isSelected ? 'bg-green-100' : 'bg-gray-100'
            }`}
          >
            <Icon
              className={`w-5 h-5 ${
                isSelected ? 'text-green-600' : 'text-gray-600'
              }`}
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{integration.name}</p>
            {integration.required && (
              <span className="text-xs text-merkle-primary font-semibold">
                Required
              </span>
            )}
          </div>
        </div>
        {isSelected && <CheckCircle className="w-5 h-5 text-green-600" />}
      </div>
      <p className="text-sm text-gray-600">{integration.description}</p>
    </motion.button>
  );
};

export default Step4IntegrationSetup;
