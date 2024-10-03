// this averaging filter (filtre moyenneur) works when writing code for 3x3 matrix
// but there is a problem when i tried to generalize it for a matrix of size k x k
// am still working on it ...
function averagingFilter(image, imdata2D, canvasObj, filterSize){
    let im = structuredClone(image);
    let imdata = im.data;
    let S = filterSize**2;
    let k = Math.floor(filterSize/2) * 4;
    let sumR = 0, sumG = 0, sumB = 0, location = 0;
    let height = image.height;
    let width = image.width*4;
    
    for(let i = (k/4); i < (height - k/4); i++){
      for(let j = k; j < (width - k); j +=4){
        for(let x = -(k/4); x<=k/4;x++){
          for(let y = -k ; y<=k; y+=4){
            sumR+= imdata2D[i+x][j+y];
            sumG+= imdata2D[i+x][j+y+1];
            sumB+= imdata2D[i+x][j+y+2];
          }
        }
        location = i*width+j;
        imdata[location] = sumR/S;
        imdata[location+1] = sumG/S;
        imdata[location+2] = sumB/S;
        sumR = 0;
        sumG = 0;
        sumB = 0;
      }
    }
  
    let imURL = getImageURL(im, canvasObj.canvas, canvasObj.ctx);
  
    return {imagedata: im, imURL: imURL};
  }
