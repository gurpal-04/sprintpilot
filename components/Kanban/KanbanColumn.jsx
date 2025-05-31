"use client";

import { Plus } from "lucide-react";

export function KanbanColumn({
  column,
  children,
  onDragOver,
  onDrop,
  onAddTask,
}) {
  return (
    <div className="flex-shrink-0 w-80">
      {/* <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl shadow-black/5"> */}
      {/* <div className="p-6 border-b border-slate-200/50"> */}
      {/* <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className={`w-3 h-3 rounded-full bg-gradient-to-r ${column.color}`}
              />
              <h3 className="font-semibold text-slate-800 text-lg">
                {column.title}
              </h3>
            </div>
            <div className="bg-slate-100 text-slate-600 text-sm font-medium px-2.5 py-1 rounded-full">
              {column.tasks.length}
            </div>
          </div> */}
      <div className=" bg-gray-50 dark:bg-gray-800 rounded-t-lg p-3 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="font-semibold text-gray-700 dark:text-gray-200">
          {column.title}
        </h2>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {column.tasks.length} tasks
          </span>
        </div>
      </div>

      {/* <button
          onClick={onAddTask}
          className="w-full justify-start text-slate-600 hover:text-slate-800 hover:bg-slate-100/50 border-2 border-dashed border-slate-200 hover:border-slate-300 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add task
        </button> */}
      {/* </div> */}

      <div
        // className="p-4 min-h-[400px] space-y-3"
        className="flex flex-col flex-1 bg-gray-50/70 dark:bg-gray-800/70 backdrop-blur-xs rounded-b-lg space-y-3 justify-between h-[calc(100vh-220px)]"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <div className="space-y-3 overflow-y-auto h-[calc(100vh-220px)] scrollbar-thin p-3">
          {children}
        </div>
        <div className="p-3 pt-0">
          <button
            onClick={onAddTask}
            className="w-full flex items-center justify-center py-2 px-4 bg-white/80 dark:bg-gray-700/80 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-300 transition-colors duration-200"
          >
            <Plus size={16} className="mr-1" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      {/* </div> */}
    </div>
  );
}
