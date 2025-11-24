import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Wrench,
  Settings,
  ChevronLeft,
  ChevronRight,
  Search,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Folder,
  FolderOpen,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Bot,
  Zap,
  Calendar,
  Eye,
  Code,
  GraduationCap,
  ArrowRight,
  Play,
} from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import ToolboxSidebar from '@/components/workbench/ToolboxSidebar';
import AgentRunner from '@/components/AgentRunner';
import type { Tool } from '@/types';

const ProjectWorkbench: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { getProjectById, tools } = useProjects();
  const [project, setProject] = useState(getProjectById(projectId!));
  const [activeView, setActiveView] = useState('overview');
  const [toolboxOpen, setToolboxOpen] = useState(true);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);

  useEffect(() => {
    if (projectId) {
      const foundProject = getProjectById(projectId);
      setProject(foundProject);
    }
  }, [projectId, getProjectById]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Project not found
          </h2>
          <p className="text-gray-600">
            The project you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
    { id: 'tools', label: 'Tools & Agents', icon: Wrench },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Project Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-merkle rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {project.name.charAt(0)}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold text-gray-900">
                  {project.name}
                </h1>
                <p className="text-sm text-gray-600">{project.client}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {project.metrics.completion}%
              </p>
              <p className="text-xs text-gray-600">Complete</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {project.team.length}
              </p>
              <p className="text-xs text-gray-600">Team Members</p>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {project.metrics.aiUtilization}%
              </p>
              <p className="text-xs text-gray-600">AI Usage</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
              />
            </div>
          </div>

          <nav className="flex-1 px-3 space-y-1">
            {navigationItems.map(item => (
              <NavItem
                key={item.id}
                {...item}
                isActive={activeView === item.id}
                onClick={() => setActiveView(item.id)}
              />
            ))}
          </nav>

          {/* Team Avatars */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-3">
              Team Members
            </p>
            <div className="flex flex-wrap gap-2">
              {project.team.map(member => (
                <img
                  key={member.userId}
                  src={member.avatar}
                  alt={member.name}
                  title={member.name}
                  className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {activeView === 'overview' && <OverviewView project={project} />}
              {activeView === 'team' && <TeamView project={project} />}
              {activeView === 'knowledge' && <KnowledgeView />}
              {activeView === 'tools' && (
                <ToolsView
                  project={project}
                  onSelectTool={setSelectedTool}
                />
              )}
              {activeView === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Sidebar - Toolbox */}
        <AnimatePresence>
          {toolboxOpen && (
            <ToolboxSidebar
              availableTools={tools}
              onClose={() => setToolboxOpen(false)}
              onSelectTool={setSelectedTool}
            />
          )}
        </AnimatePresence>

        {/* Toolbox Toggle Button */}
        {!toolboxOpen && (
          <motion.button
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            onClick={() => setToolboxOpen(true)}
            className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-merkle-primary text-white p-3 rounded-l-lg shadow-lg hover:bg-pink-600 transition-colors z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
        )}
      </div>
    </div>
  );
};

// Navigation Item Component
interface NavItemProps {
  id: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({
  label,
  icon: Icon,
  isActive,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-merkle-primary text-white'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};

// Overview View
const OverviewView: React.FC<{ project: any }> = ({ project }) => {
  return (
    <div className="max-w-6xl space-y-6">
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Project Overview
        </h2>
        <p className="text-gray-600">{project.description}</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          icon={TrendingUp}
          label="Velocity"
          value={project.metrics.velocity}
          color="blue"
        />
        <MetricCard
          icon={CheckCircle2}
          label="Tasks Complete"
          value={`${project.metrics.tasksCompleted}/${project.metrics.totalTasks}`}
          color="green"
        />
        <MetricCard
          icon={AlertCircle}
          label="Open Issues"
          value={project.metrics.issuesOpen}
          color="orange"
        />
        <MetricCard
          icon={Clock}
          label="Last Activity"
          value={project.lastActivity}
          color="purple"
          isText
        />
      </div>

      {/* Progress Section */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Project Progress
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Overall Completion</span>
              <span className="font-semibold text-gray-900">
                {project.metrics.completion}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-merkle-primary to-merkle-accent h-3 rounded-full transition-all duration-500"
                style={{ width: `${project.metrics.completion}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Launch Integrations Panel */}
      <div className="card bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-display font-bold text-gray-900 mb-1">
              Quick Launch Integrations
            </h3>
            <p className="text-sm text-gray-600">
              Access your connected tools and services
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-700 font-semibold">
              {project.workbench.integrations.filter((i: any) => i.status === 'connected').length} Connected
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* SharePoint Integration */}
          {project.workbench.integrations.find((i: any) => i.name === 'SharePoint') && (
            <motion.a
              href={`https://merkle.sharepoint.com/sites/${project.projectId}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-400"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.5 3.5h-21v17h21v-17zm-11 15.5h-9v-6h9v6zm0-7h-9v-6h9v6zm10 7h-9v-13h9v13z"/>
                  </svg>
                </div>
                <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="font-semibold">Connected</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                SharePoint
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Access project documents and files
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Open SharePoint</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.a>
          )}

          {/* MS Teams Integration */}
          {project.workbench.integrations.find((i: any) => i.name === 'MS Teams' || i.name === 'Microsoft Teams') && (
            <motion.a
              href={`https://teams.microsoft.com/l/team/${project.projectId}-team`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-400"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                  <svg className="w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.5 3h-15A1.5 1.5 0 0 0 3 4.5v15A1.5 1.5 0 0 0 4.5 21h15a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 19.5 3zM9 17H7v-6h2v6zm9 0h-2v-4h-2v4h-2v-8h4a2 2 0 0 1 2 2v6z"/>
                  </svg>
                </div>
                <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="font-semibold">Connected</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                Microsoft Teams
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Chat, meet, and collaborate with team
              </p>
              <div className="flex items-center text-purple-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Open Teams</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.a>
          )}

          {/* Jira Integration */}
          {project.workbench.integrations.find((i: any) => i.name.includes('Jira')) && (
            <motion.a
              href={`https://merkle.atlassian.net/browse/${project.projectId.toUpperCase()}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -4, scale: 1.02 }}
              className="group relative bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all border-2 border-transparent hover:border-blue-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.53 2c0 2.4 1.97 4.35 4.35 4.35h1.78v1.7c0 2.4 1.94 4.34 4.34 4.34V2.84a.84.84 0 0 0-.84-.84h-9.63zM6.77 6.76c0 2.37 1.93 4.3 4.3 4.3h1.78v1.7c0 2.38 1.92 4.3 4.3 4.3V7.6a.84.84 0 0 0-.84-.84H6.77zM2 11.6c0 2.4 1.95 4.34 4.35 4.34h1.78v1.72c.01 2.39 1.94 4.34 4.34 4.34v-9.56a.84.84 0 0 0-.84-.84H2z"/>
                  </svg>
                </div>
                <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  <span className="font-semibold">Connected</span>
                </div>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                Atlassian Jira
              </h4>
              <p className="text-sm text-gray-600 mb-4">
                Track issues and manage sprints
              </p>
              <div className="flex items-center text-blue-600 font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Open Jira Board</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </motion.a>
          )}
        </div>

        {/* Additional Integrations */}
        {project.workbench.integrations.length > 3 && (
          <div className="mt-6 pt-6 border-t border-blue-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Other Connected Services
            </p>
            <div className="flex flex-wrap gap-2">
              {project.workbench.integrations
                .filter((i: any) =>
                  !['SharePoint', 'Microsoft Teams', 'MS Teams'].includes(i.name) &&
                  !i.name.includes('Jira')
                )
                .map((integration: any) => (
                  <div
                    key={integration.integrationId}
                    className="px-3 py-2 bg-white rounded-lg border border-gray-200 text-sm text-gray-700 flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span>{integration.name}</span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Team View
const TeamView: React.FC<{ project: any }> = ({ project }) => {
  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
        Team Members
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.team.map((member: any) => (
          <div key={member.userId} className="card">
            <div className="flex items-center space-x-4">
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-900">{member.name}</p>
                <p className="text-sm text-gray-600 capitalize">
                  {member.role.replace('_', ' ')}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      member.availability === 'available'
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    }`}
                  />
                  <span className="text-xs text-gray-500 capitalize">
                    {member.availability}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Knowledge View
const KnowledgeView: React.FC = () => {
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);

  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  };

  const knowledgeItems = [
    {
      id: 'folder-use-cases',
      type: 'folder',
      name: 'Use Cases',
      children: [
        { id: 'file-1', type: 'file', name: 'User Authentication Flow.docx', size: '245 KB', modified: '2 days ago' },
        { id: 'file-2', type: 'file', name: 'Payment Processing.docx', size: '189 KB', modified: '1 week ago' },
        { id: 'file-3', type: 'file', name: 'Admin Dashboard.docx', size: '312 KB', modified: '3 days ago' },
      ],
    },
    {
      id: 'file-scope',
      type: 'file',
      name: 'Scope of Work.docx',
      size: '856 KB',
      modified: '1 month ago',
    },
    {
      id: 'file-requirements',
      type: 'file',
      name: 'Project Requirements.docx',
      size: '1.2 MB',
      modified: '2 weeks ago',
    },
    {
      id: 'folder-meeting-notes',
      type: 'folder',
      name: 'Client Meeting Notes',
      children: [
        { id: 'file-4', type: 'file', name: 'Kickoff Meeting - Jan 15.docx', size: '324 KB', modified: '3 months ago' },
        { id: 'file-5', type: 'file', name: 'Sprint Review - Feb 12.docx', size: '412 KB', modified: '2 months ago' },
        { id: 'file-6', type: 'file', name: 'Requirements Review - Mar 05.docx', size: '289 KB', modified: '1 month ago' },
      ],
    },
  ];

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          Knowledge Repository
        </h2>
        <a
          href="https://merkle.sharepoint.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-merkle-primary hover:text-purple-700 font-semibold transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          <span>View in SharePoint</span>
        </a>
      </div>

      <div className="card">
        <div className="divide-y divide-gray-100">
          {knowledgeItems.map((item) => (
            <div key={item.id}>
              {item.type === 'folder' ? (
                <>
                  <motion.button
                    onClick={() => toggleFolder(item.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex items-center space-x-3">
                      {expandedFolders.includes(item.id) ? (
                        <FolderOpen className="w-5 h-5 text-yellow-500" />
                      ) : (
                        <Folder className="w-5 h-5 text-yellow-500" />
                      )}
                      <span className="font-semibold text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({item.children?.length || 0} items)
                      </span>
                    </div>
                    {expandedFolders.includes(item.id) ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </motion.button>

                  <AnimatePresence>
                    {expandedFolders.includes(item.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-gray-50 overflow-hidden"
                      >
                        {item.children?.map((child) => (
                          <motion.div
                            key={child.id}
                            whileHover={{ x: 4 }}
                            className="flex items-center justify-between p-4 pl-12 hover:bg-gray-100 transition-colors cursor-pointer border-t border-gray-100"
                          >
                            <div className="flex items-center space-x-3 flex-1">
                              <FileText className="w-5 h-5 text-blue-500" />
                              <div className="flex-1">
                                <p className="font-medium text-gray-900">
                                  {child.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {child.size} • Modified {child.modified}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <motion.div
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <FileText className="w-5 h-5 text-blue-500" />
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.size} • Modified {item.modified}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tools View
const ToolsView: React.FC<{
  project: any;
  onSelectTool: (tool: Tool) => void;
}> = ({ project, onSelectTool }) => {
  const navigate = useNavigate();
  const [runningAgent, setRunningAgent] = useState<Tool | null>(null);

  const getToolIcon = (iconName: string) => {
    const iconMap: Record<string, React.ElementType> = {
      Calendar,
      Eye,
      Code,
      GraduationCap,
      Zap,
      Bot,
    };
    return iconMap[iconName] || Bot;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'agent_orchestrator':
        return 'bg-pink-100 text-pink-600';
      case 'ai_agents':
        return 'bg-purple-100 text-purple-600';
      case 'integrations':
        return 'bg-blue-100 text-blue-600';
      case 'collaboration':
        return 'bg-green-100 text-green-600';
      case 'analytics':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const activeTools = project?.workbench?.activeTools || [];

  return (
    <div className="max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">
          Tools & AI Agents
        </h2>
        <button
          onClick={() => navigate('/toolbox')}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Browse Toolbox</span>
        </button>
      </div>

      {activeTools.length === 0 ? (
        <div className="card text-center py-12">
          <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No tools added yet</p>
          <p className="text-sm text-gray-500 mt-2">
            Click "Browse Toolbox" to add tools and AI agents to this project
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTools.map((tool: Tool, index: number) => {
            const Icon = getToolIcon(tool.icon);
            const isAIAgent = tool.category === 'ai_agents';

            return (
              <motion.div
                key={tool.toolId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="card group relative"
              >
                <div
                  onClick={() => navigate(`/toolbox/${tool.toolId}`)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${getCategoryColor(
                        tool.category
                      )} transition-transform group-hover:scale-110`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    {tool.featured && (
                      <span className="text-yellow-500 text-sm">★</span>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-merkle-primary transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {tool.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-xs text-gray-500 capitalize">
                    {tool.category.replace('_', ' ')}
                  </span>

                  {isAIAgent ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setRunningAgent(tool);
                      }}
                      className="flex items-center space-x-1 px-3 py-1.5 bg-gradient-to-r from-merkle-primary to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all font-semibold text-sm shadow-sm hover:shadow-md"
                    >
                      <Play className="w-4 h-4" />
                      <span>Run</span>
                    </button>
                  ) : (
                    <div
                      onClick={() => navigate(`/toolbox/${tool.toolId}`)}
                      className="flex items-center space-x-1 text-merkle-primary text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <span>View</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Agent Runner Modal */}
      {runningAgent && (
        <AgentRunner
          tool={runningAgent}
          onClose={() => setRunningAgent(null)}
        />
      )}
    </div>
  );
};

// Settings View
const SettingsView: React.FC = () => {
  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
        Project Settings
      </h2>
      <div className="card text-center py-12">
        <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Project configuration and settings</p>
        <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
      </div>
    </div>
  );
};

// Metric Card Component
interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
  isText?: boolean;
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon: Icon,
  label,
  value,
  color,
  isText,
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <div className="card">
      <div
        className={`inline-flex p-2 rounded-lg ${
          colorClasses[color as keyof typeof colorClasses]
        } mb-3`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p
        className={`font-bold text-gray-900 ${
          isText ? 'text-base' : 'text-2xl'
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default ProjectWorkbench;
