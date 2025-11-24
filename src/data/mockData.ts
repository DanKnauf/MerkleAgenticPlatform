import type { User, Project, Tool, TeamMember, DemoScene } from '@/types';

// Mock Users
export const mockUsers: User[] = [
  {
    userId: 'pm001',
    name: 'Sarah Chen',
    email: 'pm@merkle.com',
    role: 'project_manager',
    department: 'Project Management',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    permissions: ['create_project', 'manage_team', 'view_analytics'],
    activeProjects: ['proj001', 'proj002', 'proj004'],
    preferences: {
      theme: 'light',
      notifications: true,
      emailDigest: true,
    },
  },
  {
    userId: 'dev001',
    name: 'Marcus Rodriguez',
    email: 'dev@merkle.com',
    role: 'developer',
    department: 'Engineering',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    permissions: ['code_commit', 'code_review', 'deploy'],
    activeProjects: ['proj001', 'proj003'],
    preferences: {
      theme: 'dark',
      notifications: true,
      emailDigest: false,
    },
  },
  {
    userId: 'ba001',
    name: 'Emma Thompson',
    email: 'ba@merkle.com',
    role: 'business_analyst',
    department: 'Business Analysis',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    permissions: ['create_requirements', 'manage_backlog'],
    activeProjects: ['proj001', 'proj002'],
    preferences: {
      theme: 'light',
      notifications: true,
      emailDigest: true,
    },
  },
  {
    userId: 'des001',
    name: 'David Kim',
    email: 'david.kim@merkle.com',
    role: 'designer',
    department: 'UX/UI Design',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    permissions: ['design_review', 'prototype'],
    activeProjects: ['proj001', 'proj003'],
    preferences: {
      theme: 'light',
      notifications: true,
      emailDigest: true,
    },
  },
  {
    userId: 'arch001',
    name: 'Priya Patel',
    email: 'priya.patel@merkle.com',
    role: 'architect',
    department: 'Architecture',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    permissions: ['architecture_review', 'tech_decisions'],
    activeProjects: ['proj002', 'proj004'],
    preferences: {
      theme: 'dark',
      notifications: true,
      emailDigest: false,
    },
  },
  {
    userId: 'qa001',
    name: 'James Wilson',
    email: 'james.wilson@merkle.com',
    role: 'qa_engineer',
    department: 'Quality Assurance',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    permissions: ['test_execution', 'bug_reporting'],
    activeProjects: ['proj001', 'proj003'],
    preferences: {
      theme: 'light',
      notifications: true,
      emailDigest: true,
    },
  },
  {
    userId: 'strat001',
    name: 'Alexandra Morgan',
    email: 'alexandra.morgan@merkle.com',
    role: 'strategist',
    department: 'Strategy & Consulting',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
    permissions: ['create_strategy', 'conduct_research', 'develop_roadmaps', 'client_consulting'],
    activeProjects: ['proj005', 'proj006', 'proj007'],
    preferences: {
      theme: 'light',
      notifications: true,
      emailDigest: true,
    },
  },
];

