import React, { createContext, useContext, useState } from "react";

// Sample initial data
const initialTasks = [
  {
    id: "1",
    title: "Implement User Authentication",
    type: "Story",
    status: "In Progress",
    priority: "High",
    storyPoints: 8,
    assignees: ["Sarah Johnson"],
    dueDate: "2025-03-15",
    description:
      "# Authentication System\n\nImplement user authentication using JWT tokens with the following features:\n\n- Login form with validation\n- Registration form\n- Password reset flow\n- Email verification\n- OAuth integration with Google and GitHub",
    acceptanceCriteria: [
      { text: "User can log in with email and password", completed: true },
      { text: "User can register a new account", completed: true },
      { text: "User can reset their password", completed: false },
      { text: "User can log in with Google account", completed: false },
      { text: "User can log in with GitHub account", completed: false },
    ],
    blockedBy: [],
    comments: [
      {
        id: "1",
        author: "Mike Chen",
        text: "I would recommend using Firebase Auth for this, it will save us a lot of time.",
        timestamp: "2025-01-15T14:23:54Z",
        mentions: [],
      },
      {
        id: "2",
        author: "Sarah Johnson",
        text: "Good idea @Mike Chen. I'll look into Firebase Auth implementation.",
        timestamp: "2025-01-15T15:12:31Z",
        mentions: ["Mike Chen"],
      },
    ],
    attachments: [
      {
        id: "1",
        name: "auth-flow-diagram.png",
        size: 1534092,
        type: "image/png",
        uploadDate: "2025-01-14T09:32:12Z",
        url: "https://via.placeholder.com/800x600",
      },
    ],
  },
  {
    id: "2",
    title: "Create Dashboard UI Components",
    type: "Task",
    status: "To Do",
    priority: "Medium",
    storyPoints: 5,
    assignees: ["Alex Wong"],
    dueDate: "2025-03-10",
    description:
      "Design and implement reusable UI components for the dashboard including:\n\n- Charts (line, bar, pie)\n- Data tables with sorting and filtering\n- Card components with various layouts\n- Stat summary widgets",
    acceptanceCriteria: [
      { text: "All components follow the design system", completed: false },
      {
        text: "Components are responsive and work on mobile",
        completed: false,
      },
      {
        text: "Storybook documentation is created for each component",
        completed: false,
      },
    ],
    blockedBy: ["1"],
    comments: [],
    attachments: [],
  },
  {
    id: "3",
    title: "API Integration for Analytics Data",
    type: "Story",
    status: "To Do",
    priority: "High",
    storyPoints: 13,
    assignees: ["Maria Garcia"],
    description:
      "Implement API integration with our analytics service to fetch and display real-time data on the dashboard.",
    acceptanceCriteria: [
      {
        text: "Data is automatically refreshed every 5 minutes",
        completed: false,
      },
      { text: "Error states are handled gracefully", completed: false },
      { text: "Loading states show appropriate UI feedback", completed: false },
    ],
    blockedBy: ["2"],
    comments: [],
    attachments: [],
  },
  {
    id: "4",
    title: "Write E2E Tests for User Flow",
    type: "Task",
    status: "Done",
    priority: "Low",
    storyPoints: 3,
    assignees: ["Taylor Swift"],
    description:
      "Create end-to-end tests using Cypress to ensure the main user flows work correctly.",
    acceptanceCriteria: [
      {
        text: "Tests cover login, registration, and dashboard navigation",
        completed: true,
      },
      { text: "Tests are integrated into the CI pipeline", completed: true },
    ],
    blockedBy: [],
    comments: [],
    attachments: [],
  },
  {
    id: "5",
    title: "Optimize Bundle Size",
    type: "Task",
    status: "In Review",
    priority: "Medium",
    storyPoints: 3,
    assignees: ["Mike Chen"],
    description:
      "Analyze and optimize the application bundle size to improve loading performance.",
    acceptanceCriteria: [
      { text: "Bundle size is reduced by at least 20%", completed: true },
      {
        text: "Initial load time is under 2 seconds on 3G connection",
        completed: false,
      },
    ],
    blockedBy: [],
    comments: [],
    attachments: [],
  },
];

const TaskContext = createContext(undefined);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState(initialTasks);

  const getAllTasks = () => tasks;

  const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const updateTask = (id, updates) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const createTask = (task) => {
    const newTask = {
      id: Date.now().toString(),
      ...task,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        getAllTasks,
        getTaskById,
        updateTask,
        createTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};
