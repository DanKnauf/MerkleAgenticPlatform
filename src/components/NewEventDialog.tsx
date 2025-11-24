import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  Brain,
  Scan,
  CheckCircle,
  ChevronRight,
} from 'lucide-react';
import type { CalendarEvent, User } from '@/types';

interface NewEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (event: Omit<CalendarEvent, 'eventId'>) => void;
  teamMembers: User[];
  projectContext?: {
    projectName: string;
    recentActivity: string[];
  };
}

type TabMode = 'manual' | 'ai-suggest';
type AIStep = 'analyzing' | 'scanning' | 'generating' | 'complete';

const NewEventDialog: React.FC<NewEventDialogProps> = ({
  isOpen,
  onClose,
  onCreateEvent,
  teamMembers,
  projectContext,
}) => {
  const [activeTab, setActiveTab] = useState<TabMode>('manual');

  // Manual entry state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('60');
  const [location, setLocation] = useState('');
  const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);

  // AI state
  const [isAIFindingTime, setIsAIFindingTime] = useState(false);
  const [isAISuggesting, setIsAISuggesting] = useState(false);
  const [aiStep, setAiStep] = useState<AIStep>('analyzing');
  const [suggestedTime, setSuggestedTime] = useState<string>('');
  const [aiSuggestedEvent, setAiSuggestedEvent] = useState<any>(null);

  const handleToggleAttendee = (userId: string) => {
    setSelectedAttendees(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleAIFindBestTime = async () => {
    setIsAIFindingTime(true);

    // Simulate AI processing with animation steps
    setTimeout(() => setAiStep('analyzing'), 500);
    setTimeout(() => setAiStep('scanning'), 1500);
    setTimeout(() => setAiStep('generating'), 2500);
    setTimeout(() => {
      setAiStep('complete');
      // Generate a suggested time (tomorrow at 2 PM)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(14, 0, 0, 0);
      const suggestedDateTime = tomorrow.toISOString().slice(0, 16);
      setSuggestedTime(suggestedDateTime);

      // Auto-fill the date and time fields
      const datePart = suggestedDateTime.split('T')[0];
      const timePart = suggestedDateTime.split('T')[1];
      setDate(datePart);
      setTime(timePart);

      setIsAIFindingTime(false);
    }, 3500);
  };

  const handleAISuggestMeeting = async () => {
    setIsAISuggesting(true);
    setAiStep('analyzing');

    // Simulate AI processing steps
    setTimeout(() => setAiStep('scanning'), 800);
    setTimeout(() => setAiStep('generating'), 1800);
    setTimeout(() => {
      setAiStep('complete');

      // Generate AI-suggested meeting based on project context
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(15, 0, 0, 0);

      const suggestion = {
        title: `${projectContext?.projectName || 'Project'} Sprint Planning Session`,
        description: `Review backlog items and plan upcoming sprint deliverables. Discuss technical architecture decisions and resolve any blockers from the previous sprint.`,
        date: tomorrow.toISOString().split('T')[0],
        time: '15:00',
        duration: '90',
        location: 'Conference Room B / MS Teams',
        attendees: teamMembers.slice(0, 4).map(m => m.userId), // Suggest first 4 team members
      };

      setAiSuggestedEvent(suggestion);
      setIsAISuggesting(false);
    }, 3000);
  };

  const handleUseAISuggestion = () => {
    if (aiSuggestedEvent) {
      setTitle(aiSuggestedEvent.title);
      setDescription(aiSuggestedEvent.description);
      setDate(aiSuggestedEvent.date);
      setTime(aiSuggestedEvent.time);
      setDuration(aiSuggestedEvent.duration);
      setLocation(aiSuggestedEvent.location);
      setSelectedAttendees(aiSuggestedEvent.attendees);
      setActiveTab('manual');
      setAiSuggestedEvent(null);
    }
  };

  const handleCreateEvent = () => {
    if (!title || !date || !time) return;

    const [hours, minutes] = time.split(':');
    const startDate = new Date(date);
    startDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const endDate = new Date(startDate);
    endDate.setMinutes(endDate.getMinutes() + parseInt(duration));

    const newEvent: Omit<CalendarEvent, 'eventId'> = {
      title,
      description,
      startTime: startDate,
      endTime: endDate,
      type: 'meeting',
      location,
      attendees: selectedAttendees,
      color: 'blue',
    };

    onCreateEvent(newEvent);
    handleClose();
  };

  const handleClose = () => {
    // Reset all state
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setDuration('60');
    setLocation('');
    setSelectedAttendees([]);
    setSuggestedTime('');
    setAiSuggestedEvent(null);
    setActiveTab('manual');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black bg-opacity-50"
        />

        {/* Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto mx-4"
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-merkle-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-merkle-primary" />
              </div>
              <div>
                <h2 className="text-xl font-display font-bold text-gray-900">
                  New Event
                </h2>
                <p className="text-sm text-gray-600">
                  Create manually or let AI suggest
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="px-6 pt-4">
            <div className="flex space-x-2 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('manual')}
                className={`px-6 py-3 text-sm font-semibold transition-colors relative ${
                  activeTab === 'manual'
                    ? 'text-merkle-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Manual Entry
                {activeTab === 'manual' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-merkle-primary"
                  />
                )}
              </button>
              <button
                onClick={() => setActiveTab('ai-suggest')}
                className={`px-6 py-3 text-sm font-semibold transition-colors relative flex items-center space-x-2 ${
                  activeTab === 'ai-suggest'
                    ? 'text-merkle-primary'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>AI Suggest</span>
                {activeTab === 'ai-suggest' && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-merkle-primary"
                  />
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'manual' ? (
              <div className="space-y-6">
                {/* Manual Entry Form */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Sprint Planning Meeting"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Add meeting agenda or notes..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Time *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Duration (minutes)
                    </label>
                    <select
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="90">1.5 hours</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Room or MS Teams"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Members Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-gray-900 flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>Team Members ({selectedAttendees.length} selected)</span>
                    </label>
                    {selectedAttendees.length > 0 && (
                      <button
                        onClick={handleAIFindBestTime}
                        disabled={isAIFindingTime}
                        className="btn-secondary text-sm flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-merkle-primary text-white disabled:opacity-50"
                      >
                        <Sparkles className="w-4 h-4" />
                        <span>{isAIFindingTime ? 'Finding...' : 'Find Best Time'}</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                    {teamMembers.map((member) => (
                      <label
                        key={member.userId}
                        className="flex items-center space-x-3 cursor-pointer group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedAttendees.includes(member.userId)}
                          onChange={() => handleToggleAttendee(member.userId)}
                          className="w-4 h-4 text-merkle-primary rounded focus:ring-2 focus:ring-merkle-primary"
                        />
                        <div className="flex items-center space-x-2 flex-1">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-6 h-6 rounded-full"
                          />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900">
                            {member.name}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* AI Finding Time Animation */}
                <AnimatePresence>
                  {isAIFindingTime && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200"
                    >
                      <AIProcessingAnimation step={aiStep} mode="finding-time" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {suggestedTime && !isAIFindingTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-green-900">
                        Optimal time found!
                      </p>
                      <p className="text-sm text-green-700 mt-1">
                        AI analyzed team calendars and suggests: {new Date(suggestedTime).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {/* AI Suggest Mode */}
                {!aiSuggestedEvent && !isAISuggesting && (
                  <div className="text-center py-8">
                    <div className="inline-flex p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl mb-4">
                      <Brain className="w-16 h-16 text-merkle-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      AI-Powered Meeting Suggestion
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Let AI analyze your project context, team availability, and recent
                      activity to suggest the perfect meeting.
                    </p>
                    <button
                      onClick={handleAISuggestMeeting}
                      className="btn-primary flex items-center space-x-2 mx-auto bg-gradient-to-r from-purple-600 to-merkle-primary"
                    >
                      <Sparkles className="w-5 h-5" />
                      <span>Generate Meeting Suggestion</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* AI Processing Animation */}
                <AnimatePresence>
                  {isAISuggesting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-8"
                    >
                      <AIProcessingAnimation step={aiStep} mode="suggesting" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* AI Suggested Event Display */}
                {aiSuggestedEvent && !isAISuggesting && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2 text-green-600 mb-4">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">Meeting suggested successfully!</span>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 space-y-4 border border-purple-200">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Event Title
                        </label>
                        <p className="text-lg font-semibold text-gray-900 mt-1">
                          {aiSuggestedEvent.title}
                        </p>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Description
                        </label>
                        <p className="text-sm text-gray-700 mt-1">
                          {aiSuggestedEvent.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Date & Time
                          </label>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {new Date(aiSuggestedEvent.date + 'T' + aiSuggestedEvent.time).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Duration
                          </label>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            {aiSuggestedEvent.duration} minutes
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Location
                        </label>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {aiSuggestedEvent.location}
                        </p>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2 block">
                          Suggested Attendees
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {teamMembers
                            .filter(m => aiSuggestedEvent.attendees.includes(m.userId))
                            .map(member => (
                              <div
                                key={member.userId}
                                className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 border border-purple-200"
                              >
                                <img
                                  src={member.avatar}
                                  alt={member.name}
                                  className="w-5 h-5 rounded-full"
                                />
                                <span className="text-sm text-gray-700">{member.name}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-4">
                      <button
                        onClick={handleAISuggestMeeting}
                        className="btn-secondary"
                      >
                        Regenerate
                      </button>
                      <button
                        onClick={handleUseAISuggestion}
                        className="btn-primary bg-gradient-to-r from-purple-600 to-merkle-primary"
                      >
                        Use This Suggestion
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Footer - Only show for manual entry */}
          {activeTab === 'manual' && (
            <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                * Required fields
              </p>
              <div className="flex items-center space-x-3">
                <button onClick={handleClose} className="btn-secondary">
                  Cancel
                </button>
                <button
                  onClick={handleCreateEvent}
                  disabled={!title || !date || !time}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Event
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

// AI Processing Animation Component
const AIProcessingAnimation: React.FC<{ step: AIStep; mode: 'finding-time' | 'suggesting' }> = ({
  step,
  mode,
}) => {
  const steps = mode === 'finding-time'
    ? [
        { id: 'analyzing', label: 'Analyzing event requirements', icon: Brain },
        { id: 'scanning', label: 'Scanning team calendars', icon: Scan },
        { id: 'generating', label: 'Finding optimal time slots', icon: Sparkles },
        { id: 'complete', label: 'Analysis complete', icon: CheckCircle },
      ]
    : [
        { id: 'analyzing', label: 'Analyzing project context', icon: Brain },
        { id: 'scanning', label: 'Checking team availability', icon: Scan },
        { id: 'generating', label: 'Generating meeting details', icon: Sparkles },
        { id: 'complete', label: 'Suggestion ready', icon: CheckCircle },
      ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="space-y-4">
      {steps.map((s, index) => {
        const Icon = s.icon;
        const isActive = index === currentStepIndex;
        const isComplete = index < currentStepIndex;

        return (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center space-x-3 p-3 rounded-lg ${
              isActive
                ? 'bg-white border border-purple-300'
                : isComplete
                ? 'bg-white border border-green-200'
                : 'bg-white/50'
            }`}
          >
            <div
              className={`p-2 rounded-lg ${
                isActive
                  ? 'bg-purple-100'
                  : isComplete
                  ? 'bg-green-100'
                  : 'bg-gray-100'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? 'text-purple-600 animate-pulse'
                    : isComplete
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`}
              />
            </div>
            <div className="flex-1">
              <p
                className={`text-sm font-medium ${
                  isActive || isComplete ? 'text-gray-900' : 'text-gray-500'
                }`}
              >
                {s.label}
              </p>
            </div>
            {isActive && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full"
              />
            )}
            {isComplete && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default NewEventDialog;