// Mock Team Members
const teamMembers: TeamMember[] = [
  {
    userId: 'pm001',
    name: 'Sarah Chen',
    role: 'project_manager',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
    availability: 'available',
  },
  {
    userId: 'dev001',
    name: 'Marcus Rodriguez',
    role: 'developer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
    availability: 'available',
  },
  {
    userId: 'ba001',
    name: 'Emma Thompson',
    role: 'business_analyst',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    availability: 'busy',
  },
  {
    userId: 'des001',
    name: 'David Kim',
    role: 'designer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
    availability: 'available',
  },
  {
    userId: 'arch001',
    name: 'Priya Patel',
    role: 'architect',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
    availability: 'available',
  },
  {
    userId: 'qa001',
    name: 'James Wilson',
    role: 'qa_engineer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
    availability: 'away',
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    projectId: 'proj001',
    name: 'E-commerce Transformation',
    client: 'Global Retail Corp',
    description: 'Complete digital transformation of e-commerce platform with AI-powered personalization and advanced analytics',
    status: 'active',
    startDate: new Date('2024-01-15'),
    targetEndDate: new Date('2024-06-30'),
    team: [teamMembers[0], teamMembers[1], teamMembers[2], teamMembers[3]],
    workbench: {
      activeTools: [
        {
          toolId: 'tool001',
          name: 'Meeting Scheduler Agent',
          category: 'ai_agents',
          description: 'Automatically schedule meetings across time zones with optimal time recommendations',
          icon: 'Calendar',
          configuration: {},
          permissions: ['calendar_access'],
          integrations: ['microsoft_teams', 'google_calendar'],
          featured: true,
        },
        {
          toolId: 'tool002',
          name: 'Documentation Generator',
          category: 'ai_agents',
          description: 'Generate comprehensive documentation from codebase, API specs, and technical artifacts',
          icon: 'FileText',
          configuration: {},
          permissions: ['repo_access'],
          integrations: ['github', 'confluence'],
          featured: true,
        },
        {
          toolId: 'tool004',
          name: 'Visual QA Agent',
          category: 'ai_agents',
          description: 'Automated visual regression testing and UI consistency checks',
          icon: 'Eye',
          configuration: {},
          permissions: ['test_execution'],
          integrations: ['figma', 'github'],
        },
        {
          toolId: 'tool006',
          name: 'Training Material Generator',
          category: 'ai_agents',
          description: 'Create training materials, user guides, and onboarding documentation',
          icon: 'GraduationCap',
          configuration: {},
          permissions: ['content_creation'],
          integrations: ['sharepoint', 'confluence'],
        },
      ],
      integrations: [
        {
          integrationId: 'int001',
          name: 'Jira',
          type: 'project_management',
          status: 'connected',
          lastSync: new Date(),
          config: {},
        },
        {
          integrationId: 'int002',
          name: 'GitHub',
          type: 'version_control',
          status: 'connected',
          lastSync: new Date(),
          config: {},
        },
        {
          integrationId: 'int003',
          name: 'SharePoint',
          type: 'document_management',
          status: 'connected',
          lastSync: new Date(),
          config: { siteUrl: 'https://merkle.sharepoint.com/sites/ecommerce' },
        },
        {
          integrationId: 'int004',
          name: 'MS Teams',
          type: 'communication',
          status: 'connected',
          lastSync: new Date(),
          config: { teamId: 'ecommerce-team' },
        },
      ],
      repositories: [
        {
          repoId: 'repo001',
          name: 'ecommerce-frontend',
          type: 'git',
          url: 'https://github.com/merkle/ecommerce-frontend',
          lastCommit: new Date(),
        },
      ],
      knowledge: [
        {
          id: 'kb001',
          title: 'Key Use Cases',
          type: 'document',
          lastModified: new Date('2024-03-15'),
          author: 'Sarah Chen',
          size: '2.4 MB',
        },
        {
          id: 'kb002',
          title: 'Compliance Documentation',
          type: 'document',
          lastModified: new Date('2024-03-10'),
          author: 'Emily Watson',
          size: '1.8 MB',
        },
        {
          id: 'kb003',
          title: 'Scope of Work',
          type: 'document',
          lastModified: new Date('2024-01-20'),
          author: 'Sarah Chen',
          size: '856 KB',
        },
        {
          id: 'kb004',
          title: 'Client Meeting Minutes',
          type: 'folder',
          lastModified: new Date('2024-03-18'),
          author: 'Sarah Chen',
          children: [
            {
              id: 'kb004-1',
              title: 'Kickoff Meeting - Jan 15',
              type: 'document',
              lastModified: new Date('2024-01-15'),
              author: 'Sarah Chen',
              size: '324 KB',
            },
            {
              id: 'kb004-2',
              title: 'Sprint Review - Feb 12',
              type: 'document',
              lastModified: new Date('2024-02-12'),
              author: 'Sarah Chen',
              size: '412 KB',
            },
            {
              id: 'kb004-3',
              title: 'Design Discussion - Mar 05',
              type: 'document',
              lastModified: new Date('2024-03-05'),
              author: 'David Kim',
              size: '289 KB',
            },
          ],
        },
      ],
    },
    metrics: {
      completion: 65,
      velocity: 42,
      aiUtilization: 78,
      tasksCompleted: 156,
      totalTasks: 240,
      issuesOpen: 12,
      commits: 342,
    },
    lastActivity: '2 hours ago',
  },
  {
    projectId: 'proj002',
    name: 'Data Platform Migration',
    client: 'Premier Financial Services',
    description: 'Cloud migration and modernization of enterprise data platform with enhanced security and compliance',
    status: 'active',
    startDate: new Date('2024-02-01'),
    targetEndDate: new Date('2024-08-31'),
    team: [teamMembers[0], teamMembers[4], teamMembers[1]],
    workbench: {
      activeTools: [],
      integrations: [
        {
          integrationId: 'int005',
          name: 'SharePoint',
          type: 'document_management',
          status: 'connected',
          lastSync: new Date(),
          config: { siteUrl: 'https://merkle.sharepoint.com/sites/dataplatform' },
        },
        {
          integrationId: 'int006',
          name: 'MS Teams',
          type: 'communication',
          status: 'connected',
          lastSync: new Date(),
          config: { teamId: 'dataplatform-team' },
        },
      ],
      repositories: [],
      knowledge: [
        {
          id: 'kb011',
          title: 'Key Use Cases',
          type: 'document',
          lastModified: new Date('2024-03-12'),
          author: 'James Wilson',
          size: '3.1 MB',
        },
        {
          id: 'kb012',
          title: 'Compliance Documentation',
          type: 'document',
          lastModified: new Date('2024-02-28'),
          author: 'Sarah Chen',
          size: '2.7 MB',
        },
        {
          id: 'kb013',
          title: 'Scope of Work',
          type: 'document',
          lastModified: new Date('2024-02-05'),
          author: 'Sarah Chen',
          size: '1.2 MB',
        },
        {
          id: 'kb014',
          title: 'Client Meeting Minutes',
          type: 'folder',
          lastModified: new Date('2024-03-14'),
          author: 'Sarah Chen',
          children: [
            {
              id: 'kb014-1',
              title: 'Initial Planning - Feb 01',
              type: 'document',
              lastModified: new Date('2024-02-01'),
              author: 'Sarah Chen',
              size: '445 KB',
            },
            {
              id: 'kb014-2',
              title: 'Security Review - Feb 20',
              type: 'document',
              lastModified: new Date('2024-02-20'),
              author: 'James Wilson',
              size: '567 KB',
            },
          ],
        },
      ],
    },
    metrics: {
      completion: 30,
      velocity: 35,
      aiUtilization: 65,
      tasksCompleted: 72,
      totalTasks: 240,
      issuesOpen: 8,
      commits: 187,
    },
    lastActivity: '5 hours ago',
  },
  {
    projectId: 'proj003',
    name: 'Customer Experience Redesign',
    client: 'HealthTech Solutions',
    description: 'Complete UX/UI redesign focused on accessibility, patient engagement, and streamlined workflows',
    status: 'active',
    startDate: new Date('2023-10-01'),
    targetEndDate: new Date('2024-02-28'),
    team: [teamMembers[3], teamMembers[1], teamMembers[5]],
    workbench: {
      activeTools: [],
      integrations: [
        {
          integrationId: 'int007',
          name: 'SharePoint',
          type: 'document_management',
          status: 'connected',
          lastSync: new Date(),
          config: { siteUrl: 'https://merkle.sharepoint.com/sites/customerexp' },
        },
        {
          integrationId: 'int008',
          name: 'MS Teams',
          type: 'communication',
          status: 'connected',
          lastSync: new Date(),
          config: { teamId: 'customerexp-team' },
        },
      ],
      repositories: [],
      knowledge: [
        {
          id: 'kb021',
          title: 'Key Use Cases',
          type: 'document',
          lastModified: new Date('2024-02-15'),
          author: 'David Kim',
          size: '1.9 MB',
        },
        {
          id: 'kb022',
          title: 'Compliance Documentation',
          type: 'document',
          lastModified: new Date('2024-01-25'),
          author: 'Emily Watson',
          size: '1.4 MB',
        },
        {
          id: 'kb023',
          title: 'Scope of Work',
          type: 'document',
          lastModified: new Date('2023-10-05'),
          author: 'Sarah Chen',
          size: '945 KB',
        },
        {
          id: 'kb024',
          title: 'Client Meeting Minutes',
          type: 'folder',
          lastModified: new Date('2024-02-20'),
          author: 'David Kim',
          children: [
            {
              id: 'kb024-1',
              title: 'Design Kickoff - Oct 15',
              type: 'document',
              lastModified: new Date('2023-10-15'),
              author: 'David Kim',
              size: '378 KB',
            },
            {
              id: 'kb024-2',
              title: 'User Testing Results - Jan 10',
              type: 'document',
              lastModified: new Date('2024-01-10'),
              author: 'Lisa Anderson',
              size: '623 KB',
            },
          ],
        },
      ],
    },
    metrics: {
      completion: 85,
      velocity: 48,
      aiUtilization: 82,
      tasksCompleted: 204,
      totalTasks: 240,
      issuesOpen: 4,
      commits: 521,
    },
    lastActivity: '30 minutes ago',
  },
  {
    projectId: 'proj004',
    name: 'AI Implementation Strategy',
    client: 'Industrial Dynamics Inc',
    description: 'Strategic AI integration for manufacturing operations optimization and predictive maintenance',
    status: 'active',
    startDate: new Date('2024-03-01'),
    targetEndDate: new Date('2024-09-30'),
    team: [teamMembers[0], teamMembers[4]],
    workbench: {
      activeTools: [],
      integrations: [
        {
          integrationId: 'int009',
          name: 'SharePoint',
          type: 'document_management',
          status: 'connected',
          lastSync: new Date(),
          config: { siteUrl: 'https://merkle.sharepoint.com/sites/aiimplementation' },
        },
        {
          integrationId: 'int010',
          name: 'MS Teams',
          type: 'communication',
          status: 'connected',
          lastSync: new Date(),
          config: { teamId: 'ai-implementation-team' },
        },
      ],
      repositories: [],
      knowledge: [
        {
          id: 'kb031',
          title: 'Key Use Cases',
          type: 'document',
          lastModified: new Date('2024-03-18'),
          author: 'James Wilson',
          size: '2.8 MB',
        },
        {
          id: 'kb032',
          title: 'Compliance Documentation',
          type: 'document',
          lastModified: new Date('2024-03-10'),
          author: 'Sarah Chen',
          size: '2.2 MB',
        },
        {
          id: 'kb033',
          title: 'Scope of Work',
          type: 'document',
          lastModified: new Date('2024-03-01'),
          author: 'Sarah Chen',
          size: '1.5 MB',
        },
        {
          id: 'kb034',
          title: 'Client Meeting Minutes',
          type: 'folder',
          lastModified: new Date('2024-03-17'),
          author: 'Sarah Chen',
          children: [
            {
              id: 'kb034-1',
              title: 'Strategy Session - Mar 01',
              type: 'document',
              lastModified: new Date('2024-03-01'),
              author: 'Sarah Chen',
              size: '511 KB',
            },
            {
              id: 'kb034-2',
              title: 'Technical Review - Mar 15',
              type: 'document',
              lastModified: new Date('2024-03-15'),
              author: 'James Wilson',
              size: '689 KB',
            },
          ],
        },
      ],
    },
    metrics: {
      completion: 45,
      velocity: 38,
      aiUtilization: 91,
      tasksCompleted: 108,
      totalTasks: 240,
      issuesOpen: 15,
      commits: 245,
    },
    lastActivity: '1 day ago',
  },
  {
    projectId: 'proj005',
    name: 'MarTech Assessment & Optimization',
    client: 'Fortune 500 Retailer',
    description: 'Comprehensive assessment of marketing technology stack with recommendations for optimization, consolidation, and ROI improvement',
    status: 'active',
    startDate: new Date('2024-02-15'),
    targetEndDate: new Date('2024-05-30'),
    team: [
      {
        userId: 'strat001',
        name: 'Alexandra Morgan',
        role: 'strategist',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
        availability: 'available',
      },
      teamMembers[2],
      teamMembers[4],
    ],
    workbench: {
      activeTools: [
        {
          toolId: 'tool026',
          name: 'Data Analysis Workflow',
          category: 'agent_orchestrator',
          description: 'Automated data pipeline that extracts, transforms, analyzes data and generates executive dashboards and insights',
          icon: 'Workflow',
          configuration: {},
          permissions: ['data_access', 'analytics'],
          integrations: ['powerbi', 'tableau', 'excel'],
          featured: true,
        },
        {
          toolId: 'tool023',
          name: 'Desk Research Agent',
          category: 'ai_agents',
          description: 'Conduct comprehensive market research, competitive analysis, and industry trend identification',
          icon: 'GraduationCap',
          configuration: {},
          permissions: ['web_access', 'research'],
          integrations: ['web_search', 'data_sources'],
          featured: true,
        },
      ],
      integrations: [
        {
          integrationId: 'int011',
          name: 'SharePoint',
          type: 'document_management',
          status: 'connected',
          lastSync: new Date(),
          config: { siteUrl: 'https://merkle.sharepoint.com/sites/martech-assessment' },
        },
        {
          integrationId: 'int012',
          name: 'MS Teams',
          type: 'communication',
          status: 'connected',
          lastSync: new Date(),
          config: { teamId: 'martech-team' },
        },
      ],
      repositories: [],
      knowledge: [
        {
          id: 'kb041',
          title: 'Current MarTech Stack Inventory',
          type: 'document',
          lastModified: new Date('2024-03-15'),
          author: 'Alexandra Morgan',
          size: '3.2 MB',
        },
        {
          id: 'kb042',
          title: 'Vendor Assessment Matrix',
          type: 'document',
          lastModified: new Date('2024-03-12'),
          author: 'Alexandra Morgan',
          size: '1.8 MB',
        },
        {
          id: 'kb043',
          title: 'ROI Analysis Report',
          type: 'document',
          lastModified: new Date('2024-03-10'),
          author: 'Emma Thompson',
          size: '2.5 MB',
        },
        {
          id: 'kb044',
          title: 'Integration Gap Analysis',
          type: 'document',
          lastModified: new Date('2024-03-08'),
          author: 'Alexandra Morgan',
          size: '1.9 MB',
        },
      ],
    },
    metrics: {
      completion: 65,
      velocity: 42,
      aiUtilization: 78,
      tasksCompleted: 78,
      totalTasks: 120,
      issuesOpen: 8,
      commits: 156,
    },
    lastActivity: '2 hours ago',
  },
  {
    projectId: 'proj006',
    name: 'Digital Transformation Strategic Roadmap',
    client: 'Global Financial Services',
    description: 'Multi-year strategic roadmap for digital transformation including technology modernization, customer experience enhancement, and operational efficiency',
    status: 'active',
    startDate: new Date('2024-01-10'),
    targetEndDate: new Date('2024-12-31'),
    team: [
      {
        userId: 'strat001',
        name: 'Alexandra Morgan',
        role: 'strategist',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
        availability: 'available',
      },
      teamMembers[0],
      teamMembers[4],
      teamMembers[1],
    ],
    workbench: {
      activeTools: [
        {
          toolId: 'tool026',
          name: 'Data Analysis Workflow',
          category: 'agent_orchestrator',
          description: 'Automated data pipeline that extracts, transforms, analyzes data and generates executive dashboards and insights',
          icon: 'Workflow',
          configuration: {},
          permissions: ['data_access', 'analytics'],
          integrations: ['powerbi', 'tableau', 'excel'],
          featured: true,
        },
        {
          toolId: 'tool025',
          name: 'Content Marketing Pipeline',
          category: 'agent_orchestrator',
          description: 'End-to-end content creation workflow from research to publication with SEO optimization and multi-channel distribution',
          icon: 'Workflow',
          configuration: {},
          permissions: ['content_creation', 'publishing'],
          integrations: ['cms', 'social_media', 'email'],
          featured: true,
        },
        {
          toolId: 'tool024',
          name: 'Use Case Development Agent',
          category: 'ai_agents',
          description: 'Generate detailed use cases and user stories from requirements and stakeholder interviews',
          icon: 'GraduationCap',
          configuration: {},
          permissions: ['requirements_access'],
          integrations: ['jira', 'confluence'],
          featured: true,
        },
      ],
      integrations: [
        {
          integrationId: 'int013',
          name: 'SharePoint',
          type: 'document_management',
          status: 'connected',
          lastSync: new Date(),
          config: { siteUrl: 'https://merkle.sharepoint.com/sites/digital-transformation' },
        },
        {
          integrationId: 'int014',
          name: 'MS Teams',
          type: 'communication',
          status: 'connected',
          lastSync: new Date(),
          config: { teamId: 'transformation-roadmap' },
        },
        {
          integrationId: 'int015',
          name: 'Atlassian Jira',
          type: 'project_management',
          status: 'connected',
          lastSync: new Date(),
          config: { projectKey: 'DTSR' },
        },
      ],
      repositories: [],
      knowledge: [
        {
          id: 'kb051',
          title: 'Strategic Vision Document',
          type: 'document',
          lastModified: new Date('2024-03-18'),
          author: 'Alexandra Morgan',
          size: '4.5 MB',
        },
        {
          id: 'kb052',
          title: 'Current State Assessment',
          type: 'document',
          lastModified: new Date('2024-02-28'),
          author: 'Alexandra Morgan',
          size: '5.1 MB',
        },
        {
          id: 'kb053',
          title: 'Technology Capability Map',
          type: 'document',
          lastModified: new Date('2024-03-05'),
          author: 'Priya Patel',
          size: '2.3 MB',
        },
        {
          id: 'kb054',
          title: 'Roadmap Timeline - 2024-2027',
          type: 'document',
          lastModified: new Date('2024-03-16'),
          author: 'Alexandra Morgan',
          size: '8.7 MB',
        },
        {
          id: 'kb055',
          title: 'Stakeholder Interview Notes',
          type: 'folder',
          lastModified: new Date('2024-03-10'),
          author: 'Alexandra Morgan',
          children: [
            {
              id: 'kb055-1',
              title: 'C-Suite Interviews',
              type: 'document',
              lastModified: new Date('2024-02-15'),
              author: 'Alexandra Morgan',
              size: '1.2 MB',
            },
            {
              id: 'kb055-2',
              title: 'Business Unit Leaders',
              type: 'document',
              lastModified: new Date('2024-02-20'),
              author: 'Sarah Chen',
              size: '980 KB',
            },
          ],
        },
      ],
    },
    metrics: {
      completion: 55,
      velocity: 48,
      aiUtilization: 85,
      tasksCompleted: 165,
      totalTasks: 300,
      issuesOpen: 12,
      commits: 289,
    },
    lastActivity: '3 hours ago',
  },
  {
    projectId: 'proj007',
    name: 'Ongoing Strategy Retainer - Q1 2024',
    client: 'Healthcare Technology Startup',
    description: 'Quarterly strategic advisory retainer covering market positioning, competitive analysis, go-to-market strategy, and product roadmap alignment',
    status: 'active',
    startDate: new Date('2024-01-01'),
    targetEndDate: new Date('2024-03-31'),
    team: [
      {
        userId: 'strat001',
        name: 'Alexandra Morgan',
        role: 'strategist',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandra',
        availability: 'available',
      },
      teamMembers[2],
    ],
    workbench: {
      activeTools: [
        {
          toolId: 'tool026',
          name: 'Data Analysis Workflow',
          category: 'agent_orchestrator',
          description: 'Automated data pipeline that extracts, transforms, analyzes data and generates executive dashboards and insights',
          icon: 'Workflow',
          configuration: {},
          permissions: ['data_access', 'analytics'],
          integrations: ['powerbi', 'tableau', 'excel'],
          featured: true,
        },
        {
          toolId: 'tool023',
          name: 'Desk Research Agent',
          category: 'ai_agents',
          description: 'Conduct comprehensive market research, competitive analysis, and industry trend identification',
          icon: 'GraduationCap',
          configuration: {},
          permissions: ['web_access', 'research'],
          integrations: ['web_search', 'data_sources'],
          featured: true,
        },
        {
          toolId: 'tool025',
          name: 'Content Marketing Pipeline',
          category: 'agent_orchestrator',
          description: 'End-to-end content creation workflow from research to publication with SEO optimization and multi-channel distribution',
          icon: 'Workflow',
          configuration: {},
          permissions: ['content_creation', 'publishing'],
          integrations: ['cms', 'social_media', 'email'],
          featured: true,
        },
      ],
      integrations: [
        {
          integrationId: 'int016',
          name: 'SharePoint',
          type: 'document_management',
          status: 'connected',
          lastSync: new Date(),
          config: { siteUrl: 'https://merkle.sharepoint.com/sites/strategy-retainer' },
        },
        {
          integrationId: 'int017',
          name: 'MS Teams',
          type: 'communication',
          status: 'connected',
          lastSync: new Date(),
          config: { teamId: 'strategy-advisory' },
        },
      ],
      repositories: [],
      knowledge: [
        {
          id: 'kb061',
          title: 'Q1 Strategy Deliverables',
          type: 'folder',
          lastModified: new Date('2024-03-17'),
          author: 'Alexandra Morgan',
          children: [
            {
              id: 'kb061-1',
              title: 'Market Analysis - January',
              type: 'document',
              lastModified: new Date('2024-01-25'),
              author: 'Alexandra Morgan',
              size: '2.1 MB',
            },
            {
              id: 'kb061-2',
              title: 'Competitive Intelligence - February',
              type: 'document',
              lastModified: new Date('2024-02-22'),
              author: 'Alexandra Morgan',
              size: '3.4 MB',
            },
            {
              id: 'kb061-3',
              title: 'GTM Strategy Update - March',
              type: 'document',
              lastModified: new Date('2024-03-17'),
              author: 'Alexandra Morgan',
              size: '6.8 MB',
            },
          ],
        },
        {
          id: 'kb062',
          title: 'Competitive Landscape Matrix',
          type: 'document',
          lastModified: new Date('2024-03-15'),
          author: 'Alexandra Morgan',
          size: '1.5 MB',
        },
        {
          id: 'kb063',
          title: 'Product Roadmap Alignment',
          type: 'document',
          lastModified: new Date('2024-03-12'),
          author: 'Emma Thompson',
          size: '1.8 MB',
        },
        {
          id: 'kb064',
          title: 'Monthly Strategy Calls',
          type: 'folder',
          lastModified: new Date('2024-03-10'),
          author: 'Alexandra Morgan',
          children: [
            {
              id: 'kb064-1',
              title: 'January Call Notes',
              type: 'document',
              lastModified: new Date('2024-01-15'),
              author: 'Alexandra Morgan',
              size: '432 KB',
            },
            {
              id: 'kb064-2',
              title: 'February Call Notes',
              type: 'document',
              lastModified: new Date('2024-02-15'),
              author: 'Alexandra Morgan',
              size: '521 KB',
            },
            {
              id: 'kb064-3',
              title: 'March Call Notes',
              type: 'document',
              lastModified: new Date('2024-03-10'),
              author: 'Alexandra Morgan',
              size: '498 KB',
            },
          ],
        },
      ],
    },
    metrics: {
      completion: 78,
      velocity: 52,
      aiUtilization: 88,
      tasksCompleted: 94,
      totalTasks: 120,
      issuesOpen: 3,
      commits: 167,
    },
    lastActivity: '1 day ago',
  },
];

