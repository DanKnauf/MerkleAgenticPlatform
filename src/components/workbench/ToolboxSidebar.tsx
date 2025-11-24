import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X,
  Search,
  Filter,
  Star,
  Calendar,
  FileText,
  PieChart,
  Eye,
  BookOpen,
  GraduationCap,
  Code,
  Zap,
  Bot,
  Trello,
  MessageSquare,
  Github,
  Figma as FigmaIcon,
  Presentation,
  Terminal,
  BarChart,
  TrendingDown,
  Activity,
  Brain,
} from 'lucide-react';
import type { Tool, ToolCategory } from '@/types';

interface ToolboxSidebarProps {
  availableTools: Tool[];
  onClose: () => void;
  onSelectTool: (tool: Tool) => void;
}

const ToolboxSidebar: React.FC<ToolboxSidebarProps> = ({
  availableTools,
  onClose,
  onSelectTool,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories: { id: ToolCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Tools' },
    { id: 'ai_agents', label: 'AI Agents' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'collaboration', label: 'Collaboration' },
    { id: 'analytics', label: 'Analytics' },
  ];

  const filteredTools = availableTools.filter(tool => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesFeatured = !showFeaturedOnly || tool.featured;

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const getToolIcon = (iconName: string) => {
    const iconMap: Record<string, React.ElementType> = {
      Calendar,
      FileText,
      PieChart,
      Eye,
      BookOpen,
      GraduationCap,
      Code,
      Zap,
      Bot,
      Trello,
      MessageSquare,
      Github,
      Figma: FigmaIcon,
      Presentation,
      Terminal,
      FileEdit: FileText,
      BarChart,
      TrendingDown,
      Activity,
      Brain,
    };
    return iconMap[iconName] || Bot;
  };

  return (
    <motion.div
      initial={{ x: 400 }}
      animate={{ x: 0 }}
      exit={{ x: 400 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-96 bg-white border-l border-gray-200 flex flex-col shadow-xl"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-gray-900">
            Toolbox
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools..."
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
          />
        </div>

        {/* Filter */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
              showFeaturedOnly
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Featured</span>
          </button>
          <div className="flex-1 relative">
            <Filter className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(e.target.value as ToolCategory | 'all')
              }
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary appearance-none"
            >
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tools List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600">No tools found</p>
            <p className="text-xs text-gray-500 mt-1">
              Try adjusting your filters
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTools.map((tool, index) => (
              <ToolCard
                key={tool.toolId}
                tool={tool}
                icon={getToolIcon(tool.icon)}
                onSelect={onSelectTool}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-gray-600 text-center">
          {filteredTools.length} tools available
        </p>
      </div>
    </motion.div>
  );
};

interface ToolCardProps {
  tool: Tool;
  icon: React.ElementType;
  onSelect: (tool: Tool) => void;
  index: number;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, icon: Icon, onSelect, index }) => {
  const categoryColors = {
    ai_agents: 'bg-purple-100 text-purple-600 border-purple-200',
    integrations: 'bg-blue-100 text-blue-600 border-blue-200',
    collaboration: 'bg-green-100 text-green-600 border-green-200',
    analytics: 'bg-orange-100 text-orange-600 border-orange-200',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(tool)}
      className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-merkle-primary cursor-pointer transition-all group"
    >
      <div className="flex items-start space-x-3">
        <div
          className={`p-2 rounded-lg ${
            categoryColors[tool.category]
          } transition-transform group-hover:scale-110`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <p className="font-semibold text-gray-900 text-sm truncate">
              {tool.name}
            </p>
            {tool.featured && (
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-xs text-gray-600 line-clamp-2 mb-2">
            {tool.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 capitalize">
              {tool.category.replace('_', ' ')}
            </span>
            <button className="text-xs text-merkle-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Add →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ToolboxSidebar;
