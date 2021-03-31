const { exec } = require('child_process');

const configVideo = '/uploaded/video.sh';

let i = 0;
setInterval(() => {
  i = i+1
  console.log('>>> ',i)
}, 1000);

setTimeout(() => {
  exec('DISPLAY=:0 ' + __dirname + configVideo, (err, stdout, stderr) => {
    console.log(err);
    console.log(stdout);
    console.log(stderr);
    console.log('... finish vlc');
  })
}, 5000)
