import React from "react";

export const Avatar = ({ name, size = "md", image }) => {
  // Generate initials from name
  const initials = name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  // Generate a deterministic color based on the name
  const getColorFromName = (name) => {
    const colors = [
      "bg-blue-600",
      "bg-indigo-600",
      "bg-purple-600",
      "bg-pink-600",
      "bg-red-600",
      "bg-orange-600",
      "bg-amber-600",
      "bg-yellow-600",
      "bg-lime-600",
      "bg-green-600",
      "bg-emerald-600",
      "bg-teal-600",
      "bg-cyan-600",
    ];

    // Simple hash function
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert to positive number and get index
    hash = Math.abs(hash);
    return colors[hash % colors.length];
  };

  const sizeClasses = {
    xs: "w-6 h-6 text-xs",
    sm: "w-8 h-8 text-sm",
    md: "w-10 h-10 text-base",
    lg: "w-12 h-12 text-lg",
  };

  const bgColor = getColorFromName(name);

  return (
    <div
      className={`${sizeClasses[size]} ${bgColor} rounded-full flex items-center justify-center text-white font-medium`}
    >
      {image ? (
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        initials
      )}
    </div>
  );
};
