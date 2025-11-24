import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Home,
  FolderKanban,
  Wrench,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Layout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const notifications = [
    {
      id: '1',
      title: 'New task assigned',
      message: 'You have been assigned to review the API documentation',
      time: '5 min ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Sprint planning reminder',
      message: 'Sprint planning meeting starts in 30 minutes',
      time: '25 min ago',
      unread: true,
    },
    {
      id: '3',
      title: 'Code review completed',
      message: 'Marcus Rodriguez approved your pull request',
      time: '1 hour ago',
      unread: false,
    },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => navigate('/dashboard')}
              >
                <div className="w-10 h-10 bg-gradient-merkle rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold text-gray-900">
                    Merkle AI
                  </h1>
                  <p className="text-xs text-gray-500">Platform</p>
                </div>
              </motion.div>

              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-1">
                <NavLink
                  icon={Home}
                  label="Dashboard"
                  path="/dashboard"
                  isActive={isActivePath('/dashboard')}
                  onClick={() => navigate('/dashboard')}
                />
                <NavLink
                  icon={FolderKanban}
                  label="Projects"
                  path="/projects"
                  isActive={isActivePath('/projects')}
                  onClick={() => navigate('/projects')}
                />
                <NavLink
                  icon={Calendar}
                  label="Calendar"
                  path="/calendar"
                  isActive={isActivePath('/calendar')}
                  onClick={() => navigate('/calendar')}
                />
                <NavLink
                  icon={Wrench}
                  label="Toolbox"
                  path="/toolbox"
                  isActive={isActivePath('/toolbox')}
                  onClick={() => navigate('/toolbox')}
                />
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden lg:block relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects, tools, people..."
                  className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowUserMenu(false);
                  }}
                  className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  )}
                </motion.button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              notification.unread ? 'bg-blue-50' : ''
                            }`}
                          >
                            <p className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-center">
                        <button className="text-sm text-merkle-primary hover:underline font-semibold">
                          View all notifications
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Help */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <HelpCircle className="w-5 h-5" />
              </motion.button>

              {/* User Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowUserMenu(!showUserMenu);
                    setShowNotifications(false);
                  }}
                  className="flex items-center space-x-3 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-900">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-600 capitalize">
                      {user?.role.replace('_', ' ')}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </motion.button>

                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                        <p className="text-sm font-semibold text-gray-900">
                          {user?.name}
                        </p>
                        <p className="text-xs text-gray-600">{user?.email}</p>
                      </div>
                      <div className="py-2">
                        <UserMenuItem
                          icon={User}
                          label="My Profile"
                          onClick={() => navigate('/profile')}
                        />
                        <UserMenuItem
                          icon={Settings}
                          label="Settings"
                          onClick={() => navigate('/settings')}
                        />
                      </div>
                      <div className="border-t border-gray-200 py-2">
                        <UserMenuItem
                          icon={LogOut}
                          label="Sign Out"
                          onClick={handleLogout}
                          danger
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-73px)]">
        <Outlet />
      </main>
    </div>
  );
};

interface NavLinkProps {
  icon: React.ElementType;
  label: string;
  path: string;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  icon: Icon,
  label,
  path,
  isActive,
  onClick,
}) => {
  const getNavClass = () => {
    if (path === '/projects') return 'nav-projects';
    if (path === '/toolbox') return 'nav-toolbox';
    if (path === '/calendar') return 'nav-calendar';
    return '';
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? 'bg-merkle-primary text-white'
          : 'text-gray-600 hover:bg-gray-100'
      } ${getNavClass()}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </motion.button>
  );
};

interface UserMenuItemProps {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  danger?: boolean;
}

const UserMenuItem: React.FC<UserMenuItemProps> = ({
  icon: Icon,
  label,
  onClick,
  danger,
}) => {
  return (
    <motion.button
      whileHover={{ x: 4 }}
      onClick={onClick}
      className={`w-full flex items-center space-x-3 px-4 py-2 text-left transition-colors ${
        danger
          ? 'text-red-600 hover:bg-red-50'
          : 'text-gray-700 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};

export default Layout;
