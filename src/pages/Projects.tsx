import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  LayoutGrid,
  List,
  Clock,
  CheckCircle2,
  AlertCircle,
  GitCommit,
  TrendingUp,
  Users,
  Calendar,
} from 'lucide-react';
import { useProjects } from '@/contexts/ProjectContext';
import { useAuth } from '@/contexts/AuthContext';
import type { ProjectStatus } from '@/types';

const Projects: React.FC = () => {
  const { projects } = useProjects();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: projects.length,
    planning: projects.filter(p => p.status === 'planning').length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            All Projects
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all your projects
          </p>
        </div>
        <button
          onClick={() => navigate('/project/create')}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>New Project</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Projects"
          value={statusCounts.all}
          icon={LayoutGrid}
          color="blue"
          onClick={() => setStatusFilter('all')}
          isActive={statusFilter === 'all'}
        />
        <StatCard
          label="Planning"
          value={statusCounts.planning}
          icon={Calendar}
          color="yellow"
          onClick={() => setStatusFilter('planning')}
          isActive={statusFilter === 'planning'}
        />
        <StatCard
          label="Active"
          value={statusCounts.active}
          icon={TrendingUp}
          color="green"
          onClick={() => setStatusFilter('active')}
          isActive={statusFilter === 'active'}
        />
        <StatCard
          label="Completed"
          value={statusCounts.completed}
          icon={CheckCircle2}
          color="purple"
          onClick={() => setStatusFilter('completed')}
          isActive={statusFilter === 'completed'}
        />
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {filteredProjects.length === 0 ? (
        <div className="card text-center py-16">
          <LayoutGrid className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 mb-6">
            {searchQuery
              ? 'Try adjusting your search query'
              : 'Get started by creating your first project'}
          </p>
          <button
            onClick={() => navigate('/project/create')}
            className="btn-primary inline-flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Create Project</span>
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <ProjectGridCard
              key={project.projectId}
              project={project}
              index={index}
              onEnter={() => navigate(`/project/${project.projectId}/workbench`)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProjects.map((project, index) => (
            <ProjectListCard
              key={project.projectId}
              project={project}
              index={index}
              onEnter={() => navigate(`/project/${project.projectId}/workbench`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  onClick: () => void;
  isActive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  icon: Icon,
  color,
  onClick,
  isActive,
}) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    yellow: 'bg-yellow-100 text-yellow-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`card text-left transition-all ${
        isActive ? 'ring-2 ring-merkle-primary' : ''
      }`}
    >
      <div className={`inline-flex p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </motion.button>
  );
};

// Project Grid Card
interface ProjectCardProps {
  project: any;
  index: number;
  onEnter: () => void;
}

const ProjectGridCard: React.FC<ProjectCardProps> = ({ project, index, onEnter }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="card cursor-pointer"
      onClick={onEnter}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-sm text-gray-600">{project.client}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600">Progress</span>
          <span className="font-semibold text-gray-900">
            {project.metrics.completion}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-merkle-primary to-merkle-accent h-2 rounded-full transition-all"
            style={{ width: `${project.metrics.completion}%` }}
          />
        </div>
      </div>

      {/* Team */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.team.slice(0, 4).map((member: any) => (
            <img
              key={member.userId}
              src={member.avatar}
              alt={member.name}
              className="w-8 h-8 rounded-full border-2 border-white"
              title={member.name}
            />
          ))}
          {project.team.length > 4 && (
            <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-xs font-semibold text-gray-700">
              +{project.team.length - 4}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4" />
            <span>{project.metrics.tasksCompleted}</span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{project.metrics.issuesOpen}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>{project.lastActivity}</span>
        </div>
        <span className="text-merkle-primary hover:underline text-sm font-semibold">
          Open →
        </span>
      </div>
    </motion.div>
  );
};

// Project List Card
const ProjectListCard: React.FC<ProjectCardProps> = ({ project, index, onEnter }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ x: 4 }}
      className="card cursor-pointer"
      onClick={onEnter}
    >
      <div className="flex items-center space-x-6">
        {/* Project Icon */}
        <div className="w-16 h-16 bg-gradient-merkle rounded-xl flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-2xl">
            {project.name.charAt(0)}
          </span>
        </div>

        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                project.status
              )}`}
            >
              {project.status}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{project.client}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{project.team.length} members</span>
            </span>
            <span className="flex items-center space-x-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>{project.metrics.tasksCompleted} tasks</span>
            </span>
            <span className="flex items-center space-x-1">
              <GitCommit className="w-4 h-4" />
              <span>{project.metrics.commits} commits</span>
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="w-32 flex-shrink-0">
          <div className="text-right mb-2">
            <span className="text-2xl font-bold text-gray-900">
              {project.metrics.completion}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-merkle-primary to-merkle-accent h-2 rounded-full"
              style={{ width: `${project.metrics.completion}%` }}
            />
          </div>
        </div>

        {/* Action */}
        <button className="btn-primary flex-shrink-0">
          Open Workspace
        </button>
      </div>
    </motion.div>
  );
};

export default Projects;
