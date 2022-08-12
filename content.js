let srcURL;
let placeX;
let placeY;
//wss://ws.mosaic.ludwig.gg/

let container;
let canvas;
let ctx;
let imgCanvas;
let img;
let imgCtx;
let updateInterval;
container = document.querySelector("div.svelte-1gkt69q");
canvas = document.querySelector("canvas.svelte-15i8328");
ctx = canvas.getContext('2d');

getImgData();

document.onload =setup();

function setup() {
    imgCanvas = document.createElement("canvas");

    img = new Image();

    img.addEventListener("load", imgLoad(img));

    img.setAttribute("src", srcURL);

    updateInterval = setInterval(createOverlay, 1000);
}

function imgLoad(img) {
    imgCtx = imgCanvas.getContext('2d');

    imgCtx.drawImage(img, 0, 0);

}

function createOverlay() {
    getImgData();
    img.setAttribute("src", srcURL);
    canvas = document.querySelector("canvas.svelte-15i8328");
    ctx = canvas.getContext('2d');
    imgCtx.drawImage(img, 0, 0);
    var width = img.width;
    var height = img.height;

    for(let x = 0; x < width; x++) {
        for(let y = 0; y< height; y++) {
            try {
                let el = document.querySelector(`div.overlay-${x+placeX}-${y+placeY}`);
                el.parentNode.removeChild(el);
            } catch (error) {
                
            }

            let color = getPixelColor(imgCtx, x, y);
            let color2 = getPixelColor(ctx, x+placeX, y+placeY);

            if(color2[0] != color[0] && color2[1] != color[1] && color2[2] != color[2]) {
                createPixelOverlay(x+placeX, y+placeY, `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
            }
        }
    }
}

function testFunc () {
    test = document.createElement("div");
    test.className = "origin-top-left top-0 left-0 absolute pointer-events-none";
    test.style.transform = "translate3d(106px, 116px, 0px) scale(0.05)";
    test.style.background = "red";
    test.style.width = "20px";
    test.style.height = "20px";
    container.appendChild(test);
}

/*var interval = window.setInterval(()=> {
    console.log("var C");
    var c = ctx.getImageData(106, 116, 1, 1).data;
    console.log(`${c[0]}, ${c[1]}, ${c[2]}`);
}, 1000);*/

function getImgData() {
    chrome.runtime.sendMessage({ sender: 2 }, (response) => {
        srcURL = response.img;
        placeX = Number(response.x);
        placeY = Number(response.y);
    });
}

function getPixelColor(inCTX, x, y) {
    let color = [0, 0, 0];
    let c = inCTX.getImageData(x, y, 1, 1).data;
    color[0] = c[0];
    color[1] = c[1];
    color[2] = c[2];
    
    return color;
}

function createPixelOverlay(x, y, color) {
    pixelContainer = document.createElement("div");
    pixelContainer.className = `overlay-${x}-${y} origin-top-left top-0 left-0 absolute pointer-events-none`;
    pixelContainer.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(0.05)`;

    /*overlayText = document.createElement("div");
    overlayText.className = "text-xs absolute pointer-events-auto z-20 top-7 filter backdrop-blur-sm rounded-md bg-slate-200/50 py-1 px-2 -translate-x-1/2 left-1/2 cursor-pointer";
    overlayText.innerHTML = "Wrong Color";*/

    overlayPixel = document.createElement("div");
    overlayPixel.className = "inner svelte-f7h4n";
    overlayPixel.style.background = color;
    overlayPixel.style.opacity = "50%";

    container.appendChild(pixelContainer);
    //pixelContainer.appendChild(overlayText);
    pixelContainer.appendChild(overlayPixel);
}