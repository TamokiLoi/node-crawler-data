var cloudscraper = require('cloudscraper');
const cheerio = require("cheerio");
var fs = require('fs');
var request = require('request');

const URL_REFERER = 'https://blogtruyen.vn/';
(async function () {
    try {
        // Lấy dữ liệu từ trang crawl đã được parseDOM
        const html = await cloudscraper.get('https://blogtruyen.vn/c2240/one-piece-chap-1');
        var $ = cheerio.load(html);
    } catch (error) {
        return error;
    }

    const dir = `./assets/data/${new Date().valueOf()}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }

    var download = function (uri, filename, callback) {
        return new Promise(resolve => {
            const options = {
                url: uri,
                headers: {
                    'referer': URL_REFERER
                }
            };
            request.head(options, function (err, res, body) {
                console.log('content-type:', res.headers['content-type']);
                console.log('content-length:', res.headers['content-length']);
                request(options).pipe(fs.createWriteStream(`${dir}/${filename}`)).on('close', () => {
                    callback();
                    return resolve(true);
                });
            });
        });
    };

    const arr = [];
    $("#content img").each((i, e) => {
        const url = $(e).attr("src");
        if (url) {
            arr.push(url);
        }
    });

    for (let i = 0; i < arr.length; i -= -1) {
        const url = arr[i];
        await download(url, `${i + 1}.jpg`, function () {
            console.log(`Done ${i + 1}`);
        });
    }

    console.log(arr);
})();
