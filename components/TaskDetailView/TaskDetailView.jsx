"use client";
import React, { useRef, useEffect } from "react";
import { X } from "lucide-react";
import { useTask } from "../../context/TaskContext";
import { HeaderSection } from "./sections/HeaderSection";
import { DependencySection } from "./sections/DependencySection";
import { AcceptanceCriteriaSection } from "./sections/AcceptanceCriteriaSection";
import { DescriptionSection } from "./sections/DescriptionSection";
import { CommentsSection } from "./sections/CommentsSection";
import { AttachmentsSection } from "./sections/AttachmentsSection";

export const TaskDetailView = ({ taskId, onClose }) => {
  const detailRef = useRef(null);

  useEffect(() => {
    // Handle escape key press to close the modal
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Handle clicking outside to close
    const handleClickOutside = (e) => {
      if (detailRef.current && !detailRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  if (!task) return null;

  return (
    <div className="bg-black/60 flex items-center justify-center overflow-hidden">
      <div
        ref={detailRef}
        className="bg-gray-900 rounded-lg shadow-xl border border-gray-700 w-full max-w-4xl max-h-[90vh] flex flex-col transition-all duration-300 animate-slideIn"
      >
        {/* Close button */}
        {/* <button
          onClick={onClose}
          className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white transition-colors z-10"
        >
          <X size={20} />
        </button> */}

        {/* Task detail content with scrolling */}
        <div className="flex-grow overflow-y-auto custom-scrollbar">
          <div className="p-6 space-y-6">
            <HeaderSection taskId={taskId} />
            <DependencySection taskId={taskId} />
            <AcceptanceCriteriaSection taskId={taskId} />
            <DescriptionSection taskId={taskId} />
            <CommentsSection taskId={taskId} />
            <AttachmentsSection taskId={taskId} />
          </div>
        </div>
      </div>
    </div>
  );
};
