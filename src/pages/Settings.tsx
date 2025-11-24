import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Lock,
  Palette,
  Globe,
  Shield,
  Database,
  Zap,
  HelpCircle,
  Check,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Settings: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('notifications');

  const tabs = [
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Privacy', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'data', label: 'Data & Storage', icon: Database },
    { id: 'integrations', label: 'Integrations', icon: Zap },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your account preferences and platform settings
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="card space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    activeTab === tab.id
                      ? 'bg-merkle-primary text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'notifications' && <NotificationsSettings />}
            {activeTab === 'security' && <SecuritySettings />}
            {activeTab === 'appearance' && <AppearanceSettings />}
            {activeTab === 'language' && <LanguageSettings />}
            {activeTab === 'data' && <DataSettings />}
            {activeTab === 'integrations' && <IntegrationsSettings />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Notifications Settings
const NotificationsSettings: React.FC = () => {
  const notifications = [
    {
      title: 'Email Notifications',
      description: 'Receive email updates about your projects and team',
      enabled: true,
    },
    {
      title: 'Push Notifications',
      description: 'Get browser notifications for important updates',
      enabled: true,
    },
    {
      title: 'Daily Digest',
      description: 'Receive a daily summary of your activity',
      enabled: false,
    },
    {
      title: 'Weekly Report',
      description: 'Get a weekly summary of project progress',
      enabled: true,
    },
    {
      title: 'Team Mentions',
      description: 'Be notified when someone mentions you',
      enabled: true,
    },
    {
      title: 'Task Assignments',
      description: 'Get notified when tasks are assigned to you',
      enabled: true,
    },
    {
      title: 'Project Updates',
      description: 'Receive updates when project status changes',
      enabled: false,
    },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Notification Preferences
      </h2>
      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div
            key={index}
            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{notification.title}</p>
              <p className="text-sm text-gray-600 mt-1">
                {notification.description}
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer ml-4">
              <input
                type="checkbox"
                defaultChecked={notification.enabled}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-merkle-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-merkle-primary"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

// Security Settings
const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Security & Privacy
        </h2>

        {/* Password */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Password</h3>
          <button className="btn-secondary">Change Password</button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Two-Factor Authentication
          </h3>
          <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-semibold text-green-900">Enabled</p>
                <p className="text-sm text-green-700">
                  Your account is protected with 2FA
                </p>
              </div>
            </div>
            <button className="btn-secondary text-sm">Manage</button>
          </div>
        </div>

        {/* Privacy */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Privacy Settings
          </h3>
          <div className="space-y-3">
            {[
              'Make my profile visible to team members',
              'Allow others to see my project activity',
              'Share my availability status',
              'Allow integration data collection',
            ].map((setting, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={index < 3}
                  className="w-5 h-5 text-merkle-primary focus:ring-merkle-primary border-gray-300 rounded"
                />
                <span className="text-gray-700">{setting}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Sessions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Active Sessions
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-semibold text-gray-900">Current Session</p>
              <p className="text-sm text-gray-600">New York, NY • Chrome on Windows</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Appearance Settings
const AppearanceSettings: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('light');
  const [accentColor, setAccentColor] = useState('pink');

  const themes = [
    { id: 'light', name: 'Light', description: 'Clean and bright interface' },
    { id: 'dark', name: 'Dark', description: 'Easy on the eyes' },
    { id: 'auto', name: 'Auto', description: 'Follows system settings' },
  ];

  const colors = [
    { id: 'pink', name: 'Pink', color: '#FF0080' },
    { id: 'purple', name: 'Purple', color: '#7B2CBF' },
    { id: 'blue', name: 'Blue', color: '#00D4FF' },
    { id: 'green', name: 'Green', color: '#10B981' },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Appearance
      </h2>

      {/* Theme */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`p-4 border-2 rounded-lg transition-all ${
                selectedTheme === theme.id
                  ? 'border-merkle-primary bg-pink-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-900">{theme.name}</p>
                {selectedTheme === theme.id && (
                  <Check className="w-5 h-5 text-merkle-primary" />
                )}
              </div>
              <p className="text-sm text-gray-600 text-left">{theme.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accent Color</h3>
        <div className="flex space-x-4">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setAccentColor(color.id)}
              className={`relative w-16 h-16 rounded-lg border-2 transition-all ${
                accentColor === color.id
                  ? 'border-gray-900 scale-110'
                  : 'border-gray-200 hover:scale-105'
              }`}
              style={{ backgroundColor: color.color }}
            >
              {accentColor === color.id && (
                <Check className="absolute inset-0 m-auto w-6 h-6 text-white" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Font Size</h3>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Small</span>
          <input
            type="range"
            min="12"
            max="18"
            defaultValue="14"
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-600">Large</span>
        </div>
      </div>
    </div>
  );
};

// Language Settings
const LanguageSettings: React.FC = () => {
  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Language & Region
      </h2>

      <div className="space-y-6">
        <div>
          <label className="label">Language</label>
          <select className="input-field">
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Spanish</option>
            <option>French</option>
            <option>German</option>
            <option>Japanese</option>
          </select>
        </div>

        <div>
          <label className="label">Time Zone</label>
          <select className="input-field">
            <option>Eastern Time (ET)</option>
            <option>Central Time (CT)</option>
            <option>Mountain Time (MT)</option>
            <option>Pacific Time (PT)</option>
            <option>UTC</option>
          </select>
        </div>

        <div>
          <label className="label">Date Format</label>
          <select className="input-field">
            <option>MM/DD/YYYY</option>
            <option>DD/MM/YYYY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>

        <div>
          <label className="label">Time Format</label>
          <select className="input-field">
            <option>12-hour (AM/PM)</option>
            <option>24-hour</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Data Settings
const DataSettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="card">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Data & Storage
        </h2>

        <div className="space-y-6">
          {/* Storage Usage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-gray-900">Storage Usage</h3>
              <span className="text-sm text-gray-600">2.4 GB of 50 GB used</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-merkle-primary h-2 rounded-full"
                style={{ width: '4.8%' }}
              />
            </div>
          </div>

          {/* Cache */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cache</h3>
            <button className="btn-secondary">Clear Cache</button>
            <p className="text-sm text-gray-600 mt-2">
              Clearing cache will remove temporary files and may improve performance
            </p>
          </div>
        </div>
      </div>

      {/* Data Export */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Data</h3>
        <p className="text-gray-600 mb-4">
          Download a copy of your account data and project information
        </p>
        <button className="btn-secondary">Request Data Export</button>
      </div>

      {/* Delete Account */}
      <div className="card border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
        <p className="text-gray-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

// Integrations Settings
const IntegrationsSettings: React.FC = () => {
  const integrations = [
    { name: 'Jira', status: 'connected', icon: '🎯' },
    { name: 'GitHub', status: 'connected', icon: '💻' },
    { name: 'Microsoft Teams', status: 'connected', icon: '💬' },
    { name: 'Confluence', status: 'disconnected', icon: '📚' },
    { name: 'Figma', status: 'disconnected', icon: '🎨' },
    { name: 'Slack', status: 'disconnected', icon: '📱' },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Connected Integrations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {integrations.map((integration, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-2 transition-all ${
              integration.status === 'connected'
                ? 'bg-green-50 border-green-200'
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{integration.icon}</span>
                <p className="font-semibold text-gray-900">{integration.name}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  integration.status === 'connected'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {integration.status}
              </span>
            </div>
            <button
              className={`text-sm font-semibold ${
                integration.status === 'connected'
                  ? 'text-red-600 hover:text-red-700'
                  : 'text-merkle-primary hover:text-pink-600'
              }`}
            >
              {integration.status === 'connected' ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start space-x-3">
          <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 mb-1">
              Need help with integrations?
            </p>
            <p className="text-sm text-blue-800">
              Check our documentation or contact support for assistance with connecting
              your tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
