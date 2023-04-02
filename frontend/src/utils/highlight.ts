import { SystemStyleObject } from "@chakra-ui/react";

export const toVar = (name: string) => {
  return `var(--chakra-colors-${name.replaceAll(".", "-")})`;
};

const getStyle = (color: string, width: string): SystemStyleObject => {
  return {
    content: '""',
    backgroundColor: toVar(color),
    position: "absolute",
    height: "80%",
    width: width,
    left: "10%",
    top: "30%",
    "z-index": "-1",
  };
};

const getHighlightStyle = (width = "70%") => {
  const defaultStyle = getStyle("transparent.100", width);
  const activeStyle = getStyle("highlight.200", width);
  const hoverStyle = getStyle("highlight.100", width);

  return (isActive = true) => ({
    _before: (isActive && activeStyle) || defaultStyle,
    _hover: { _before: hoverStyle },
    position: "relative" as any,
  });
};

export default getHighlightStyle;
