import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { mockCalendarEvents, mockUsers, type CalendarEvent } from '@/data/mockData';
import { useProjects } from '@/contexts/ProjectContext';
import NewEventDialog from '@/components/NewEventDialog';

const TeamCalendar: React.FC = () => {
  const { projects } = useProjects();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filterType, setFilterType] = useState<string>('all');
  const [isNewEventDialogOpen, setIsNewEventDialogOpen] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(mockCalendarEvents);

  // Suppress unused variable warning - projects available for future use
  void projects;

  const handleCreateEvent = (newEvent: Omit<CalendarEvent, 'eventId'>) => {
    const eventWithId: CalendarEvent = {
      ...newEvent,
      eventId: `event${calendarEvents.length + 1}`,
    };
    setCalendarEvents([...calendarEvents, eventWithId]);
  };

  const getEventsForDate = (date: Date) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.startTime);
      return (
        eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const getWeekDays = () => {
    const curr = new Date(selectedDate);
    const first = curr.getDate() - curr.getDay();
    const days = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(curr.setDate(first + i));
      days.push(new Date(date));
    }
    return days;
  };

  const weekDays = getWeekDays();

  const filteredEvents = filterType === 'all'
    ? calendarEvents
    : calendarEvents.filter(e => e.type === filterType);

  const eventTypeColors = {
    meeting: 'bg-blue-100 text-blue-800 border-blue-200',
    deadline: 'bg-red-100 text-red-800 border-red-200',
    milestone: 'bg-purple-100 text-purple-800 border-purple-200',
    review: 'bg-green-100 text-green-800 border-green-200',
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">
            Team Calendar
          </h1>
          <p className="text-gray-600 mt-1">
            View and manage team meetings, deadlines, and milestones
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsNewEventDialogOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <CalendarIcon className="w-5 h-5" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {/* Date Navigation */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() - 7);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-center min-w-[200px]">
              <p className="text-xl font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <p className="text-sm text-gray-600">
                Week of {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
            </div>
            <button
              onClick={() => {
                const newDate = new Date(selectedDate);
                newDate.setDate(newDate.getDate() + 7);
                setSelectedDate(newDate);
              }}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="btn-secondary text-sm"
            >
              Today
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
            >
              <option value="all">All Events</option>
              <option value="meeting">Meetings</option>
              <option value="deadline">Deadlines</option>
              <option value="milestone">Milestones</option>
              <option value="review">Reviews</option>
            </select>
          </div>
        </div>
      </div>

      {/* Week View */}
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isToday =
            day.getDate() === new Date().getDate() &&
            day.getMonth() === new Date().getMonth() &&
            day.getFullYear() === new Date().getFullYear();

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`card min-h-[400px] ${isToday ? 'ring-2 ring-merkle-primary' : ''}`}
            >
              <div className="mb-4">
                <p className="text-xs text-gray-600 uppercase">
                  {day.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className={`text-2xl font-bold ${isToday ? 'text-merkle-primary' : 'text-gray-900'}`}>
                  {day.getDate()}
                </p>
              </div>

              <div className="space-y-2">
                {dayEvents.filter(e => filterType === 'all' || e.type === filterType).map((event, idx) => (
                  <EventCard key={idx} event={event} />
                ))}
                {dayEvents.filter(e => filterType === 'all' || e.type === filterType).length === 0 && (
                  <p className="text-sm text-gray-400 text-center py-8">
                    No events
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Upcoming Events List */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Upcoming Events
        </h2>
        <div className="space-y-3">
          {filteredEvents.slice(0, 5).map((event, index) => (
            <UpcomingEventCard key={index} event={event} />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Types</h3>
        <div className="flex flex-wrap gap-4">
          {Object.entries(eventTypeColors).map(([type, color]) => (
            <div key={type} className="flex items-center space-x-2">
              <div className={`w-4 h-4 rounded ${color}`} />
              <span className="text-sm text-gray-700 capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>

      {/* New Event Dialog */}
      <NewEventDialog
        isOpen={isNewEventDialogOpen}
        onClose={() => setIsNewEventDialogOpen(false)}
        onCreateEvent={handleCreateEvent}
        teamMembers={mockUsers}
        projectContext={{
          projectName: projects[0]?.name || 'Current Project',
          recentActivity: [
            'Sprint planning meeting scheduled',
            'Design review completed',
            'API integration in progress',
          ],
        }}
      />
    </div>
  );
};

// Event Card Component
interface EventCardProps {
  event: CalendarEvent;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { projects } = useProjects();
  const project = event.projectId ? projects.find(p => p.projectId === event.projectId) : null;

  const eventTypeColors = {
    meeting: 'bg-blue-100 text-blue-800 border-blue-200',
    deadline: 'bg-red-100 text-red-800 border-red-200',
    milestone: 'bg-purple-100 text-purple-800 border-purple-200',
    review: 'bg-green-100 text-green-800 border-green-200',
  };

  return (
    <div className={`p-2 rounded-lg border-l-4 ${eventTypeColors[event.type]} cursor-pointer hover:shadow-md transition-shadow calendar-event`}>
      <p className="text-xs font-semibold mb-1">{event.title}</p>
      <div className="flex items-center text-xs space-x-1">
        <Clock className="w-3 h-3" />
        <span>
          {event.startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
        </span>
      </div>
      {project && (
        <p className="text-xs text-gray-600 mt-1">{project.name}</p>
      )}
    </div>
  );
};

// Upcoming Event Card
const UpcomingEventCard: React.FC<EventCardProps> = ({ event }) => {
  const { projects } = useProjects();
  const project = event.projectId ? projects.find(p => p.projectId === event.projectId) : null;

  const eventTypeColors = {
    meeting: 'bg-blue-100 text-blue-800 border-blue-200',
    deadline: 'bg-red-100 text-red-800 border-red-200',
    milestone: 'bg-purple-100 text-purple-800 border-purple-200',
    review: 'bg-green-100 text-green-800 border-green-200',
  };

  const attendeeNames = event.attendees
    .map(id => mockUsers.find(u => u.userId === id)?.name)
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      <div className={`p-3 rounded-lg ${eventTypeColors[event.type]}`}>
        <CalendarIcon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-semibold text-gray-900">{event.title}</h4>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${eventTypeColors[event.type]}`}>
            {event.type}
          </span>
        </div>
        <p className="text-sm text-gray-600 mb-2">{event.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{event.startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>
              {event.startTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} -
              {event.endTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
            </span>
          </div>
          {event.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
          )}
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span>{attendeeNames.join(', ')}{event.attendees.length > 3 && ` +${event.attendees.length - 3}`}</span>
          </div>
        </div>
        {project && (
          <div className="mt-2">
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
              {project.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCalendar;
