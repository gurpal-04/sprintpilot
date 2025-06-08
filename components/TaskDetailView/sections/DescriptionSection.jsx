import React, { useState } from "react";
import { FileText, Edit2 } from "lucide-react";
import { useTask } from "../../../context/TaskContext";

export const DescriptionSection = ({ taskId }) => {
  const { getTaskById, updateTask } = useTask();
  const task = getTaskById(taskId);

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(task?.description || "");

  if (!task) return null;

  const handleSave = () => {
    updateTask(taskId, { description });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDescription(task.description || "");
    setIsEditing(false);
  };

  // Simple markdown-like rendering for preview
  const renderDescription = (text) => {
    if (!text.trim()) {
      return (
        <div className="text-gray-400 italic">No description provided</div>
      );
    }

    // Split by line breaks
    return text.split("\n").map((line, i) => {
      // Headers
      if (line.startsWith("# ")) {
        return (
          <h1 key={i} className="text-xl font-bold mb-2">
            {line.substring(2)}
          </h1>
        );
      } else if (line.startsWith("## ")) {
        return (
          <h2 key={i} className="text-lg font-bold mb-2">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={i} className="text-md font-bold mb-2">
            {line.substring(4)}
          </h3>
        );
      }

      // List items
      else if (line.startsWith("- ")) {
        return (
          <li key={i} className="ml-4">
            {line.substring(2)}
          </li>
        );
      } else if (line.startsWith("* ")) {
        return (
          <li key={i} className="ml-4">
            {line.substring(2)}
          </li>
        );
      }

      // Empty line
      else if (line.trim() === "") {
        return <div key={i} className="h-4"></div>;
      }

      // Regular paragraph
      else {
        return (
          <p key={i} className="mb-2">
            {line}
          </p>
        );
      }
    });
  };

  return (
    <div className="border-t border-gray-700 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FileText size={18} className="mr-2 text-indigo-400" />
          Description
        </h3>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-sm bg-gray-800 hover:bg-gray-700 rounded-md px-3 py-1.5 transition-colors"
          >
            <Edit2 size={14} />
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={8}
            placeholder="Add a description... (Supports basic markdown like # headers and - bullet points)"
            className="w-full bg-gray-800 border border-gray-700 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 resize-y"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="text-sm bg-gray-800 hover:bg-gray-700 rounded-md px-4 py-2 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm bg-indigo-600 hover:bg-indigo-700 rounded-md px-4 py-2 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          {renderDescription(task.description || "")}
        </div>
      )}
    </div>
  );
};
