import * as React from "react";
import SquareBox, { CourseProp } from "../components/SquareBox";
import { getCourses } from "../services/lectures";
import Loading from "../components/Loading";
import BoxFlex from "../layouts/BoxFlex";

const Courses = () => {
  const [courses, setCourses] = React.useState<CourseProp[]>();
  React.useEffect(() => {
    getCourses().then((courses) => {
      setCourses(courses);
    });
  }, []);
  return (
    <BoxFlex text="@ my courses">
      {courses !== undefined ? (
        courses.map((course, idx) => (
          <SquareBox slides={course} key={idx} isLecture={false} />
        ))
      ) : (
        <Loading />
      )}
    </BoxFlex>
  );
};

export default Courses;
