function grayScale(image, canvasObj){
    let imdata = image.data;
    for (let i = 0; i < imdata.length; i += 4) {
      const avg = imdata[i] + imdata[i+1] + imdata[i+2] / 3;
      imdata[i] = avg;
      imdata[i+1] = avg;
      imdata[i+2] = avg;
    }

    image.data = imdata;
    let imURL = getImageURL(image, canvasObj.canvas, canvasObj.ctx);
    
    return imURL;
}