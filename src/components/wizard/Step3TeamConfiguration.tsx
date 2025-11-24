import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  X,
  ArrowRight,
  ArrowLeft,
  UserPlus,
  CheckCircle,
} from 'lucide-react';
import { useWizard } from '@/contexts/WizardContext';
import { mockUsers } from '@/data/mockData';
import type { TeamMember, UserRole } from '@/types';

const Step3TeamConfiguration: React.FC = () => {
  const { wizardData, updateWizardData, nextStep, prevStep } = useWizard();
  const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>(
    wizardData.selectedTeam
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');

  const availableMembers = mockUsers.map(user => ({
    userId: user.userId,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    availability: 'available' as const,
  }));

  const filteredMembers = availableMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || member.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const recommendedRoles = wizardData.aiRecommendations?.roles || [];

  const toggleMember = (member: TeamMember) => {
    setSelectedMembers(prev => {
      const exists = prev.find(m => m.userId === member.userId);
      if (exists) {
        return prev.filter(m => m.userId !== member.userId);
      } else {
        return [...prev, member];
      }
    });
  };

  const handleNext = () => {
    updateWizardData({ selectedTeam: selectedMembers });
    nextStep();
  };

  const uniqueRoles = Array.from(new Set(availableMembers.map(m => m.role)));

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Configure Your Team
              </h2>
              <p className="text-gray-600 mt-1">
                Assign team members to the project based on AI recommendations
              </p>
            </div>
          </div>

          {/* Recommended Roles */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">
              Recommended Roles ({recommendedRoles.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {recommendedRoles.map((role, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-blue-300 rounded-full text-sm text-blue-800"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Available Team Members */}
          <div className="lg:col-span-2 card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Available Team Members
              </h3>
              <span className="text-sm text-gray-600">
                {filteredMembers.length} members
              </span>
            </div>

            {/* Search and Filter */}
            <div className="flex space-x-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or role..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-merkle-primary"
              >
                <option value="all">All Roles</option>
                {uniqueRoles.map(role => (
                  <option key={role} value={role}>
                    {role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </option>
                ))}
              </select>
            </div>

            {/* Members List */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {filteredMembers.map((member, index) => (
                <MemberCard
                  key={member.userId}
                  member={member}
                  isSelected={selectedMembers.some(m => m.userId === member.userId)}
                  onToggle={toggleMember}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Selected Team */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Selected Team
              </h3>
              <span className="px-2 py-1 bg-merkle-primary text-white rounded-full text-xs font-semibold">
                {selectedMembers.length}
              </span>
            </div>

            {selectedMembers.length === 0 ? (
              <div className="text-center py-12">
                <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">
                  No team members selected yet
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Click on members to add them
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {selectedMembers.map((member, index) => (
                  <motion.div
                    key={member.userId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {member.name}
                        </p>
                        <p className="text-xs text-gray-600 capitalize">
                          {member.role.replace('_', ' ')}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleMember(member)}
                      className="p-1 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4 text-red-600" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Quick Stats */}
            {selectedMembers.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Team Composition:
                </p>
                <div className="space-y-1">
                  {Array.from(new Set(selectedMembers.map(m => m.role))).map(role => {
                    const count = selectedMembers.filter(m => m.role === role).length;
                    return (
                      <div key={role} className="flex justify-between text-xs text-gray-600">
                        <span className="capitalize">{role.replace('_', ' ')}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            className="btn-secondary flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Step 3</span> of 4
            </div>
            <button
              onClick={handleNext}
              disabled={selectedMembers.length === 0}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50"
            >
              <span>Setup Integrations</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

interface MemberCardProps {
  member: TeamMember;
  isSelected: boolean;
  onToggle: (member: TeamMember) => void;
  index: number;
}

const MemberCard: React.FC<MemberCardProps> = ({
  member,
  isSelected,
  onToggle,
  index,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onToggle(member)}
      className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
        isSelected
          ? 'bg-merkle-primary bg-opacity-10 border-merkle-primary'
          : 'bg-white border-gray-200 hover:border-gray-300'
      }`}
    >
      <div className="flex items-center space-x-3">
        <img
          src={member.avatar}
          alt={member.name}
          className="w-12 h-12 rounded-full"
        />
        <div className="text-left">
          <p className="font-semibold text-gray-900">{member.name}</p>
          <p className="text-sm text-gray-600 capitalize">
            {member.role.replace('_', ' ')}
          </p>
          <div className="flex items-center space-x-1 mt-1">
            <span
              className={`w-2 h-2 rounded-full ${
                member.availability === 'available'
                  ? 'bg-green-500'
                  : member.availability === 'busy'
                  ? 'bg-yellow-500'
                  : 'bg-gray-500'
              }`}
            />
            <span className="text-xs text-gray-500 capitalize">
              {member.availability}
            </span>
          </div>
        </div>
      </div>
      {isSelected && (
        <CheckCircle className="w-6 h-6 text-merkle-primary" />
      )}
    </motion.button>
  );
};

export default Step3TeamConfiguration;
