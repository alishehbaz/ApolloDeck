import * as React from "react";
import { LectureProp } from "../components/SquareBox";
import Centered from "../layouts/Centered";
import { getLecture } from "../services/lectures";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import {
  Box,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Stack,
  StackDivider,
  Button,
  Divider,
  ButtonGroup,
} from "@chakra-ui/react";

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
            <Heading size="md">Lecture details </Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Title
                </Heading>
                <Text pt="2" fontSize="sm">
                  {lecture.title}
                </Text>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Course
                </Heading>
                <Text pt="2" fontSize="sm">
                  {lecture.course}
                </Text>
              </Box>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Stack>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  View
                </Heading>
              </Box>
              <ButtonGroup spacing="2">
                <Link
                  to={lecture.slidesURL ?? "https://slides.google.com"}
                  target="_blank"
                >
                  <Button variant="solid" colorScheme="blue">
                    Goolge Slides {lecture.slidesURL}
                  </Button>
                </Link>
                <Button
                  variant="disabled"
                  colorScheme="blue"
                  color="gray"
                  _hover={{ cursor: "not-allowed" }}
                  disabled
                >
                  Download .pptx
                </Button>
              </ButtonGroup>
            </Stack>
          </CardFooter>
        </Card>
      )}
    </Centered>
  );
};

export default LectureDetails;
