"use client";
import KanbanBoard from "@/components/Kanban/KanbanBoard";
import { TaskDetailView } from "@/components/TaskDetailView/TaskDetailView";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
} from "@/store/slices/tasks/tasksApiSlice";

const TasksPage = () => {
  const { data: tasks, isLoading, isError, error } = useGetTasksQuery();
  const [updateTask] = useUpdateTaskMutation();

  const handleTaskUpdate = async (taskId, updatedData) => {
    try {
      await updateTask({ taskId, taskData: updatedData });
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        <p>Error loading tasks: {error?.message || "An error occurred"}</p>
      </div>
    );
  }

  return <KanbanBoard tasks={tasks || []} onTaskUpdate={handleTaskUpdate} />;
  //   return <TaskDetailView taskId="1" />;
};

export default TasksPage;
