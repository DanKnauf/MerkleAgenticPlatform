import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';
import { useWizard } from '@/contexts/WizardContext';

const Step1AIPrompt: React.FC = () => {
  const { wizardData, generateRecommendations, nextStep, isGenerating } = useWizard();
  const [prompt, setPrompt] = useState(wizardData.projectPrompt);

  const examplePrompts = [
    'Create an e-commerce transformation project for a retail client focusing on personalization, data integration, and customer experience optimization',
    'Build a cloud-native data platform migration for a financial services company with emphasis on security and compliance',
    'Develop a mobile-first customer engagement app with AI-powered recommendations and real-time analytics',
    'Design and implement an AI/ML platform for predictive maintenance in manufacturing operations',
  ];

  const handleGenerate = async () => {
    if (prompt.trim()) {
      await generateRecommendations(prompt);
      nextStep();
    }
  };

  const useExamplePrompt = (example: string) => {
    setPrompt(example);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-purple-100 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Describe Your Project
            </h2>
            <p className="text-gray-600 mt-1">
              Tell us about your project goals, and our AI will recommend the perfect setup
            </p>
          </div>
        </div>

        {/* Prompt Input */}
        <div className="mb-6">
          <label className="label">
            Project Description
          </label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your project in detail... What are your goals? Who is the client? What technologies or integrations do you need?"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary focus:border-transparent transition-all duration-200 min-h-[200px] resize-none"
            disabled={isGenerating}
          />
          <p className="text-sm text-gray-500 mt-2">
            Be as detailed as possible. Mention client needs, technologies, team requirements, and project goals.
          </p>
        </div>

        {/* Example Prompts */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-600" />
            <p className="text-sm font-semibold text-gray-700">
              Try these examples:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {examplePrompts.map((example, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => useExamplePrompt(example)}
                className="text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors text-sm text-gray-700"
                disabled={isGenerating}
              >
                <p className="line-clamp-3">{example}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">Step 1</span> of 4
          </div>
          <button
            onClick={handleGenerate}
            disabled={!prompt.trim() || isGenerating}
            className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Analyzing with AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate Recommendations</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Info Card */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-xl"
      >
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center space-x-2">
          <Sparkles className="w-5 h-5" />
          <span>How it works</span>
        </h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Our AI analyzes your project description to understand goals and requirements</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>We recommend optimal team composition, roles, and expertise needed</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Suggested tools and integrations are matched to your project needs</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>You can review and customize all recommendations before creating the project</span>
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default Step1AIPrompt;
