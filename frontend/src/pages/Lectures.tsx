import * as React from "react";
import { Grid, GridItem, Flex, Box } from "@chakra-ui/react";
import SquareBox, { LectureProp } from "../components/SquareBox";
import Loading from "../components/Loading";
import { getLectures } from "../services/lectures";
import { useParams } from "react-router-dom";
import BoxFlex from "../layouts/BoxFlex";

const Lectures = () => {
  const params = useParams();
  const [lectures, setLectures] = React.useState<LectureProp[]>();

  React.useEffect(() => {
    if (params.courseId === undefined) return;
    getLectures(params.courseId).then((lectures) => {
      setLectures(lectures);
    });
  }, [params]);

  return (
    <BoxFlex text="@ my lectures">
      {lectures !== undefined ? ( lectures.length > 0 ?(
        lectures.map((lecture, idx) => (
          <SquareBox slides={lecture} key={idx} isLecture />
        ))
      ): <Box>The slides are being generated right now!</Box>) : (
        <Loading />
      )}
    </BoxFlex>
  );
};

export default Lectures;
