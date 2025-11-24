import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Edit3,
  Users,
  Wrench,
  Calendar,
  Package,
  ArrowRight,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { useWizard } from '@/contexts/WizardContext';

const Step2Recommendations: React.FC = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();
  const { aiRecommendations } = wizardData;
  const [projectName, setProjectName] = useState(wizardData.projectName);
  const [clientName, setClientName] = useState(wizardData.clientName);
  const [isEditing, setIsEditing] = useState(false);

  if (!aiRecommendations) return null;

  const handleNext = () => {
    updateWizardData({ projectName, clientName });
    nextStep();
  };

  const recommendations = [
    {
      icon: Users,
      title: 'Team Composition',
      subtitle: `${aiRecommendations.teamSize} team members recommended`,
      items: aiRecommendations.roles,
      color: 'blue',
    },
    {
      icon: Wrench,
      title: 'Recommended Tools',
      subtitle: `${aiRecommendations.tools.length} AI agents and tools`,
      items: aiRecommendations.tools,
      color: 'purple',
    },
    {
      icon: Package,
      title: 'Integrations',
      subtitle: `${aiRecommendations.integrations.length} platform integrations`,
      items: aiRecommendations.integrations,
      color: 'green',
    },
    {
      icon: Calendar,
      title: 'Timeline',
      subtitle: 'Estimated project duration',
      items: [aiRecommendations.timeline],
      color: 'orange',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header Card */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  AI Recommendations Ready
                </h2>
                <p className="text-gray-600 mt-1">
                  Review and customize the suggested project setup
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary text-sm flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>{isEditing ? 'Done Editing' : 'Customize'}</span>
            </button>
          </div>

          {/* Project Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="input-field"
                placeholder="Enter project name"
                disabled={!isEditing}
              />
            </div>
            <div>
              <label className="label">Client Name</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="input-field"
                placeholder="Enter client name"
                disabled={!isEditing}
              />
            </div>
          </div>

          {/* Original Prompt */}
          <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start space-x-2">
              <Sparkles className="w-5 h-5 text-purple-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-purple-900 mb-1">
                  Your Project Description:
                </p>
                <p className="text-sm text-purple-800">
                  {wizardData.projectPrompt}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={index}
              {...rec}
              index={index}
              isEditing={isEditing}
            />
          ))}
        </div>

        {/* Resources Section */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Required Resources
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiRecommendations.resources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{resource}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Step 2</span> of 4
            </div>
            <button
              onClick={handleNext}
              disabled={!projectName.trim()}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <span>Configure Team</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface RecommendationCardProps {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  index: number;
  isEditing: boolean;
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  items,
  color,
  index,
  isEditing,
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card"
    >
      <div className="flex items-center space-x-3 mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.05 }}
            className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
            <span className="text-sm text-gray-700">{item}</span>
            {isEditing && (
              <button className="ml-auto text-xs text-gray-400 hover:text-gray-600">
                Remove
              </button>
            )}
          </motion.div>
        ))}
        {isEditing && (
          <button className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-sm text-gray-600 hover:border-merkle-primary hover:text-merkle-primary transition-colors">
            + Add item
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Step2Recommendations;