// Mock Tools
export const mockTools: Tool[] = [
  // AI Agents
  {
    toolId: 'tool001',
    name: 'Meeting Scheduler Agent',
    category: 'ai_agents',
    description: 'Automatically schedule meetings across time zones with optimal time recommendations',
    icon: 'Calendar',
    configuration: {},
    permissions: ['calendar_access'],
    integrations: ['microsoft_teams', 'google_calendar'],
    featured: true,
    prompt: `You are an intelligent meeting scheduling assistant. Your role is to:

1. Analyze participant calendars across different time zones
2. Identify optimal meeting times that minimize conflicts
3. Consider working hours preferences for each participant
4. Suggest alternative times if conflicts exist
5. Draft professional meeting invitations with agenda
6. Handle rescheduling requests efficiently

When scheduling, prioritize:
- Participant availability (no double-booking)
- Time zone fairness (rotate meeting times for global teams)
- Working hours (9am-6pm local time preferred)
- Meeting preparation time (15min buffer between meetings)
- Recurring patterns for regular meetings

Always confirm with participants before finalizing and send calendar invites with clear agenda, dial-in details, and preparation materials.`,
  },
  {
    toolId: 'tool002',
    name: 'Documentation Generator',
    category: 'ai_agents',
    description: 'Generate comprehensive documentation from codebase, API specs, and technical artifacts',
    icon: 'FileText',
    configuration: {},
    permissions: ['repo_access'],
    integrations: ['github', 'confluence'],
    featured: true,
    prompt: `You are a technical documentation specialist AI. Your purpose is to create clear, comprehensive, and well-structured documentation from codebases, APIs, and technical artifacts.

Your documentation should include:

1. **Overview**: High-level summary of purpose and architecture
2. **Setup & Installation**: Step-by-step getting started guide
3. **API Reference**: Detailed endpoint/function documentation with examples
4. **Code Examples**: Practical use cases with code snippets
5. **Architecture Diagrams**: Visual representations of system design
6. **Best Practices**: Recommended patterns and anti-patterns
7. **Troubleshooting**: Common issues and solutions

Style Guidelines:
- Use clear, concise language avoiding jargon
- Include code examples in multiple languages where applicable
- Add visual diagrams for complex concepts
- Maintain consistent formatting and structure
- Keep documentation up-to-date with code changes

Generate documentation in Markdown format compatible with GitHub, Confluence, and SharePoint.`,
  },
  {
    toolId: 'tool003',
    name: 'Status Report Creator',
    category: 'ai_agents',
    description: 'Create executive status reports in web, PowerPoint, or PDF format',
    icon: 'PieChart',
    configuration: {},
    permissions: ['project_data_access'],
    integrations: ['jira', 'github', 'sharepoint'],
    featured: true,
    prompt: `You are an executive status report generator. Create concise, professional status reports for stakeholders and leadership.

Report Structure:
1. **Executive Summary** (3-4 sentences)
   - Overall project health (Red/Yellow/Green)
   - Key achievements this period
   - Critical issues requiring attention

2. **Progress Metrics**
   - Completion percentage vs. planned
   - Sprint velocity and trends
   - Budget utilization
   - Timeline status

3. **Accomplishments**
   - Features delivered
   - Milestones achieved
   - Team wins

4. **Risks & Issues**
   - Blockers (with mitigation plans)
   - Resource constraints
   - Technical debt

5. **Next Period Priorities**
   - Upcoming deliverables
   - Key decision points
   - Resource needs

Format output in requested format (Web/PowerPoint/PDF). Use data visualizations, keep language business-focused, and highlight action items clearly.`,
  },
  {
    toolId: 'tool004',
    name: 'Visual QA Agent',
    category: 'ai_agents',
    description: 'Automated visual regression testing and UI consistency checks',
    icon: 'Eye',
    configuration: {},
    permissions: ['test_execution'],
    integrations: ['figma', 'github'],
    prompt: `You are a visual quality assurance specialist. Perform automated visual regression testing and UI consistency validation.

Test Coverage:
1. **Visual Regression**: Compare screenshots against baseline
2. **Design Consistency**: Validate against design system
3. **Responsive Layouts**: Test across breakpoints
4. **Browser Compatibility**: Check cross-browser rendering
5. **Accessibility**: Verify WCAG compliance
6. **Interactive States**: Test hover, focus, disabled states

Analysis Output:
- Pixel-diff highlighting of changes
- Design system violations (colors, fonts, spacing)
- Accessibility issues with severity ratings
- Browser-specific rendering problems
- Responsive behavior issues

Provide actionable feedback with screenshots, severity levels, and recommended fixes. Integrate with CI/CD pipelines for automated testing.`,
  },
  {
    toolId: 'tool005',
    name: 'Use Case Documenter',
    category: 'ai_agents',
    description: 'Generate detailed use case documentation from requirements and user stories',
    icon: 'BookOpen',
    configuration: {},
    permissions: ['requirements_access'],
    integrations: ['jira', 'confluence'],
    prompt: `You are a business analyst AI specialized in use case documentation. Transform requirements and user stories into comprehensive use case specifications.

Use Case Template:
1. **Title**: Clear, action-oriented name
2. **Actor**: Primary and secondary actors
3. **Preconditions**: System state before execution
4. **Trigger**: Event initiating the use case
5. **Basic Flow**: Step-by-step main scenario
6. **Alternative Flows**: Variations and branches
7. **Exception Flows**: Error handling
8. **Postconditions**: System state after completion
9. **Business Rules**: Relevant constraints
10. **Non-Functional Requirements**: Performance, security

Include:
- Sequence diagrams for complex flows
- UI mockup references
- Acceptance criteria
- Test scenarios

Write in clear, testable language. Link to related requirements and dependencies.`,
  },
  {
    toolId: 'tool006',
    name: 'Training Material Generator',
    category: 'ai_agents',
    description: 'Create training materials, user guides, and onboarding documentation',
    icon: 'GraduationCap',
    configuration: {},
    permissions: ['content_creation'],
    integrations: ['sharepoint', 'confluence'],
    prompt: `You are an instructional designer AI. Create engaging, effective training materials for software applications and business processes.

Content Types:
1. **User Guides**: Step-by-step task instructions
2. **Quick Reference Cards**: One-page cheat sheets
3. **Video Scripts**: Tutorial narration with screenshots
4. **Interactive Tutorials**: Hands-on learning modules
5. **FAQ Documentation**: Common questions and answers
6. **Onboarding Guides**: New user orientation

Instructional Design Principles:
- Start with learning objectives
- Use progressive disclosure (simple to complex)
- Include screenshots and visual aids
- Provide real-world examples
- Add practice exercises with solutions
- Test comprehension with quizzes

Adapt content for different skill levels (beginner, intermediate, advanced). Include accessibility considerations and multiple learning modalities.`,
  },
  {
    toolId: 'tool007',
    name: 'Code Review Assistant',
    category: 'ai_agents',
    description: 'AI-powered code review with security, performance, and best practice recommendations',
    icon: 'Code',
    configuration: {},
    permissions: ['code_review'],
    integrations: ['github', 'bitbucket'],
    featured: true,
    prompt: `You are an expert code reviewer. Analyze code changes for quality, security, performance, and maintainability.

Review Checklist:
1. **Security**
   - SQL injection, XSS, CSRF vulnerabilities
   - Authentication/authorization flaws
   - Sensitive data exposure
   - Dependency vulnerabilities

2. **Performance**
   - Algorithm efficiency (O-notation)
   - Database query optimization
   - Memory leaks
   - Resource cleanup

3. **Code Quality**
   - SOLID principles adherence
   - DRY violations
   - Code complexity (cyclomatic)
   - Naming conventions

4. **Testing**
   - Test coverage adequacy
   - Edge case handling
   - Mock usage appropriateness

5. **Documentation**
   - Code comments clarity
   - API documentation completeness

Provide constructive feedback with severity levels (Critical/Major/Minor), code examples for improvements, and explain the "why" behind recommendations.`,
  },
  {
    toolId: 'tool008',
    name: 'Sprint Planning Assistant',
    category: 'ai_agents',
    description: 'Optimize sprint planning with capacity analysis and task recommendations',
    icon: 'Zap',
    configuration: {},
    permissions: ['project_planning'],
    integrations: ['jira'],
    prompt: `You are an agile sprint planning advisor. Help teams plan effective sprints with realistic commitments and balanced workloads.

Planning Analysis:
1. **Team Capacity**
   - Available hours per team member
   - PTO and holidays
   - Meeting overhead (ceremonies, support)
   - Historical velocity trends

2. **Backlog Analysis**
   - Story priority and dependencies
   - Technical debt items
   - Bug fix allocation (20% rule)
   - Spike/research tasks

3. **Task Breakdown**
   - Identify large stories for splitting
   - Estimate effort in story points
   - Flag unclear requirements
   - Suggest acceptance criteria

4. **Sprint Composition**
   - Balance feature work vs. technical debt
   - Distribute work across skill sets
   - Identify risks and dependencies
   - Calculate confidence level

Recommendations:
- Optimal sprint commitment based on capacity
- Risk mitigation strategies
- Dependencies requiring coordination
- Stretch goals if capacity allows

Help teams avoid over-commitment while maximizing value delivery.`,
  },

  // Integrations
  {
    toolId: 'tool009',
    name: 'Claude.ai Integration',
    category: 'integrations',
    description: 'Direct integration with Claude AI for advanced reasoning and code generation',
    icon: 'Bot',
    configuration: {},
    permissions: ['ai_access'],
    integrations: [],
    featured: true,
    configFields: [
      {
        name: 'apiKey',
        label: 'Anthropic API Key',
        type: 'text',
        placeholder: 'sk-ant-xxxxx',
      },
      {
        name: 'model',
        label: 'Model Version',
        type: 'select',
        options: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
      },
    ],
  },
  {
    toolId: 'tool010',
    name: 'Jira Suite',
    category: 'integrations',
    description: 'Full Atlassian Jira integration for project management and issue tracking',
    icon: 'Trello',
    configuration: {},
    permissions: ['jira_access'],
    integrations: [],
    configFields: [
      {
        name: 'instanceUrl',
        label: 'Jira Instance URL',
        type: 'text',
        placeholder: 'https://yourcompany.atlassian.net',
      },
      {
        name: 'apiToken',
        label: 'API Token',
        type: 'text',
        placeholder: 'Enter your Jira API token',
      },
      {
        name: 'projectKey',
        label: 'Default Project Key',
        type: 'text',
        placeholder: 'PROJ',
      },
    ],
  },
  {
    toolId: 'tool011',
    name: 'Microsoft Teams',
    category: 'integrations',
    description: 'Seamless Microsoft Teams integration for collaboration and communication',
    icon: 'MessageSquare',
    configuration: {},
    permissions: ['teams_access'],
    integrations: [],
    configFields: [
      {
        name: 'tenantId',
        label: 'Microsoft Tenant ID',
        type: 'text',
        placeholder: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      },
      {
        name: 'clientId',
        label: 'Client ID',
        type: 'text',
        placeholder: 'Application (client) ID',
      },
      {
        name: 'teamId',
        label: 'Default Team ID',
        type: 'text',
        placeholder: 'Enter your MS Teams team ID',
      },
    ],
  },
  {
    toolId: 'tool012',
    name: 'GitHub',
    category: 'integrations',
    description: 'Version control and CI/CD integration with GitHub',
    icon: 'Github',
    configuration: {},
    permissions: ['git_access'],
    integrations: [],
    configFields: [
      {
        name: 'personalAccessToken',
        label: 'Personal Access Token',
        type: 'text',
        placeholder: 'ghp_xxxxxxxxxxxx',
      },
      {
        name: 'organization',
        label: 'GitHub Organization',
        type: 'text',
        placeholder: 'your-org-name',
      },
      {
        name: 'defaultRepo',
        label: 'Default Repository',
        type: 'text',
        placeholder: 'repository-name',
      },
    ],
  },
  {
    toolId: 'tool013',
    name: 'Figma',
    category: 'integrations',
    description: 'Design collaboration and prototyping with Figma integration',
    icon: 'Figma',
    configuration: {},
    permissions: ['design_access'],
    integrations: [],
    configFields: [
      {
        name: 'apiKey',
        label: 'Figma API Key',
        type: 'text',
        placeholder: 'Enter your Figma API key',
      },
      {
        name: 'teamId',
        label: 'Team ID',
        type: 'text',
        placeholder: 'Enter your Figma team ID',
      },
    ],
  },
  {
    toolId: 'tool021',
    name: 'SharePoint',
    category: 'integrations',
    description: 'Microsoft SharePoint integration for document management and collaboration',
    icon: 'FolderOpen',
    configuration: {},
    permissions: ['sharepoint_access'],
    integrations: [],
    featured: true,
    configFields: [
      {
        name: 'siteUrl',
        label: 'SharePoint Site URL',
        type: 'text',
        placeholder: 'https://yourcompany.sharepoint.com/sites/project',
      },
      {
        name: 'documentLibrary',
        label: 'Document Library',
        type: 'text',
        placeholder: 'Shared Documents',
      },
    ],
  },

  // Collaboration Tools
  {
    toolId: 'tool014',
    name: 'Real-time Whiteboard',
    category: 'collaboration',
    description: 'Collaborative digital whiteboard for brainstorming and planning',
    icon: 'Presentation',
    configuration: {},
    permissions: ['collaboration'],
    integrations: [],
  },
  {
    toolId: 'tool015',
    name: 'Shared Documentation',
    category: 'collaboration',
    description: 'Real-time collaborative document editing and version control',
    icon: 'FileEdit',
    configuration: {},
    permissions: ['document_edit'],
    integrations: ['sharepoint', 'confluence'],
  },
  {
    toolId: 'tool016',
    name: 'Code Collaboration',
    category: 'collaboration',
    description: 'Live code sharing and pair programming workspace',
    icon: 'Terminal',
    configuration: {},
    permissions: ['code_edit'],
    integrations: ['github'],
  },

  // Analytics & Reporting
  {
    toolId: 'tool017',
    name: 'Project Analytics Dashboard',
    category: 'analytics',
    description: 'Comprehensive project metrics, KPIs, and performance analytics',
    icon: 'BarChart',
    configuration: {},
    permissions: ['analytics_view'],
    integrations: ['jira', 'github'],
  },
  {
    toolId: 'tool018',
    name: 'Sprint Burndown',
    category: 'analytics',
    description: 'Real-time sprint burndown charts and velocity tracking',
    icon: 'TrendingDown',
    configuration: {},
    permissions: ['analytics_view'],
    integrations: ['jira'],
  },
  {
    toolId: 'tool019',
    name: 'Team Velocity Tracker',
    category: 'analytics',
    description: 'Track team velocity, capacity, and productivity trends',
    icon: 'Activity',
    configuration: {},
    permissions: ['analytics_view'],
    integrations: ['jira'],
  },
  {
    toolId: 'tool020',
    name: 'AI Usage Analytics',
    category: 'analytics',
    description: 'Monitor AI tool adoption, usage patterns, and ROI metrics',
    icon: 'Brain',
    configuration: {},
    permissions: ['analytics_view'],
    integrations: [],
  },
  {
    toolId: 'tool022',
    name: 'Agentic Component Creator',
    category: 'agent_orchestrator',
    description: 'Design-to-code workflow that transforms Figma designs into tested React components using orchestrated AI agents',
    icon: 'Workflow',
    configuration: {},
    permissions: ['workflow_create', 'agent_orchestration'],
    integrations: ['claude', 'github', 'figma', 'mcp_servers'],
    featured: true,
    prompt: `You are the Agentic Component Creator system. This orchestrated workflow automates the complete design-to-code pipeline for React components.

Workflow Pipeline:
1. **Figma Data Source** - Extracts component designs, specs, and assets from Figma
2. **Component Generator Agent** - Converts designs to React/TypeScript code with proper structure
3. **Style Generator Agent** - Creates Tailwind CSS or styled-components styling
4. **Chrome Testbed** - Renders components in browser for visual validation
5. **Test Generator Agent** - Creates Jest/React Testing Library tests
6. **Documentation Agent** - Generates Storybook stories and component docs

Output:
- Production-ready React components
- Complete test coverage
- Interactive documentation
- Visual regression baseline

Use this to accelerate component development from design to production with consistent quality and testing.`,
  },
  {
    toolId: 'tool025',
    name: 'Content Marketing Pipeline',
    category: 'agent_orchestrator',
    description: 'End-to-end content creation workflow from research to publication with SEO optimization and multi-channel distribution',
    icon: 'Workflow',
    configuration: {},
    permissions: ['workflow_create', 'agent_orchestration', 'content_publish'],
    integrations: ['claude', 'web_search', 'cms', 'social_media'],
    featured: true,
    prompt: `You are the Content Marketing Pipeline orchestrator. This workflow automates the entire content creation and distribution process.

Workflow Pipeline:
1. **Topic Research Agent** - Analyzes trends, keywords, and competitor content
2. **Content Brief Generator** - Creates detailed content outlines with SEO requirements
3. **Content Writer Agent** - Generates high-quality articles, blog posts, or copy
4. **SEO Optimizer Agent** - Optimizes for search engines (meta tags, keywords, structure)
5. **Image Generator/Curator** - Sources or generates supporting visuals
6. **Editorial Review Agent** - Checks quality, brand voice, and compliance
7. **CMS Publisher** - Formats and publishes to content management system
8. **Social Media Distributor** - Creates and schedules social media posts

Output:
- SEO-optimized published content
- Multi-channel social media posts
- Performance tracking setup
- Content calendar integration

Use this to scale content marketing operations while maintaining quality and consistency.`,
  },
  {
    toolId: 'tool026',
    name: 'Data Analysis Workflow',
    category: 'agent_orchestrator',
    description: 'Automated data pipeline that extracts, transforms, analyzes data and generates executive dashboards and insights',
    icon: 'Workflow',
    configuration: {},
    permissions: ['workflow_create', 'agent_orchestration', 'data_access'],
    integrations: ['claude', 'databases', 'apis', 'powerbi', 'tableau'],
    featured: true,
    prompt: `You are the Data Analysis Workflow orchestrator. This system automates data extraction, transformation, analysis, and visualization.

Workflow Pipeline:
1. **Data Extraction Agent** - Pulls data from multiple sources (databases, APIs, spreadsheets)
2. **Data Cleansing Agent** - Validates, deduplicates, and normalizes data
3. **Statistical Analysis Agent** - Performs statistical calculations and trend analysis
4. **Pattern Recognition Agent** - Identifies anomalies, patterns, and correlations
5. **Insight Generation Agent** - Synthesizes findings into actionable recommendations
6. **Visualization Agent** - Creates charts, graphs, and dashboard layouts
7. **Report Generator** - Compiles executive summary and detailed reports
8. **Dashboard Publisher** - Updates live dashboards in PowerBI/Tableau

Output:
- Executive dashboard with KPIs
- Detailed analysis reports
- Automated alerts for anomalies
- Trend predictions and forecasts

Use this to transform raw data into strategic insights without manual data wrangling.`,
  },
  {
    toolId: 'tool027',
    name: 'API Testing Suite',
    category: 'agent_orchestrator',
    description: 'Comprehensive API testing workflow that generates tests, executes validation, and produces detailed quality reports',
    icon: 'Workflow',
    configuration: {},
    permissions: ['workflow_create', 'agent_orchestration', 'api_testing'],
    integrations: ['claude', 'postman', 'swagger', 'github', 'jira'],
    featured: true,
    prompt: `You are the API Testing Suite orchestrator. This workflow automates API testing from specification analysis to bug reporting.

Workflow Pipeline:
1. **API Spec Analyzer** - Parses OpenAPI/Swagger specs to understand endpoints
2. **Test Case Generator** - Creates comprehensive test scenarios (happy path, edge cases, errors)
3. **Test Data Generator** - Generates realistic test data and payloads
4. **API Test Executor** - Runs tests against endpoints, captures responses
5. **Response Validator** - Validates status codes, schemas, and business logic
6. **Performance Analyzer** - Measures response times and identifies bottlenecks
7. **Security Scanner** - Checks for common vulnerabilities (auth, injection, etc.)
8. **Report Generator** - Creates detailed test reports with pass/fail metrics
9. **Bug Ticket Creator** - Auto-creates Jira tickets for failures with reproduction steps

Output:
- Complete API test coverage
- Performance benchmarks
- Security assessment report
- Automated bug tickets with details

Use this to ensure API quality and catch issues before production deployment.`,
  },
  {
    toolId: 'tool023',
    name: 'Desk Research Agent',
    category: 'ai_agents',
    description: 'Conduct comprehensive desk research including market analysis, competitive intelligence, industry trends, and strategic insights gathering',
    icon: 'Search',
    configuration: {},
    permissions: ['research_access', 'web_search', 'data_analysis'],
    integrations: ['claude', 'web_search', 'sharepoint'],
    featured: true,
    prompt: `You are an expert Desk Research Agent specializing in strategic research and competitive intelligence. Your role is to conduct thorough research and provide actionable insights for strategic decision-making.

Core Research Capabilities:
1. **Market Analysis**
   - Market size, growth rates, and trends
   - Customer segments and personas
   - Pricing models and revenue opportunities
   - Market entry barriers and opportunities

2. **Competitive Intelligence**
   - Competitor identification and profiling
   - SWOT analysis of key competitors
   - Competitive positioning and differentiation
   - Market share and performance metrics
   - Product/service comparisons

3. **Industry Research**
   - Industry trends and emerging technologies
   - Regulatory landscape and compliance requirements
   - Best practices and benchmarking
   - Key players and partnerships

4. **Strategic Insights**
   - Opportunity identification
   - Risk assessment
   - Strategic recommendations
   - Data-driven insights

Research Process:
1. Define research scope and objectives
2. Identify reliable sources (industry reports, academic research, news, company filings)
3. Gather and synthesize information
4. Analyze findings and identify patterns
5. Present insights with clear recommendations

Output Format:
- Executive Summary (key findings)
- Detailed Research Findings (with sources)
- Visual Data Representations (charts, matrices)
- Strategic Recommendations
- Source Bibliography

Always cite sources, maintain objectivity, and provide actionable insights backed by data.`,
  },
  {
    toolId: 'tool024',
    name: 'Use Case Development Agent',
    category: 'ai_agents',
    description: 'Develop comprehensive use cases for technology implementations, business processes, and strategic initiatives with detailed scenarios and requirements',
    icon: 'FileEdit',
    configuration: {},
    permissions: ['requirements_write', 'stakeholder_analysis'],
    integrations: ['claude', 'jira', 'confluence', 'sharepoint'],
    featured: true,
    prompt: `You are a Use Case Development Agent specializing in creating detailed, actionable use cases for strategic initiatives, technology implementations, and business process improvements.

Use Case Development Framework:

1. **Use Case Identification**
   - Business objectives and goals
   - Stakeholder needs and pain points
   - Opportunity areas for value creation
   - Priority assessment (impact vs. effort)

2. **Use Case Structure**
   Each use case should include:
   - **Title**: Clear, descriptive name
   - **Description**: Brief overview (2-3 sentences)
   - **Business Value**: Quantified benefits (ROI, efficiency gains, cost savings)
   - **Actors**: Primary and secondary stakeholders
   - **Preconditions**: Required conditions/resources
   - **Main Flow**: Step-by-step process
   - **Alternative Flows**: Exception handling and variations
   - **Postconditions**: Expected outcomes and state changes
   - **Requirements**: Technical, functional, and business requirements
   - **Success Metrics**: KPIs and measurement criteria
   - **Implementation Considerations**: Technical constraints, dependencies, risks

3. **Use Case Categories**
   - **Customer-Facing**: Improve customer experience
   - **Operational**: Enhance internal efficiency
   - **Revenue Generation**: Drive new revenue streams
   - **Cost Reduction**: Reduce operational costs
   - **Risk Mitigation**: Improve compliance and security

4. **Stakeholder Analysis**
   - Identify all stakeholders (users, sponsors, influencers)
   - Document needs, concerns, and success criteria
   - Map stakeholder engagement strategy

5. **Requirements Traceability**
   - Link use cases to business objectives
   - Map requirements to use cases
   - Identify dependencies between use cases

Output Deliverables:
- Use Case Catalog (organized by priority/category)
- Detailed Use Case Specifications
- User Stories (Agile format when applicable)
- Requirements Traceability Matrix
- Implementation Roadmap
- Success Metrics Dashboard

Best Practices:
- Use clear, non-technical language for business stakeholders
- Include visual diagrams (process flows, system interactions)
- Prioritize use cases using MoSCoW or similar methods
- Validate with stakeholders iteratively
- Keep use cases focused and atomic`,
  },
];

