"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import Link from "next/link";

const SprintsPage = () => {
  const router = useRouter();

  const sprints = [
    {
      id: "sprint1",
      title: "Sprint 1",
      startDate: "2024-03-01",
      endDate: "2024-03-14",
      status: "In Progress",
      completedTasks: 8,
      totalTasks: 15,
    },
    {
      id: "sprint2",
      title: "Sprint 2",
      startDate: "2024-03-15",
      endDate: "2024-03-28",
      status: "Planned",
      completedTasks: 0,
      totalTasks: 12,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Sprints</h1>
          <p className="text-gray-400">Manage your project sprints and tasks</p>
        </div>
        <button
          onClick={() => {
            // Handle creating new sprint
            console.log("Create new sprint");
          }}
          className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Create Sprint
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sprints.map((sprint) => (
          <Link
            key={sprint.id}
            href={`/sprints/${sprint.id}`}
            className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-violet-500 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                {sprint.title}
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sprint.status === "In Progress"
                    ? "bg-cyan-600 text-white"
                    : "bg-gray-600 text-white"
                }`}
              >
                {sprint.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-400 mb-1">Duration</div>
                <div className="text-white">
                  {new Date(sprint.startDate).toLocaleDateString()} -{" "}
                  {new Date(sprint.endDate).toLocaleDateString()}
                </div>
              </div>

              <div>
                <div className="text-sm text-gray-400 mb-2">Progress</div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-violet-600 h-2.5 rounded-full"
                    style={{
                      width: `${
                        (sprint.completedTasks / sprint.totalTasks) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  {sprint.completedTasks} of {sprint.totalTasks} tasks completed
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SprintsPage;
