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

// tried this function that scales the image to fit canvas dimensions
// and then draw it, but it doesn't work for some reason.
function scaleAndDraw(image, canvas, ctx){
    let aspectRatio = image.naturalWidth / image.naturalHeight;
    let width = 0;
    let height = 0;
    let offSetX = 0;
    let offSetY = 0;
  
    if(aspectRatio >= 1){
      width = image.naturalWidth > canvas.width ? canvas.width : image.naturalWidth;
      height = Math.round(width / aspectRatio);
    }
    else {
      height= image.naturalHeight > canvas.height ? canvas.height : image.naturalHeight;
      width = Math.round(height * aspectRatio);
    }
  
    offSetX = width < canvas.width ? (canvas.width - width) / 2 : 0;
    offSetY = height < canvas.height ? (canvas.height - height) / 2 : 0;
  
    ctx.drawImage(image, offSetX, offSetY,  width, height);
  
    console.log(`offSetX = ${offSetX}, offSetY = ${offSetY}, width = ${width}, height = ${width}, aspectRatio = ${aspectRatio}`);
  
  }

// this is the alternative of the previous function for scaling the image and drawing it
// on canvas through the canvas element's style (CSS background properties)
function drawOnCanvas(canvas, url) {
    canvas.style.background = `url("${url}")`;
    canvas.style.backgroundSize = 'contain';
    canvas.style.backgroundPositionX = 'center';
    canvas.style.backgroundPositionY = 'center';
    canvas.style.backgroundRepeat = 'no-repeat';
}


//this function turns a 1D array into a 2D array inorder to make it easier to write image processing algorithms
//when using this keep in mind RGBA encoding, so the actual size of a row (the width parameter) is the width of the image
// multiplied by 4: width = image.width * 4
function to2DArray(array, width){
  let sub_array = [];
  let new_array = [];

  array.forEach((element, index) => {
    sub_array.push(element);
    if((index+1)%width == 0){
      new_array.push(sub_array);
      sub_array = [];
    }
  });

  return new_array;
}

function median(array){
  let median = 0;
  let center = array.length/2;
  array.sort((a, b) => {return a-b});
  if(array.length%2 == 0){
    median = (array[center-1]+array[center])/2;
  }
  else{
    median = array[Math.floor(center)];
  }
  return median;
}