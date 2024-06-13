const THEMETOGGLE = document.getElementById("theme-switcher");
const SIDEBARTOGGLE = document.getElementById("side-bar-toggle");
const IMAGEINPUT = document.getElementById("imageInput");
const OG_CANVAS = document.getElementById("original-image");
const CANVAS = document.getElementById("current-image");

let image;
let imageData;

THEMETOGGLE.onclick = themeToggle;

SIDEBARTOGGLE.onclick = sideBarToggle;

initCollapsibles();

IMAGEINPUT.onchange = () => {
  let img = IMAGEINPUT.files[0];
  let imgBlob = new Blob([img], { type: "image/jpeg" });
  let url = window.URL.createObjectURL(imgBlob);

  image = new Image();
  image.src = url;

  image.onload = () => {
    let canvasObj = getCTX(image);
    imageData = imRead(image, canvasObj.ctx);
    drawOnCanvas(OG_CANVAS, url);
    drawOnCanvas(CANVAS, grayScale(imageData, canvasObj));
  };
};