// Assign tools to projects after export
// E-commerce project gets design and dev tools
mockProjects[0].workbench.activeTools = [
  mockTools.find(t => t.toolId === 'tool001')!, // Meeting Scheduler
  mockTools.find(t => t.toolId === 'tool003')!, // Status Report Creator
  mockTools.find(t => t.toolId === 'tool004')!, // Visual QA Agent
  mockTools.find(t => t.toolId === 'tool007')!, // Code Review Assistant
  mockTools.find(t => t.toolId === 'tool009')!, // Claude.ai
  mockTools.find(t => t.toolId === 'tool013')!, // Figma
  mockTools.find(t => t.toolId === 'tool022')!, // Agent Orchestrator
];

// Data Platform gets data and security tools
mockProjects[1].workbench.activeTools = [
  mockTools.find(t => t.toolId === 'tool001')!, // Meeting Scheduler
  mockTools.find(t => t.toolId === 'tool002')!, // Documentation Generator
  mockTools.find(t => t.toolId === 'tool003')!, // Status Report Creator
  mockTools.find(t => t.toolId === 'tool009')!, // Claude.ai
  mockTools.find(t => t.toolId === 'tool012')!, // GitHub
  mockTools.find(t => t.toolId === 'tool017')!, // Project Analytics
  mockTools.find(t => t.toolId === 'tool022')!, // Agent Orchestrator
];

