const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');

const configFile = '/uploaded/config.json';
const configVideo = '/uploaded/video.sh';
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

const writeConfigVideo = command => {
  console.log('... write file for boot reproduction')
  console.log('>> command:', command)
  fs.writeFile(__dirname + configVideo, command ,err => {
    if(err) {
      console.log('... failed saving config video');
      console.log(err);
    } else {
      console.log('... success saving config video');
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
  exec('pkill -f "vlc --loop"', (err, stdout, stderr) => {
    console.log('... get to \'/api/play\'')
    console.log('killing vlc proccess');
    console.log(req.body)
    const vlc_file = `${__dirname}/uploaded/${req.body.video}`
    const vlc_blur = req.body.blur
    const blur_enabled = req.body.blur > 0 ? true : false
    process.env.VLC_FILE = vlc_file
    process.env.VLC_BLUR = vlc_blur 
    let vlc_command = `omxplayer --loop --no-osd -o hdmi ${vlc_file}`
    console.log(vlc_command);
    writeConfigVideo(vlc_command);
    console.log('... start vlc');
    exec(vlc_command, (err, stdout, stderr) => {
      console.log(err);
      console.log(stdout);
      console.log(stderr);
      console.log('... finish vlc');
    })
  })
  res.send('paying')
})

app.get('/api/stop', (req,res) => {
  console.log('... post to \'/api/stop\'')
  exec('pkill -f "vlc --loop"', (err, stdout, stderr) => {
    console.log('killing vlc proccess');
  })
  res.send('stopped')
})



port = 10000
app.listen(port, () => console.log('...listening on ' + port))