const  themeToggle  = () => {
  const root = document.querySelector(":root");
  const themeSwitcherLabel = document.querySelector(".theme-switcher-label");
  root.toggleAttribute("light");

  themeSwitcherLabel
    .querySelectorAll(".icon")
    .forEach((icon) => icon.classList.toggle("collapse"));
};

const sideBarToggle = () => {
  const sideBarToggleLabel = document.querySelector(".side-bar-toggle-label");
  const sideBar = document.getElementById("sideBar");
  const workSpace = document.getElementById("work-space");

  sideBar.toggleAttribute("collapse");
  workSpace.toggleAttribute("fullScreen");
  sideBarToggleLabel
    .querySelectorAll(".icon")
    .forEach((icon) => icon.classList.toggle("collapse"));
};

function initCollapsibles(){
    const collapsibles = document.getElementsByClassName("collapsible");
    for(i=0; i<collapsibles.length; i++){
        let collapsible = collapsibles[i];
        let content = collapsibles[i].nextElementSibling;
        collapsibles[i].addEventListener("click", () => {
            collapsible.classList.toggle("active-title");
            if(content.style.maxHeight){
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        })
    }
}

// another method of scaling the image and drawing it on canvas through
// the canvas element's style (CSS background properties)
function drawOnCanvas(canvas, url) {
    canvas.style.background = `url("${url}")`;
    canvas.style.backgroundSize = 'contain';
    canvas.style.backgroundPositionX = 'center';
    canvas.style.backgroundPositionY = 'center';
    canvas.style.backgroundRepeat = 'no-repeat';
}


// tried this function that scales the image to fit canvas dimensions
// and then draw it on the canvas, but it doesn't work for some reason.
function scaleAndDraw(image){
    let aspectRatio = image.naturalWidth / image.naturalHeight;
    let width = 0;
    let height = 0;
    let offSetX = 0;
    let offSetY = 0;
  
    if(aspectRatio >= 1){
      width = image.naturalWidth > ogcanvas.width ? ogcanvas.width : image.naturalWidth;
      height = Math.round(width / aspectRatio);
    }
    else {
      height= image.naturalHeight > ogcanvas.height ? ogcanvas.height : image.naturalHeight;
      width = Math.round(height * aspectRatio);
    }
  
    offSetX = width < ogcanvas.width ? (ogcanvas.width - width) / 2 : 0;
    offSetY = height < ogcanvas.height ? (ogcanvas.height - height) / 2 : 0;
  
    ogctx.drawImage(image, offSetX, offSetY,  width, height);
  
    console.log(`offSetX = ${offSetX}, offSetY = ${offSetY}, width = ${width}, height = ${width}, aspectRatio = ${aspectRatio}`);
  
  }