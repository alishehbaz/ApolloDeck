import { CourseProp, LectureProp } from "../components/SquareBox";
import axios from "axios";

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

type PostLecture = {
  course: string;
  generateNFT: boolean;
  tone: string;
  pdfFile: string;
};

const apiUrl = (endpoint: string) => {
  return `http://localhost:3000/${endpoint}`;
};

export const getCourses = async () => {
  return axios.get(apiUrl("courses")).then((resp) => {
    const data = resp.data;
    console.log("courses", data);
    return data;
  });
};

export const getLectures = async (courseId: string) => {
  return axios.get(apiUrl(`lectures/${courseId}`)).then((resp) => {
    const data = resp.data;
    console.log("lectures", data);
    return data;
  });
  // return lecturesData.concat(lecturesData, lecturesData);
};

export const getLecture = async (lectureId: string) => {
  return axios.get(apiUrl(`lecture/${lectureId}`)).then((resp) => {
    const data = resp.data;
    console.log("lecture", data);
    return data;
  });
  // return lecturesData.find((val) => val.lectureId === lecture);
};

export const postLecture = async (data: PostLecture) => {
  return axios.post(apiUrl("lecture"), data).then((resp) => {
    const data = resp.data;
    console.log(data);
    return data;
  });
};

export const getSlidesURL = (lectureId: string) => {
  return {html: apiUrl(`htmls/${lectureId}.html`), pptx: apiUrl(`pptx/${lectureId}.pptx`), pdf: apiUrl(`pdfs/${lectureId}.pdf`)};
}
