import React, { useState } from "react";
import { CheckSquare, Plus, Trash2 } from "lucide-react";
import { useTask } from "../../../context/TaskContext";

export const AcceptanceCriteriaSection = ({ taskId }) => {
  const { getTaskById, updateTask } = useTask();
  const task = getTaskById(taskId);

  const [newCriterion, setNewCriterion] = useState("");

  if (!task) return null;

  const handleToggleCriterion = (index) => {
    const updatedCriteria = [...(task.acceptanceCriteria || [])];
    updatedCriteria[index] = {
      ...updatedCriteria[index],
      completed: !updatedCriteria[index].completed,
    };
    updateTask(taskId, { acceptanceCriteria: updatedCriteria });
  };

  const handleEditCriterion = (index, text) => {
    const updatedCriteria = [...(task.acceptanceCriteria || [])];
    updatedCriteria[index] = {
      ...updatedCriteria[index],
      text,
    };
    updateTask(taskId, { acceptanceCriteria: updatedCriteria });
  };

  const handleRemoveCriterion = (index) => {
    const updatedCriteria = [...(task.acceptanceCriteria || [])];
    updatedCriteria.splice(index, 1);
    updateTask(taskId, { acceptanceCriteria: updatedCriteria });
  };

  const handleAddCriterion = () => {
    if (newCriterion.trim()) {
      const updatedCriteria = [
        ...(task.acceptanceCriteria || []),
        { text: newCriterion, completed: false },
      ];
      updateTask(taskId, { acceptanceCriteria: updatedCriteria });
      setNewCriterion("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddCriterion();
    }
  };

  return (
    <div className="border-t border-gray-700 pt-6">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <CheckSquare size={18} className="mr-2 text-indigo-400" />
        Acceptance Criteria
      </h3>

      <div className="space-y-3">
        {(task.acceptanceCriteria || []).length > 0 ? (
          (task.acceptanceCriteria || []).map((criterion, index) => (
            <div key={index} className="flex items-start gap-2 group">
              <button
                onClick={() => handleToggleCriterion(index)}
                className={`mt-1 flex-shrink-0 w-5 h-5 rounded border ${
                  criterion.completed
                    ? "bg-indigo-500 border-indigo-600 text-white"
                    : "border-gray-600 hover:border-indigo-500"
                } flex items-center justify-center transition-colors`}
              >
                {criterion.completed && <CheckSquare size={12} />}
              </button>

              <input
                type="text"
                value={criterion.text}
                onChange={(e) => handleEditCriterion(index, e.target.value)}
                className={`flex-grow bg-transparent border-b border-transparent hover:border-gray-700 focus:border-indigo-500 px-1 py-0.5 focus:outline-none transition-colors ${
                  criterion.completed ? "line-through text-gray-500" : ""
                }`}
              />

              <button
                onClick={() => handleRemoveCriterion(index)}
                className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-sm bg-gray-800/50 rounded-lg p-4 border border-gray-700 border-dashed">
            No acceptance criteria defined. Add criteria to clarify when this
            task is complete.
          </div>
        )}

        {/* Add new criterion */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex-grow relative">
            <input
              type="text"
              value={newCriterion}
              onChange={(e) => setNewCriterion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add new acceptance criterion..."
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={handleAddCriterion}
            disabled={!newCriterion.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-500 rounded-md p-2 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
