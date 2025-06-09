import React from "react";
import { User, Edit, Trash2, Mail, Calendar, Code, Users } from "lucide-react";

const DeveloperCard = ({ developer, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "overloaded":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30";
      case "on-leave":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getExperienceColor = (level) => {
    switch (level) {
      case "Junior":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Mid":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "Senior":
        return "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
      case "Lead":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const skillColors = [
    "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    "bg-pink-500/20 text-pink-400 border-pink-500/30",
    "bg-violet-500/20 text-violet-400 border-violet-500/30",
    "bg-indigo-500/20 text-indigo-400 border-indigo-500/30",
    "bg-teal-500/20 text-teal-400 border-teal-500/30",
    "bg-rose-500/20 text-rose-400 border-rose-500/30",
  ];

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/20 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center ring-2 ring-slate-600/50">
              <User className="w-6 h-6 text-slate-300" />
            </div>
            <div
              className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-800 ${
                developer.availabilityStatus === "available"
                  ? "bg-green-500"
                  : developer.availabilityStatus === "overloaded"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            ></div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              {developer.name}
            </h3>
            <p className="text-slate-400 text-sm flex items-center">
              <Mail className="w-3 h-3 mr-1" />
              {developer.email}
            </p>
          </div>
        </div>

        <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onEdit(developer)}
            className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors duration-200 text-slate-300 hover:text-white"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(developer.id)}
            className="p-2 bg-slate-700/50 hover:bg-red-600/50 rounded-lg transition-colors duration-200 text-slate-300 hover:text-red-400"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-slate-300 font-medium">
            {developer.designation}
          </span>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full border ${getExperienceColor(
              developer.experienceLevel
            )}`}
          >
            {developer.experienceLevel}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-slate-400">
            <Users className="w-4 h-4 mr-1" />
            <span>{developer.currentTasks} active tasks</span>
          </div>
          <div className="flex items-center text-slate-400">
            <Calendar className="w-4 h-4 mr-1" />
            <span>Since {developer.joinedDate}</span>
          </div>
        </div>

        <div
          className={`px-3 py-2 text-sm font-medium rounded-lg border ${getStatusColor(
            developer.availabilityStatus
          )}`}
        >
          {developer.availabilityStatus === "available" && "Available"}
          {developer.availabilityStatus === "overloaded" && "Overloaded"}
          {developer.availabilityStatus === "on-leave" && "On Leave"}
        </div>

        {/* Skills */}
        {developer.skills.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <Code className="w-4 h-4 text-slate-400 mr-1" />
              <span className="text-sm text-slate-400">Skills</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {developer.skills.map((skill, index) => (
                <span
                  key={skill}
                  className={`px-2 py-1 text-xs font-medium rounded-md border ${
                    skillColors[index % skillColors.length]
                  }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeveloperCard;
