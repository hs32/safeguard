import { Footer, Layout, Navbar, ThemeSwitch } from "nextra-theme-blog";
import { Banner, Head, Search } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-blog/style.css";

export const metadata = {
  title: "Blog Example",
};

import { ReactNode } from "react";
import Header from "@/components/header";

export default async function RootLayout({ children }: { children: ReactNode }) {
  const banner = (
    <Banner storageKey="4.0-release">
      🎉 Nextra 4.0 is released.{" "}
      <a
        href="#"
        style={{
          textDecoration: "underline",
          textUnderlinePosition: "from-font",
        }}
      >
        Read more →
      </a>
    </Banner>
  );

  return (
    <div>
      <Header />
      <div>
        <Layout banner={banner}>
          <Navbar pageMap={await getPageMap()}>
            <Search />
            <ThemeSwitch />
          </Navbar>

          {children}

          <Footer>
            <abbr
              title="This site and all its content are licensed under a Creative Commons Attribution-NonCommercial 4.0 International License."
              style={{ cursor: "help" }}
            >
              CC BY-NC 4.0
            </abbr>{" "}
            {new Date().getFullYear()} © Dimitri POSTOLOV.
            <a href="/feed.xml" style={{ float: "right" }}>
              RSS
            </a>
          </Footer>
        </Layout>
      </div>
    </div>
  );
}
