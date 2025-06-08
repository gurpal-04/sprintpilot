"use client";

import React, { useState } from "react";
// import { Accordion } from "@/components/ui/accordion";
import EpicItem from "@/components/Epic/EpicItem";
import { useListEpicsQuery } from "@/store/slices/epics/epicApiSlice";

// Sample data for the epics
const sampleEpics = [
  {
    id: "1",
    title: "User Authentication System",
    status: "In Progress",
    storiesCount: 5,
    createdDate: "2024-01-15",
    description:
      "Implement comprehensive user authentication including login, registration, password reset, and multi-factor authentication.",
    stories: [
      "User registration flow",
      "Login functionality",
      "Password reset feature",
      "Multi-factor authentication",
      "Session management",
    ],
  },
  {
    id: "2",
    title: "Dashboard Analytics",
    status: "Draft",
    storiesCount: 8,
    createdDate: "2024-01-20",
    description:
      "Create advanced analytics dashboard with real-time data visualization and reporting capabilities.",
    stories: [
      "Real-time data charts",
      "Export functionality",
      "Custom report builder",
      "Data filtering system",
      "Performance metrics",
      "User activity tracking",
      "Mobile responsive design",
      "API integration",
    ],
  },
  {
    id: "3",
    title: "Mobile App Development",
    status: "Completed",
    storiesCount: 12,
    createdDate: "2023-12-10",
    description:
      "Develop cross-platform mobile application with native performance and seamless user experience.",
    stories: [
      "iOS app development",
      "Android app development",
      "Cross-platform testing",
      "Push notifications",
      "Offline functionality",
      "App store deployment",
      "User onboarding",
      "Performance optimization",
      "Security implementation",
      "Accessibility features",
      "App analytics",
      "Beta testing program",
    ],
  },
];

const EpicsList = ({ epics, isLoading, error }) => {
  const [activeEpic, setActiveEpic] = useState(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-violet-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">
          Error loading epics. Please try again later.
        </p>
      </div>
    );
  }

  if (epics.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">
          No epics found. Create your first epic to get started!
        </p>
      </div>
    );
  }
  console.log("epics", epics);
  return (
    <div className="space-y-4 max-h-[calc(100vh-230px)] overflow-y-auto">
      <div className="space-y-4">
        {epics.epics.length > 0 &&
          epics.epics.map((epic, index) => {
            console.log("activeEpic", activeEpic, epic);
            return (
              <EpicItem
                key={index}
                epic={epic}
                isActive={activeEpic === epic.id}
                onToggle={() =>
                  setActiveEpic(activeEpic === epic.id ? null : epic.id)
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default EpicsList;
