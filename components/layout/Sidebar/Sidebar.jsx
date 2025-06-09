import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useDispatch } from "react-redux";
// import { logout } from "@/store/slices/auth/authSlice";
import { navigationItems } from "@/constants/navigation";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedSubmenus, setExpandedSubmenus] = useState({});
  const dispatch = useDispatch();

  if (pathname === "/onboard") return null;

  // const handleLogout = () => {
  //   dispatch(logout());
  // };

  const toggleSubmenu = (index) => {
    setExpandedSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <aside
      className={`bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl transition-all duration-300 ease-in-out
        h-[calc(100vh-64px)] fixed overflow-y-auto scrollbar-hidden z-[100] backdrop-blur-sm
        ${isExpanded ? "w-64" : "w-[4.5rem]"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="w-full h-full border-r border-gray-700/50 flex flex-col justify-between">
        <nav className="p-3">
          <ul className="flex flex-col gap-y-1">
            {navigationItems.map((item, index) => {
              const isActive = item?.submenu
                ? item.submenu.some((subItem) =>
                    pathname.startsWith(subItem.href)
                  )
                : pathname.startsWith(item.href);

              const hasSubmenu = item?.submenu && item?.submenu?.length > 0;
              const isSubmenuExpanded = expandedSubmenus[index];

              return (
                <li key={index}>
                  {hasSubmenu ? (
                    <div className="flex flex-col">
                      <div
                        className={`flex gap-3 items-center p-3 rounded-lg transition-all duration-200 h-11 overflow-hidden relative cursor-pointer group
                          ${
                            isActive
                              ? "bg-primary-500/10 text-primary-500"
                              : "hover:bg-gray-800/80 text-gray-400 hover:text-gray-200"
                          }`}
                        onClick={() => toggleSubmenu(index)}
                      >
                        <Icon
                          icon={item?.icon}
                          className={`w-5 h-5 transition-transform duration-200 ${
                            isActive
                              ? "text-primary-500"
                              : "text-gray-400 group-hover:text-gray-200"
                          }`}
                        />
                        {isExpanded && (
                          <div
                            className={`flex justify-between items-center w-40 absolute left-12 transition-all duration-200
                              ${
                                isExpanded
                                  ? "opacity-100 translate-x-0"
                                  : "opacity-0 -translate-x-2"
                              }`}
                          >
                            <span className="text-sm font-medium whitespace-nowrap">
                              {item?.label}
                            </span>
                            <Icon
                              icon={
                                isSubmenuExpanded
                                  ? "mdi:chevron-up"
                                  : "mdi:chevron-down"
                              }
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isSubmenuExpanded ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                        )}
                      </div>

                      {/* Submenu items */}
                      {isExpanded && isSubmenuExpanded && (
                        <ul className="ml-4 mt-1 flex flex-col gap-y-1 animate-fadeIn">
                          {item.submenu.map((subItem, subIndex) => {
                            const isSubItemActive = pathname === subItem.href;
                            return (
                              <li key={`${index}-${subIndex}`}>
                                <Link
                                  href={subItem?.href}
                                  className={`flex gap-3 items-center p-2 rounded-lg transition-all duration-200 h-9 overflow-hidden relative group
                                    ${
                                      isSubItemActive
                                        ? "bg-primary-500/10 text-primary-500"
                                        : "hover:bg-gray-800/80 text-gray-400 hover:text-gray-200"
                                    }`}
                                >
                                  <Icon
                                    icon={subItem?.icon}
                                    className={`w-4 h-4 transition-colors duration-200 ${
                                      isSubItemActive
                                        ? "text-primary-500"
                                        : "text-gray-400 group-hover:text-gray-200"
                                    }`}
                                  />
                                  {isExpanded && (
                                    <span
                                      className={`text-sm font-medium transition-all duration-200 whitespace-nowrap absolute left-10
                                        ${
                                          isExpanded
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-2"
                                        }`}
                                    >
                                      {subItem?.label}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item?.href}
                      className={`flex gap-3 items-center p-3 rounded-lg transition-all duration-200 h-11 overflow-hidden relative group
                        ${
                          isActive
                            ? "bg-primary-500/10 text-primary-500"
                            : "hover:bg-gray-800/80 text-gray-400 hover:text-gray-200"
                        }`}
                    >
                      <Icon
                        icon={item?.icon}
                        className={`w-5 h-5 transition-colors duration-200 ${
                          isActive
                            ? "text-primary-500"
                            : "text-gray-400 group-hover:text-gray-200"
                        }`}
                      />
                      {isExpanded && (
                        <span
                          className={`text-sm font-medium transition-all duration-200 whitespace-nowrap absolute left-12
                            ${
                              isExpanded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2"
                            }`}
                        >
                          {item?.label}
                        </span>
                      )}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* <nav className="p-4 border-t border-gray-100">
          <ul className="">
            <li onClick={handleLogout}>
              <Link
                href="/"
                className={`flex gap-3 items-center p-3 text-secondary-600 rounded-md transition-colors h-11 overflow-hidden relative hover:bg-secondary-100`}
              >
                <Icon
                  icon={"tabler:logout-2"}
                  className={`w-5 h-5 text-secondary-400 `}
                />
                {isExpanded && (
                  <span
                    className={`text-nowrap transition-opacity duration-300 ease-in-out whitespace-nowrap absolute left-12 
                      ${
                        isExpanded
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 -translate-x-2"
                      }`}
                  >
                    Logout
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav> */}
      </div>
    </aside>
  );
};

export default Sidebar;
