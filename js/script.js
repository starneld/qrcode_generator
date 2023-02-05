require.config({
    paths: {
        QRCode: "js/easy.qrcode.min"
    }
});
// set data variables
var qr_btn = document.querySelector("#qr-btn");
var container = document.getElementById('qrshow');

require(["QRCode"], function(QRCode) {
  var demoParams = [
    {
      title: '.svg',
      config: {
        text: input,
        
        drawer: 'svg',
        
        width: 200,
        height: 200,
        quietZone: 10,
        colorDark: "#000000",
        colorLight: "#ffffff",
        
        //PI: '#f55066',
        
        correctLevel: QRCode.CorrectLevel.H // L, M, Q, H
      }
    },
    {
      title: '.png',
      config: {
        text: input,
        
        width: 400,
        height: 400,
        quietZone: 10,
        colorDark: "#000000",
        colorLight: "#ffffff",
        
        //PI: '#f55066',
        
        correctLevel: QRCode.CorrectLevel.H // L, M, Q, H
      }
    }
  ]
  
  qr_btn.addEventListener("click", () => {
    // Get Input value
    var input = document.querySelector("#input").value
    // Clean Html Container
    container.innerHTML = '';
    if (input == '') {
      return;
    }
    ShowQrCodes(demoParams,QRCode);
  })
})

function ShowQrCodes(demoParams,QRCode){
  for (var i = 0; i < demoParams.length; i++) {
    var qrcodeTpl = document.getElementById("qrcodeTpl").innerHTML;
    var qrcodeHTML = qrcodeTpl.replace(/\{title\}/, demoParams[i].title).replace(/{i}/, i).replace(/{y}/, i);
    container.innerHTML += qrcodeHTML;
  }
  for (var i = 0; i < demoParams.length; i++) {
    var t = new QRCode(document.getElementById("qrcode_" + i), demoParams[i].config);
    var dbtn = document.getElementById("descargar_" + i)
    dbtn.setAttribute("value", i);
    dbtn.setAttribute("data-imagetype", demoParams[i].title);
    dbtn.addEventListener(
      "click",
      function() {
        /* Download(QRCode); */
        var tipo = this.getAttribute("data-imagetype");
        var imageId = "qrcode_"+this.value;
        switch (tipo) {
        case '.png':
          var filename = "qrcode.png";
          downloadPng(imageId,filename);
          break;
        case '.svg':
          var filename = "qrcode.svg";
          downloadSvg(imageId, filename);
          break;
        }
      },
      false
    );    
  }
};
      
function downloadSvg(imageId, filename) {
  var qrimg = document.getElementById(imageId).innerHTML
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(qrimg)
  );
  element.setAttribute("download", filename);
  downloadImg(element)
}

function downloadPng(imageid, fileName) {
  var canvasElement = document.getElementById(imageid).firstChild;
  var MIME_TYPE = "image/png";
  var imgURL = canvasElement.toDataURL(MIME_TYPE);
  var element = document.createElement('a');
  element.download = fileName;
  element.href = imgURL;
  element.dataset.downloadurl = [MIME_TYPE, element.download, element.href].join(':');
  downloadImg(element)
}

function downloadImg(el) {
  console.log(el);
  el.style.display = "none";
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
}