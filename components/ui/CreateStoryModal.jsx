"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Plus, FileText, Paperclip, CheckSquare, Users } from "lucide-react";
import { useTask } from "@/context/TaskContext";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import {
  TASK_TAGS,
  TASK_STATUSES,
  SAMPLE_USERS,
  customSelectStyles,
  modalAnimations,
} from "./constants/taskModal";

const MotionSelect = motion(Select);

export const CreateStoryModal = ({ isOpen, onClose }) => {
  const { createTask } = useTask();
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "Story",
    tags: [],
    status: TASK_STATUSES[0],
    storyPoints: "",
    sprint: "",
    assignees: [],
    blockedBy: [],
    acceptanceCriteria: [],
    description: "",
    attachments: [],
  });

  const [newCriterion, setNewCriterion] = useState("");
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    createTask({
      ...formData,
      tags: formData.tags.map((tag) => tag.value),
      status: formData.status.value,
      assignees: formData.assignees.map((user) => user.value),
    });
    onClose();
  };

  const handleAddCriterion = () => {
    if (newCriterion.trim()) {
      setFormData((prev) => ({
        ...prev,
        acceptanceCriteria: [
          ...prev.acceptanceCriteria,
          { text: newCriterion, completed: false },
        ],
      }));
      setNewCriterion("");
    }
  };

  const handleRemoveCriterion = (index) => {
    setFormData((prev) => ({
      ...prev,
      acceptanceCriteria: prev.acceptanceCriteria.filter((_, i) => i !== index),
    }));
  };

  const handleFileUpload = (files) => {
    const newAttachments = Array.from(files).map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, ...newAttachments],
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingFile(false);
    handleFileUpload(e.dataTransfer.files);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      {...modalAnimations.overlay}
      className="bg-black/60 flex items-center justify-center overflow-y-auto p-4"
    >
      <motion.div
        ref={modalRef}
        {...modalAnimations.content}
        className="bg-gray-900 rounded-xl shadow-xl border border-gray-700 w-full max-w-3xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <motion.h2
            {...modalAnimations.title}
            className="text-xl font-semibold"
          >
            Create New Story
          </motion.h2>
          <motion.button
            {...modalAnimations.closeButton}
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <X size={20} />
          </motion.button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Basic Info Section */}
            <motion.div
              {...modalAnimations.section}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter story title..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Tags
                </label>
                <MotionSelect
                  isMulti
                  options={TASK_TAGS}
                  value={formData.tags}
                  onChange={(selected) =>
                    setFormData((prev) => ({ ...prev, tags: selected || [] }))
                  }
                  styles={customSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select tags..."
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Status
                </label>
                <Select
                  options={TASK_STATUSES}
                  value={formData.status}
                  onChange={(selected) =>
                    setFormData((prev) => ({ ...prev, status: selected }))
                  }
                  styles={customSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>

              {/* Assignees */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Assignees
                </label>
                <Select
                  isMulti
                  options={SAMPLE_USERS}
                  value={formData.assignees}
                  onChange={(selected) =>
                    setFormData((prev) => ({
                      ...prev,
                      assignees: selected || [],
                    }))
                  }
                  styles={customSelectStyles}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  placeholder="Select assignees..."
                  formatOptionLabel={({ label, avatar }) => (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs">
                        {avatar}
                      </div>
                      <span>{label}</span>
                    </div>
                  )}
                />
              </div>

              {/* Story Points & Sprint */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Story Points
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.storyPoints}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        storyPoints: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Sprint
                  </label>
                  <input
                    type="text"
                    placeholder="Sprint name or number"
                    value={formData.sprint}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        sprint: e.target.value,
                      }))
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>

            {/* Acceptance Criteria Section */}
            <motion.div
              {...modalAnimations.section}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium flex items-center">
                <CheckSquare size={18} className="mr-2 text-indigo-400" />
                Acceptance Criteria
              </h3>

              <div className="space-y-3">
                {formData.acceptanceCriteria.map((criterion, index) => (
                  <div key={index} className="flex items-center gap-2 group">
                    <input
                      type="text"
                      value={criterion.text}
                      onChange={(e) => {
                        const newCriteria = [...formData.acceptanceCriteria];
                        newCriteria[index].text = e.target.value;
                        setFormData((prev) => ({
                          ...prev,
                          acceptanceCriteria: newCriteria,
                        }));
                      }}
                      className="flex-grow bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                    <motion.button
                      {...modalAnimations.button}
                      type="button"
                      onClick={() => handleRemoveCriterion(index)}
                      className="text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </motion.button>
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCriterion}
                    onChange={(e) => setNewCriterion(e.target.value)}
                    placeholder="Add new acceptance criterion..."
                    className="flex-grow bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddCriterion();
                      }
                    }}
                  />
                  <motion.button
                    {...modalAnimations.button}
                    type="button"
                    onClick={handleAddCriterion}
                    disabled={!newCriterion.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-500 rounded-lg p-2 transition-colors"
                  >
                    <Plus size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Description Section */}
            <motion.div
              {...modalAnimations.section}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium flex items-center">
                <FileText size={18} className="mr-2 text-indigo-400" />
                Description
              </h3>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Add a detailed description... (Supports Markdown)"
                rows={6}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </motion.div>

            {/* Attachments Section */}
            <motion.div
              {...modalAnimations.section}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-medium flex items-center">
                <Paperclip size={18} className="mr-2 text-indigo-400" />
                Attachments
              </h3>

              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  isDraggingFile
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-gray-700 hover:border-gray-600"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileUpload(e.target.files)}
                />
                <Paperclip size={24} className="mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-400">
                  Drag & drop files here or{" "}
                  <span className="text-indigo-400">browse</span>
                </p>
              </div>

              {formData.attachments.length > 0 && (
                <div className="space-y-2">
                  {formData.attachments.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-gray-800 rounded-lg p-3"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText size={20} className="text-gray-400" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                      <motion.button
                        {...modalAnimations.button}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            attachments: prev.attachments.filter(
                              (f) => f.id !== file.id
                            ),
                          }))
                        }
                        className="text-gray-500 hover:text-red-400"
                      >
                        <X size={16} />
                      </motion.button>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            {...modalAnimations.section}
            transition={{ delay: 0.5 }}
            className="border-t border-gray-700 p-6 flex justify-end gap-3"
          >
            <motion.button
              {...modalAnimations.button}
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              {...modalAnimations.button}
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Create Story
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};
