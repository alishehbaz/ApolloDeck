import * as React from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@chakra-ui/react";
import getHighlightStyle from "../utils/highlight";
import { useMatch, Link } from "react-router-dom";

export const tabs = ["Home", "Lectures", "Generate", "Login"];

const LinkItem = (highlightStyle: any, tab: string) => {
  const isActiveTab = useMatch(tab);
  return (
    <BreadcrumbItem
      textDecoration="none"
      key={tab}
      isCurrentPage={isActiveTab}
      {...highlightStyle(isActiveTab)}
    >
      <BreadcrumbLink
        as={Link}
        to={`/${tab.toLowerCase()}`}
        _hover={{ textDecoration: "none" }}
      >
        {tab}
      </BreadcrumbLink>
    </BreadcrumbItem>
  );
};

const NavBar = () => {
  const highlightStyle = getHighlightStyle();
  return (
    <Box w="100%" fontSize={32} padding={4} border="1px black solid">
      <Breadcrumb>
        {tabs.map((tab) => LinkItem(highlightStyle, tab))}
      </Breadcrumb>
    </Box>
  );
};

export default NavBar;
