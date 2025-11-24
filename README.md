# Merkle AI Platform - Demo Application

A comprehensive demonstration of Merkle's future AI-powered collaborative workspace platform, showcasing the intersection of AI-driven workforce transformation, team collaboration, and reusable component architecture.

## Overview

The Merkle AI Platform represents a unified workspace where AI-powered teams collaborate on projects, drawing from a comprehensive toolbox of reusable components, AI agents, and integrated tools. This demonstration supports Merkle's 2026 AI strategy vision.

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS with custom Merkle branding
- **State Management**: React Context API
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Data**: Mock datasets with realistic project information

## Features

### ✅ Phase 1 - Completed

- **Authentication System**
  - Modern branded login interface
  - Mock SSO options (Microsoft, Google)
  - Demo account quick login
  - Protected routes

- **Dashboard**
  - Active projects grid with progress indicators
  - Team member avatars and quick stats
  - Analytics widgets (Active Projects, Team Utilization, AI Usage, Velocity)
  - Quick actions panel
  - Recent activity feed
  - Responsive design

- **Layout & Navigation**
  - Global header with Merkle branding
  - Navigation between Dashboard, Projects, and Toolbox
  - User profile dropdown
  - Notifications bell with unread indicators
  - Global search bar

### 🚧 Phase 2 - In Development

- Project Creation Wizard with AI-powered setup
- Project Workbench with toolbox sidebar
- Role-specific views for different user types
- Agent interfaces (Meeting Scheduler, Documentation Generator, Status Report Creator)
- Automated demo mode with overlay and script system

## Getting Started

### Prerequisites

- Node.js (v18 or higher) - [Download from nodejs.org](https://nodejs.org/)
- npm (comes with Node.js)

### Quick Launch Options

#### Option 1: One-Click Launch (Windows)
Simply double-click `start.bat` in the project folder. It will:
- Check Node.js installation
- Install dependencies automatically
- Start the dev server
- Open Chrome automatically

#### Option 2: PowerShell Script
```powershell
.\start.ps1
```

#### Option 3: Command Line
```bash
# First time setup
npm install

# Start development server
npm run dev
```

Chrome will automatically open to http://localhost:5173

#### Option 4: VS Code Debug
1. Press `F5` or go to Run > Start Debugging
2. Select "Launch Chrome - Merkle AI Platform"
3. Chrome launches automatically with debugging enabled

### Detailed Instructions

For step-by-step instructions, see:
- **[QUICKSTART.md](QUICKSTART.md)** - Quick reference card
- **[LAUNCH_INSTRUCTIONS.md](LAUNCH_INSTRUCTIONS.md)** - Comprehensive launch guide
- **[SETUP.md](SETUP.md)** - Detailed setup instructions

### Demo Credentials

Use these credentials to login and explore different user roles:

**Project Manager**
- Email: `pm@merkle.com`
- Password: `demo123`

**Developer**
- Email: `dev@merkle.com`
- Password: `demo123`

**Business Analyst**
- Email: `ba@merkle.com`
- Password: `demo123`

Alternatively, use the quick login buttons on the login page.

## Project Structure

```
MerkleAgenticPlatform/
├── src/
│   ├── components/        # Reusable UI components
│   │   └── Layout.tsx     # Main layout with header and navigation
│   ├── contexts/          # React Context providers
│   │   ├── AuthContext.tsx      # Authentication state
│   │   └── ProjectContext.tsx   # Project management state
│   ├── data/              # Mock data and fixtures
│   │   └── mockData.ts    # Users, projects, tools
│   ├── pages/             # Page components
│   │   ├── Login.tsx      # Authentication page
│   │   └── Dashboard.tsx  # Main dashboard
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Shared types
│   ├── App.tsx            # Main app component with routing
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles with Tailwind
├── public/                # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Mock Data

The application includes comprehensive mock data for demonstration:

### Sample Projects
1. **E-commerce Transformation** - Global Retail Corp (65% complete)
2. **Data Platform Migration** - Premier Financial Services (30% complete)
3. **Customer Experience Redesign** - HealthTech Solutions (85% complete)
4. **AI Implementation Strategy** - Industrial Dynamics Inc (45% complete)

### Sample Team Members
- Sarah Chen - Project Manager
- Marcus Rodriguez - Lead Developer
- Emma Thompson - Business Analyst
- David Kim - UI/UX Designer
- Priya Patel - Data Architect
- James Wilson - QA Engineer

### Tool Categories
- **AI Agents**: Meeting Scheduler, Documentation Generator, Status Report Creator, Visual QA, Code Review Assistant
- **Integrations**: Claude.ai, Jira, Microsoft Teams, GitHub, Figma
- **Collaboration**: Real-time Whiteboard, Shared Documentation, Code Collaboration
- **Analytics**: Project Metrics, Sprint Burndown, Team Velocity, AI Usage Analytics

## Design System

### Color Palette
- **Merkle Primary**: `#FF0080` (Pink)
- **Merkle Secondary**: `#00D4FF` (Cyan)
- **Merkle Accent**: `#7B2CBF` (Purple)
- **Dentsu Red**: `#E60012`

### Typography
- **Display**: Poppins (headings)
- **Body**: Inter (content)
- **Code**: Fira Code (technical content)

### Animations
- Smooth page transitions with Framer Motion
- Hover effects and micro-interactions
- Loading skeletons
- Progress indicators

## Responsive Design

- **Desktop**: Full feature set with all panels
- **Tablet**: Adapted layout with collapsible panels
- **Mobile**: View-only mode with limited interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Roadmap

### Phase 3 - Project Creation Wizard
- AI-powered project setup with natural language prompts
- AI recommendation system
- Team configuration interface
- Integration setup mockups

### Phase 4 - Project Workbench
- Workspace layout with navigation
- Toolbox sidebar with drag-and-drop
- Tool categories and search
- Integration previews

### Phase 5 - Agent Implementations
- Meeting Scheduler Agent
- Documentation Generator Agent
- Status Report Creator Agent
- Visual QA Agent

### Phase 6 - Demo Mode
- Automated script system
- Overlay with spotlight effects
- Contextual tooltips
- Scene transitions
- Demo controls (play, pause, speed)

### Phase 7 - Polish & Optimization
- Advanced animations
- Loading states
- Error handling
- Performance optimization
- Accessibility improvements

## Contributing

This is a demonstration project for internal use. For questions or suggestions, please contact the development team.

## License

Copyright © 2024 Merkle - A dentsu company. All rights reserved.

## Support

For technical support or questions:
- Email: support@merkle.com
- Internal Slack: #merkle-ai-platform

---

Built with ❤️ by the Merkle Innovation Team
