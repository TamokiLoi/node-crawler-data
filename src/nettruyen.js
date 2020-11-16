//file: index.js
const rp = require("request-promise");
const cheerio = require("cheerio");
var fs = require('fs'),
    request = require('request');

// const URL = `https://manganelo.com/chapter/sangokushi/chapter_6`;
// const URL = `https://blogtruyen.vn/c2240/one-piece-chap-1`;
const URL = `http://www.nettruyen.com/truyen-tranh/dao-hai-tac/chap-994/650385`;

const options = {
    uri: URL,
    transform: function (body) {
        //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
        return cheerio.load(body);
    },
};
console.log("aaaaa");

(async function crawler() {
    try {
        // Lấy dữ liệu từ trang crawl đã được parseDOM
        var $ = await rp(options);
    } catch (error) {
        console.log(error);
        return error;
    }

    console.log($(".reading-detail .page-chapter img"));

    const arr = [];
    $(".reading-detail .page-chapter img").each((i, e) => {
        const url = $(e).attr("src");
        if (url) {
            arr.push(url);
        }
    });

    console.log([]);


    // const dir = `./assets/data/${new Date().valueOf()}`;
    // if (!fs.existsSync(dir)) {
    //     fs.mkdirSync(dir);
    // }

    // var download = function (uri, filename, callback) {
    //     return new Promise(resolve => {
    //         const options = {
    //             url: uri,
    //             headers: {
    //                 'referer': ' https://manganelo.com/'
    //             }
    //         };
    //         request.head(options, function (err, res, body) {
    //             console.log('content-type:', res.headers['content-type']);
    //             console.log('content-length:', res.headers['content-length']);
    //             request(options).pipe(fs.createWriteStream(`${dir}/${filename}`)).on('close', () => {
    //                 callback();
    //                 return resolve(true);
    //             });
    //         });
    //     });
    // };

    // const arr = [];
    // $(".container-chapter-reader img").each((i, e) => {
    //     const url = $(e).attr("src");
    //     if (url) {
    //         arr.push(url);
    //     }
    // });

    // for (let i = 0; i < arr.length; i -= -1) {
    //     const url = arr[i];
    //     await download(url, `${i + 1}.jpg`, function () {
    //         console.log(`Done ${i + 1}`);
    //     });
    // }
})();