"use client";
import React, { useContext } from "react";
import {
  ViewGridIcon,
  PlusIcon,
  UserCircleIcon,
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/outline";
import { RiRobot2Line } from "react-icons/ri";
import { GoPulse } from "react-icons/go";
import PopoutMenu from "./PopoutMenu";
import { AppContext } from "@/app/AppContext";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, notebooks, addNotebook, selectNotebook, currentNotebookId, isSidebarExpanded, toggleSidebar } = useContext(AppContext);

  const toggleMenu = (menu) => {
    setActiveMenu((prevMenu) => (prevMenu === menu ? null : menu));
  };

  return (
    <div className="relative flex">
      <div className={`w-${isSidebarExpanded ? '64' : '16'} h-screen bg-gray-100 flex flex-col items-center py-4 space-y-4 transition-all duration-300`}>
        <div className="w-8 h-8 rounded flex items-center justify-center mb-10">
          <GoPulse className="w-5 h-5 text-gray-900 text-bold" />
        </div>
        <button className="w-8 h-8 bg-white border-gray-500 border-2 rounded flex items-center justify-center" onClick={addNotebook}>
          <PlusIcon className="w-5 h-5 text-gray-500" />
        </button>
        <button
          className={`w-8 h-8 rounded mt-14 flex items-center justify-center ${activeMenu === "robot" ? "bg-gray-200" : ""}`}
          onClick={() => toggleMenu("robot")}
        >
          <RiRobot2Line className="w-5 h-5 text-gray-500" />
        </button>
        <button
          className={`w-8 h-8 rounded mt-14 flex items-center justify-center ${activeMenu === "presetPrompts" ? "bg-gray-200" : ""}`}
          onClick={() => toggleMenu("presetPrompts")}
        >
          <ViewGridIcon className="w-5 h-5 text-gray-500" />
        </button>
        <div className="flex-1"></div>
        <button onClick={toggleSidebar} className="w-8 h-8 bg-white border-gray-500 border-2 rounded flex items-center justify-center mb-4">
          {isSidebarExpanded ? <ChevronDoubleLeftIcon className="w-5 h-5 text-gray-500" /> : <ChevronDoubleRightIcon className="w-5 h-5 text-gray-500" />}
        </button>
        <div className="w-10 h-10 rounded-full overflow-hidden mb-4 flex items-center justify-center">
          <UserCircleIcon className="w-8 h-8 text-gray-500" />
        </div>
      </div>
      {isSidebarExpanded && (
        <div className="flex flex-col w-full p-4">
          {notebooks.map(notebook => (
            <div
              key={notebook.id}
              className={`cursor-pointer p-2 rounded-md ${currentNotebookId === notebook.id ? "bg-gray-200" : ""}`}
              onClick={() => selectNotebook(notebook.id)}
            >
              {notebook.name}
            </div>
          ))}
        </div>
      )}
      <PopoutMenu activeMenu={activeMenu} />
    </div>
  );
};

export default Sidebar;
