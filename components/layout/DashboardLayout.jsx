"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Topbar from "./Topbar/Topbar";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";

const DashboardLayout = ({ children }) => {
  const path = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Topbar />
      <div className="flex flex-1 pt-16">
        <Sidebar />
        <main className="flex-1 ml-20 flex flex-col h-screen bg-gray-900  text-gray-100 transition-colors duration-200">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
