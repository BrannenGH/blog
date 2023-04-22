import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { SidebarItem } from "./sidebar-item";
import Image from "next/image";
import userImage from "@/public/user.jpg";
import { Button } from "../common";

export const Sidebar = ({ onClose, className, ...props } : React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & { onClose?: () => void}) => {
  return (
    <div 
      {...props}
      className={`flex flex-col items-center mx-5 my-4 h-screen overflow-hidden border-gray-200 ${className}`}>
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
        {onClose ? <Button onClick={onClose}>Close</Button> : null}
      </nav>
    </div>
  );
};
