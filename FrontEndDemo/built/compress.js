/**
 * 功能-用于Form表单批量图片的压缩和上传
 *Author:leeneo
 *Contact:leeneo@xingzhihen.com
 *posturl:上传图片的服务url
 *postFormID:要提交的form表单的id
 *fileInputName：要上传的图片关联input的name
 */
///
var fileName = "test";

function compressInit(formId, fileInputName, limitSize, imgQt, postUrl) {
    // console.log('compressInit start')

    form = document.getElementById(formId);
    formData = new FormData(form);
    _fileInputName = fileInputName;
    _postUrl = postUrl;
    imgFiles = formData.getAll(fileInputName);

    if (!imgFiles || imgFiles.length <= 0 || (imgFiles.length == 1 && imgFiles[0].size <= 0)) {
        ajax(formData, postUrl);
    } else {
        console.log('oldFiles')
        console.log(formData.getAll(fileInputName))
        formData.delete(fileInputName);
        for (var i = 0; i < imgFiles.length; i++) {
            if ((imgFiles[i]).size / 1024 >= limitSize) {
                photoCompress(imgFiles[i], imgQt, function (base64Codes) {
                    let bl = convertBase64UrlToBlob(base64Codes);
                    formData.append(fileInputName, bl, fileName);
                    console.log('photoCompress 回调')
                    if (formData.getAll(fileInputName).length === imgFiles.length) {
                        console.log('newFiles')
                        console.log(formData.getAll(fileInputName))    
                        ajax(formData, postUrl);
                        //extendAjaxSubmit(formId, postUrl, formData)
                    }
                })
            } else {
                formData.append(fileInputName, imgFiles[i]);
                console.log('未被压缩的')
                console.log(formData.getAll(fileInputName))
                if (formData.getAll(fileInputName).length === imgFiles.length) {
                    ajax(formData, postUrl);
                    //extendAjaxSubmit(formId, postUrl, formData)
                }
            }
        }
    }
    // console.log('compressInit end')
}


function photoCompress(file, w, callback) {
    fileName = file.name;
    var reader = new FileReader();
    fileName = file.name;
    reader.readAsDataURL(file);
    reader.onload = function () {
        var re = this.result;
        canvasDataURL(re, w, callback);
    };
}

function canvasDataURL(path, obj, callback) {
    // console.log('canvasDataURL')
    var img = new Image();
    img.src = path
    //var w = 0, h = 0, scale = w / h;
    img.onload = function () {
        // console.log('img.onload')
        //var that = this;
        var w = img.width,
            h = img.height,
            scale = w / h;
        w = obj.width || w;
        h = obj.height || (w / scale)
        var quality = 0.6
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d');
        var anw = document.createAttribute("width")
        var anh = document.createAttribute("height")
        anw.nodeValue = w.toString();
        anh.nodeValue = h.toString();
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(this, 0, 0, w, h)
        if (obj.quality && obj.quality <= 1 && obj.quality > 0)
            quality = obj.quality
        var base64 = canvas.toDataURL('image/jpeg', quality)
        callback(base64)
        // console.log(typeof callback+callback)
    }
}

function convertBase64UrlToBlob(urlData) {
    // console.log('convertBase64UrlToBlob')
    var arr = urlData.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], {
        type: mime
    })
}

//jq ajaxsubmit的方式会在压缩之前执行post，formData作为options.data传过去还会报错
//var options = {
//    type: "post",
//    url: "",
//    data: null,
//    success (data) {
//        if ($("#hidStatus").val() == 0) {
//            alert("保存成功");
//        }
//        else {
//            alert("发布成功");
//        }
//    },
//    headers: {
//        "Authorization": getAuthHeader()
//    },
//    error (obj, msg) {
//        alert(obj.responseJSON.Message);
//    },
//    resetForm: false
//};

//function extendAjaxSubmit(formId, posturl, formData) {
//    options.url = posturl;
//    options.data = formData;
//    $('#' + formId).ajaxSubmit(options);
//    console.log("post")
//}

function ajax(formData, postUrl) {
    var xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
    xhr.open("post", postUrl, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
    xhr.onload = uploadComplete; //请求完成
    xhr.onerror = uploadFailed; //请求失败
    // xhr.setRequestHeader("Authorization", getAuthHeader());
    //xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
    xhr.upload.onloadstart = function () { //上传开始执行方法
        let ot = new Date().getTime(); //设置上传开始时间
        let oloaded = 0; //设置上传开始时，以上传的文件大小为0
    };
    console.log('post');
    xhr.send(formData); //开始上传，发送form数据
}
let response;
//上传成功响应
function uploadComplete(obj) {
    // console.log(obj)
    response = JSON.parse(obj.target.responseText);
    //服务断接收完文件返回的结果
    //if ($("#hidStatus").val() == 0) {
    //    alert("发布成功！");
    //    location.reload();
    //}
    if (obj.target.status == 200) {
        if (response.value == true) {
            alert("发布成功！");
            form.reset();
        } else {
            alert(response.value);
        }
    } else {
        alert(response.Message);
    }

}
//上传失败
function uploadFailed(obj) {
    //msg = JSON.parse(obj.target.responseText).Message;
    alert(response.Message);
}