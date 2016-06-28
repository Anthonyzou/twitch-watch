
#!/usr/bin/env node

const Nightmare = require('nightmare');

const _ = require('lodash');
var rp = require('request-promise');

const ua = [
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.97 Safari/537.36",
  "Chilkat/1.0.0 (+http://www.chilkatsoft.com/ChilkatHttpUA.asp)",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 9_0 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13A342 Safari/601.1",
  "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36",
  "Chilkat/1.0.0 (+http://www.chilkatsoft.com/ChilkatHttpUA.asp)",
  "Mozilla/5.0 (compatible; MSIE 10.0; Windows Phone 8.0; Trident/6.0; IEMobile/10.0; ARM; Touch; Microsoft; Lumia 640 XL)",
  "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.5.2171.95 Safari/537.36",
]

rp('http://gimmeproxy.com/api/getProxy')
.then(result => {
  console.log(result)

  const nightmare = Nightmare({
    show: true,
    webPreferences: {
      plugins: true
    },
    switches : {
      'ppapi-flash-path': './libpepflashplayer.so',
      'proxy-server': result.ipPort,
    }
  });
  const page = nightmare
    .useragent(_.sample(ua))
    .goto('http://www.twitch.tv/malothekilla')
    .on('page', console.log.bind(console))

    .run((err, nightmare) => {
      if (err) return console.error(err);

    });
})
