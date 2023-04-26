import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { Button } from "@/components";

/**
 * A link with an accompanying font awesome icon.
 *
 * @component
 * @param {IconProp} props.icon - The Font Awesome icon to display alongside the label
 * @param {string} props.label - The text label for the link
 * @param {string} props.href - The destination URL when the link is clicked
 * @param {string} props.className - Additional CSS classes to apply to the component
 */
export const IconLink = ({
  icon,
  label,
  href,
  className,
  ...props
}: {
  icon: IconProp;
  label: string;
} & Parameters<typeof Link>[0]) => {
  return (
    <Link
      {...props}
      href={href}
      className={`flex flex-row items-baseline justify-center ${
        className ?? ""
      }`}
    >
      <FontAwesomeIcon icon={icon} className="mr-1" />
      <span>{label}</span>
    </Link>
  );
};
