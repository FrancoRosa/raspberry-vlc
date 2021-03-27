const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const { exec } = require('child_process');

const configFile = '/uploaded/config.json';
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
      console.log(err);
    } else {
      console.log('... success saving config file');
    }
  });
}

readConfigFile()

const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  // debug: true,
}));

app.get('/', (req, res) => {
  console.log('... get to \'/\'')
  res.send('... server working, waiting for commands\n');
});

app.get('/api/videos', (req,res) => {
  readConfigFile()
  console.log('... get to \'/api/videos\'')
  res.send(config)
})

app.put('/api/videos/:id', (req, res) => {
  console.log('... put to \'/api/videos/:id\'')
  console.log(req.body)
  const video = config.find(video => video.id===req.params.id) 
  if (!video) res.status(404).send('video not found, upload it first')
  video.features = req.body.features
  writeConfigFile();
  res.send(video);
})

app.get('/api/videos/:id', (req,res) => {
  console.log('... get to \'/api/videos/:id\'')
  const video = video[video.indexOf(req.params.id)]
  if (!video) res.status(404).send('not found')
  res.send(video);
})

app.delete('/api/videos/:id', (req, res) => {
  console.log('... delete to \'/api/videos/:id\'')
  const video = config[config.indexOf(req.params.id)] 
  if (!video) res.status(404).send('not found')
  const index = config.indexOf(video)
  config.splice(index, 1)
  fs.rm(__dirname+'/uploaded/'+req.params.id,err=>{
    if (err) console.log('... file can not be removed');
    else console.log('... file removed!')
  })
  res.send(video);
  writeConfigFile();
})

app.post('/api/videos', (req, res) => {
  console.log('... post to \'/api/videos\'')
  let sampleFile;
  let uploadPath;
  let files;
  
  fs.readdir(__dirname+'/uploaded', (err, data) => {
    files = data
    console.log(files)
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
    if (files.includes(req.files.sampleFile.name)) {
        return res.status(200).send('File already uploaded');
    }
    if (err) console.log(err)
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/uploaded/' + sampleFile.name;
    config.push(sampleFile.name)
    console.log(req)
    console.log("sampleFile", sampleFile);
    console.log("uploadPath", uploadPath);
    console.log("files", files);
    
    writeConfigFile();
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.send('File uploaded!');
    });
  })
  
});

app.post('/api/play', (req,res) => {
  console.log('... get to \'/api/play\'')
  console.log(req.body)
  // exec('dir', (err, stdout, stderr) => {
  //   console.log(err)
  //   console.log(stdout)
  //   console.log(stderr)
  // })
  res.send('paying')
})

app.get('/api/stop', (req,res) => {
  console.log('... post to \'/api/stop\'')
  // exec('dir', (err, stdout, stderr) => {
  //   console.log(err)
  //   console.log(stdout)
  //   console.log(stderr)
  // })
  res.send('stopped')
})



port = 10000
https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
.listen(port, () => console.log('...listening on ' + port))