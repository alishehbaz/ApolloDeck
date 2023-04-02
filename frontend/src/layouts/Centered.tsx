import { Box } from "@chakra-ui/react";

const Centered = ({
  children,
}: {
  children: JSX.Element | (JSX.Element | string)[];
}) => {
  return (
    <Box paddingLeft="20%" paddingRight="20%">
      {children}
    </Box>
  );
};

export default Centered;
