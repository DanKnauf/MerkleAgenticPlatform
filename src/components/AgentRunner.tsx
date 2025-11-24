import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Loader2,
  CheckCircle,
  Download,
  Copy,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import type { Tool } from '@/types';

interface AgentRunnerProps {
  tool: Tool;
  onClose: () => void;
}

const AgentRunner: React.FC<AgentRunnerProps> = ({ tool, onClose }) => {
  const [prompt, setPrompt] = useState(tool.prompt || '');
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [output, setOutput] = useState('');
  const [progress, setProgress] = useState(0);

  const generateOutput = () => {
    // Generate sample output based on the tool type
    switch (tool.toolId) {
      case 'tool004': // Meeting Scheduler
        return `# Meeting Schedule Summary

## Scheduled Meetings

### Client Strategy Session
- **Date:** March 28, 2024, 2:00 PM - 3:30 PM
- **Attendees:** Sarah Chen, Marcus Rodriguez, Client Team
- **Location:** Microsoft Teams
- **Agenda:** Q2 Strategy Review, Campaign Performance Analysis

### Internal Sprint Planning
- **Date:** March 29, 2024, 10:00 AM - 11:00 AM
- **Attendees:** Development Team, Project Managers
- **Location:** Conference Room B
- **Agenda:** Sprint 12 Planning, Resource Allocation

### Stakeholder Update
- **Date:** April 2, 2024, 3:00 PM - 4:00 PM
- **Attendees:** Executive Team, Department Leads
- **Location:** Microsoft Teams
- **Agenda:** Project Status Update, Budget Review

## Meeting Preparation
All calendar invites have been sent with meeting links and agendas attached.`;

      case 'tool009': // Claude.ai
        return `# Analysis Complete

## Strategic Recommendations

Based on the analysis of your project requirements and current market conditions:

### Key Insights
1. **Market Opportunity:** The digital transformation initiative aligns with emerging industry trends
2. **Technical Feasibility:** Proposed architecture is sound with modern best practices
3. **Resource Requirements:** Estimated 8-10 week timeline with current team composition

### Recommended Actions
- Prioritize customer data platform integration in Phase 1
- Implement agile methodology with 2-week sprints
- Establish continuous integration/deployment pipeline early
- Schedule weekly stakeholder check-ins

### Risk Mitigation
- Legacy system integration complexity: Plan for additional 2-week buffer
- Third-party API dependencies: Identify fallback solutions
- Data migration challenges: Conduct thorough testing in staging environment

### Next Steps
1. Finalize technical specifications
2. Begin sprint planning for Phase 1
3. Set up development environments
4. Schedule kickoff meeting with all stakeholders`;

      case 'tool023': // Desk Research Agent
        return `# Market Research Report

## Executive Summary
Comprehensive analysis of the competitive landscape and industry trends relevant to your strategic initiative.

## Market Analysis

### Industry Overview
The marketing technology sector continues rapid growth with 15% YoY expansion. Key drivers include:
- Increased demand for personalization at scale
- Integration of AI/ML capabilities
- Privacy-first solutions post-cookie deprecation

### Competitive Landscape

**Top Competitors Identified:**
1. **Adobe Experience Cloud** - Market leader with 32% share
   - Strengths: Comprehensive suite, strong analytics
   - Weaknesses: High cost, complex implementation

2. **Salesforce Marketing Cloud** - 28% market share
   - Strengths: CRM integration, robust automation
   - Weaknesses: Steep learning curve, licensing complexity

3. **HubSpot** - 18% market share, fastest growing
   - Strengths: User-friendly, strong inbound capabilities
   - Weaknesses: Limited enterprise features

### Technology Trends
- **AI-Powered Personalization:** 73% of marketers prioritizing in 2024
- **Customer Data Platforms:** Expected to reach $10B market by 2025
- **Composable Architecture:** Modular approach gaining traction

## Strategic Recommendations
1. Focus on integration capabilities as key differentiator
2. Emphasize ease of use without sacrificing power
3. Build privacy-compliant data practices from day one
4. Develop strong API ecosystem for extensibility

## Data Sources
- Gartner Magic Quadrant Reports
- Forrester Wave Analysis
- Industry analyst briefings
- Competitive intelligence platforms`;

      case 'tool024': // Use Case Development Agent
        return `# Use Case Specification

## Use Case: Customer Journey Personalization Engine

### Overview
Enable marketing teams to deliver personalized content across all customer touchpoints based on behavioral data and predictive analytics.

### Actors
- **Primary:** Marketing Manager
- **Secondary:** Content Creator, Data Analyst
- **System:** CDP, Email Platform, Web CMS, Analytics Engine

### Preconditions
- Customer data platform is configured and collecting data
- Content library is populated with tagged assets
- User segmentation rules are defined
- Personalization rules engine is active

### Basic Flow
1. Marketing Manager logs into personalization dashboard
2. System displays real-time customer segment analytics
3. Manager selects target segment for campaign
4. System recommends content based on segment preferences and past performance
5. Manager reviews and approves content selections
6. System schedules content delivery across channels
7. Real-time analytics track engagement and conversions
8. System automatically optimizes content delivery based on performance

### Alternative Flows

**A1: Manual Content Selection**
- At step 4, manager overrides system recommendations
- Manager manually selects specific content items
- System validates content compatibility with channels
- Flow continues at step 6

**A2: A/B Testing Mode**
- At step 5, manager enables A/B testing
- System creates test variants
- Content delivered to split audiences
- System tracks performance and declares winner

### Postconditions
- Campaign is active and delivering personalized content
- Analytics dashboard shows real-time performance metrics
- System continues learning from engagement data

### Business Rules
- Minimum segment size: 1,000 customers
- Content must pass brand compliance checks
- Personalization must respect customer privacy preferences
- Maximum of 3 touchpoints per customer per day

### Non-Functional Requirements
- Response time: <2 seconds for dashboard updates
- Availability: 99.9% uptime
- Scalability: Handle 10M+ customer profiles
- Security: SOC 2 compliant, encrypted data at rest and in transit

### Success Metrics
- 25% increase in email open rates
- 40% improvement in click-through rates
- 15% increase in conversion rates
- 30% reduction in time to launch campaigns

### Dependencies
- Customer Data Platform integration
- Email service provider API
- Web CMS integration
- Analytics platform connection

### Risks & Mitigation
- **Risk:** Data quality issues affecting personalization
  - **Mitigation:** Implement data validation rules and cleansing processes

- **Risk:** Over-personalization leading to privacy concerns
  - **Mitigation:** Transparent opt-in/opt-out mechanisms, clear privacy policy

- **Risk:** Content library insufficient for diverse segments
  - **Mitigation:** Content gap analysis, automated content suggestions`;

      case 'tool016': // Agent Orchestrator
        return `# Multi-Agent Workflow Execution Complete

## Workflow Summary
Successfully orchestrated 4 AI agents in sequential pipeline:

### Agent 1: Data Collection Agent
✓ Completed in 2.3 seconds
- Gathered customer data from 3 sources
- Processed 15,423 records
- Validated data quality: 98.7% accuracy

### Agent 2: Analysis Agent
✓ Completed in 5.7 seconds
- Performed sentiment analysis
- Identified 12 key trends
- Generated statistical summaries

### Agent 3: Insight Generation Agent
✓ Completed in 3.1 seconds
- Synthesized findings across datasets
- Produced 8 strategic recommendations
- Highlighted 3 critical action items

### Agent 4: Report Formatting Agent
✓ Completed in 1.9 seconds
- Structured insights into executive summary
- Created visualizations and charts
- Generated stakeholder-ready presentation

## Key Findings
- Customer satisfaction increased 12% quarter-over-quarter
- Top feature requests: Mobile app improvements, faster support response
- Churn risk identified for 3.2% of customer base

## Recommended Actions
1. Prioritize mobile app development in Q2 roadmap
2. Expand customer support team by 20%
3. Launch proactive retention campaign for at-risk customers

## Workflow Performance
- Total execution time: 13.0 seconds
- All agents completed successfully
- No errors or retries required
- Output quality score: 9.4/10

The complete analysis report is ready for stakeholder review.`;

      default:
        return `# AI Agent Execution Complete

## Task Summary
The ${tool.name} has successfully completed the requested analysis.

## Key Findings
- Processed all input data successfully
- Identified relevant patterns and insights
- Generated actionable recommendations

## Output Details
Based on the provided prompt and current context, the agent has produced a comprehensive analysis tailored to your specific needs.

### Recommendations
1. Review the findings carefully
2. Share with relevant stakeholders
3. Implement suggested actions
4. Monitor progress and outcomes

## Next Steps
- Save this output for your records
- Use insights to inform decision-making
- Re-run agent as needed with updated parameters

Thank you for using ${tool.name}!`;
    }
  };

  const runAgent = async () => {
    setIsRunning(true);
    setIsComplete(false);
    setOutput('');
    setProgress(0);

    // Simulate agent thinking/processing with progress updates
    const totalDuration = 4000; // 4 seconds
    const steps = 20;
    const stepDuration = totalDuration / steps;

    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setProgress((i / steps) * 100);
    }

    // Generate and display output
    setOutput(generateOutput());
    setIsRunning(false);
    setIsComplete(true);
  };

  const handleSave = () => {
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${tool.name.replace(/\s+/g, '_')}_output.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    // Could add a toast notification here
  };

  const handleAddToKnowledge = () => {
    // Simulate adding to project knowledge base
    const fileName = `${tool.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.md`;

    // In a real implementation, this would make an API call to save to the project's knowledge base
    // For demo purposes, we'll just download it with a specific naming convention
    const blob = new Blob([output], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    // Could show a success toast: "Added to Project Knowledge"
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900">
                  {tool.name}
                </h2>
                <p className="text-sm text-gray-600">
                  {tool.category === 'ai_agents' ? 'AI Agent' : 'Agent Orchestrator'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Prompt Editor */}
            {!isComplete && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Agent Prompt
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  disabled={isRunning}
                  className="w-full h-48 p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-merkle-primary text-sm font-mono resize-none disabled:bg-gray-50 disabled:text-gray-600"
                  placeholder="Enter your prompt here..."
                />
              </div>
            )}

            {/* Running Animation */}
            {isRunning && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-4"
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Agent Running...
                </h3>
                <p className="text-gray-600 mb-6">
                  Processing your request with AI
                </p>
                <div className="max-w-md mx-auto">
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <motion.div
                      className="bg-gradient-to-r from-merkle-primary to-purple-600 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                  <p className="text-sm text-gray-600">{Math.round(progress)}%</p>
                </div>
              </motion.div>
            )}

            {/* Output Display */}
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-semibold">Execution Complete</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={handleCopy}
                      className="btn-secondary flex items-center space-x-2"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                    <button
                      onClick={handleAddToKnowledge}
                      className="btn-secondary flex items-center space-x-2 bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Add to Project Knowledge</span>
                    </button>
                    <button
                      onClick={handleSave}
                      className="btn-primary flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Save as Document</span>
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                    {output}
                  </pre>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer */}
          {!isComplete && (
            <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600">
                Edit the prompt above and click Run to execute the agent
              </p>
              <button
                onClick={runAgent}
                disabled={isRunning || !prompt.trim()}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRunning ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5" />
                    <span>Run Agent</span>
                  </>
                )}
              </button>
            </div>
          )}

          {isComplete && (
            <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setIsComplete(false);
                  setOutput('');
                  setProgress(0);
                }}
                className="btn-secondary mr-3"
              >
                Run Again
              </button>
              <button onClick={onClose} className="btn-primary">
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AgentRunner;
