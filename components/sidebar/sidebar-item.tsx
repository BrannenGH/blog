import Image from "next/image";
import { Inter } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const inter = Inter({ subsets: ["latin"] });

export const SidebarItem = ({
  icon,
  label,
}: {
  icon: IconProp;
  label: string;
}) => {
  return (
    <a
      href="#"
      className="text-gray-600 hover:bg-gray-50 group flex items-center px-2 py-2 text-sm font-medium rounded-md"
    >
      <div className="flex items-right">
        <FontAwesomeIcon
          icon={icon}
          className="text-gray-600 mr-2 align-middle"
        />
        <span className="text-gray-800">{label}</span>
      </div>
    </a>
  );
};
