"use client";

import { User, Calendar, Sparkles } from "lucide-react";
import { format } from "date-fns";

const priorityColors = {
  normal: {
    bg: "bg-gradient-to-r from-emerald-950/40 to-emerald-900/40",
    text: "text-emerald-400",
    border: "border-emerald-800",
    glow: "shadow-emerald-950/20",
  },
  high: {
    bg: "bg-gradient-to-r from-amber-950/40 to-amber-900/40",
    text: "text-amber-400",
    border: "border-amber-800",
    glow: "shadow-amber-950/20",
  },
  urgent: {
    bg: "bg-gradient-to-r from-red-950/40 to-red-900/40",
    text: "text-red-400",
    border: "border-red-800",
    glow: "shadow-red-950/20",
  },
};

const priorityIcons = {
  normal: "🟢",
  high: "🟡",
  urgent: "🔴",
};

export function TaskCard({
  task,
  onDragStart,
  showPriority = true,
  onTitleClick,
}) {
  const displayAssignees = task.assignee?.slice(0, 3) || [];
  const extraAssignees =
    task.assignee?.length > 3 ? task.assignee.length - 3 : 0;
  const priorityStyle = priorityColors[task?.priority || "normal"];

  return (
    <div draggable onDragStart={onDragStart} className="group relative">
      <div
        className={`
        backdrop-blur-md bg-slate-900/50 rounded-xl 
        border border-slate-800/50 p-4 
        hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] 
        transition-all duration-300 ease-in-out 
        cursor-grab active:cursor-grabbing 
        hover:scale-[1.02] hover:-translate-y-0.5
        hover:bg-slate-900/60
        ${priorityStyle?.glow}
      `}
      >
        <div className="space-y-3.5">
          {/* Header section */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <h4
                onClick={(e) => {
                  e.stopPropagation();
                  onTitleClick?.(task);
                }}
                className="font-medium text-slate-100 text-sm leading-tight 
                group-hover:text-white transition-colors line-clamp-2
                cursor-pointer hover:text-blue-400"
              >
                {task.title}
              </h4>
            </div>

            {showPriority && (
              <div
                className={`
              shrink-0 px-2.5 py-1 rounded-full text-xs font-medium 
              border transition-colors duration-200
              ${priorityStyle?.bg} ${priorityStyle?.text} ${priorityStyle?.border}
              flex items-center gap-1.5
            `}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                {task?.priority || "normal"}
              </div>
            )}
          </div>

          {/* Sprint points */}
          {task.sprint_points && (
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-xs font-medium text-blue-300">
                {task.sprint_points}{" "}
                {task.sprint_points === 1 ? "point" : "points"}
              </span>
            </div>
          )}

          {/* Footer section */}
          <div className="flex items-center justify-between pt-2.5 border-t border-slate-700/50">
            {/* Assignees */}
            {displayAssignees?.length > 0 && (
              <div className="flex items-center gap-2 flex-1">
                <div className="flex -space-x-2">
                  {displayAssignees?.map((assignee, index) => (
                    <div
                      key={index}
                      className="w-7 h-7 rounded-full 
                        bg-gradient-to-br from-violet-600 to-violet-800
                        flex items-center justify-center ring-2 ring-slate-900
                        transition-transform hover:scale-110 hover:z-10
                        hover:ring-slate-700"
                      title={assignee}
                    >
                      <User className="w-3.5 h-3.5 text-violet-100" />
                    </div>
                  ))}
                  {extraAssignees > 0 && (
                    <div
                      className="w-7 h-7 rounded-full 
                      bg-gradient-to-br from-slate-700 to-slate-800
                      flex items-center justify-center text-xs font-medium 
                      text-slate-300 ring-2 ring-slate-900
                      transition-transform hover:scale-110 hover:z-10
                      hover:ring-slate-700"
                    >
                      +{extraAssignees}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Due date */}
            {task.due_date && (
              <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{format(new Date(task.due_date), "MMM d")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
