import * as React from "react";
import { LectureProp } from "../components/SquareBox";
import Centered from "../layouts/Centered";
import { getLecture } from "../services/lectures";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Box, Heading, Card, CardHeader, CardBody, CardFooter, Text, Stack, StackDivider , Button, Divider, ButtonGroup} from '@chakra-ui/react';

const LectureDetails = () => {
  const params = useParams();
  const [lecture, setLecture] = React.useState<LectureProp>();
  React.useEffect(() => {
    if (params.lectureId === undefined) return;
    getLecture(params.lectureId).then((lecture) => {
      if (lecture === undefined) {
        console.log("Not found", params.lectureId);
        return;
      }
      setLecture(lecture);
    });
  }, [params]);

  return (
    <Centered
      heading={
        lecture === undefined
          ? "@ unknown lecture"
          : `@ ${lecture.course} / ${lecture.title}`
      }
    >
    {lecture === undefined ? (
      <Loading />
    ) : (
<Card>
  <CardHeader>
    <Heading size='md'>Lecture details </Heading>
  </CardHeader>

  <CardBody>
    <Stack divider={<StackDivider />} spacing='4'>
      <Box>
        <Heading size='xs' textTransform='uppercase'>
          Title
        </Heading>
        <Text pt='2' fontSize='sm'>
          [Title title title title title].
        </Text>
      </Box>
      <Box>
        <Heading size='xs'  textTransform='uppercase'>
         [NFT] Contract Address of Minting
        </Heading>
        <Text pt='2' fontSize='sm'>
          [placeholder] 0xB4EDD991e2b6b7fa041122F5b9A82Eed2f740Be3
        </Text>
      </Box>
      <Box>
        <Heading size='xs' textTransform='uppercase' >
         [NFT] Blockchain of contract address
        </Heading>
        <Text pt='2' fontSize='sm'>
          [placeholder] mumbai
        </Text>
      </Box>
    </Stack>
  </CardBody>
  <Divider />
  <CardFooter>
  <Stack>
    <Box>
  <Heading size='xs' textTransform='uppercase'>
          Download
        </Heading><Text></Text>
        </Box>
    <ButtonGroup spacing='2'>
      <Button variant='solid' colorScheme='blue'>
        IPFS (Web3)
      </Button>
      <Button variant='ghost' colorScheme='blue'>
        .pptx
      </Button>
    </ButtonGroup></Stack>
  </CardFooter>
</Card>
  )}
    </Centered>    
  );
};

export default LectureDetails;
