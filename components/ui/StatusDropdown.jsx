import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export const StatusDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const statuses = [
    { value: "To Do", color: "bg-gray-500" },
    { value: "In Progress", color: "bg-yellow-500" },
    { value: "In Review", color: "bg-blue-500" },
    { value: "Done", color: "bg-green-500" },
  ];

  const currentStatus =
    statuses.find((status) => status.value === value) || statuses[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between bg-gray-700 rounded px-3 py-1.5 text-left focus:outline-none focus:ring-1 focus:ring-indigo-500"
      >
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${currentStatus.color}`} />
          <span>{currentStatus.value}</span>
        </div>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => {
                onChange(status.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center px-3 py-2 hover:bg-gray-700 text-left transition-colors ${
                status.value === value ? "bg-gray-700" : ""
              }`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${status.color}`} />
              <span>{status.value}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
