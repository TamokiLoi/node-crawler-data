module.exports = {
    ABC: function (URL) {
        console.log(URl);
        const fetchImages = require("../util/feach-images");

        const list = [
            {
                domain: "blogtruyen",
                referer: "https://blogtruyen.vn",
                selector: "#content img",
            },
            {
                domain: 'manganelo',
                referer: "https://manganelo.com",
                selector: ".container-chapter-reader img",
            }
        ];

        // const URL = 'https://blogtruyen.vn/c2240/one-piece-chap-1';
        // const URL = 'https://manganelo.com/chapter/sangokushi/chapter_6';
        const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/img;
        const match = URL.match(regex);

        list.map(item => {
            if (item.referer == match) {
                item['url'] = URL;
                fetchImages.fetchImages(item);
            }
        })
    }
}