"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { Badge } from "../ui/badge";

const EpicItem = ({ epic, isActive, onToggle }) => {
  console.log("epic11", epic, epic?.stories?.length);
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-600 hover:bg-emerald-700";
      case "In Progress":
        return "bg-cyan-600 hover:bg-cyan-700";
      case "Draft":
        return "bg-gray-600 hover:bg-gray-700";
      default:
        return "bg-gray-600 hover:bg-gray-700";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className={`bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-violet-500 transition-all duration-200 relative ${
        isActive ? "border-violet-500" : ""
      }`}
    >
      <div
        onClick={onToggle}
        className="flex items-center justify-between w-full hover:bg-gray-700 p-6 cursor-pointer"
      >
        <div className="flex items-center space-x-4">
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white mb-1">
              {epic.title}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>{epic?.stories?.length || 0} stories</span>
              <span>•</span>
              <span>Created {formatDate(epic.createdAt || new Date())}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* <Badge
            className={`${getStatusColor(
              epic.status
            )} text-white px-3 py-1 text-xs font-medium`}
          >
            {epic.status}
          </Badge> */}
          <button>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isActive ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {isActive && (
        <div className="p-6 border-t border-gray-700">
          <p className="text-gray-400">{epic.description}</p>
          {epic.stories && epic.stories.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">
                Stories ({epic.stories.length})
              </h4>
              <div className="grid gap-2">
                {epic.stories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-gray-900 rounded-lg px-4 py-3 border border-gray-600 hover:border-violet-500 transition-colors duration-200 cursor-pointer"
                  >
                    {story.title || story}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EpicItem;
