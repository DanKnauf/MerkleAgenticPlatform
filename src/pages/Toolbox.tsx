import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Star,
  Filter,
  Grid3x3,
  List,
  TrendingUp,
  Sparkles,
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
  Download,
  Users,
  Workflow,
} from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import type { Tool, ToolCategory } from '@/types';

const Toolbox: React.FC = () => {
  const { tools } = useProjects();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'name' | 'popular' | 'recent'>('popular');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  const categories: { id: ToolCategory | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All Tools', count: tools.length },
    {
      id: 'agent_orchestrator',
      label: 'Agent Orchestrators',
      count: tools.filter(t => t.category === 'agent_orchestrator').length,
    },
    {
      id: 'ai_agents',
      label: 'AI Agents',
      count: tools.filter(t => t.category === 'ai_agents').length,
    },
    {
      id: 'integrations',
      label: 'Integrations',
      count: tools.filter(t => t.category === 'integrations').length,
    },
    {
      id: 'collaboration',
      label: 'Collaboration',
      count: tools.filter(t => t.category === 'collaboration').length,
    },
    {
      id: 'analytics',
      label: 'Analytics',
      count: tools.filter(t => t.category === 'analytics').length,
    },
  ];

  const filteredTools = tools.filter(tool => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesFeatured = !showFeaturedOnly || tool.featured;

    return matchesSearch && matchesCategory && matchesFeatured;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'popular') {
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
    return 0; // recent
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
      Workflow,
      Search,
    };
    return iconMap[iconName] || Bot;
  };

  const featuredTools = tools.filter(t => t.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-merkle text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Toolbox Marketplace
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover AI agents, integrations, and tools to supercharge your projects
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for tools, agents, integrations..."
                  className="w-full pl-12 pr-4 py-4 text-gray-900 rounded-xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-center space-x-8 mt-8">
              <div className="text-center">
                <p className="text-3xl font-bold">{tools.length}</p>
                <p className="text-sm text-white/80">Total Tools</p>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <p className="text-3xl font-bold">{featuredTools.length}</p>
                <p className="text-sm text-white/80">Featured</p>
              </div>
              <div className="w-px h-12 bg-white/30" />
              <div className="text-center">
                <p className="text-3xl font-bold">5</p>
                <p className="text-sm text-white/80">Categories</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Categories and Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="card sticky top-6">
              {/* View Toggle */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-900">View</h3>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${
                      viewMode === 'grid'
                        ? 'bg-white shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    <Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${
                      viewMode === 'list'
                        ? 'bg-white shadow-sm'
                        : 'text-gray-600'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Featured Filter */}
              <button
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className={`w-full mb-4 flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  showFeaturedOnly
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Star className="w-4 h-4" />
                <span className="text-sm font-medium">Featured Only</span>
              </button>

              {/* Sort */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 mb-2 block">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary text-sm"
                >
                  <option value="popular">Most Popular</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="recent">Recently Added</option>
                </select>
              </div>

              {/* Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors text-sm ${
                        selectedCategory === cat.id
                          ? 'bg-merkle-primary text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-xs">{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tools Grid/List */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  {selectedCategory === 'all'
                    ? 'All Tools'
                    : categories.find(c => c.id === selectedCategory)?.label}
                </h2>
                <p className="text-gray-600 mt-1">
                  {sortedTools.length} tools available
                </p>
              </div>
            </div>

            {sortedTools.length === 0 ? (
              <div className="card text-center py-16">
                <Bot className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tools found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedTools.map((tool, index) => (
                  <ToolGridCard
                    key={tool.toolId}
                    tool={tool}
                    icon={getToolIcon(tool.icon)}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedTools.map((tool, index) => (
                  <ToolListCard
                    key={tool.toolId}
                    tool={tool}
                    icon={getToolIcon(tool.icon)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Tool Grid Card Component
interface ToolCardProps {
  tool: Tool;
  icon: React.ElementType;
  index: number;
}

const ToolGridCard: React.FC<ToolCardProps> = ({ tool, icon: Icon, index }) => {
  const navigate = useNavigate();
  const categoryColors = {
    agent_orchestrator: 'bg-pink-100 text-pink-600',
    ai_agents: 'bg-purple-100 text-purple-600',
    integrations: 'bg-blue-100 text-blue-600',
    collaboration: 'bg-green-100 text-green-600',
    analytics: 'bg-orange-100 text-orange-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={() => navigate(`/toolbox/${tool.toolId}`)}
      className="card cursor-pointer group tool-card"
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`p-3 rounded-xl ${
            categoryColors[tool.category]
          } transition-transform group-hover:scale-110`}
        >
          <Icon className="w-6 h-6" />
        </div>
        {tool.featured && (
          <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-merkle-primary transition-colors">
        {tool.name}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
        {tool.description}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <span className="text-xs text-gray-500 capitalize">
          {tool.category.replace('_', ' ')}
        </span>
        <button className="text-sm text-merkle-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
          <Download className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>
    </motion.div>
  );
};

// Tool List Card Component
const ToolListCard: React.FC<ToolCardProps> = ({ tool, icon: Icon, index }) => {
  const navigate = useNavigate();
  const categoryColors = {
    agent_orchestrator: 'bg-pink-100 text-pink-600',
    ai_agents: 'bg-purple-100 text-purple-600',
    integrations: 'bg-blue-100 text-blue-600',
    collaboration: 'bg-green-100 text-green-600',
    analytics: 'bg-orange-100 text-orange-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ x: 4 }}
      onClick={() => navigate(`/toolbox/${tool.toolId}`)}
      className="card cursor-pointer group flex items-center space-x-4"
    >
      <div
        className={`p-4 rounded-xl ${
          categoryColors[tool.category]
        } transition-transform group-hover:scale-110`}
      >
        <Icon className="w-6 h-6" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-merkle-primary transition-colors">
            {tool.name}
          </h3>
          {tool.featured && (
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          )}
        </div>
        <p className="text-sm text-gray-600 mb-2">{tool.description}</p>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span className="capitalize">{tool.category.replace('_', ' ')}</span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <Users className="w-3 h-3" />
            <span>Used in {tool.integrations.length} projects</span>
          </span>
        </div>
      </div>

      <button className="btn-primary opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-2">
        <Download className="w-4 h-4" />
        <span>Add Tool</span>
      </button>
    </motion.div>
  );
};

export default Toolbox;
