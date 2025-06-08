"use client";

import KanbanBoard from "@/components/Kanban/KanbanBoard";
import {
  useListStoriesQuery,
  useUpdateStoryMutation,
} from "@/store/slices/stories/storiesApiSlice";

const StoriesPage = () => {
  const { data: stories, isLoading, isError, error } = useListStoriesQuery();
  const [updateStory] = useUpdateStoryMutation();

  const handleStoryUpdate = async (storyId, updatedData) => {
    try {
      await updateStory({ storyId, updates: updatedData });
    } catch (error) {
      console.error("Failed to update story:", error);
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
        <p>Error loading stories: {error?.message || "An error occurred"}</p>
      </div>
    );
  }
  console.log("stories101", stories);
  return (
    <KanbanBoard
      tasks={stories?.stories || []}
      onTaskUpdate={handleStoryUpdate}
      showPriority={false}
    />
  );
};

export default StoriesPage;
