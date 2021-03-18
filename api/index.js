const express = require('express');
const fileUpload = require('express-fileupload');
const Joi = require('joi');
const app = express();
const fs = require('fs');

const configFile = '/uploaded/config.json';
let config = [];



const readConfigFile = () => {
  fs.readFileSync(__dirname + configFile, (err, data) => {
    if (data) {
      config = JSON.parse(data);
    } else {
      if (err.message.includes('no such file')) {
        console.log('... no config file found')
        writeConfigFile()          
      } else {
        console.log(err.message)
      }
    }
  });
}

const writeConfigFile = () => {
  fs.writeFileSync(__dirname + configFile, config ,err => {
    if(err) {
      console.log('... failed saving config file');
    } else {
      console.log('... success saving config file');
    }
  });
}

readConfigFile()
// TO DO:
// - See files available
// - A file update adds a new entry on db
// - Upload if the file dont exists
// - Get video configuration

app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  debug: true,
}));

app.get('/', (req, res) => {
  res.send('... server working, waiting for commands\n');
});

app.get('/api/videos', (req,res) => {
  res.send(config)
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