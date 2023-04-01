import express from 'express';
import { Schema, model, connect } from 'mongoose';
import {lectureSchema, ILecture} from "./Models/Lecture";
import {connectToMongo} from "./db";

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Render homepage here');
});

app.post('/lecture', (req, res) => {

  // 3. Create a Model.
  const Lecture = model<ILecture>('Lecture', lectureSchema);
  
  const {pdfPath, course, tone, reminder, mintAsNFT, IPFS} = req.body;

  connectToMongo().catch(err => console.log(err));

  const lecture = new Lecture(req.body);

  lecture.save();

  console.log("Lecture Details Saved")

  res.send('Lecture homepage here');


})

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});