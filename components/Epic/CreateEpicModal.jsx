"use client";

import React, { useState } from "react";
import Modal from "@/components/ui/Modal/Modal";
import {
  useCreateEpicMutation,
  useDecomposeEpicMutation,
} from "@/store/slices/epics/epicApiSlice";
import { motion } from "framer-motion";

const modalAnimations = {
  section: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
};

const CreateEpicModal = ({ isOpen, onClose, refetch }) => {
  const [createEpic] = useCreateEpicMutation();
  const [decomposeEpic] = useDecomposeEpicMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Draft", // Default status
    storiesCount: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEpic(formData).unwrap();
      onClose();
      refetch();
      // Reset form
      setFormData({
        title: "",
        description: "",
        status: "Draft",
        storiesCount: 0,
      });
    } catch (error) {
      console.error("Failed to create epic:", error);
    }
  };

  const handleCreateAndDecompose = async (e) => {
    e.preventDefault();
    try {
      await decomposeEpic({
        title: formData.title,
        description: formData.description,
      }).unwrap();
      onClose();
      refetch();
      // Reset form
      setFormData({
        title: "",
        description: "",
        status: "Draft",
        storiesCount: 0,
      });
    } catch (error) {
      console.error("Failed to create and decompose epic:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="max-w-2xl"
      className="bg-gray-900 text-gray-100"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold text-white">Create New Epic</h2>
          <p className="text-gray-400 mt-1">
            Add a new epic to organize your project stories
          </p>
        </div>

        {/* Title Section */}
        <motion.div {...modalAnimations.section} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Enter epic title"
            />
          </div>
        </motion.div>

        {/* Description Section */}
        <motion.div
          {...modalAnimations.section}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              rows={4}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              placeholder="Describe the epic and its goals"
            />
          </div>
        </motion.div>

        {/* Status Section */}
        <motion.div
          {...modalAnimations.section}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            >
              <option value="Draft">Draft</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </motion.div>

        {/* Submit Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleCreateAndDecompose}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
          >
            Create & Decompose
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
          >
            Create Epic
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateEpicModal;
