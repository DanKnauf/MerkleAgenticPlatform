import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Calendar,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
  Edit3,
  Save,
  X,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useProjects } from '@/contexts/ProjectContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { projects } = useProjects();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [editedEmail, setEditedEmail] = useState(user?.email || '');

  if (!user) return null;

  const userProjects = projects.filter(p => user.activeProjects.includes(p.projectId));
  const completedTasks = userProjects.reduce(
    (sum, p) => sum + p.metrics.tasksCompleted,
    0
  );
  const totalCommits = userProjects.reduce((sum, p) => sum + p.metrics.commits, 0);

  const handleSave = () => {
    // In a real app, this would update the user profile
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedName(user.name);
    setEditedEmail(user.email);
    setIsEditing(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-white shadow-lg"
              />
              <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            </div>

            {/* Info */}
            <div>
              {isEditing ? (
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="text-3xl font-display font-bold text-gray-900 border-b-2 border-merkle-primary focus:outline-none mb-2"
                />
              ) : (
                <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
                  {user.name}
                </h1>
              )}
              <p className="text-lg text-gray-600 capitalize mb-2">
                {user.role.replace('_', ' ')}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                {isEditing ? (
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="border-b border-gray-300 focus:outline-none focus:border-merkle-primary"
                  />
                ) : (
                  <>
                    <span className="flex items-center space-x-1">
                      <Mail className="w-4 h-4" />
                      <span>{user.email}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Briefcase className="w-4 h-4" />
                      <span>{user.department}</span>
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Edit Button */}
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="btn-secondary flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={Briefcase}
          label="Active Projects"
          value={userProjects.length}
          color="blue"
        />
        <StatCard
          icon={CheckCircle2}
          label="Tasks Completed"
          value={completedTasks}
          color="green"
        />
        <StatCard
          icon={TrendingUp}
          label="Contributions"
          value={totalCommits}
          color="purple"
        />
        <StatCard
          icon={Award}
          label="Recognition"
          value="12"
          color="yellow"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* About Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Me */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">About Me</h2>
            <p className="text-gray-600 leading-relaxed">
              Experienced {user.role.replace('_', ' ')} with a passion for delivering
              exceptional results. Specialized in AI-powered solutions and agile
              methodologies. Committed to continuous learning and team collaboration.
            </p>
          </motion.div>

          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {[
                'Project Management',
                'Agile/Scrum',
                'Team Leadership',
                'AI Integration',
                'Strategic Planning',
                'Stakeholder Management',
                'Risk Management',
                'Budgeting',
              ].map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {[
                {
                  action: 'Completed sprint planning for E-commerce project',
                  time: '2 hours ago',
                  icon: CheckCircle2,
                  color: 'text-green-600',
                },
                {
                  action: 'Added 3 new team members to Data Platform Migration',
                  time: '5 hours ago',
                  icon: User,
                  color: 'text-blue-600',
                },
                {
                  action: 'Updated project timeline and milestones',
                  time: '1 day ago',
                  icon: Calendar,
                  color: 'text-purple-600',
                },
                {
                  action: 'Reviewed and approved design mockups',
                  time: '2 days ago',
                  icon: Award,
                  color: 'text-yellow-600',
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <activity.icon className={`w-5 h-5 ${activity.color} mt-0.5`} />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">New York, NY</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Briefcase className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{user.department}</span>
              </div>
            </div>
          </motion.div>

          {/* Active Projects */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Active Projects
            </h3>
            <div className="space-y-3">
              {userProjects.slice(0, 3).map((project, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900 text-sm mb-1">
                    {project.name}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">{project.client}</span>
                    <span className="text-xs font-semibold text-merkle-primary">
                      {project.metrics.completion}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Preferences
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Email Notifications</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.preferences.notifications}
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-merkle-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-merkle-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Email Digest</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={user.preferences.emailDigest}
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-merkle-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-merkle-primary"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Theme</span>
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {user.preferences.theme}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Stat Card Component
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number | string;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    yellow: 'bg-yellow-100 text-yellow-600',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card"
    >
      <div className={`inline-flex p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]} mb-3`}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-sm text-gray-600 mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </motion.div>
  );
};

export default Profile;
