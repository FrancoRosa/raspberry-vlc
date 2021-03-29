# raspberry-vlc
> Signage system with Rpi

## Run services
To run the scripts on boot, we will use ```pm2```
``` BASH
sudo npm install -g pm2
```
After installation, we will run the services
``` BASH
pm2 start /home/pi/raspberry-vlc/api/disp1/index.js  -x --name "video-server"
```
``` BASH
pm2 start /home/pi/raspberry-vlc/api/disp1/boot.js  -x --name "video-start"
```
Once done, lets create the start up service with the command bellow
``` BASH
sudo env PATH=$PATH:/usr/local/bin pm2 startup systemd -u pi --hp /home/pi
```
Finally, save the current services to be run from boot with:
``` BASH
pm2 save
```
