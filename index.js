
const Nightmare = require('nightmare');

const _ = require('lodash');
const rp = require('request-promise');
const random_useragent = require('random-useragent');

rp('http://gimmeproxy.com/api/getProxy',{
  qs : {
    'protocol' : 'http',
    "user-agent" : true,
  }
})
.then(result => {
  result = JSON.parse(result)

  const nightmare = Nightmare({
    show: false,
    webPreferences: {
      plugins: true
    },
    switches : {
      'ppapi-flash-path': process.platform === 'darwin' ? './PepperFlashPlayer.plugin' : './libpepflashplayer.so',
      'proxy-server': `${result.type}://${result.ipPort}`,
      'ignore-certificate-errors': true
    }
  });

  const page = nightmare
    // .useragent(random_useragent.getRandom(ua => ua.browserName == 'Chrome'))
    .goto('http://www.twitch.tv/jbozzz')
    .on('page', console.log.bind(console))

    .run((err, nightmare) => {
      if (err) return console.error(err);

    });
})
