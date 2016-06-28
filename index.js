
const Nightmare = require('nightmare');

const _ = require('lodash');
const rp = require('request-promise');
const random_useragent = require('random-useragent');

rp('http://gimmeproxy.com/api/getProxy')
.then(result => {
  console.log(result)

  const nightmare = Nightmare({
    show: true,
    webPreferences: {
      plugins: true
    },
    switches : {
      'ppapi-flash-path': process.platform === 'darwin' ? './PepperFlashPlayer.plugin' : './libpepflashplayer.so',
      'proxy-server': result.ipPort,
    }
  });
  
  const page = nightmare
    .useragent(random_useragent.getRandom().userAgent)
    .goto('http://www.twitch.tv/malothekilla')
    .on('page', console.log.bind(console))

    .run((err, nightmare) => {
      if (err) return console.error(err);

    });
})
