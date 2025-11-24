import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Plus,
  Play,
  Save,
  Download,
  Upload,
  Workflow,
  GitBranch,
  Database,
  FileUp,
  Chrome,
  Figma as FigmaIcon,
  Zap,
  Code,
  Settings,
  Trash2,
  Link2,
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'source' | 'agent' | 'decision' | 'output' | 'mcp';
  label: string;
  icon: React.ElementType;
  x: number;
  y: number;
  config?: any;
  connections?: string[];
}

const AgentOrchestratorCanvas: React.FC = () => {
  const { toolId, orchestratorId } = useParams();
  const navigate = useNavigate();
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'node-1',
      type: 'source',
      label: 'Figma Wireframe',
      icon: FigmaIcon,
      x: 50,
      y: 200,
      connections: ['node-2'],
    },
    {
      id: 'node-2',
      type: 'agent',
      label: 'Component Generator',
      icon: Code,
      x: 300,
      y: 200,
      config: {
        agentType: 'HTML/React Generator',
        framework: 'React',
        styling: 'Tailwind CSS',
      },
      connections: ['node-3'],
    },
    {
      id: 'node-3',
      type: 'output',
      label: 'Chrome Testbed',
      icon: Chrome,
      x: 550,
      y: 200,
    },
  ]);

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [showToolbar, setShowToolbar] = useState(true);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [tempLine, setTempLine] = useState<{ x1: number; y1: number; x2: number; y2: number } | null>(null);

  const toolbarItems = [
    { type: 'source', label: 'Data Source', icon: Database, color: 'bg-blue-500' },
    { type: 'agent', label: 'AI Agent', icon: Zap, color: 'bg-purple-500' },
    { type: 'decision', label: 'Decision', icon: GitBranch, color: 'bg-yellow-500' },
    { type: 'output', label: 'Output', icon: FileUp, color: 'bg-green-500' },
    { type: 'mcp', label: 'MCP Connect', icon: Link2, color: 'bg-pink-500' },
  ];

  const handleAddNode = (type: string) => {
    const newNode: WorkflowNode = {
      id: `node-${nodes.length + 1}`,
      type: type as any,
      label: `New ${type}`,
      icon: toolbarItems.find(t => t.type === type)?.icon || Database,
      x: 100 + nodes.length * 50,
      y: 150 + (nodes.length % 3) * 100,
    };
    setNodes([...nodes, newNode]);
  };

  const handleDeleteNode = (nodeId: string) => {
    // Remove node and any connections to it
    setNodes(nodes.filter(n => n.id !== nodeId).map(n => ({
      ...n,
      connections: n.connections?.filter(c => c !== nodeId),
    })));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  const handleStartConnection = (nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    setConnectingFrom(nodeId);
    setTempLine({
      x1: node.x + 240,
      y1: node.y + 50,
      x2: e.clientX,
      y2: e.clientY,
    });
  };

  const handleEndConnection = (targetNodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!connectingFrom || connectingFrom === targetNodeId) {
      setConnectingFrom(null);
      setTempLine(null);
      return;
    }

    // Add connection from source to target
    setNodes(nodes.map(n => {
      if (n.id === connectingFrom) {
        const connections = n.connections || [];
        if (!connections.includes(targetNodeId)) {
          return { ...n, connections: [...connections, targetNodeId] };
        }
      }
      return n;
    }));

    setConnectingFrom(null);
    setTempLine(null);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (connectingFrom && tempLine) {
      const canvas = e.currentTarget.getBoundingClientRect();
      setTempLine({
        ...tempLine,
        x2: e.clientX - canvas.left,
        y2: e.clientY - canvas.top,
      });
    }
  };

  const handleCanvasClick = () => {
    setConnectingFrom(null);
    setTempLine(null);
  };

  const handleRemoveConnection = (fromId: string, toId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNodes(nodes.map(n => {
      if (n.id === fromId) {
        return {
          ...n,
          connections: n.connections?.filter(c => c !== toId),
        };
      }
      return n;
    }));
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'source':
        return 'border-blue-500 bg-blue-50';
      case 'agent':
        return 'border-purple-500 bg-purple-50';
      case 'decision':
        return 'border-yellow-500 bg-yellow-50';
      case 'output':
        return 'border-green-500 bg-green-50';
      case 'mcp':
        return 'border-pink-500 bg-pink-50';
      default:
        return 'border-gray-500 bg-gray-50';
    }
  };

  const getNodeIconColor = (type: string) => {
    switch (type) {
      case 'source':
        return 'text-blue-600';
      case 'agent':
        return 'text-purple-600';
      case 'decision':
        return 'text-yellow-600';
      case 'output':
        return 'text-green-600';
      case 'mcp':
        return 'text-pink-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-display font-bold text-gray-900 flex items-center space-x-2">
              <Workflow className="w-6 h-6 text-merkle-primary" />
              <span>CMS Component Designer Workflow</span>
            </h1>
            <p className="text-sm text-gray-600">
              Figma → HTML/React Component → Browser Test
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="btn-secondary flex items-center space-x-2">
            <Upload className="w-4 h-4" />
            <span>Import</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="btn-secondary flex items-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button className="btn-primary flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-merkle-primary">
            <Play className="w-4 h-4" />
            <span>Run Workflow</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Toolbar */}
        {showToolbar && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            className="w-64 bg-white border-r border-gray-200 p-4 space-y-2"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Workflow Steps</h3>
              <button
                onClick={() => setShowToolbar(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {toolbarItems.map((item) => (
              <motion.button
                key={item.type}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => handleAddNode(item.type)}
                className="w-full flex items-center space-x-3 p-3 border-2 border-gray-200 rounded-lg hover:border-merkle-primary transition-all group"
              >
                <div className={`p-2 ${item.color} rounded-lg`}>
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-merkle-primary">
                    {item.label}
                  </p>
                  <p className="text-xs text-gray-500">{item.type}</p>
                </div>
                <Plus className="w-4 h-4 text-gray-400 group-hover:text-merkle-primary" />
              </motion.button>
            ))}

            <div className="pt-6 border-t border-gray-200 mt-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">
                Example Workflows
              </h4>
              <div className="space-y-2">
                <button className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg">
                  Design-to-Code Pipeline
                </button>
                <button className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg">
                  Content Generation
                </button>
                <button className="w-full text-left p-2 text-sm bg-gray-50 hover:bg-gray-100 rounded-lg">
                  Data Processing Chain
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {!showToolbar && (
          <button
            onClick={() => setShowToolbar(true)}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-r-lg p-2 shadow-lg hover:bg-gray-50"
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>
        )}

        {/* Canvas */}
        <div
          className="flex-1 relative overflow-auto bg-gray-50"
          style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}
          onMouseMove={handleMouseMove}
          onClick={handleCanvasClick}
        >
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1, pointerEvents: 'none' }}>
            {/* Permanent connections */}
            {nodes.map((node) =>
              node.connections?.map((targetId) => {
                const target = nodes.find(n => n.id === targetId);
                if (!target) return null;

                const lineId = `${node.id}-${targetId}`;
                const midX = (node.x + 240 + target.x) / 2;
                const midY = (node.y + 50 + target.y + 50) / 2;

                return (
                  <g key={lineId}>
                    <motion.line
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      x1={node.x + 240}
                      y1={node.y + 50}
                      x2={target.x}
                      y2={target.y + 50}
                      stroke="#9333ea"
                      strokeWidth="3"
                      markerEnd="url(#arrowhead)"
                      className="pointer-events-auto cursor-pointer hover:stroke-red-500 transition-colors"
                    />
                    {/* Invisible wider line for easier clicking */}
                    <line
                      x1={node.x + 240}
                      y1={node.y + 50}
                      x2={target.x}
                      y2={target.y + 50}
                      stroke="transparent"
                      strokeWidth="20"
                      className="pointer-events-auto cursor-pointer"
                      onClick={(e) => handleRemoveConnection(node.id, targetId, e)}
                    />
                    {/* Delete button on connection line */}
                    <g
                      transform={`translate(${midX - 12}, ${midY - 12})`}
                      className="pointer-events-auto cursor-pointer"
                      onClick={(e) => handleRemoveConnection(node.id, targetId, e)}
                    >
                      <circle r="12" fill="white" stroke="#9333ea" strokeWidth="2" />
                      <line x1="-4" y1="-4" x2="4" y2="4" stroke="#9333ea" strokeWidth="2" />
                      <line x1="4" y1="-4" x2="-4" y2="4" stroke="#9333ea" strokeWidth="2" />
                    </g>
                  </g>
                );
              })
            )}

            {/* Temporary connection line while dragging */}
            {tempLine && (
              <motion.line
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                x1={tempLine.x1}
                y1={tempLine.y1}
                x2={tempLine.x2}
                y2={tempLine.y2}
                stroke="#9333ea"
                strokeWidth="3"
                strokeDasharray="10,5"
                markerEnd="url(#arrowhead-temp)"
                className="pointer-events-none"
              />
            )}

            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#9333ea" />
              </marker>
              <marker
                id="arrowhead-temp"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#9333ea" fillOpacity="0.5" />
              </marker>
            </defs>
          </svg>

          <div className="relative p-8" style={{ minWidth: '1200px', minHeight: '800px', zIndex: 2 }}>
            {nodes.map((node) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={node.id}
                  drag
                  dragMomentum={false}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedNode(node.id)}
                  className={`absolute w-60 bg-white border-2 rounded-xl shadow-lg cursor-move hover:shadow-2xl transition-all ${
                    getNodeColor(node.type)
                  } ${selectedNode === node.id ? 'ring-4 ring-merkle-primary' : ''}`}
                  style={{
                    left: node.x,
                    top: node.y,
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 bg-white rounded-lg border-2 ${getNodeIconColor(node.type)}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{node.label}</p>
                          <p className="text-xs text-gray-500 capitalize">{node.type}</p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNode(node.id);
                        }}
                        className="p-1 hover:bg-red-100 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>

                    {node.config && (
                      <div className="space-y-1 pt-3 border-t border-gray-200">
                        {Object.entries(node.config).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between text-xs">
                            <span className="text-gray-600 capitalize">{key}:</span>
                            <span className="text-gray-900 font-medium">{value as string}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="w-full mt-3 py-2 text-xs font-medium text-merkle-primary hover:bg-merkle-primary hover:text-white border border-merkle-primary rounded-lg transition-colors flex items-center justify-center space-x-1"
                    >
                      <Settings className="w-3 h-3" />
                      <span>Configure</span>
                    </button>
                  </div>

                  {/* Connection points */}
                  {/* Output connection point (right side) */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    onMouseDown={(e) => handleStartConnection(node.id, e)}
                    className={`absolute -right-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg cursor-pointer hover:shadow-xl transition-all ${
                      connectingFrom === node.id ? 'bg-yellow-500 animate-pulse' : 'bg-merkle-primary'
                    }`}
                    style={{ zIndex: 10 }}
                    title="Click and drag to create connection"
                  />
                  {/* Input connection point (left side) */}
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    onMouseUp={(e) => handleEndConnection(node.id, e)}
                    className={`absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full border-4 border-white shadow-lg cursor-pointer hover:shadow-xl transition-all ${
                      connectingFrom && connectingFrom !== node.id ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}
                    style={{ zIndex: 10 }}
                    title="Drop connection here"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Properties Panel */}
        {selectedNode && (
          <motion.div
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Node Properties</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            {nodes.find(n => n.id === selectedNode) && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Node Label
                  </label>
                  <input
                    type="text"
                    defaultValue={nodes.find(n => n.id === selectedNode)?.label}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Node Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary">
                    <option>Source</option>
                    <option>Agent</option>
                    <option>Decision</option>
                    <option>Output</option>
                    <option>MCP Connect</option>
                  </select>
                </div>

                {nodes.find(n => n.id === selectedNode)?.type === 'agent' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Agent Type
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary">
                        <option>HTML/React Generator</option>
                        <option>Documentation Writer</option>
                        <option>Code Reviewer</option>
                        <option>Test Generator</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Framework
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary">
                        <option>React</option>
                        <option>Vue</option>
                        <option>Angular</option>
                        <option>HTML/CSS</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Styling
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary">
                        <option>Tailwind CSS</option>
                        <option>CSS Modules</option>
                        <option>Styled Components</option>
                        <option>Plain CSS</option>
                      </select>
                    </div>
                  </>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Connections
                  </label>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-xs font-semibold text-blue-900 mb-1">How to Connect:</p>
                      <p className="text-xs text-blue-700">
                        1. Click and hold the purple dot on the right side of a node<br/>
                        2. Drag to the left side of another node<br/>
                        3. Release to create connection
                      </p>
                    </div>
                    {nodes.find(n => n.id === selectedNode)?.connections &&
                     nodes.find(n => n.id === selectedNode)!.connections!.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-2">Connected to:</p>
                        <div className="space-y-1">
                          {nodes.find(n => n.id === selectedNode)!.connections!.map((connId) => {
                            const connectedNode = nodes.find(n => n.id === connId);
                            return (
                              <div key={connId} className="flex items-center justify-between p-2 bg-purple-50 rounded text-xs">
                                <span className="text-gray-900">{connectedNode?.label}</span>
                                <button
                                  onClick={(e) => handleRemoveConnection(selectedNode, connId, e)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  Remove
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <button className="w-full btn-primary">
                  Apply Changes
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AgentOrchestratorCanvas;
