import React, { useState, useRef } from "react";
import { MessageSquare, Send, AtSign } from "lucide-react";
import { useTask } from "../../../context/TaskContext";
import { Avatar } from "../../ui/Avatar";

export const CommentsSection = ({ taskId }) => {
  const { getTaskById, updateTask } = useTask();
  const task = getTaskById(taskId);

  const [comment, setComment] = useState("");
  const [showMentions, setShowMentions] = useState(false);
  const textareaRef = useRef(null);

  // Sample team members for @mentions
  const teamMembers = [
    { id: "1", name: "Sarah Johnson" },
    { id: "2", name: "Mike Chen" },
    { id: "3", name: "Taylor Swift" },
    { id: "4", name: "Alex Wong" },
    { id: "5", name: "Maria Garcia" },
  ];

  if (!task) return null;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const handleAddComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now().toString(),
        author: "Current User",
        text: comment,
        timestamp: new Date().toISOString(),
        mentions: [],
      };

      const updatedComments = [...(task.comments || []), newComment];
      updateTask(taskId, { comments: updatedComments });
      setComment("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "@") {
      setShowMentions(true);
    } else if (e.key === "Escape") {
      setShowMentions(false);
    } else if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  const handleMention = (name) => {
    const textarea = textareaRef.current;
    if (textarea) {
      const currentPos = textarea.selectionStart;
      const textBeforeCursor = comment.substring(0, currentPos);
      const lastAtPos = textBeforeCursor.lastIndexOf("@");

      if (lastAtPos !== -1) {
        const newComment =
          comment.substring(0, lastAtPos) +
          "@" +
          name +
          " " +
          comment.substring(currentPos);

        setComment(newComment);

        // Set cursor position after the inserted mention
        setTimeout(() => {
          const newCursorPos = lastAtPos + name.length + 2; // +2 for @ and space
          textarea.focus();
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 0);
      }
    }

    setShowMentions(false);
  };

  return (
    <div className="border-t border-gray-700 pt-6">
      <h3 className="text-lg font-semibold flex items-center mb-4">
        <MessageSquare size={18} className="mr-2 text-indigo-400" />
        Comments
      </h3>

      {/* Comments list */}
      <div className="space-y-4 mb-6">
        {(task.comments || []).length > 0 ? (
          (task.comments || []).map((comment, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Avatar name={comment.author} size="sm" />
                  <span className="ml-2 font-medium">{comment.author}</span>
                </div>
                <span className="text-xs text-gray-400">
                  {formatTimestamp(comment.timestamp)}
                </span>
              </div>
              <div className="pl-8">
                <p className="text-sm whitespace-pre-wrap">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400 text-sm bg-gray-800/50 rounded-lg p-4 border border-gray-700 border-dashed">
            No comments yet. Be the first to comment on this task.
          </div>
        )}
      </div>

      {/* Add comment */}
      <div className="relative">
        <div className="bg-gray-800 rounded-lg border border-gray-700 focus-within:border-indigo-500 transition-colors">
          <textarea
            ref={textareaRef}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment... (use @ to mention someone)"
            rows={3}
            className="w-full bg-transparent p-3 focus:outline-none resize-none"
          />

          {/* Mentions dropdown */}
          {showMentions && (
            <div className="absolute left-4 bottom-full mb-2 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
              <div className="p-2 text-sm font-medium text-gray-400 border-b border-gray-700 flex items-center">
                <AtSign size={14} className="mr-1" />
                Mention someone
              </div>
              <ul className="max-h-48 overflow-y-auto custom-scrollbar">
                {teamMembers.map((member) => (
                  <li
                    key={member.id}
                    onClick={() => handleMention(member.name)}
                    className="px-3 py-2 hover:bg-gray-700 cursor-pointer text-sm flex items-center"
                  >
                    <Avatar name={member.name} size="xs" />
                    <span className="ml-2">{member.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-between p-2 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              <span className="flex items-center">
                <AtSign size={12} className="mr-1" /> mention with @
              </span>
            </div>
            <button
              onClick={handleAddComment}
              disabled={!comment.trim()}
              className="flex items-center gap-1 text-sm bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:text-gray-500 rounded-md px-3 py-1 transition-colors"
            >
              <Send size={14} />
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
