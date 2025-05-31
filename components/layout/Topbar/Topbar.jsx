import React from "react";
// import Message from "./Tools/Message";
// import Notification from "./Tools/Notification";
// import Profile from "./Tools/Profile";
// import CurrencySelector from "../dashboard/CurrencySelector";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Topbar = () => {
  const pathname = usePathname();
  return (
    <header className="bg-gray-900 border-b border-gray-200 dark:border-gray-700 text-white flex items-center justify-between p-4 fixed w-full z-10 h-16"></header>
  );
};

export default Topbar;
