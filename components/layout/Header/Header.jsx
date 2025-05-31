import React, { useState, useEffect } from "react";
import { Search, Filter, X, Moon, Sun, Github } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Initialize dark mode based on user preference
  useEffect(() => {
    const userPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const savedMode = localStorage.getItem("darkMode");
    const initialDarkMode = savedMode ? savedMode === "true" : userPrefersDark;

    setIsDarkMode(initialDarkMode);
    applyDarkMode(initialDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    applyDarkMode(newMode);
  };

  const applyDarkMode = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="mr-2 text-primary-600 dark:text-primary-400"
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M21 14H14V21H21V14Z" fill="currentColor" opacity="0.7" />
              <path d="M3 14H10V21H3V14Z" fill="currentColor" opacity="0.4" />
              <path d="M3 3H10V10H3V3Z" fill="currentColor" opacity="0.7" />
              <path d="M14 3H21V10H14V3Z" fill="currentColor" opacity="0.4" />
            </svg>
          </motion.div>
          <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-300">
            Kanban Flow
          </h1>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tasks..."
              className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-2 rounded-md ${
                selectedPriority
                  ? "bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
              } hover:bg-gray-200 dark:hover:bg-gray-700`}
            >
              <Filter size={18} />
            </button>

            {isFilterOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
                <div className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Filter by priority
                </div>
                <button
                  onClick={() => {
                    setSelectedPriority(null);
                    setIsFilterOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedPriority === null
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  All
                </button>
                <button
                  onClick={() => {
                    setSelectedPriority("high");
                    setIsFilterOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedPriority === "high"
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  High Priority
                </button>
                <button
                  onClick={() => {
                    setSelectedPriority("medium");
                    setIsFilterOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedPriority === "medium"
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Medium Priority
                </button>
                <button
                  onClick={() => {
                    setSelectedPriority("low");
                    setIsFilterOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    selectedPriority === "low"
                      ? "bg-primary-50 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  Low Priority
                </button>
              </div>
            )}
          </div>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <a
            href="https://github.com/yourusername/kanban-board"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hidden sm:block"
            aria-label="GitHub repository"
          >
            <Github size={18} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
