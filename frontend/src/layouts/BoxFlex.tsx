import Centered from "./Centered";
import { Flex } from "@chakra-ui/react";

const BoxFlex = ({
  text,
  children,
}: {
  text: string;
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <Centered>
      {text}
      <Flex
        w="100%"
        marginTop={3}
        gap="4"
        alignItems="left"
        justifyContent="space-between"
        wrap="wrap"
      >
        {children}
      </Flex>
    </Centered>
  );
};

export default BoxFlex;