// Customer Experience gets UX and collaboration tools
mockProjects[2].workbench.activeTools = [
  mockTools.find(t => t.toolId === 'tool001')!, // Meeting Scheduler
  mockTools.find(t => t.toolId === 'tool004')!, // Visual QA Agent
  mockTools.find(t => t.toolId === 'tool005')!, // Use Case Documenter
  mockTools.find(t => t.toolId === 'tool013')!, // Figma
  mockTools.find(t => t.toolId === 'tool014')!, // Real-time Whiteboard
  mockTools.find(t => t.toolId === 'tool015')!, // Shared Documentation
  mockTools.find(t => t.toolId === 'tool022')!, // Agent Orchestrator
];

// AI Implementation gets AI and analytics tools
mockProjects[3].workbench.activeTools = [
  mockTools.find(t => t.toolId === 'tool001')!, // Meeting Scheduler
  mockTools.find(t => t.toolId === 'tool002')!, // Documentation Generator
  mockTools.find(t => t.toolId === 'tool008')!, // Sprint Planning Assistant
  mockTools.find(t => t.toolId === 'tool009')!, // Claude.ai
  mockTools.find(t => t.toolId === 'tool017')!, // Project Analytics
  mockTools.find(t => t.toolId === 'tool020')!, // AI Usage Analytics
  mockTools.find(t => t.toolId === 'tool022')!, // Agent Orchestrator
];

