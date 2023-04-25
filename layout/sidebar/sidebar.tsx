import { faHouse, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import userImage from "@/public/user.jpg";
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
  return (
    <div
      {...props}
      className={`flex flex-col items-center mx-5 my-4 h-screen overflow-hidden border-gray-200 ${
        className ?? ""
      }`}
    >
      <div className="flex flex-col content-center justify-center h-1/6">
        <Image
          src={userImage}
          alt="user"
          className="rounded-full w-32 h-32 object-cover h-12 w-12"
        />
        <span className="mr-1">Blog by Brannen Hall</span>
      </div>
      <nav className="flex flex-col mt-5 space-y-1 w-full">
        <Button
          className="w-full"
          component={(props: any) => (
            <IconLink {...props} icon={faHouse} label="Home" href="/" />
          )}
        />
        <Button
          className="w-full"
          component={(props: any) => (
            <IconLink
              {...props}
              icon={faPenToSquare}
              label="Posts"
              href="/post/"
            />
          )}
        />
        {onClose ? <Button onClick={onClose}>Close</Button> : null}
      </nav>
    </div>
  );
};
