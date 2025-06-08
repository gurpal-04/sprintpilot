import KanbanBoard from "@/components/Kanban/KanbanBoard";

const Sprint1Page = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Sprint 1</h1>
      <KanbanBoard sprintId="sprint1" />
    </div>
  );
};

export default Sprint1Page;