// MarTech Assessment gets strategy and research tools
mockProjects[4].workbench.activeTools = [
  mockTools.find(t => t.toolId === 'tool001')!, // Meeting Scheduler
  mockTools.find(t => t.toolId === 'tool003')!, // Status Report Creator
  mockTools.find(t => t.toolId === 'tool009')!, // Claude.ai
  mockTools.find(t => t.toolId === 'tool017')!, // Project Analytics
  mockTools.find(t => t.toolId === 'tool023')!, // Desk Research Agent
  mockTools.find(t => t.toolId === 'tool024')!, // Use Case Development Agent
];

// Digital Transformation Roadmap gets comprehensive strategy tools
mockProjects[5].workbench.activeTools = [
  mockTools.find(t => t.toolId === 'tool001')!, // Meeting Scheduler
  mockTools.find(t => t.toolId === 'tool002')!, // Documentation Generator
  mockTools.find(t => t.toolId === 'tool003')!, // Status Report Creator
  mockTools.find(t => t.toolId === 'tool009')!, // Claude.ai
  mockTools.find(t => t.toolId === 'tool017')!, // Project Analytics
  mockTools.find(t => t.toolId === 'tool022')!, // Agent Orchestrator
  mockTools.find(t => t.toolId === 'tool023')!, // Desk Research Agent
  mockTools.find(t => t.toolId === 'tool024')!, // Use Case Development Agent
];

