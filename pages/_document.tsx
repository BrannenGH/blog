import { Sidebar } from "../components/sidebar";
import { Html, Head, Main, NextScript } from "next/document";
import { PageWrapper } from "@/components/page-wrapper";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <PageWrapper>
          <Main />
        </PageWrapper>
        <NextScript />
      </body>
    </Html>
  );
}
