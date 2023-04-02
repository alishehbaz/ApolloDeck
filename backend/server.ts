import express from "express";
import cors from "cors";
import { Schema, model, connect } from "mongoose";
import { lectureSchema, ILecture } from "./Models/Lecture";
import { connectToMongo } from "./db";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config({ path: "./env" });
import { v4 as uuidv4 } from "uuid";
import * as fs from "node:fs";
import { execFileSync } from "node:child_process";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/htmls", express.static(__dirname + "/htmls"));
app.use("/pptx", express.static(__dirname + "/pptx"));

app.get("/", (req, res) => {
  res.send("Render homepage here");
});

function jsonDumping(jsonText, lectureId) {
  const key = lectureId
  // p is JSON object
  console.log(key + " -> " + jsonText); // prints key and then value
  let filename = `./markdowns/${key}.md`;

  fs.writeFile(filename, jsonText, (err) => {
    if (err) {
      console.error(err);
    }
    setTimeout(() => {
      execFileSync(
        "npx",
        ["@marp-team/marp-cli@latest", `./markdowns/${key}.md`, "-o", `./htmls/${lectureId}.html`],
      );
    }, 100);
    setTimeout(() => {
      execFileSync(
        "npx",
        ["@marp-team/marp-cli@latest", `./markdowns/${key}.md`, "-o", `./pptx/${lectureId}.pptx`],
      );
    }, 100);
  });
}

app.post("/lecture", (req, res) => {
  // 3. Create a Model.
  const Lecture = model<ILecture>("Lecture", lectureSchema);

  const { course, generateNFT, tone, pdfFile } = req.body;

  connectToMongo().catch((err) => console.log(err));

  const courseID = uuidv4();
  get_model_response(Lecture, courseID, course, pdfFile);

  console.log("Lecture Details Saved");

  res.json({ courseID: courseID, course: course });
});

app.get("/lecture/:lectureId", async (req, res) => {
  const Lecture = model<ILecture>("Lecture", lectureSchema);

  const response = await Lecture.findOne({
    lectureId: req.params.lectureId,
  }).exec();

  console.log(response);

  res.json(response);
});

// Get lectures for a specific course
app.get("/lectures/:courseId", async (req, res) => {
  const Lecture = model<ILecture>("Lecture", lectureSchema);
  console.log(`course id querying for : ${req.params.courseId}`);
  const response = await Lecture.find({
    courseId: req.params.courseId,
  }).exec();

  console.log(response);

  res.json(response);
});

app.get("/courses", async (req, res) => {
  const Lecture = model<ILecture>("Lecture", lectureSchema);
  connectToMongo().catch((err) => console.log(err));
  const response = await Lecture.find({}).distinct("courseId").exec();
  console.log(response);

  let courseObjectList = [];

  for (const c_id of response) {
    const cid_response = await Lecture.findOne({
      courseId: c_id,
    }).exec();

    courseObjectList.push(cid_response);
  }

  res.json(courseObjectList);
});

async function get_model_response(Lecture, courseID, course, pdf_link) {
  // const pdf_link = "https://pdos.csail.mit.edu/6.S081/2020/xv6/book-riscv-rev1.pdf";
  const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  // Get table of contents
  const prompt_tof = `First, visit this link ${pdf_link}, which is a textbook pdf. \
You will give me the table of content. Do not explain, do not say 'sure' or other transition words. Begin your reply only with the list of table of content. Beging with '1.', '2.', etc. Make a new line for each chapter.`;
  console.log(configuration.apiKey);
  const response_tof = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt_tof }],
    max_tokens: 150,
    temperature: 0,
  });

  console.log(response_tof.data.choices[0].message.content.trim());
  const tof_str = response_tof.data.choices[0].message.content.trim();
  const tof_list = tof_str.split("\n");

  // Generate slides for each chapter
  const response_chapter_slides = {};

  for (const chapter_title of tof_list) {
    console.log(`Querying for ${chapter_title}`);
    const lecture = new Lecture({
      lectureId: uuidv4(),
      title: chapter_title,
      courseId: courseID,
      course: course,
      status: "summarizing",
      hasNFT: false,
      slidesURL: "./",
    });
    lecture.save();
    const prompt_by_chapter = `I want you to act as a slides generator. Note that a slide consists of \
      a title, 4-7 bullet points (in full english sentences) and an example if you feel \
      appropriate. If the link is math heavy, wrap math fomulae in latex code. If it's \
      code heavy, wrap code in code blockl. Remember that your audience will be college \
      students, and your generation will help professors. I want you to only reply with the \
      side's content inside one message and nothing else. Do not write explanations.  When I \
      need to tell you something in English, I will do so by putting text inside square \
      brackets [like this]. Remember, your reply must be in a template like \
      '# <Title> ##<Optional Subtitle> --- #<Slide 1 Title> <Slide 1 Content> --- # <Slide 2 Title> <Slide 2 Content>' \
      and so on; note the markdown formatting with three dashes between each H1 heading. \
      Remember, you should generally give me 8-10 slides, but if the material is denser \
      and requires more profound understanding, you may exceed the 8-10 slide limit! \
      My first command is [ONLY Read the chapter titled ${chapter_title} but no other chapter from \
      this link ${pdf_link}. \
      Generate a powerpoint. The number of slides should be proportional to the number of \
      subsections in the chapter. For EACH slide, make it VERY VERY concrete and give \
      examples from the link if needed. You should format your response in RAW \
      markdown syntax: for code. DO NOT RENDER THET MARKDOWN. GIVE ME RAW MARDOWN TEXTS.]`;

    const response_per_chapter = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt_by_chapter }],
      max_tokens: 500,
      temperature: 0,
    });

    response_chapter_slides[chapter_title] =
      response_per_chapter.data.choices[0].message.content.trim();
    lecture.status = "ready";
    lecture.save();
    jsonDumping(response_chapter_slides[chapter_title], lecture.lectureId);
    console.log(response_chapter_slides);
  }

  console.log("All lectures have been generated");
}

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