// Strategy Retainer gets research and analysis tools
mockProjects[6].workbench.activeTools = [
  mockTools.find(t => t.toolId === 'tool001')!, // Meeting Scheduler
  mockTools.find(t => t.toolId === 'tool003')!, // Status Report Creator
  mockTools.find(t => t.toolId === 'tool009')!, // Claude.ai
  mockTools.find(t => t.toolId === 'tool023')!, // Desk Research Agent
  mockTools.find(t => t.toolId === 'tool024')!, // Use Case Development Agent
];

// Mock credentials for login
export const mockCredentials = [
  { email: 'pm@merkle.com', password: 'demo123', userId: 'pm001' },
  { email: 'dev@merkle.com', password: 'demo123', userId: 'dev001' },
  { email: 'ba@merkle.com', password: 'demo123', userId: 'ba001' },
  { email: 'alexandra.morgan@merkle.com', password: 'demo123', userId: 'strat001' },
];

// Mock Calendar Events
export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
  type: 'meeting' | 'deadline' | 'milestone' | 'review';
  projectId?: string;
  location?: string;
}

// Generate daily standup meetings for the next 2 weeks
const generateDailyStandups = (): CalendarEvent[] => {
  const standups: CalendarEvent[] = [];
  const today = new Date(2025, 10, 23); // Nov 23, 2025

  for (let i = 0; i < 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;

    standups.push({
      id: `standup-${i}`,
      title: 'Daily Standup - All Teams',
      description: 'Daily sync across all active projects',
      startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 15),
      endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 30),
      attendees: ['pm001', 'dev001', 'ba001', 'des001', 'arch001', 'qa001'],
      type: 'meeting',
      location: 'MS Teams',
    });
  }

  return standups;
};

// Generate Sprint Reviews every Wednesday
const generateSprintReviews = (): CalendarEvent[] => {
  const reviews: CalendarEvent[] = [];
  const startDate = new Date(2025, 10, 23); // Nov 23, 2025

  for (let i = 0; i < 21; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    // Wednesday is day 3
    if (date.getDay() === 3) {
      reviews.push({
        id: `sprint-review-${i}`,
        title: 'Sprint Review',
        description: 'Demo completed features and gather feedback',
        startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 0),
        endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 16, 30),
        attendees: ['pm001', 'dev001', 'ba001', 'des001', 'arch001', 'qa001'],
        type: 'review',
        location: 'Conference Room A / Teams',
      });
    }
  }

  return reviews;
};

// Generate Sprint Kick-Off every other Thursday
const generateSprintKickoffs = (): CalendarEvent[] => {
  const kickoffs: CalendarEvent[] = [];
  const startDate = new Date(2025, 10, 27); // Nov 27, 2025 (Thursday)

  for (let i = 0; i < 3; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + (i * 14)); // Every 2 weeks

    kickoffs.push({
      id: `sprint-kickoff-${i}`,
      title: 'Sprint Kick-Off',
      description: 'Plan and kick off new sprint cycle',
      startTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 0),
      endTime: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 11, 30),
      attendees: ['pm001', 'dev001', 'ba001', 'des001', 'arch001', 'qa001'],
      type: 'meeting',
      location: 'Conference Room B',
    });
  }

  return kickoffs;
};

