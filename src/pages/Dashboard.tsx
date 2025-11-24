import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  TrendingUp,
  Users,
  Brain,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  GitCommit,
  Play,
  Sparkles,
  ChevronDown,
  Workflow,
  Zap,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';
import { useDemo } from '@/contexts/DemoContext';
import { demoScenes } from '@/data/mockData';
import type { Project } from '@/types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const navigate = useNavigate();
  const { startDemo } = useDemo();
  const [showDemoMenu, setShowDemoMenu] = useState(false);

  const userProjects = projects.filter(p =>
    user?.activeProjects.includes(p.projectId)
  );

  const stats = {
    activeProjects: userProjects.filter(p => p.status === 'active').length,
    teamUtilization: 78,
    aiUsage: 85,
    avgVelocity: 42,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Demo Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="btn-secondary flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-merkle-primary text-white hover:from-purple-600 hover:to-purple-700 border-0"
            >
              <Play className="w-5 h-5" />
              <span>Start Demo</span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showDemoMenu && (
              <>
                {/* Backdrop to close menu */}
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDemoMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 right-0 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50"
                >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-merkle-primary">
                  <h3 className="text-white font-semibold flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Choose a Demo</span>
                  </h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {demoScenes.map((scene, idx) => {
                    const icons = [Play, Zap, Workflow];
                    const Icon = icons[idx] || Play;
                    return (
                      <button
                        key={scene.id}
                        onClick={() => {
                          startDemo(scene);
                          setShowDemoMenu(false);
                        }}
                        className="w-full text-left p-4 hover:bg-purple-50 transition-colors flex items-start space-x-3 group"
                      >
                        <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                          <Icon className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-merkle-primary transition-colors">
                            {scene.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">{scene.description}</p>
                          <p className="text-xs text-gray-500">
                            ⏱ {Math.floor(scene.duration / 1000)}s • {scene.actions.length} steps
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
              </>
            )}
          </div>

          <button
            onClick={() => navigate('/project/create')}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>New Project</span>
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Activity}
          label="Active Projects"
          value={stats.activeProjects}
          trend="+12%"
          color="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={Users}
          label="Team Utilization"
          value={`${stats.teamUtilization}%`}
          trend="+5%"
          color="text-green-600"
          bgColor="bg-green-50"
        />
        <StatCard
          icon={Brain}
          label="AI Assistance"
          value={`${stats.aiUsage}%`}
          trend="+23%"
          color="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatCard
          icon={TrendingUp}
          label="Avg Velocity"
          value={stats.avgVelocity}
          trend="+8%"
          color="text-pink-600"
          bgColor="bg-pink-50"
        />
      </div>

      {/* Active Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-display font-bold text-gray-900">
            Active Projects
          </h2>
          <button
            onClick={() => navigate('/toolbox')}
            className="text-merkle-primary hover:underline text-sm font-semibold"
          >
            Browse Toolbox →
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {userProjects.map((project, index) => (
            <ProjectCard
              key={project.projectId}
              project={project}
              index={index}
              onEnter={() => navigate(`/project/${project.projectId}/workbench`)}
            />
          ))}
        </div>
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <QuickActionButton
              icon={Plus}
              label="Create New Project"
              onClick={() => navigate('/project/create')}
            />
            <QuickActionButton
              icon={Brain}
              label="Browse AI Agents"
              onClick={() => navigate('/toolbox?category=ai_agents')}
            />
            <QuickActionButton
              icon={Users}
              label="Team Calendar"
              onClick={() => navigate('/calendar')}
            />
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card lg:col-span-2"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            <ActivityItem
              icon={GitCommit}
              text="Marcus Rodriguez pushed 3 commits to ecommerce-frontend"
              time="2 hours ago"
              project="E-commerce Transformation"
            />
            <ActivityItem
              icon={CheckCircle}
              text="Emma Thompson completed 5 user stories"
              time="4 hours ago"
              project="Data Platform Migration"
            />
            <ActivityItem
              icon={AlertCircle}
              text="Visual QA Agent detected 2 UI inconsistencies"
              time="5 hours ago"
              project="Customer Experience Redesign"
            />
            <ActivityItem
              icon={Brain}
              text="Documentation Generator updated API docs"
              time="1 day ago"
              project="E-commerce Transformation"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  trend: string;
  color: string;
  bgColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  trend,
  color,
  bgColor,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="card"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <span className="text-green-600 text-sm font-semibold">{trend}</span>
      </div>
      <div className="mt-4">
        <p className="text-gray-600 text-sm">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
    </motion.div>
  );
};

interface ProjectCardProps {
  project: Project;
  index: number;
  onEnter: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onEnter }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planning':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="card cursor-pointer project-card"
      onClick={onEnter}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">
              {project.name}
            </h3>
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
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${project.metrics.completion}%` }}
            transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
            className="bg-gradient-to-r from-merkle-primary to-merkle-accent h-2 rounded-full"
          />
        </div>
      </div>

      {/* Team Avatars */}
      <div className="flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.team.slice(0, 4).map((member, idx) => (
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
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <CheckCircle className="w-4 h-4" />
            <span>{project.metrics.tasksCompleted}/{project.metrics.totalTasks}</span>
          </div>
          <div className="flex items-center space-x-1">
            <AlertCircle className="w-4 h-4" />
            <span>{project.metrics.issuesOpen}</span>
          </div>
          <div className="flex items-center space-x-1">
            <GitCommit className="w-4 h-4" />
            <span>{project.metrics.commits}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-1" />
          <span>Last activity: {project.lastActivity}</span>
        </div>
        <button className="text-merkle-primary hover:underline text-sm font-semibold">
          Enter Workspace →
        </button>
      </div>
    </motion.div>
  );
};

interface QuickActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}

const QuickActionButton: React.FC<QuickActionButtonProps> = ({
  icon: Icon,
  label,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className="w-full flex items-center space-x-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
    >
      <Icon className="w-5 h-5 text-merkle-primary" />
      <span className="text-gray-900 font-medium">{label}</span>
    </motion.button>
  );
};

interface ActivityItemProps {
  icon: React.ElementType;
  text: string;
  time: string;
  project: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({
  icon: Icon,
  text,
  time,
  project,
}) => {
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
      <div className="p-2 bg-white rounded-lg">
        <Icon className="w-4 h-4 text-gray-600" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{text}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500">{project}</span>
          <span className="text-xs text-gray-400">•</span>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
