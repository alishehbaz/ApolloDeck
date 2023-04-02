import * as React from "react";
import { LectureProp } from "../components/SquareBox";
import Centered from "../layouts/Centered";
import { getLecture } from "../services/lectures";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { Box, Heading } from "@chakra-ui/react";

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
        <Box>
          <Heading>{lecture.title}</Heading>
        </Box>
      )}
    </Centered>
  );
};

export default LectureDetails;
