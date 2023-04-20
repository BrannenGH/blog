import Image from "next/image";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SidebarItem } from "./sidebar-item";

export const Sidebar = () => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          {/* Sidebar component */}
          <div className="flex flex-col h-0 flex-1 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
              </div>
              <nav className="mt-5 flex-1 px-2 bg-white space-y-1">
                <SidebarItem icon={faHouse} label="Home" />
                <SidebarItem icon={faPenToSquare} label="Posts" />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
