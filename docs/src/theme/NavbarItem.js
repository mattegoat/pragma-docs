import React from "react";
import OriginalNavBarItem from "@theme-original/NavbarItem";
import { useLocation } from "@docusaurus/router";

export default function NavbarItem(props) {
  const { pathname } = useLocation();

  let versionDoc = pathname.split("/");
  let activeNav = "V3";

  return (
    <>
      <OriginalNavBarItem
        {...props}
        className={props.className + " " + activeNav}
      />
    </>
  );
}
