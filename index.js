
const Nightmare = require('nightmare');
const rp = require('request-promise');

const run = () => {
  rp('http://gimmeproxy.com/api/getProxy', {
    qs : {
      'protocol' : 'http',
      "user-agent" : true,
      supportsHttps: true,
    }
  })
  .then(result => {

    result = JSON.parse(result);

    const proxy = `${result.type}://${result.ipPort}`;
    const nightmare = Nightmare({
      show: true,
      webPreferences: {
        plugins: true
      },
      switches : {
        'ppapi-flash-path': process.platform === 'darwin' ? './PepperFlashPlayer.plugin' : './libpepflashplayer.so',
        'proxy-server': proxy,
        'ignore-certificate-errors': true
      }
    });

    const page = nightmare
      .goto('http://www.twitch.tv/jbozzz')
      .on('page', console.log.bind(console))

      .run((err, nightmare) => {
        if (err) {
          console.error("err", err);
          nightmare.end();
          run();
        }
      });

  });
}

run();
