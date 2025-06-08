import React from "react";
import { Link, AlertCircle, Plus } from "lucide-react";
import { useTask } from "../../../context/TaskContext";
import { Badge } from "@/components/ui/badge";

export const DependencySection = ({ taskId }) => {
  const { getTaskById, getAllTasks, updateTask } = useTask();
  const task = getTaskById(taskId);
  const allTasks = getAllTasks();

  if (!task) return null;

  const blockedByTasks = (task.blockedBy || [])
    .map((id) => allTasks.find((t) => t.id === id))
    .filter(Boolean);

  const availableTasks = allTasks.filter(
    (t) => t.id !== taskId && !(task.blockedBy || []).includes(t.id)
  );

  const handleRemoveDependency = (dependencyId) => {
    const updatedBlockedBy = (task.blockedBy || []).filter(
      (id) => id !== dependencyId
    );
    updateTask(taskId, { blockedBy: updatedBlockedBy });
  };

  const handleAddDependency = (dependencyId) => {
    const updatedBlockedBy = [...(task.blockedBy || []), dependencyId];
    updateTask(taskId, { blockedBy: updatedBlockedBy });
  };

  return (
    <div className="border-t border-gray-700 pt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <Link size={18} className="mr-2 text-indigo-400" />
          Dependencies
        </h3>
        <div className="relative group">
          <button className="flex items-center gap-1 text-sm bg-indigo-600 hover:bg-indigo-700 rounded-md px-3 py-1.5 transition-colors">
            <Plus size={16} />
            Add Dependency
          </button>

          {availableTasks.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10 hidden group-hover:block">
              <div className="p-2 text-sm text-gray-400">Select a task:</div>
              <ul className="max-h-48 overflow-y-auto custom-scrollbar">
                {availableTasks.map((availableTask) => (
                  <li
                    key={availableTask.id}
                    onClick={() => handleAddDependency(availableTask.id)}
                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm"
                  >
                    {availableTask.title}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {blockedByTasks.length > 0 ? (
        <div className="space-y-3">
          {blockedByTasks.map((dependency) => (
            <div
              key={dependency?.id}
              className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex justify-between items-center"
            >
              <div className="flex items-center">
                {dependency?.status === "In Progress" && (
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                )}
                {dependency?.status === "Done" && (
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                )}
                {dependency?.status === "To Do" && (
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-2" />
                )}
                {dependency?.status === "In Review" && (
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
                )}
                <span className="text-sm">{dependency?.title}</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  color={
                    dependency?.status === "In Progress"
                      ? "yellow"
                      : dependency?.status === "Done"
                      ? "green"
                      : dependency?.status === "In Review"
                      ? "blue"
                      : "gray"
                  }
                >
                  {dependency?.status || "To Do"}
                </Badge>
                {dependency?.status !== "Done" && (
                  <AlertCircle size={16} className="text-yellow-500" />
                )}
                <button
                  onClick={() => handleRemoveDependency(dependency?.id)}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-400 text-sm bg-gray-800/50 rounded-lg p-4 border border-gray-700 border-dashed">
          No dependencies. This task is not blocked by any other tasks.
        </div>
      )}
    </div>
  );
};
