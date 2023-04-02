import express from "express";
import { Schema, model, connect } from "mongoose";
import { lectureSchema, ILecture } from "./Models/Lecture";
import { connectToMongo } from "./db";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config({ path: "./env" });

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Render homepage here");
});

app.post("/lecture", (req, res) => {
  // 3. Create a Model.
  const Lecture = model<ILecture>("Lecture", lectureSchema);

  const { pdfPath, course, tone, reminder, mintAsNFT, IPFS } = req.body;

  connectToMongo().catch((err) => console.log(err));

  const lecture = new Lecture(req.body);

  lecture.save();

  console.log("Lecture Details Saved");

  res.send("Lecture homepage here");
});

app.post("/generate-content", async (req, res) => {
  try {
    const { pdf_link } = req.body;

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

      console.log(response_chapter_slides);
    }

    res.json({ success: true, response_chapter_slides });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
