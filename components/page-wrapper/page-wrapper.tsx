import { useEffect, useState } from "react";
import { Sidebar } from "../sidebar";
import { useMediaQuery } from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../common";
import { Drawer } from "../common";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  // Since Next is pre-rendering, we need to always render for mobile, then change for desktop.
  const [isDesktop, setIsDesktop] = useState(false);
  const [showNav, setShowNav] = useState(isDesktop);
  useMediaQuery({ query: "(min-width: 768px)" }, undefined, (isDesktop) => {
    setIsDesktop(isDesktop);
  });

  return (
    <div className="bg-gray-100 md:flex items-stretch h-screen">
      <div className="md:flex md:flex-col w-full ml-4">
        <header className="flex flex-row justify-between w-full">
          <h1 className="flex-auto text-2xl md:text-3xl font-bold italic my-6">
            Debug Less, Ship More
          </h1>
          <Button
            className="flex-none w-3 mr-2"
            onClick={() => setShowNav(!showNav)}
          >
            <FontAwesomeIcon icon={faBars} />
          </Button>
        </header>
        <main className="bg-white p-2 h-full rounded">{children}</main>
      </div>
      <Drawer
        show={showNav}
        className="bg-gray-100 fixed top-0 w-screen h-screen z-10 md:static md:w-1/5 md:h-full"
      >
        <Sidebar onClose={isDesktop ? undefined : () => setShowNav(false)} />
      </Drawer>
    </div>
  );
};
