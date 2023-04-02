import { CourseProp, LectureProp } from "../components/SquareBox";

const coursesData: CourseProp[] = [
  { course: "Intro to Programming", numSlides: 4 },
  { course: "Intro to Calculus", numSlides: 2 },
  { course: "Computer Architecture", numSlides: 4 },
  { course: "Operating Systems", numSlides: 10 },
  { course: "Intro to Biology", numSlides: 13 },
].map((course, idx) => ({ courseId: idx.toString(), ...course }));

const lecturesData: LectureProp[] = [
  {
    course: "Computer Architecture",
    title: "Bitwise operation",
    hasNFT: false,
    status: "parsing",
  },
  {
    course: "Computer Architecture",
    title: "Bitwise operation",
    hasNFT: false,
    status: "ready",
  },
  {
    course: "Intro to Calculus",
    title: "Derivative",
    hasNFT: true,
    status: "ready",
  },
  {
    course: "Intro to Calculus",
    title: "Derivative",
    hasNFT: true,
    status: "summarizing",
  },
  {
    course: "Computer Architecture",
    title: "Bitwise operation",
    hasNFT: false,
    status: "uploading",
  },
  {
    course: "Intro to Calculus",
    title: "Derivative",
    hasNFT: true,
    status: "uploading",
  },
  {
    course: "Computer Architecture",
    title: "Bitwise operation",
    hasNFT: false,
    status: "parsing",
  },
  {
    course: "Intro to Calculus",
    title: "Derivative",
    hasNFT: true,
    status: "ready",
  },
].map((lecture, idx) => ({ lectureId: idx.toString(), ...(lecture as any) }));

export const getCourses = async () => {
  return coursesData.concat(coursesData, coursesData);
};

export const getLectures = async (course: string) => {
  return lecturesData.concat(lecturesData, lecturesData);
};

export const getLecture = async (lecture: string) => {
  return lecturesData.find((val) => val.lectureId === lecture);
};
