// Copied from https://codesandbox.io/s/e0e6d
import { Box, Heading, Input, Stack, Text } from "@chakra-ui/react";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, useAnimation } from "framer-motion";

const Upload = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (s: string) => any;
}) => {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  return (
    <Box
      h={180}
      marginLeft="auto"
      marginRight="auto"
      borderColor="gray.300"
      borderStyle="dashed"
      borderWidth="2px"
      rounded="md"
      shadow="sm"
      role="group"
      transition="all 150ms ease-in-out"
      _hover={{
        backgroundColor: "gray.100",
      }}
      backgroundColor="white"
      as={motion.div}
      initial="rest"
      animate="rest"
      whileHover="hover"
    >
      <Box position="relative" height="100%" width="100%">
        <Box
          position="absolute"
          top="0"
          left="0"
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
        >
          <Stack
            height="100%"
            width="100%"
            display="flex"
            alignItems="center"
            justify="center"
            spacing="4"
          >
            <Box
              height="16"
              width="12"
              paddingTop="10"
              color="primary.100"
              position="relative"
            >
              <FontAwesomeIcon fontSize="48" icon={faCloudUpload} />
            </Box>
            <Stack p="8" textAlign="center" spacing="1">
              {!!value ? (
                  <Box fontWeight="light">Uploaded<Text color="primary.100">{value}</Text></Box>
              ) : (
                <>
                  <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                    Drop textbook PDF here
                  </Heading>
                  <Text fontWeight="light">or click to upload</Text>
                </>
              )}
            </Stack>
          </Stack>
        </Box>
        <Input
          type="file"
          height="100%"
          width="100%"
          position="absolute"
          top="0"
          left="0"
          opacity="0"
          aria-hidden="true"
          accept=".pdf"
          onDragEnter={startAnimation}
          onDragLeave={stopAnimation}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </Box>
    </Box>
  );
};

export default Upload;
