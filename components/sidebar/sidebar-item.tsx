import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

export const SidebarItem = ({
  icon,
  label,
  href,
}: {
  icon: IconProp;
  label: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="text-start text-grey-800 hover:bg-gray-50 px-1 py-2 rounded-md"
    >
      <FontAwesomeIcon icon={icon} className="mr-1" />
      <span>{label}</span>
    </Link>
  );
};
