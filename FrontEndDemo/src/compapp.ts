// import { compressInit } from "./compress";

(function appStart () {
    // import * as compress from "./js/compressPics";
    var submit = document.getElementById('submit')
    var postUrl = 'http://localhost:7710/ELEC/odata/CompoentParts/Uploader';
    submit.onclick = function () {
        // compressInit(postUrl, 'commentForm', 'imgFile',2048)
    }
})()
