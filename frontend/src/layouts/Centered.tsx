import { Box } from "@chakra-ui/react";

const Centered = ({
  children,
  heading,
  padding = "20%",
}: {
  children: JSX.Element | (JSX.Element | string)[];
  heading: string;
  padding?: any;
}) => {
  return (
    <Box paddingLeft={padding} paddingRight={padding}>
      <Box marginTop={5} marginBottom={5}>
        {heading}
      </Box>
      {children}
    </Box>
  );
};

export default Centered;
