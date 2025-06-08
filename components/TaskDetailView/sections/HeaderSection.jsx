import React, { useState } from "react";
import { Calendar, User, Hash } from "lucide-react";
import { useTask } from "../../../context/TaskContext";
import { StatusDropdown } from "../../ui/StatusDropdown";
import { Avatar } from "../../ui/Avatar";
import { Badge } from "@/components/ui/badge";

export const HeaderSection = ({ taskId }) => {
  const { getTaskById, updateTask } = useTask();
  const task = getTaskById(taskId);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(task?.title || "");

  if (!task) return null;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    updateTask(taskId, { title });
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleTitleBlur();
    }
  };

  const handleStatusChange = (status) => {
    updateTask(taskId, { status });
  };

  const handleStoryPointsChange = (e) => {
    const points = parseInt(e.target.value) || 0;
    updateTask(taskId, { storyPoints: points });
  };

  return (
    <div className="space-y-4">
      {/* Title - Editable on click */}
      {isEditingTitle ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          autoFocus
          className="w-full text-2xl font-bold bg-gray-800 border border-indigo-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ) : (
        <h2
          className="text-2xl font-bold cursor-pointer hover:text-indigo-400 transition-colors"
          onClick={() => setIsEditingTitle(true)}
        >
          {task.title}
          <span className="ml-2 text-xs text-gray-400 align-top">
            (click to edit)
          </span>
        </h2>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        <Badge color="blue">{task.type || "Story"}</Badge>
        {task.priority && (
          <Badge
            color={
              task.priority === "High"
                ? "red"
                : task.priority === "Medium"
                ? "yellow"
                : "green"
            }
          >
            {task.priority}
          </Badge>
        )}
        {task.tags?.map((tag, index) => (
          <Badge key={index} color="purple">
            {tag}
          </Badge>
        ))}
      </div>

      {/* Status, Points, Assignee, Due Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">Status</div>
          <StatusDropdown
            value={task.status || "To Do"}
            onChange={handleStatusChange}
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1 flex items-center">
            <Hash size={14} className="mr-1" /> Story Points
          </div>
          <input
            type="number"
            min="0"
            max="100"
            value={task.storyPoints || 0}
            onChange={handleStoryPointsChange}
            className="w-full bg-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1 flex items-center">
            <User size={14} className="mr-1" /> Assignee
          </div>
          <div className="flex -space-x-1 overflow-hidden">
            {(task.assignees || []).map((assignee, index) => (
              <Avatar key={index} name={assignee} size="sm" />
            ))}
            <button className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs ml-1">
              +
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
          <div className="text-gray-400 text-sm mb-1 flex items-center">
            <Calendar size={14} className="mr-1" /> Due Date
          </div>
          <input
            type="date"
            value={task.dueDate || ""}
            onChange={(e) => updateTask(taskId, { dueDate: e.target.value })}
            className="w-full bg-gray-700 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>
      </div>
    </div>
  );
};
