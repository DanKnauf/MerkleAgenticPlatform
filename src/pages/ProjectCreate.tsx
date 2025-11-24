import React from 'react';
import { motion } from 'framer-motion';
import { WizardProvider, useWizard } from '@/contexts/WizardContext';
import { Check } from 'lucide-react';
import Step1AIPrompt from '@/components/wizard/Step1AIPrompt';
import Step2Recommendations from '@/components/wizard/Step2Recommendations';
import Step3TeamConfiguration from '@/components/wizard/Step3TeamConfiguration';
import Step4IntegrationSetup from '@/components/wizard/Step4IntegrationSetup';

const ProjectCreateContent: React.FC = () => {
  const { currentStep } = useWizard();

  const steps = [
    { number: 1, title: 'AI-Powered Setup', description: 'Describe your project' },
    { number: 2, title: 'Recommendations', description: 'Review AI suggestions' },
    { number: 3, title: 'Team Configuration', description: 'Assign team members' },
    { number: 4, title: 'Integration Setup', description: 'Configure tools' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Create New Project
          </h1>
          <p className="text-gray-600">
            Let AI help you set up your project in minutes
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                        currentStep > step.number
                          ? 'bg-green-500 text-white'
                          : currentStep === step.number
                          ? 'bg-merkle-primary text-white ring-4 ring-pink-100'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {currentStep > step.number ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        step.number
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <p
                        className={`text-sm font-semibold ${
                          currentStep >= step.number
                            ? 'text-gray-900'
                            : 'text-gray-500'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                      currentStep > step.number
                        ? 'bg-green-500'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 1 && <Step1AIPrompt />}
          {currentStep === 2 && <Step2Recommendations />}
          {currentStep === 3 && <Step3TeamConfiguration />}
          {currentStep === 4 && <Step4IntegrationSetup />}
        </motion.div>
      </div>
    </div>
  );
};

const ProjectCreate: React.FC = () => {
  return (
    <WizardProvider>
      <ProjectCreateContent />
    </WizardProvider>
  );
};

export default ProjectCreate;
