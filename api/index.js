const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');

const configFile = '\\uploaded\\config.json';
let config = [];

const readConfigFile = () => {
  fs.readFile(__dirname + configFile, (err, data) => {
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
  fs.writeFile(__dirname + configFile, JSON.stringify(config) ,err => {
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
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  // debug: true,
}));

app.get('/', (req, res) => {
  res.send('... server working, waiting for commands\n');
});

app.get('/api/videos', (req,res) => {
  res.send(config)
})

app.put('/api/videos/:id', (req, res) => {
  console.log(req.body)
  const video = config.find(video => video.id===req.params.id) 
  if (!video) res.status(404).send('video not found, upload it first')
  video.features = req.body.features
  writeConfigFile();
  res.send(video);
})

app.get('/api/videos/:id', (req,res) => {
  const video = config.find(video => video.id===req.params.id) 
  if (!video) res.status(404).send('not found')
  res.send(video);
})

app.delete('/api/videos/:id', (req, res) => {
  const video = config.find(video => video.id === req.params.id) 
  if (!video) res.status(404).send('not found')
  const index = config.indexOf(video).features
  config.splice(index, 1)
  fs.rm(__dirname+'/uploaded/'+req.params.id,err=>{
    if (err) console.log('... file can not be removed');
    else console.log('... file removed!')
  })
  res.send(video);
})

app.post('/api/videos', (req, res) => {
  let sampleFile;
  let uploadPath;
  let files;

  fs.readdir(__dirname+'/uploaded', (err, data) => {
    files = data
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    if (files.includes(req.files.sampleFile.name)) {
        return res.status(400).send('File already uploaded');
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/uploaded/' + sampleFile.name;
    config.push({
      id: sampleFile.name,
      features: {},
    })
    writeConfigFile();
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  })
  
});

app.get('/api/play', (req,res) => {
  exec('dir', (err, stdout, stderr) => {
    console.log(err)
    console.log(stdout)
    console.log(stderr)
  })
  res.send('paying')
})

app.get('/api/stop', (req,res) => {
  exec('dir', (err, stdout, stderr) => {
    console.log(err)
    console.log(stdout)
    console.log(stderr)
  })
  res.send('stoped')
})



port = 9999
app.listen(port, () => console.log('...listening on ' + port))