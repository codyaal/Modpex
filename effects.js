function grayScale(image, canvasObj){
    let im = structuredClone(image);
    let imdata = im.data;
    for (let i = 0; i < imdata.length; i += 4) {
      const avg = imdata[i] + imdata[i+1] + imdata[i+2] / 3;
      imdata[i] = avg;
      imdata[i+1] = avg;
      imdata[i+2] = avg;
    }
    
    let imURL = getImageURL(im, canvasObj.canvas, canvasObj.ctx);
    
    return {imageData: im, imURL: imURL};
  }

function inverted(image, canvasObj){
  let im = structuredClone(image);
  let imdata = im.data;
  for (let i = 0; i < imdata.length; i += 4) {
    imdata[i] = 255 - imdata[i];
    imdata[i+1] = 255 - imdata[i+1];
    imdata[i+2] = 255 - imdata[i+2];
  }
 
  let imURL = getImageURL(im, canvasObj.canvas, canvasObj.ctx);
  
  return {imageData: im, imURL: imURL};
}


function sepia(image, canvasObj){
  let im = structuredClone(image);
  let imdata = im.data;

  for (let i = 0; i < imdata.length; i += 4) {
    let red = imdata[i], green = imdata[i + 1], blue = imdata[i + 2];

		imdata[i] = Math.min(Math.round(0.393 * red + 0.769 * green + 0.189 * blue), 255);
		imdata[i + 1] = Math.min(Math.round(0.349 * red + 0.686 * green + 0.168 * blue), 255);
		imdata[i + 2] = Math.min(Math.round(0.272 * red + 0.534 * green + 0.131 * blue), 255);
  }

  let imURL = getImageURL(im, canvasObj.canvas, canvasObj.ctx);

  return {imageData: im, imURL: imURL};
}

function imnoise(image, canvasObj){
  let rand;
  let im = structuredClone(image);
  let imdata = im.data;
  for(let i = 0; i<imdata.length;i += 4){
    rand = Math.random();
    if(rand<0.02){
      imdata[i] = 0;
      imdata[i+1] = 0;
      imdata[i+2] = 0;
    } else if (rand<0.04){
      imdata[i] = 255;
      imdata[i+1] = 255;
      imdata[i+2] = 255;
    } 
  }
  let imURL = getImageURL(im, canvasObj.canvas, canvasObj.ctx);

  return {imageData: im, imURL: imURL};
}
