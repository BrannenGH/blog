import { useState } from "react";
import { Sidebar } from "..";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button, TextHeader, Drawer } from "@/components";
import logo from "@/public/logo.png";
import Image from 'next/image';

/**
 * PageWrapper is a layout component that wraps the main content of the page.
 *
 * @component
 * @param {React.ReactNode} props.children - The main content of the page to be wrapped by the PageWrapper
 */
export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  // Since Next is pre-rendering, we need to always render for mobile, then change for desktop.
  const [isDesktop, setIsDesktop] = useState(false);
  const [showNav, setShowNav] = useState(isDesktop);
  useMediaQuery({ query: "(min-width: 768px)" }, undefined, (isDesktop) => {
    setIsDesktop(isDesktop);
  });

  return (
    <div className="font-body bg-mint-green-100 md:flex items-stretch h-screen">
      <div className="md:flex md:flex-col w-full ml-4">
        <header className="flex flex-row justify-between w-full">
          <div className="flex flex-row items-center">
            <Image src={logo} alt="logo" className="w-10 h-10 m-2" />
            <TextHeader className="flex-auto text-2xl md:text-3xl font-bold my-6">
              Brannen's Bytes
            </TextHeader>
          </div>
          <div className="flex fex-row justify-center items-center">
            <Button
              className="w-10 h-10 m-2"
              onClick={() => setShowNav(!showNav)}
            >
              <span>
                <FontAwesomeIcon icon={faBars} />
              </span>
            </Button>
          </div>
        </header>
        <main className="bg-white p-2 h-full rounded">{children}</main>
      </div>
      <Drawer
        hide={!showNav}
        className="bg-mint-green-100 fixed top-0 w-screen h-screen z-10 md:static md:w-1/5 md:h-full"
      >
        <Sidebar onClose={isDesktop ? undefined : () => setShowNav(false)} />
      </Drawer>
    </div>
  );
};
