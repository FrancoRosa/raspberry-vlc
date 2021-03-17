const express = require('express');
const fileUpload = require('express-fileupload');
const Joi = require('joi');
const app = express();

app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  debug: true,
}));

const courses = [
  { id: 1, name: 'course1'},
  { id: 2, name: 'course2'},
  { id: 3, name: 'course3'},
  { id: 4, name: 'course4'},
]

app.get('/', (req, res) => {
  res.send('waiting for commands\n');
});

app.get('/api/courses', (req,res) => {
  res.send(courses)
})

app.post('/api/courses', (req, res) => {
  const course = {
    id: courses.length + 1,
    name: req.body.name
  }
  courses.push(course)
  res.send(course)
})

app.get('/api/courses/:id', (req,res) => {
  const course = courses.find(course => course.id===parseInt(req.params.id)) 
  if (!course) res.status(404).send('not found')
  res.send(course);
})

app.post('/upload', function(req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/uploaded/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
});

app.listen(3000, () => console.log('...listening on 3000, great'))