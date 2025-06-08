"use client";
import { KanbanBoard } from "@/components/Kanban/KanbanBoard";

// const EpicsPage = () => {
//   return <KanbanBoard />;
// };

// export default EpicsPage;
import React from "react";
import EpicsHeader from "@/components/Epic/EpicsHeader";
import EpicsList from "@/components/Epic/EpicsList";
import { useListEpicsQuery } from "@/store/slices/epics/epicApiSlice";

const Index = () => {
  const {
    data: epics = [],
    isLoading,
    error,
    refetch,
  } = useListEpicsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  console.log("epics101", epics);
  return (
    <div className="bg-gray-900 text-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <EpicsHeader refetch={refetch} />
        <EpicsList
          epics={epics}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default Index;
