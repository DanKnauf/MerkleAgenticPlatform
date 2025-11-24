import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ProjectProvider } from '@/contexts/ProjectContext';
import { DemoProvider } from '@/contexts/DemoContext';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import ProjectCreate from '@/pages/ProjectCreate';
import ProjectWorkbench from '@/pages/ProjectWorkbench';
import Toolbox from '@/pages/Toolbox';
import ToolboxDetail from '@/pages/ToolboxDetail';
import AgentOrchestratorCanvas from '@/pages/AgentOrchestratorCanvas';
import Projects from '@/pages/Projects';
import Profile from '@/pages/Profile';
import Settings from '@/pages/Settings';
import TeamCalendar from '@/pages/TeamCalendar';
import Layout from '@/components/Layout';
import GuidedDemo from '@/components/GuidedDemo';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-merkle-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="projects" element={<Projects />} />
        <Route path="calendar" element={<TeamCalendar />} />
        <Route path="toolbox" element={<Toolbox />} />
        <Route path="toolbox/:toolId" element={<ToolboxDetail />} />
        <Route path="toolbox/:toolId/orchestrator/:orchestratorId" element={<AgentOrchestratorCanvas />} />
        <Route path="project/create" element={<ProjectCreate />} />
        <Route path="project/:projectId/workbench" element={<ProjectWorkbench />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          <DemoProvider>
            <AppRoutes />
            <GuidedDemo />
          </DemoProvider>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
