import Image from "next/image";
import { Inter } from "next/font/google";
import { Sidebar } from "../components/sidebar";
import { Fragment } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Fragment>
      <h1 className="text-2xl md:text-3xl font-bold italic mb-6">
        Debug Less, Ship More
      </h1>
      <h1 className="text-4xl font-bold mb-8 mb-6">Latest Articles</h1>
    </Fragment>
  );
}
