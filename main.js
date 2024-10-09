const THEMETOGGLE = document.getElementById("theme-switcher");
const SIDEBARTOGGLE = document.getElementById("side-bar-toggle");
const IMAGEINPUT = document.getElementById("imageInput");
const APPLY = document.getElementById("apply");
const EFFECTS = document.getElementById("effects");
const AVG_FILTER = document.getElementById("avg_filter");
const MEDIAN_FILTER = document.getElementById("median_filter");
const OG_CANVAS = document.getElementById("original-image");
const CANVAS = document.getElementById("current-image");

let image;
let ogImageData;
let ogImageData2D;
let newImageData;
let canvasObj;

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
    canvasObj = getCTX(image);
    ogImageData = imRead(image, canvasObj.ctx);
    newImageData = structuredClone(ogImageData);
    ogImageData2D = to2DArray(ogImageData.data, ogImageData.width*4);
    console.log(ogImageData2D);
    drawOnCanvas(OG_CANVAS, url);
    //this line resets the current image canvas when new image is loaded
    CANVAS.style.background = "";
    // drawOnCanvas(CANVAS, averagingFilter(ogImageData, ogImageData2D, canvasObj, 15).imURL);
  };
};

APPLY.onclick = () => {
  if(CANVAS.style.background == "") return;
  ogImageData = structuredClone(newImageData);
  ogImageData2D = to2DArray(ogImageData.data, ogImageData.width*4);
  OG_CANVAS.style.background = CANVAS.style.background;
  CANVAS.style.background = "";
};

EFFECTS.onclick = (e) => {
  let imgObj = effectSelected(e ,ogImageData, canvasObj, CANVAS);
  if(imgObj) newImageData = structuredClone(imgObj.imageData);
};

AVG_FILTER.onclick = (e) => {
  let imgObj = avgKernelSelected(e ,ogImageData, ogImageData2D, canvasObj, CANVAS);
  if(imgObj) newImageData = structuredClone(imgObj.imageData);
};

MEDIAN_FILTER.onclick = (e) => {
  let imgObj = medianKernelSelected(e ,ogImageData, ogImageData2D, canvasObj, CANVAS);
  if(imgObj) newImageData = structuredClone(imgObj.imageData);
};

