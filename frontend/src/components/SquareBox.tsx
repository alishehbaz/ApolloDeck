import * as React from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import StatusDisplay, { LectureStatus } from "./StatusDisplay";
import { toVar } from "../utils/highlight";
import { Link } from "react-router-dom";

export type LectureProp = {
  lectureId: string;
  course: string;
  title: string;
  status: LectureStatus;
  hasNFT: boolean;
};

export type CourseProp = {
  courseId: string;
  course: string;
  numSlides: number;
};

const SquareBox = ({
  slides,
  isLecture,
}:
  | ({ slides: LectureProp } & { isLecture: true })
  | ({ slides: CourseProp } & { isLecture: false })) => {
  return (
    <Link
      to={
        isLecture
          ? `/lecture/${slides.lectureId}`
          : `/lectures/${slides.courseId}`
      }
    >
      <Grid
        templateRows="repeat(7, 1fr)"
        templateColumns="repeat(1, 1fr)"
        padding={4}
        border="1px dashed black"
        w="250px"
        h="250px"
        cursor="pointer"
        transition="backgroundColor ease 0.2s"
        backgroundColor="white"
        _hover={{ backgroundColor: "gray.100" }}
      >
        {isLecture ? (
          <>
            <GridItem rowSpan={1} marginBottom={2}>
              <StatusDisplay status={slides.status} />
            </GridItem>
            <GridItem rowSpan={2}>
              {slides.course}
              <hr />
              {slides.title}
            </GridItem>
            <GridItem rowSpan={3} />
          </>
        ) : (
          <>
            <GridItem rowSpan={3}>
              <FontAwesomeIcon
                icon={faBook}
                fontSize="1.5rem"
                color={toVar("primary.100")}
              />
              <Text marginLeft="5px" display="inline">
                {slides.course}
              </Text>
            </GridItem>
            <GridItem rowSpan={1}>
              <span style={{ textDecoration: "underline" }}>
                {slides.numSlides}
              </span>{" "}
              slides to be viewed
            </GridItem>
            <GridItem rowSpan={2} />
          </>
        )}
        <GridItem rowSpan={1}>
          <Text fontSize="0.9rem" textAlign="center">
            click to open
          </Text>
        </GridItem>
      </Grid>
    </Link>
  );
};

export default SquareBox;
