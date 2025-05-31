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
      className={`bg-gray-900 shadow-sm transition-all duration-300 ease-in-out
        h-[calc(100vh-64px)] fixed overflow-y-auto scrollbar-hidden z-[100]
        ${isExpanded ? "w-60" : "w-[5rem]"}`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="w-full h-full bg-gray-900 border-r border-gray-700 flex flex-col justify-between">
        <nav className="p-4">
          <ul className="flex flex-col gap-y-2">
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
                        className={`flex gap-3 items-center p-3 text-secondary-600 rounded-md transition-colors h-11 overflow-hidden relative cursor-pointer
                          ${
                            isActive
                              ? "bg-secondary-120"
                              : "hover:bg-secondary-50"
                          }`}
                        onClick={() => toggleSubmenu(index)}
                      >
                        <Icon
                          icon={item?.icon}
                          className={`w-5 h-5 ${
                            isActive ? "text-primary-500" : "text-secondary-400"
                          }`}
                        />
                        {isExpanded && (
                          <div
                            className={`flex justify-between items-center w-36 absolute left-12 ${
                              isExpanded
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-2"
                            }`}
                          >
                            <span
                              className={`text-nowrap transition-opacity duration-300 ease-in-out whitespace-nowrap 
                                `}
                            >
                              {item?.label}
                            </span>
                            <Icon
                              icon={
                                isSubmenuExpanded
                                  ? "mdi:chevron-up"
                                  : "mdi:chevron-down"
                              }
                              className="w-4 h-4 text-secondary-400 absolute right-3"
                            />
                          </div>
                        )}
                      </div>

                      {/* Submenu items */}
                      {isExpanded && isSubmenuExpanded && (
                        <ul className="ml-4 mt-1 flex flex-col gap-y-1">
                          {item.submenu.map((subItem, subIndex) => {
                            const isSubItemActive = pathname === subItem.href;
                            return (
                              <li key={`${index}-${subIndex}`}>
                                <Link
                                  href={subItem?.href}
                                  className={`flex gap-3 items-center p-2 text-secondary-600 rounded-md transition-colors h-9 overflow-hidden relative
                                    ${
                                      isSubItemActive
                                        ? "bg-secondary-120"
                                        : "hover:bg-secondary-50"
                                    }`}
                                >
                                  <Icon
                                    icon={subItem?.icon}
                                    className={`w-4 h-4 ${
                                      isSubItemActive
                                        ? "text-primary-500"
                                        : "text-secondary-400"
                                    }`}
                                  />
                                  {isExpanded && (
                                    <span
                                      className={`text-nowrap transition-opacity duration-300 ease-in-out whitespace-nowrap absolute left-10 
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
                      className={`flex gap-3 items-center p-3 text-secondary-600 rounded-md transition-colors h-11 overflow-hidden relative
                        ${
                          isActive
                            ? "bg-secondary-120"
                            : "hover:bg-secondary-50"
                        }`}
                    >
                      <Icon
                        icon={item?.icon}
                        className={`w-5 h-5 ${
                          isActive ? "text-primary-500" : "text-secondary-400"
                        }`}
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
