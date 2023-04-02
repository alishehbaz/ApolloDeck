import { Box } from "@chakra-ui/react";

const Centered = ({
  children,
  padding = "20%",
}: {
  children: JSX.Element | (JSX.Element | string)[];
  padding?: any;
}) => {
  return (
    <Box paddingLeft={padding} paddingRight={padding}>
      {children}
    </Box>
  );
};

export default Centered;
