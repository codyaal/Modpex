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

const effectSelected = (event, ogImageData, canvasObj, canvas) => {
  let imObj;
  if(event.target && event.target.matches("input[type='radio']") && !event.target.classList.contains("applied-effect")){
    let appliedEffect = document.getElementsByClassName("applied-effect");
    switch (event.target.value) {
      case "grayscale":
        imObj = grayScale(ogImageData, canvasObj);
        drawOnCanvas(canvas, imObj.imURL);
        if (appliedEffect.length) appliedEffect['0'].classList.toggle("applied-effect");
        event.target.classList.toggle("applied-effect");
        break;
      case "noise":
        imObj = imnoise(ogImageData, canvasObj);
        drawOnCanvas(canvas, imObj.imURL);
        if (appliedEffect.length) appliedEffect['0'].classList.toggle("applied-effect");
        event.target.classList.toggle("applied-effect");
        break;
      case "inverted":
        imObj = inverted(ogImageData, canvasObj);
        drawOnCanvas(canvas, imObj.imURL);
        if (appliedEffect.length) appliedEffect['0'].classList.toggle("applied-effect");
        event.target.classList.toggle("applied-effect");
        break;
      case "sepia":
        imObj = sepia(ogImageData, canvasObj);
        drawOnCanvas(canvas, imObj.imURL);
        if (appliedEffect.length) appliedEffect['0'].classList.toggle("applied-effect");
        event.target.classList.toggle("applied-effect");
        break;
      default:
        break;
    }
  }
  return imObj;
}

const avgKernelSelected = (event, ogImageData, ogImageData2D, canvasObj, canvas) => {
  let imObj;
  if(event.target && event.target.matches("input[type='radio']") && !event.target.classList.contains("applied-kernel")){
    let appliedKernel = document.getElementsByClassName("applied-kernel");

    imObj = averagingFilter(ogImageData, ogImageData2D, canvasObj, parseInt(event.target.value));
    drawOnCanvas(canvas, imObj.imURL);
    if (appliedKernel.length) appliedKernel['0'].classList.toggle("applied-kernel");
    event.target.classList.toggle("applied-kernel");

  }
  return imObj;
}