import React, { useState, useEffect } from "react";
import {
  X,
  Plus,
  User,
  Briefcase,
  Star,
  Code,
  Mail,
  Users,
} from "lucide-react";

const AddEditDeveloperModal = ({ isOpen, onClose, onSave, developer }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    designation: "",
    experienceLevel: "Junior",
    skills: [],
    availabilityStatus: "available",
    currentTasks: 0,
    joinedDate: new Date().toISOString().split("T")[0],
  });

  const [newSkill, setNewSkill] = useState("");
  const [errors, setErrors] = useState({});

  const availableSkills = [
    "React",
    "Vue.js",
    "Angular",
    "Node.js",
    "Python",
    "Java",
    "TypeScript",
    "JavaScript",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "MongoDB",
    "PostgreSQL",
    "GraphQL",
    "REST API",
    "Git",
    "Jenkins",
    "CI/CD",
    "Agile",
    "Scrum",
    "TDD",
    "DevOps",
    "Machine Learning",
  ];

  useEffect(() => {
    if (developer) {
      setFormData({
        name: developer.name,
        email: developer.email,
        designation: developer.designation,
        experienceLevel: developer.experienceLevel,
        skills: [...developer.skills],
        availabilityStatus: developer.availabilityStatus,
        currentTasks: developer.currentTasks,
        joinedDate: developer.joinedDate,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        designation: "",
        experienceLevel: "Junior",
        skills: [],
        availabilityStatus: "available",
        currentTasks: 0,
        joinedDate: new Date().toISOString().split("T")[0],
      });
    }
    setErrors({});
  }, [developer, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const addSkill = (skill) => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill.trim()],
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.email.includes("@")) newErrors.email = "Invalid email format";
    if (!formData.designation.trim())
      newErrors.designation = "Designation is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-xl border border-slate-700 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-white flex items-center">
            <User className="w-5 h-5 mr-2" />
            {developer ? "Edit Developer" : "Add New Developer"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-1" />
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Briefcase className="w-4 h-4 inline mr-1" />
              Designation
            </label>
            <input
              type="text"
              value={formData.designation}
              onChange={(e) => handleInputChange("designation", e.target.value)}
              className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              placeholder="e.g., Frontend Developer, Backend Engineer"
            />
            {errors.designation && (
              <p className="text-red-400 text-sm mt-1">{errors.designation}</p>
            )}
          </div>

          {/* Experience Level and Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Star className="w-4 h-4 inline mr-1" />
                Experience Level
              </label>
              <select
                value={formData.experienceLevel}
                onChange={(e) =>
                  handleInputChange("experienceLevel", e.target.value)
                }
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              >
                <option value="Junior">Junior</option>
                <option value="Mid">Mid-Level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                <Users className="w-4 h-4 inline mr-1" />
                Availability Status
              </label>
              <select
                value={formData.availabilityStatus}
                onChange={(e) =>
                  handleInputChange("availabilityStatus", e.target.value)
                }
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              >
                <option value="available">Available</option>
                <option value="overloaded">Overloaded</option>
                <option value="on-leave">On Leave</option>
              </select>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <Code className="w-4 h-4 inline mr-1" />
              Skills
            </label>

            {/* Add skill input */}
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSkill(newSkill))
                }
                className="flex-1 px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
                placeholder="Type a skill and press Enter"
              />
              <button
                type="button"
                onClick={() => addSkill(newSkill)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 flex items-center"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Suggested skills */}
            <div className="mb-3">
              <p className="text-xs text-slate-400 mb-2">Suggested skills:</p>
              <div className="flex flex-wrap gap-2">
                {availableSkills
                  .filter((skill) => !formData.skills.includes(skill))
                  .slice(0, 8)
                  .map((skill) => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => addSkill(skill)}
                      className="px-2 py-1 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded border border-slate-600 transition-colors duration-200"
                    >
                      + {skill}
                    </button>
                  ))}
              </div>
            </div>

            {/* Selected skills */}
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg text-sm flex items-center"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-2 text-blue-300 hover:text-blue-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 font-medium"
            >
              {developer ? "Update Developer" : "Add Developer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditDeveloperModal;
