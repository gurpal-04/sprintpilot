"use client";

import { User } from "lucide-react";

const priorityColors = {
  low: "bg-emerald-100 text-emerald-700 border-emerald-200",
  medium: "bg-amber-100 text-amber-700 border-amber-200",
  high: "bg-red-100 text-red-700 border-red-200",
};

const priorityIcons = {
  low: "🟢",
  medium: "🟡",
  high: "🔴",
};

export function TaskCard({ task, onDragStart }) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white rounded-xl border border-slate-200/50 p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing hover:scale-[1.02] group"
    >
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <h4 className="font-semibold text-slate-800 text-sm leading-tight group-hover:text-slate-900 transition-colors">
            {task.title}
          </h4>
          <div
            className={`px-2 py-1 rounded-md text-xs font-medium border ${
              priorityColors[task.priority]
            }`}
          >
            {priorityIcons[task.priority]} {task.priority}
          </div>
        </div>

        <p className="text-slate-600 text-sm leading-relaxed">
          {task.description}
        </p>

        {task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {task.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium hover:bg-slate-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {task.assignee && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
            <div className="w-6 h-6 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-white" />
            </div>
            <span className="text-slate-600 text-xs font-medium">
              {task.assignee}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
