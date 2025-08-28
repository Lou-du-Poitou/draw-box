/*
$$$$$$$\                                   
$$  __$$\                                  
$$ |  $$ | $$$$$$\  $$$$$$\  $$\  $$\  $$\ 
$$ |  $$ |$$  __$$\ \____$$\ $$ | $$ | $$ |
$$ |  $$ |$$ |  \__|$$$$$$$ |$$ | $$ | $$ |
$$ |  $$ |$$ |     $$  __$$ |$$ | $$ | $$ |
$$$$$$$  |$$ |     \$$$$$$$ |\$$$$$\$$$$  |
\_______/ \__|      \_______| \_____\____/ 

    => Made by V / Lou du Poitou, (c) 2025
    => http://loudupoitou.dns-dynamic.net
*/
const canvas = document.querySelector("#canvas");
c = canvas.getContext("2d");
c.fillStyle = "lime";
let isDrawing, brushSize = 8;

function draw(x, y) {
  if (isDrawing) {
    if (document.querySelector("#tools").value !== "eraser") {
        c.beginPath();
        c.arc(x, y, brushSize, 0, Math.PI * 2);
        c.closePath();
        c.fill();
    } else {
        c.save();
        c.beginPath();
        c.roundRect(x, y, brushSize*2, brushSize*2, 50, false, true);
        c.clip();
        c.clearRect(x, y, brushSize*2, brushSize*2);
        c.restore();
    }
  }
}

canvas.addEventListener("mousemove", (event) => {
    draw(event.offsetX, event.offsetY);
});
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));

canvas.addEventListener("touchmove", (event) => {
    const r = canvas.getBoundingClientRect();
    draw(event.touches[0].pageX - r.left, event.touches[0].pageY - r.top);
});
canvas.addEventListener("touchstart", () => (isDrawing = true));
canvas.addEventListener("touchend", () => (isDrawing = false));

document
    .querySelector("#download")
    .addEventListener("click", (event) => {
        event.target.href = canvas.toDataURL();
        event.target.download = "sketch-" + crypto.randomUUID().substring(0, 8);
    });

const clear = document.querySelector("#clear");
clear.addEventListener("click", () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
});

const colors = document.querySelector("#colors");
colors.addEventListener("change", (e) => {
    c.fillStyle = e.target.value;
});

const background = document.querySelector("#background");
background.addEventListener("click", (e) => {
    if (canvas.style.background === "rgb(0, 0, 0)") {
        canvas.style.background = "#ffffff";
    } else {
        canvas.style.background = "#000000";
    }
});

const fill = document.querySelector("#fill");
fill.addEventListener("click", (e) => {
    c.fillRect(0, 0, canvas.width, canvas.height);
});

const size = document.querySelector("#size");
const showSize = document.querySelector("#show-size");
size.addEventListener("input", (e) => {
    showSize.innerHTML = e.target.value;
    brushSize = Number(e.target.value);
});
/*
    => Made by V / Lou du Poitou, (c) 2025
    => https://loudupoitou.dns-dynamic.net

*/
