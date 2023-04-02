import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: `'Inria Serif', serif`,
    body: `'Inria Serif', serif`,
  },
  colors: {
    dark: {
      100: "#2e3532",
    },
    highlight: {
      100: "#d3efbd",
      200: "#b6e393",
      300: "orange",
    },
    primary: {
      100: "#8b2635",
    },
    gray: {
      100: "#e0e2db",
      200: "#d2d4c8",
    },
    transparent: {
      100: "#ffffff00",
    },
  },
});

export default theme;
