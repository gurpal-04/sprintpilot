"use client";

import React, { useState } from "react";
import { Plus } from "lucide-react";
import Button from "../ui/Button/Button";
import CreateEpicModal from "./CreateEpicModal";

const EpicsHeader = ({ refetch }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateEpic = () => {
    setIsCreateModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Epics</h1>
          <p className="text-gray-400">Manage your project epics and stories</p>
        </div>
        <Button
          onClick={handleCreateEpic}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Create Epic
        </Button>
      </div>

      <CreateEpicModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        refetch={refetch}
      />
    </>
  );
};

export default EpicsHeader;
