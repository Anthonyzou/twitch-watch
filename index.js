const Nightmare = require('nightmare');
const axios = require('axios');

const run = async () => {
  const { data } = await axios('http://gimmeproxy.com/api/getProxy', {
    qs: {
      protocol: 'http',
      'user-agent': true,
      supportsHttps: true,
    },
  });
  const { type, ipPort } = data;

  const proxy = `${type}://${ipPort}`;
  const nightmare = Nightmare({
    show: true,
    webPreferences: {
      plugins: true,
    },
    switches: {
      'ppapi-flash-path':
        process.platform === 'darwin'
          ? './PepperFlashPlayer.plugin'
          : './libpepflashplayer.so',
      'proxy-server': proxy,
      'ignore-certificate-errors': true,
    },
  });

  const page = nightmare
    .goto('http://www.twitch.tv/jbozzz')
    .on('page', console.log.bind(console))

    .run((err, nightmare) => {
      if (err) {
        console.error('err', err);
        page.end();
        run();
      }
    });
};

run();
