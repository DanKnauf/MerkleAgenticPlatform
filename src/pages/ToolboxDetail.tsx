import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Star,
  Settings,
  Code,
  CheckCircle2,
  Copy,
  ExternalLink,
  Workflow,
  Zap,
  GitBranch,
  Link2,
} from 'lucide-react';
import { mockTools } from '@/data/mockData';
import { useProjects } from '@/contexts/ProjectContext';
import type { Tool } from '@/types';

const ToolboxDetail: React.FC = () => {
  const { toolId } = useParams();
  const navigate = useNavigate();
  const { projects, currentProject, addToolToProject } = useProjects();
  const tool = mockTools.find((t) => t.toolId === toolId);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showProjectSelector, setShowProjectSelector] = useState(false);
  const [configValues, setConfigValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  if (!tool) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Tool Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The tool you're looking for doesn't exist.
          </p>
          <button onClick={() => navigate('/toolbox')} className="btn-primary">
            Back to Toolbox
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'agent_orchestrator':
        return 'bg-pink-100 text-pink-800';
      case 'ai_agents':
        return 'bg-purple-100 text-purple-800';
      case 'integrations':
        return 'bg-blue-100 text-blue-800';
      case 'collaboration':
        return 'bg-green-100 text-green-800';
      case 'analytics':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCopyPrompt = () => {
    if (tool.prompt) {
      navigator.clipboard.writeText(tool.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleConfigChange = (fieldName: string, value: string) => {
    setConfigValues((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleMicrosoftAuth = () => {
    // Check if tool requires Microsoft authentication
    const isMicrosoftTool =
      tool.name.toLowerCase().includes('teams') ||
      tool.name.toLowerCase().includes('sharepoint') ||
      tool.integrations.includes('microsoft_teams');

    if (isMicrosoftTool) {
      setShowAuthDialog(true);
    }
  };

  const handleConnect = () => {
    console.log('Connecting with configuration:', configValues);
    // In a real app, this would save the configuration
    alert('Configuration saved successfully!');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/toolbox')}
        className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Toolbox</span>
      </button>

      {/* Tool Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Icon */}
            <div
              className={`p-4 rounded-xl ${getCategoryColor(tool.category)}`}
            >
              <div className="w-8 h-8" />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-display font-bold text-gray-900">
                  {tool.name}
                </h1>
                {tool.featured && (
                  <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                )}
              </div>
              <p className="text-lg text-gray-600 mb-3">{tool.description}</p>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(
                    tool.category
                  )}`}
                >
                  {tool.category.replace('_', ' ')}
                </span>
                {tool.integrations.length > 0 && (
                  <span className="text-sm text-gray-600">
                    • Integrates with: {tool.integrations.join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setShowProjectSelector(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Add to Project</span>
            </button>
            <button className="btn-secondary flex items-center space-x-2">
              <ExternalLink className="w-5 h-5" />
              <span>Documentation</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Agent Orchestrator Canvas Section - Agentic Component Creator */}
      {tool.toolId === 'tool022' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-purple-600 rounded-xl">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Visual Workflow Builder
                </h2>
                <p className="text-gray-600">
                  Create sophisticated multi-agent workflows with a drag-and-drop canvas interface
                </p>
              </div>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Example: CMS Component Designer Workflow
            </h3>
            <div className="flex items-center justify-center space-x-4 py-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0L1 7v10l11 7 11-7V7L12 0zm0 2.5l8.5 5.4v8.2L12 21.5l-8.5-5.4V7.9L12 2.5z" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Figma Source</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-purple-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-purple-400"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Component Generator</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-purple-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-purple-400"></div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <line x1="12" y1="2" x2="12" y2="8" />
                    <line x1="12" y1="16" x2="12" y2="22" />
                    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17" />
                    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07" />
                    <line x1="2" y1="12" x2="8" y2="12" />
                    <line x1="16" y1="12" x2="22" y2="12" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700">Chrome Testbed</span>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 1v6m0 6v6" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Data Sources</h4>
                <p className="text-sm text-gray-600">Connect to Figma, GitHub, APIs, and databases</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">AI Agents</h4>
                <p className="text-sm text-gray-600">Chain multiple agents with custom prompts</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <GitBranch className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Decision Logic</h4>
                <p className="text-sm text-gray-600">Add conditional branches and routing</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-pink-100 rounded-lg">
                <Link2 className="w-5 h-5 text-pink-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">MCP Integration</h4>
                <p className="text-sm text-gray-600">Connect agents via Model Context Protocol</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate(`/toolbox/${tool.toolId}/orchestrator/cms-component-designer`)}
            className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            <Workflow className="w-6 h-6" />
            <span>Open Workflow Canvas</span>
          </button>

          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-900">
              <strong>Getting Started:</strong> Click above to open the canvas editor. Drag workflow nodes from the toolbar,
              connect them to create pipelines, and configure each step. Pre-populated examples are available to help you get started.
            </p>
          </div>
        </motion.div>
      )}

      {/* Agent Orchestrator Canvas Section - Content Marketing Pipeline */}
      {tool.toolId === 'tool025' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-pink-600 rounded-xl">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Content Marketing Workflow Builder
                </h2>
                <p className="text-gray-600">
                  Design end-to-end content pipelines from research to multi-channel distribution
                </p>
              </div>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Example: Blog Post Creation & Distribution Workflow
            </h3>
            <div className="flex items-center justify-center space-x-3 py-8 overflow-x-auto">
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Topic Research</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-pink-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-pink-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Content Writer</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-pink-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-pink-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">SEO Optimizer</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-pink-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-pink-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">CMS Publisher</span>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Research & Analysis</h4>
                <p className="text-sm text-gray-600">Automated topic research and competitor analysis</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">AI Content Generation</h4>
                <p className="text-sm text-gray-600">Create engaging content with brand voice</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">SEO Optimization</h4>
                <p className="text-sm text-gray-600">Automated keyword optimization and meta tags</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Multi-Channel Publishing</h4>
                <p className="text-sm text-gray-600">Distribute to CMS, social media, and email</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate(`/toolbox/${tool.toolId}/orchestrator/content-marketing`)}
            className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
          >
            <Workflow className="w-6 h-6" />
            <span>Open Workflow Canvas</span>
          </button>

          <div className="mt-4 p-4 bg-pink-50 rounded-lg border border-pink-200">
            <p className="text-sm text-pink-900">
              <strong>Getting Started:</strong> Click above to open the canvas editor. Build your content workflow by connecting research,
              writing, optimization, and distribution agents. Customize each stage to match your content strategy.
            </p>
          </div>
        </motion.div>
      )}

      {/* Agent Orchestrator Canvas Section - Data Analysis Workflow */}
      {tool.toolId === 'tool026' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Data Analysis Pipeline Builder
                </h2>
                <p className="text-gray-600">
                  Create automated data pipelines from extraction to executive dashboards
                </p>
              </div>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Example: Customer Analytics Pipeline
            </h3>
            <div className="flex items-center justify-center space-x-3 py-8 overflow-x-auto">
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <ellipse cx="12" cy="5" rx="9" ry="3" />
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Data Extract</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-blue-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-cyan-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18" />
                    <path d="m19 9-5 5-4-4-3 3" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Analysis Agent</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-blue-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Insight Generator</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-blue-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-blue-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Dashboard</span>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Multi-Source Extraction</h4>
                <p className="text-sm text-gray-600">Pull from databases, APIs, and spreadsheets</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-cyan-100 rounded-lg">
                <svg className="w-5 h-5 text-cyan-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3v18h18" />
                  <path d="m19 9-5 5-4-4-3 3" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Statistical Analysis</h4>
                <p className="text-sm text-gray-600">Automated trend detection and calculations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">AI-Powered Insights</h4>
                <p className="text-sm text-gray-600">Generate actionable recommendations</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Dashboard Publishing</h4>
                <p className="text-sm text-gray-600">Auto-update PowerBI, Tableau, or custom dashboards</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate(`/toolbox/${tool.toolId}/orchestrator/data-analysis`)}
            className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
          >
            <Workflow className="w-6 h-6" />
            <span>Open Workflow Canvas</span>
          </button>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-900">
              <strong>Getting Started:</strong> Click above to open the canvas editor. Design your data pipeline by connecting extraction,
              transformation, analysis, and visualization agents. Configure data sources and output formats for your needs.
            </p>
          </div>
        </motion.div>
      )}

      {/* Agent Orchestrator Canvas Section - API Testing Suite */}
      {tool.toolId === 'tool027' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-green-600 rounded-xl">
                <Workflow className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  API Testing Workflow Builder
                </h2>
                <p className="text-gray-600">
                  Build comprehensive API testing pipelines with automated validation and reporting
                </p>
              </div>
            </div>
          </div>

          {/* Canvas Preview */}
          <div className="bg-white rounded-lg p-6 border-2 border-gray-200 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Example: REST API Testing Pipeline
            </h3>
            <div className="flex items-center justify-center space-x-3 py-8 overflow-x-auto">
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">API Spec</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-green-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Test Generator</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-green-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Test Executor</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-0.5 bg-green-400"></div>
                <div className="w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-8 border-l-green-400"></div>
              </div>
              <div className="flex flex-col items-center min-w-[80px]">
                <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                  <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">Report</span>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">OpenAPI/Swagger Support</h4>
                <p className="text-sm text-gray-600">Auto-generate tests from API specifications</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Intelligent Test Generation</h4>
                <p className="text-sm text-gray-600">Create edge cases, happy paths, and error scenarios</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Performance Testing</h4>
                <p className="text-sm text-gray-600">Measure response times and identify bottlenecks</p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-gray-200">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Auto Bug Reporting</h4>
                <p className="text-sm text-gray-600">Create Jira tickets with detailed reproduction steps</p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={() => navigate(`/toolbox/${tool.toolId}/orchestrator/api-testing`)}
            className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Workflow className="w-6 h-6" />
            <span>Open Workflow Canvas</span>
          </button>

          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-900">
              <strong>Getting Started:</strong> Click above to open the canvas editor. Build your testing pipeline by connecting spec analysis,
              test generation, execution, validation, and reporting agents. Configure for REST, GraphQL, or SOAP APIs.
            </p>
          </div>
        </motion.div>
      )}

      {/* AI Agent Prompt Section */}
      {tool.category === 'ai_agents' && tool.prompt && tool.toolId !== 'tool022' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Code className="w-6 h-6 text-purple-600" />
              <h2 className="text-2xl font-semibold text-gray-900">
                AI Agent Prompt
              </h2>
            </div>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center space-x-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-sm">Copy Prompt</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
            <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono leading-relaxed">
              {tool.prompt}
            </pre>
          </div>
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-sm text-purple-900">
              <strong>How to use:</strong> This prompt defines the AI agent's
              behavior and capabilities. You can customize it for your specific
              use case or use it as-is. The agent will follow these instructions
              when processing requests.
            </p>
          </div>
        </motion.div>
      )}

      {/* Integration Configuration Section */}
      {tool.category === 'integrations' && tool.configFields && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center space-x-2 mb-6">
            <Settings className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Configuration Settings
            </h2>
          </div>

          <div className="space-y-4">
            {tool.configFields.map((field, index) => (
              <div key={index}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {field.label}
                </label>
                {field.type === 'select' ? (
                  <select
                    value={configValues[field.name] || ''}
                    onChange={(e) =>
                      handleConfigChange(field.name, e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                  >
                    <option value="">Select an option</option>
                    {field.options?.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    value={configValues[field.name] || ''}
                    onChange={(e) =>
                      handleConfigChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={configValues[field.name] || ''}
                    onChange={(e) =>
                      handleConfigChange(field.name, e.target.value)
                    }
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Microsoft Office Integration Button */}
          {(tool.name.toLowerCase().includes('teams') ||
            tool.name.toLowerCase().includes('sharepoint')) && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-900 mb-3">
                This integration requires Microsoft authentication. Click below
                to connect your Microsoft account.
              </p>
              <button
                onClick={handleMicrosoftAuth}
                className="btn-primary w-full flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none">
                  <rect width="11" height="11" fill="#F25022" />
                  <rect x="12" width="11" height="11" fill="#7FBA00" />
                  <rect y="12" width="11" height="11" fill="#00A4EF" />
                  <rect x="12" y="12" width="11" height="11" fill="#FFB900" />
                </svg>
                <span>Connect with Microsoft</span>
              </button>
            </div>
          )}

          <div className="mt-6 flex space-x-3">
            <button onClick={handleConnect} className="btn-primary flex-1">
              Save Configuration
            </button>
            <button className="btn-secondary">Test Connection</button>
          </div>
        </motion.div>
      )}

      {/* Permissions Required */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Permissions Required
        </h3>
        <div className="flex flex-wrap gap-2">
          {tool.permissions.map((permission, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {permission.replace('_', ' ')}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Project Selector Dialog */}
      {showProjectSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Add "{tool.name}" to Project
            </h3>
            <p className="text-gray-600 mb-6">
              Select a project to add this tool to:
            </p>
            <div className="space-y-3 mb-6">
              {projects.map((project) => {
                const alreadyAdded = project.workbench.activeTools.some(
                  (t) => t.toolId === tool.toolId
                );
                return (
                  <button
                    key={project.projectId}
                    onClick={() => {
                      if (!alreadyAdded) {
                        addToolToProject(project.projectId, tool);
                        setShowProjectSelector(false);
                        alert(
                          `"${tool.name}" has been added to "${project.name}"!`
                        );
                      }
                    }}
                    disabled={alreadyAdded}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      alreadyAdded
                        ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
                        : 'border-gray-200 hover:border-merkle-primary hover:bg-purple-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          {project.name}
                        </h4>
                        <p className="text-sm text-gray-600">{project.client}</p>
                      </div>
                      {alreadyAdded ? (
                        <span className="flex items-center space-x-1 text-sm text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Already Added</span>
                        </span>
                      ) : (
                        <span className="text-merkle-primary text-sm font-semibold">
                          Add →
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setShowProjectSelector(false)}
              className="btn-secondary w-full"
            >
              Cancel
            </button>
          </motion.div>
        </div>
      )}

      {/* Microsoft Auth Dialog */}
      {showAuthDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Microsoft Authorization
            </h3>
            <p className="text-gray-600 mb-6">
              Merkle AI Platform would like to access your Microsoft account to:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Read and write to {tool.name}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Access your profile information
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <span className="text-sm text-gray-700">
                  Maintain access to data you have given it access to
                </span>
              </li>
            </ul>
            <div className="flex space-x-3">
              <button
                onClick={() => {
                  setShowAuthDialog(false);
                  alert('Microsoft authorization successful! (Mock)');
                }}
                className="btn-primary flex-1"
              >
                Authorize
              </button>
              <button
                onClick={() => setShowAuthDialog(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-4 text-center">
              By authorizing, you agree to allow Merkle AI Platform to access
              your Microsoft account in accordance with Microsoft's privacy
              policy.
            </p>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ToolboxDetail;
