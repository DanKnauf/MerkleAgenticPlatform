export type ProjectStatus = 'planning' | 'active' | 'completed';

export type UserRole =
  | 'project_manager'
  | 'developer'
  | 'business_analyst'
  | 'designer'
  | 'architect'
  | 'qa_engineer'
  | 'product_owner'
  | 'strategist';

export type ToolCategory =
  | 'ai_agents'
  | 'integrations'
  | 'collaboration'
  | 'analytics'
  | 'agent_orchestrator';

export interface User {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar: string;
  permissions: string[];
  activeProjects: string[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  emailDigest: boolean;
}

export interface TeamMember {
  userId: string;
  name: string;
  role: UserRole;
  avatar: string;
  availability: 'available' | 'busy' | 'away';
}

export interface Project {
  projectId: string;
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  startDate: Date;
  targetEndDate: Date;
  team: TeamMember[];
  workbench: Workbench;
  metrics: ProjectMetrics;
  lastActivity: string;
}

export interface KnowledgeItem {
  id: string;
  title: string;
  type: 'document' | 'folder' | 'link';
  lastModified: Date;
  author: string;
  size?: string;
  children?: KnowledgeItem[];
}

export interface Workbench {
  activeTools: Tool[];
  integrations: Integration[];
  repositories: Repository[];
  knowledge: KnowledgeItem[];
}

export interface ProjectMetrics {
  completion: number;
  velocity: number;
  aiUtilization: number;
  tasksCompleted: number;
  totalTasks: number;
  issuesOpen: number;
  commits: number;
}

export interface Tool {
  toolId: string;
  name: string;
  category: ToolCategory;
  description: string;
  icon: string;
  configuration: Record<string, unknown>;
  permissions: string[];
  integrations: string[];
  featured?: boolean;
  prompt?: string; // For AI agents
  configFields?: {
    name: string;
    label: string;
    type: 'text' | 'textarea' | 'select' | 'checkbox';
    placeholder?: string;
    options?: string[];
  }[]; // For integrations
}

export interface Integration {
  integrationId: string;
  name: string;
  type: string;
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: Date;
  config: Record<string, unknown>;
}

export interface Repository {
  repoId: string;
  name: string;
  type: 'git' | 'sharepoint' | 'confluence';
  url: string;
  lastCommit?: Date;
}

export interface AIRecommendation {
  projectName: string;
  roles: string[];
  teamSize: number;
  tools: string[];
  integrations: string[];
  timeline: string;
  resources: string[];
}

export interface DemoScene {
  id: string;
  title: string;
  description: string;
  duration: number;
  actions: DemoAction[];
}

export interface DemoAction {
  type: 'navigate' | 'click' | 'type' | 'highlight' | 'wait' | 'tooltip';
  target?: string;
  value?: string;
  duration?: number;
  message?: string;
  position?: { x: number; y: number };
}

export interface NotificationItem {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
}
