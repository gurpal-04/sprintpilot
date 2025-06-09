import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Plus,
  Users,
  Code,
  Briefcase,
  Star,
} from "lucide-react";
import DeveloperCard from "./DeveloperCard";
import AddEditDeveloperModal from "./AddEditDeveloperModal";
import {
  useGetAllDevelopersQuery,
  useCreateDeveloperMutation,
  useUpdateDeveloperMutation,
  useDeleteDeveloperMutation,
} from "../../store/slices/developers/developersApiSlice";

const DevelopersView = () => {
  const {
    data: developers = [],
    isLoading,
    error,
    refetch,
  } = useGetAllDevelopersQuery();
  const [createDeveloper] = useCreateDeveloperMutation();
  const [updateDeveloper] = useUpdateDeveloperMutation();
  const [deleteDeveloper] = useDeleteDeveloperMutation();

  const [filters, setFilters] = useState({
    search: "",
    designation: "",
    experienceLevel: "",
    skills: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState(null);

  // Get unique values for filter dropdowns
  const uniqueDesignations = useMemo(
    () => [...new Set(developers.map((dev) => dev.designation))].sort(),
    [developers]
  );

  const experienceLevels = ["Junior", "Mid", "Senior", "Lead"];

  const allSkills = useMemo(
    () => [...new Set(developers.flatMap((dev) => dev.skills))].sort(),
    [developers]
  );

  // Filter developers based on current filters
  const filteredDevelopers = useMemo(() => {
    return developers.filter((developer) => {
      const matchesSearch =
        filters.search === "" ||
        developer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        developer.email.toLowerCase().includes(filters.search.toLowerCase()) ||
        developer.designation
          .toLowerCase()
          .includes(filters.search.toLowerCase());

      const matchesDesignation =
        filters.designation === "" ||
        developer.designation === filters.designation;

      const matchesExperience =
        filters.experienceLevel === "" ||
        developer.experienceLevel === filters.experienceLevel;

      const matchesSkills =
        filters.skills.length === 0 ||
        filters.skills.every((skill) => developer.skills.includes(skill));

      return (
        matchesSearch &&
        matchesDesignation &&
        matchesExperience &&
        matchesSkills
      );
    });
  }, [developers, filters]);

  const handleAddDeveloper = async (developerData) => {
    try {
      await createDeveloper(developerData).unwrap();
      await refetch();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to create developer:", err);
      // Handle error (show toast notification, etc.)
    }
  };

  const handleEditDeveloper = async (developerData) => {
    if (editingDeveloper) {
      try {
        await updateDeveloper({
          id: editingDeveloper.id,
          ...developerData,
        }).unwrap();
        await refetch();
        setEditingDeveloper(null);
        setIsModalOpen(false);
      } catch (err) {
        console.error("Failed to update developer:", err);
        // Handle error
      }
    }
  };

  const handleDeleteDeveloper = async (id) => {
    if (window.confirm("Are you sure you want to delete this developer?")) {
      try {
        await deleteDeveloper(id).unwrap();
        await refetch();
      } catch (err) {
        console.error("Failed to delete developer:", err);
        // Handle error
      }
    }
  };

  const openEditModal = (developer) => {
    setEditingDeveloper(developer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingDeveloper(null);
  };

  const getStatusCounts = () => {
    const counts = {
      available: developers.filter((d) => d.availabilityStatus === "available")
        .length,
      overloaded: developers.filter(
        (d) => d.availabilityStatus === "overloaded"
      ).length,
      onLeave: developers.filter((d) => d.availabilityStatus === "on-leave")
        .length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading developers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">
            Error loading developers
          </div>
          <p className="text-slate-400">
            {error.message || "Please try again later"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-900 text-white p-6 overflow-y-auto relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <Users className="w-8 h-8 mr-3 text-blue-400" />
            Development Team
          </h1>
          <p className="text-slate-400">
            Manage your development team members and track their availability
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Developers</p>
                <p className="text-2xl font-bold text-white">
                  {developers.length}
                </p>
              </div>
              <Users className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Available</p>
                <p className="text-2xl font-bold text-green-400">
                  {statusCounts.available}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Overloaded</p>
                <p className="text-2xl font-bold text-amber-400">
                  {statusCounts.overloaded}
                </p>
              </div>
              <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">On Leave</p>
                <p className="text-2xl font-bold text-red-400">
                  {statusCounts.onLeave}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="pt-8 pb-6 bg-gray-900 sticky -top-9 z-10">
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search developers..."
                  value={filters.search}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, search: e.target.value }))
                  }
                  className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={filters.designation}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      designation: e.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                >
                  <option value="">All Designations</option>
                  {uniqueDesignations.map((designation) => (
                    <option key={designation} value={designation}>
                      {designation}
                    </option>
                  ))}
                </select>

                <select
                  value={filters.experienceLevel}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      experienceLevel: e.target.value,
                    }))
                  }
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                >
                  <option value="">All Levels</option>
                  {experienceLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Developer
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(filters.search ||
              filters.designation ||
              filters.experienceLevel) && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-2 text-sm">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Active filters:</span>
                  {filters.search && (
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded border border-blue-500/30">
                      Search: "{filters.search}"
                    </span>
                  )}
                  {filters.designation && (
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded border border-purple-500/30">
                      {filters.designation}
                    </span>
                  )}
                  {filters.experienceLevel && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded border border-green-500/30">
                      {filters.experienceLevel}
                    </span>
                  )}
                  <button
                    onClick={() =>
                      setFilters({
                        search: "",
                        designation: "",
                        experienceLevel: "",
                        skills: [],
                      })
                    }
                    className="text-slate-400 hover:text-white transition-colors duration-200"
                  >
                    Clear all
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-4">
          <p className="text-slate-400">
            Showing {filteredDevelopers.length} of {developers.length}{" "}
            developers
          </p>
        </div>

        {/* Developers Grid */}
        {filteredDevelopers.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto">
            {filteredDevelopers.map((developer) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
                onEdit={openEditModal}
                onDelete={handleDeleteDeveloper}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">
              No developers found
            </h3>
            <p className="text-slate-400 mb-4">
              {developers.length === 0
                ? "Get started by adding your first developer to the team."
                : "Try adjusting your search criteria or filters."}
            </p>
            {developers.length === 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
              >
                Add Your First Developer
              </button>
            )}
          </div>
        )}

        {/* Modal */}
        <AddEditDeveloperModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSave={editingDeveloper ? handleEditDeveloper : handleAddDeveloper}
          developer={editingDeveloper}
        />
      </div>
    </div>
  );
};

export default DevelopersView;
