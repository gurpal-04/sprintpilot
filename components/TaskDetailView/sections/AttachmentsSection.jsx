import React, { useState, useRef } from "react";
import {
  Paperclip,
  File,
  FileText,
  Image,
  Film,
  Upload,
  X,
} from "lucide-react";
import { useTask } from "../../../context/TaskContext";

export const AttachmentsSection = ({ taskId }) => {
  const { getTaskById, updateTask } = useTask();
  const task = getTaskById(taskId);
  const fileInputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);

  if (!task) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(files);
  };

  const handleFiles = (files) => {
    // Simulate file upload - in a real app you'd upload these to a server
    const newAttachments = files.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toISOString(),
      url: URL.createObjectURL(file), // This is temporary and only works for preview
    }));

    const updatedAttachments = [...(task.attachments || []), ...newAttachments];
    updateTask(taskId, { attachments: updatedAttachments });
  };

  const handleRemoveAttachment = (attachmentId) => {
    const updatedAttachments = (task.attachments || []).filter(
      (attachment) => attachment.id !== attachmentId
    );
    updateTask(taskId, { attachments: updatedAttachments });
  };

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return <Image size={20} className="text-blue-400" />;
    } else if (fileType.startsWith("video/")) {
      return <Film size={20} className="text-purple-400" />;
    } else if (fileType.includes("document") || fileType.includes("pdf")) {
      return <FileText size={20} className="text-red-400" />;
    } else {
      return <File size={20} className="text-gray-400" />;
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  return (
    <div className="border-t border-gray-700 pt-6 pb-4">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <Paperclip size={18} className="mr-2 text-indigo-400" />
        Attachments
      </h3>

      {/* File dropzone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${
          isDragging
            ? "border-indigo-400 bg-indigo-500/10"
            : "border-gray-700 hover:border-gray-500"
        }`}
      >
        <Upload size={24} className="text-gray-400 mb-2" />
        <p className="text-sm text-gray-400 mb-1">
          Drag files here or click to upload
        </p>
        <p className="text-xs text-gray-500">
          Supports all file types up to 10MB
        </p>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-4 text-sm bg-gray-800 hover:bg-gray-700 rounded-md px-4 py-2 transition-colors"
        >
          Select Files
        </button>
      </div>

      {/* Attachments list */}
      {(task.attachments || []).length > 0 && (
        <div className="mt-6 space-y-3">
          <h4 className="text-sm font-medium text-gray-400">Uploaded Files</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(task.attachments || []).map((attachment) => (
              <div
                key={attachment.id}
                className="bg-gray-800 rounded-lg p-3 border border-gray-700 flex items-center justify-between group"
              >
                <div className="flex items-center overflow-hidden">
                  {getFileIcon(attachment.type)}
                  <div className="ml-3 min-w-0">
                    <p className="text-sm truncate">{attachment.name}</p>
                    <p className="text-xs text-gray-400">
                      {formatFileSize(attachment.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={attachment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 p-1"
                  >
                    <FileText size={16} />
                  </a>

                  <button
                    onClick={() => handleRemoveAttachment(attachment.id)}
                    className="text-gray-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
