"use client";

import { useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";

const initialData = [
  {
    id: "backlog",
    title: "Backlog",
    color: "from-slate-500 to-slate-600",
    tasks: [
      {
        id: "1",
        title: "Design System Updates",
        description: "Update the design system with new components and tokens",
        priority: "medium",
        assignee: "Sarah Chen",
        tags: ["Design", "UI/UX"],
      },
      {
        id: "2",
        title: "API Documentation",
        description: "Write comprehensive API documentation for v2.0",
        priority: "low",
        assignee: "Mike Johnson",
        tags: ["Documentation", "Backend"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "from-amber-500 to-orange-500",
    tasks: [
      {
        id: "3",
        title: "User Authentication",
        description: "Implement OAuth 2.0 authentication flow",
        priority: "high",
        assignee: "Alex Rivera",
        tags: ["Backend", "Security"],
      },
      {
        id: "4",
        title: "Dashboard Analytics",
        description: "Build real-time analytics dashboard",
        priority: "medium",
        assignee: "Emma Davis",
        tags: ["Frontend", "Analytics"],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    color: "from-purple-500 to-violet-500",
    tasks: [
      {
        id: "5",
        title: "Mobile Responsiveness",
        description: "Ensure all components work on mobile devices",
        priority: "high",
        assignee: "David Kim",
        tags: ["Frontend", "Mobile"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    color: "from-emerald-500 to-green-500",
    tasks: [
      {
        id: "6",
        title: "Project Setup",
        description: "Initialize project structure and dependencies",
        priority: "high",
        assignee: "Sarah Chen",
        tags: ["Setup", "DevOps"],
      },
      {
        id: "7",
        title: "Database Schema",
        description: "Design and implement database schema",
        priority: "medium",
        assignee: "Mike Johnson",
        tags: ["Database", "Backend"],
      },
    ],
  },
];

export function KanbanBoard() {
  const [columns, setColumns] = useState(initialData);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);

  const handleDragStart = (task, columnId) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetColumnId) => {
    if (!draggedTask || !draggedFrom || draggedFrom === targetColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }

    setColumns((prevColumns) => {
      const newColumns = prevColumns.map((column) => {
        if (column.id === draggedFrom) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== draggedTask.id),
          };
        }
        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...column.tasks, draggedTask],
          };
        }
        return column;
      });
      return newColumns;
    });

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const addNewTask = (columnId) => {
    const newTask = {
      id: Date.now().toString(),
      title: "New Task",
      description: "Click to edit this task",
      priority: "medium",
      tags: [],
    };

    setColumns((prevColumns) =>
      prevColumns.map((column) =>
        column.id === columnId
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
    );
  };

  return (
    <div className="flex gap-3 overflow-x-auto p-6">
      {columns.map((column) => (
        <KanbanColumn
          key={column.id}
          column={column}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(column.id)}
          onAddTask={() => addNewTask(column.id)}
        >
          {column.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={() => handleDragStart(task, column.id)}
            />
          ))}
        </KanbanColumn>
      ))}
    </div>
  );
}
