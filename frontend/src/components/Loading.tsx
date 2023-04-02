import { Spinner } from "@chakra-ui/react";

const Loading = () => (
  <Spinner
    thickness="4px"
    speed="0.65s"
    emptyColor="gray.100"
    color="primary.100"
    size="xl"
    marginTop="5rem"
  />
);

export default Loading;
