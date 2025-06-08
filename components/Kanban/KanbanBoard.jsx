"use client";

import { useState, useEffect } from "react";
import { KanbanColumn } from "./KanbanColumn";
import { TaskCard } from "./TaskCard";
import { CreateTaskModal } from "@/components/ui/CreateTaskModal";
import Modal from "../ui/Modal/Modal";
import { TaskDetailView } from "@/components/TaskDetailView/TaskDetailView";

const columnDefinitions = [
  {
    id: "todo",
    title: "Todo",
    color: "from-slate-500 to-slate-600",
  },
  {
    id: "in-progress",
    title: "In Progress",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: "review",
    title: "Review",
    color: "from-purple-500 to-violet-500",
  },
  {
    id: "done",
    title: "Done",
    color: "from-emerald-500 to-green-500",
  },
];

export default function KanbanBoard({
  tasks = [],
  onTaskUpdate,
  showPriority = true,
}) {
  const [columns, setColumns] = useState([]);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedColumnId, setSelectedColumnId] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  useEffect(() => {
    // Initialize columns with tasks organized by status
    const organizedColumns = columnDefinitions.map((column) => ({
      ...column,
      tasks: tasks.filter(
        (task) => (task.status || "todo").toLowerCase() === column.id
      ),
    }));
    setColumns(organizedColumns);
  }, [tasks]);

  const handleDragStart = (task, columnId) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (targetColumnId) => {
    if (!draggedTask || !draggedFrom || draggedFrom === targetColumnId) {
      setDraggedTask(null);
      setDraggedFrom(null);
      return;
    }

    console.log("draggedTask", draggedTask);
    console.log("draggedFrom", draggedFrom);
    console.log("targetColumnId", targetColumnId);

    try {
      // If onTaskUpdate prop exists, call it
      if (onTaskUpdate) {
        onTaskUpdate(draggedTask.id, { status: targetColumnId });
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
              tasks: [
                ...column.tasks,
                { ...draggedTask, status: targetColumnId },
              ],
            };
          }
          return column;
        });
        return newColumns;
      });
    } catch (error) {
      console.error("Failed to update task status:", error);
      // You might want to show an error toast/notification here
    }

    setDraggedTask(null);
    setDraggedFrom(null);
  };

  const handleAddTask = (columnId) => {
    setSelectedColumnId(columnId);
    setIsCreateModalOpen(true);
  };

  const handleTaskClick = (task) => {
    setSelectedTaskId(task.id);
  };

  return (
    <>
      <div className="flex gap-3 overflow-x-auto p-6">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
            onAddTask={() => handleAddTask(column.id)}
          >
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDragStart={() => handleDragStart(task, column.id)}
                showPriority={showPriority}
                onTitleClick={handleTaskClick}
              />
            ))}
          </KanbanColumn>
        ))}
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        showCross={false}
        className="bg-gray-900"
        width="w-full max-w-3xl"
        padding=""
        onClose={() => setIsCreateModalOpen(false)}
      >
        <CreateTaskModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {selectedTaskId && (
        <Modal
          isOpen={true}
          showCross={true}
          className="p-0"
          width="w-full"
          padding=""
          onClose={() => setSelectedTaskId(null)}
        >
          <TaskDetailView
            taskId={selectedTaskId}
            onClose={() => setSelectedTaskId(null)}
          />
        </Modal>
      )}
    </>
  );
}
