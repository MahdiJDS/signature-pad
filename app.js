const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 200;

let isDrawing = false;


function startDraw(){
  isDrawing = true;
  draw(e);
}

function endDraw() {
  isDrawing = false;
  ctx.beginPath();
}

function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  const rect = canvas.getBoundingClientRect();
  let x = (e.clientX || e.touches[0].clientX) - rect.left;
  let y = (e.clientY || e.touches[0].clientY) - rect.top;

  
  ctx.lineTo(x, y);
  ctx.stroke();

}

// Mouse events
canvas.addEventListener("mousedown",startDraw);

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", endDraw);

// Touch events (for mobile)
canvas.addEventListener("touchstart", startDraw);

canvas.addEventListener("touchmove", draw);

canvas.addEventListener("touchend", endDraw);

// Clear button
document.getElementById("clear").addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download button
document.getElementById("download").addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "signature.png";
  link.href = canvas.toDataURL();
  link.click();
});