export const mockCalendarEvents: CalendarEvent[] = [
  ...generateDailyStandups(),
  ...generateSprintReviews(),
  ...generateSprintKickoffs(),
  {
    id: 'event001',
    title: 'Client Presentation - E-commerce',
    description: 'Present progress and next phase planning',
    startTime: new Date(2025, 10, 25, 10, 0),
    endTime: new Date(2025, 10, 25, 11, 30),
    attendees: ['pm001', 'dev001', 'ba001', 'des001'],
    type: 'meeting',
    projectId: 'proj001',
    location: 'Client Office / Zoom',
  },
  {
    id: 'event003',
    title: 'Design Review - Customer Experience',
    description: 'Review new UX mockups and prototypes',
    startTime: new Date(2025, 10, 25, 14, 0),
    endTime: new Date(2025, 10, 25, 15, 30),
    attendees: ['pm001', 'des001', 'dev001', 'qa001'],
    type: 'review',
    projectId: 'proj003',
    location: 'Design Studio',
  },
  {
    id: 'event004',
    title: 'Client Presentation - AI Implementation',
    description: 'Present Q1 progress and roadmap to client',
    startTime: new Date(2025, 10, 26, 13, 0),
    endTime: new Date(2025, 10, 26, 14, 30),
    attendees: ['pm001', 'arch001'],
    type: 'meeting',
    projectId: 'proj004',
    location: 'Client Office / Zoom',
  },
  {
    id: 'event005',
    title: 'Sprint Review - E-commerce',
    description: 'Demo completed features from sprint 11',
    startTime: new Date(2025, 10, 27, 15, 0),
    endTime: new Date(2025, 10, 27, 16, 0),
    attendees: ['pm001', 'dev001', 'ba001', 'des001', 'qa001'],
    type: 'review',
    projectId: 'proj001',
    location: 'Teams',
  },
  {
    id: 'event006',
    title: 'Release Deadline - Customer Experience',
    description: 'Production release v2.0',
    startTime: new Date(2025, 11, 1, 17, 0),
    endTime: new Date(2025, 11, 1, 17, 0),
    attendees: ['pm001', 'dev001', 'qa001'],
    type: 'deadline',
    projectId: 'proj003',
  },
  {
    id: 'event007',
    title: 'Architecture Review',
    description: 'Review system architecture and scalability',
    startTime: new Date(2025, 10, 26, 10, 0),
    endTime: new Date(2025, 10, 26, 12, 0),
    attendees: ['pm001', 'arch001', 'dev001'],
    type: 'review',
    projectId: 'proj002',
    location: 'Conference Room B',
  },
  {
    id: 'event008',
    title: 'Team Lunch',
    description: 'Monthly team building lunch',
    startTime: new Date(2025, 10, 28, 12, 0),
    endTime: new Date(2025, 10, 28, 13, 30),
    attendees: ['pm001', 'dev001', 'ba001', 'des001', 'arch001', 'qa001'],
    type: 'meeting',
    location: 'Restaurant Downtown',
  },
  {
    id: 'event009',
    title: 'Milestone: MVP Complete',
    description: 'AI Implementation MVP completion',
    startTime: new Date(2025, 11, 15, 17, 0),
    endTime: new Date(2025, 11, 15, 17, 0),
    attendees: ['pm001', 'arch001'],
    type: 'milestone',
    projectId: 'proj004',
  },
  {
    id: 'event010',
    title: 'Code Review Session',
    description: 'Peer code review for recent pull requests',
    startTime: new Date(2025, 10, 25, 16, 0),
    endTime: new Date(2025, 10, 25, 17, 0),
    attendees: ['dev001', 'arch001'],
    type: 'review',
    projectId: 'proj001',
    location: 'Teams',
  },
];

// Demo Scenes
export const demoScenes: DemoScene[] = [
  {
    id: 'platform-tour',
    title: 'Platform Tour',
    description: 'A guided tour of the Merkle AI Platform features',
    duration: 120000, // 2 minutes
    actions: [
      {
        type: 'tooltip',
        message: 'Welcome to Merkle AI Platform! This demo will guide you through the key features.',
        duration: 4000,
        position: { x: 50, y: 20 },
      },
      {
        type: 'highlight',
        target: '.project-card',
        message: 'These are your active projects. Each project has its own workbench with AI tools and integrations.',
        duration: 5000,
      },
      {
        type: 'navigate',
        target: '/toolbox',
        duration: 1000,
      },
      {
        type: 'tooltip',
        message: 'The Toolbox Marketplace offers AI agents, integrations, and collaboration tools.',
        duration: 5000,
        position: { x: 50, y: 20 },
      },
      {
        type: 'highlight',
        target: '.tool-card',
        message: 'Click any tool to see its details, configuration options, and add it to your projects.',
        duration: 5000,
      },
      {
        type: 'navigate',
        target: '/calendar',
        duration: 1000,
      },
      {
        type: 'tooltip',
        message: 'The Team Calendar shows all your meetings, sprint reviews, and daily standups.',
        duration: 5000,
        position: { x: 50, y: 20 },
      },
      {
        type: 'highlight',
        target: '.calendar-event',
        message: 'View event details, attendees, and join meetings directly from the calendar.',
        duration: 5000,
      },
      {
        type: 'navigate',
        target: '/projects',
        duration: 1000,
      },
      {
        type: 'tooltip',
        message: 'All your projects in one place. Filter by status, search, and view detailed metrics.',
        duration: 5000,
        position: { x: 50, y: 20 },
      },
      {
        type: 'navigate',
        target: '/dashboard',
        duration: 1000,
      },
      {
        type: 'tooltip',
        message: 'Demo complete! You can now explore the platform on your own. Click anywhere to close.',
        duration: 5000,
        position: { x: 50, y: 50 },
      },
    ],
  },
  {
    id: 'quick-start',
    title: 'Quick Start Guide',
    description: 'Learn the basics in 60 seconds',
    duration: 60000, // 1 minute
    actions: [
      {
        type: 'tooltip',
        message: 'Welcome! Let\'s get you started with the essentials.',
        duration: 3000,
        position: { x: 50, y: 20 },
      },
      {
        type: 'highlight',
        target: '.nav-projects',
        message: 'Start by viewing your projects here.',
        duration: 4000,
      },
      {
        type: 'highlight',
        target: '.nav-toolbox',
        message: 'Add AI tools and integrations from the Toolbox.',
        duration: 4000,
      },
      {
        type: 'highlight',
        target: '.nav-calendar',
        message: 'Manage your schedule with the Team Calendar.',
        duration: 4000,
      },
      {
        type: 'tooltip',
        message: 'That\'s it! You\'re ready to go. Start exploring!',
        duration: 3000,
        position: { x: 50, y: 50 },
      },
    ],
  },
  {
    id: 'agent-orchestrator',
    title: 'Agent Orchestrator Tutorial',
    description: 'Learn how to build multi-agent workflows with the visual canvas',
    duration: 90000, // 1.5 minutes
    actions: [
      {
        type: 'tooltip',
        message: 'Welcome to the Agent Orchestrator! Let\'s learn how to build powerful multi-agent workflows.',
        duration: 4000,
        position: { x: 50, y: 20 },
      },
      {
        type: 'navigate',
        target: '/toolbox',
        duration: 1000,
      },
      {
        type: 'tooltip',
        message: 'First, let\'s navigate to the Toolbox to find the Agent Orchestrator.',
        duration: 3000,
        position: { x: 50, y: 20 },
      },
      {
        type: 'highlight',
        target: '.tool-card',
        message: 'The Agent Orchestrator is a special AI agent that lets you chain multiple agents together in visual workflows.',
        duration: 5000,
      },
      {
        type: 'navigate',
        target: '/toolbox/tool022',
        duration: 1000,
      },
      {
        type: 'tooltip',
        message: 'This is the Agent Orchestrator detail page. Notice the visual workflow builder preview.',
        duration: 4000,
        position: { x: 50, y: 30 },
      },
      {
        type: 'tooltip',
        message: 'You can create workflows with Data Sources, AI Agents, Decision Logic, Outputs, and MCP Connections.',
        duration: 5000,
        position: { x: 50, y: 50 },
      },
      {
        type: 'navigate',
        target: '/toolbox/tool022/orchestrator/cms-component-designer',
        duration: 1000,
      },
      {
        type: 'tooltip',
        message: 'Welcome to the Workflow Canvas! This is where you build your multi-agent pipelines.',
        duration: 4000,
        position: { x: 50, y: 20 },
      },
      {
        type: 'tooltip',
        message: 'On the left, you\'ll find the toolbar with different workflow step types you can add to your canvas.',
        duration: 5000,
        position: { x: 20, y: 50 },
      },
      {
        type: 'tooltip',
        message: 'The canvas shows the CMS Component Designer example: Figma → Component Generator → Chrome Testbed.',
        duration: 5000,
        position: { x: 50, y: 40 },
      },
      {
        type: 'tooltip',
        message: 'To create connections: Click and hold the purple dot on the right side of any node, drag to the left side of another node, and release!',
        duration: 6000,
        position: { x: 50, y: 60 },
      },
      {
        type: 'tooltip',
        message: 'You can drag nodes around the canvas to organize your workflow, and click nodes to configure them in the properties panel.',
        duration: 5000,
        position: { x: 50, y: 50 },
      },
      {
        type: 'tooltip',
        message: 'Click the X button on connection lines to remove them, or use the properties panel to manage connections.',
        duration: 5000,
        position: { x: 50, y: 55 },
      },
      {
        type: 'tooltip',
        message: 'That\'s it! You can now build sophisticated AI workflows. Try adding nodes from the toolbar and connecting them together!',
        duration: 5000,
        position: { x: 50, y: 50 },
      },
      {
        type: 'navigate',
        target: '/dashboard',
        duration: 1000,
      },
      {
        type: 'tooltip',
        message: 'Demo complete! Start building your own workflows and automate complex tasks with the Agent Orchestrator.',
        duration: 4000,
        position: { x: 50, y: 50 },
      },
    ],
  },
];
