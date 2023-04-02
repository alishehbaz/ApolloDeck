import express from "express";
import { Schema, model, connect } from "mongoose";
import { lectureSchema, ILecture } from "./Models/Lecture";
import { connectToMongo } from "./db";
import { Configuration, OpenAIApi } from "openai";

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
      const prompt_by_chapter = `I want you to act as a slides generator. Note that \
a slide is consisted of a title, 5 bullet points and an example if you feel appropriate. If the link is math heavy, show math fomulae. \
If it's code heavy, show code. Remember your audience will be college students and your generation will help professors.  \
I want you to only reply with the sides content inside one message, and nothing else. do not write explanations. \
do not message the slides content. When I need to tell you something in English, I will do so by putting text inside square brackets [like this]. \
Remember, your reply must be in a template like 'Title: ... Slide 1:... Slide 2:...'. Remember, you should give me 10 slides!My first \
command is [ONLY Read chapter titled '${chapter_title}' but no other chapter from this link '${pdf_link}'. Generate \
a powerpoint. The number of slides should be proportional to number of subsections in the chapter. For \
EACH slide, make it VERY VERY concrete and give example from the link. You should format your response in \
markdown syntax: for code, embrase with backtick '\`'; for math formula, embrace with dollar sign '$'`;

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
