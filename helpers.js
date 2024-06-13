function getCTX(image){
    const canvas = document.createElement("canvas");
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext("2d");
    let canvasObj = {canvas: canvas, ctx: ctx};
    return canvasObj;
}

function imRead(image, ctx){
    ctx.drawImage(image,0,0);
    let imdata = ctx.getImageData(0, 0, image.naturalWidth, image.naturalHeight);
    return imdata;
}

function getImageURL(imageData, canvas, ctx){
    ctx.putImageData(imageData,0,0);
    let imURL = canvas.toDataURL("image/jpeg", 1);
    return imURL;
}