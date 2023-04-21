import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";
import userImage from "@/public/user.jpg";

export const Sidebar = () => {
  return (
    <div className="bg-white w-screen md:w-1/5 px-5 py-4 flex h-screen overflow-hidden flex-col border-gray-200">
      <div className="flex flex-col content-center justify-center h-1/6">
        <Image
          src={userImage}
          alt="user"
          className="rounded-full w-32 h-32 object-cover h-12 w-12"
        />
        <span className="mr-1">Blog by Brannen Hall</span>
      </div>
      <nav className="flex flex-col mt-5 space-y-1">
        <SidebarItem icon={faHouse} label="Home" href="/" />
        <SidebarItem icon={faPenToSquare} label="Posts" href="/post/" />
      </nav>
    </div>
  );
};
