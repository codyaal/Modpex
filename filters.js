// this averaging filter (filtre moyenneur) works when writing code for 3x3 matrix
// but there is a problem when i tried to generalize it for a matrix of size k x k
// am still working on it ...
function averagingFilter(image, canvasObj, filterSize){
    let im = structuredClone(image);
    let imdata = im.data;
    let k = Math.floor(Math.sqrt(filterSize)/2) * 4;
    let start = k * (im.width + 4);
    let end = imdata.length - start;
    let up = 0, down = 0, sumR = 0, sumG = 0, sumB = 0;
    for(let i = start; i < end ; i += 4){
      up = i - im.width;
      down = i + im.width;
      for(let j=0; j<k; j+=4){
        sumR = imdata[i+j] + imdata[i-j] + imdata[up-j] + imdata[up+j] + imdata[down-j] + imdata[down+j];
        sumG = imdata[i+j+1] + imdata[i-j+1] + imdata[up-j+1] + imdata[up+j+1] + imdata[down-j+1] + imdata[down+j+1];
        sumB = imdata[i+j+2] + imdata[i-j+2] + imdata[up-j+2] + imdata[up+j+2] + imdata[down-j+2] + imdata[down+j+2];
      }
      imdata[i] = sumR + imdata[i] + imdata[up] + imdata[down] / filterSize;
      imdata[i+1] = sumG + imdata[i+1] + imdata[up+1] + imdata[down+1] / filterSize;
      imdata[i+2] = sumB + imdata[i+2] + imdata[up+2] + imdata[down+2] / filterSize;
    }
  
    // for(let i = 4+im.width; i < imageData.length - im.width - 4; i +=4){
    //   up = i-im.width;
    //   down = i+im.width;
    //   imdata[i] = (imdata[i-4] + imdata[i] + imdata[i+4] + imdata[up-4] + imdata[up] + imdata[up+4] + imdata[down-4] + imdata[down] + imdata[down+4]) / 9;
  
    //   imdata[i+1] = (imdata[i+1-4] + imdata[i+1] + imdata[i+1+4] + imdata[up+1-4] + imdata[up+1] + imdata[up+1+4] + imdata[down+1-4] + imdata[down+1] + imdata[down+4+1]) / 9;
  
    //   imdata[i+2] = (imdata[i+2-4] + imdata[i+2] + imdata[i+2+4] + imdata[up+2-4] + imdata[up+2] + imdata[up+2+4] + imdata[down+2-4] + imdata[down+2] + imdata[down+2+4]) / 9;
    // }
  
    let imURL = getImageURL(im, canvasObj.canvas, canvasObj.ctx);
  
    return {imagedata: im, imURL: imURL};
  }
