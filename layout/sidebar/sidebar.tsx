import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import userImage from "@/public/user.png";
import { Button, IconLink } from "@/components";

/**
 * A sidebar component containing user information, navigation links, and an optional close button.
 *
 * @component
 * @param {function} [props.onClose] - Optional function to handle sidebar closing, does not render the close button if not provided
 * @param {string} [props.className] - Additional CSS classes to apply to the component
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Any other attributes to pass to the root element
 */
export const Sidebar = ({
  onClose,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { onClose?: () => void }) => {

  const navigationItems = [
    { icon: faHouse, label: "Home", href: "/" },
    { icon: faPenToSquare, label: "Blog", href: "/blog" }
  ];

  return (
    <div
      {...props}
      className={`flex flex-col items-center mx-5 my-4 h-screen overflow-hidden border-gray-200 ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col items-center justify-center h-1/6">
        <Image
          src={userImage}
          alt="user"
          className="rounded-full object-cover"
          width={120}
          height={120}
          sizes="(min-width: 1024px) 120px, (min-width: 768px) 128px, (min-width: 640px) 96px, 64px"
        />
        <span className="mr-1">Blog by Brannen Hall</span>
      </div>
      <nav className="flex flex-col mt-5 space-y-1 w-full">
        {navigationItems.map(({href, icon, label}, i) => (
          <Button
            key={i}
            className="w-full"
            component={({className, ...props}: any) => (
              <IconLink {...props} className={`${className} text-center`} icon={icon} label={label} href={href}/>
            )}
          />
        ))}
        {onClose ? <Button onClick={onClose}>Close</Button> : null}
      </nav>
    </div>
  );
};
