const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.querySelectorAll("#jsColor");
const range = document.querySelector(".controls_range input");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");

const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#2c2c2c";

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const startPainting = () => {
  painting = true;
};
const stopPainting = () => {
  painting = false;
};

const onMouseMove = event => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};
const onMouseDown = event => {
  console.log(event);
  painting = true;
};

const handleCanvasClick = event => {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
};
const handleCM = event => {
  event.preventDefault();
};

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

const changeColor = event => {
  //   console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = ctx.strokeStyle;
};
if (colors) {
  colors.forEach(color => {
    color.addEventListener("click", changeColor);
  });
}

const handleRangeChange = event => {
  //   console.log(event.target.value);
  const lineSize = event.target.value;
  ctx.lineWidth = lineSize;
};
if (range) {
  range.addEventListener("input", handleRangeChange);
}

const handleModeClick = event => {
  if (!filling) {
    filling = true;
    mode.innerText = "PAINT";
  } else {
    filling = false;
    mode.innerText = "Fill";
  }
};
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

const handleSaveClick = event => {
  const image = canvas.toDataURL("image/png");
  console.log(image);
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS";
  link.click();
};

if (save) {
  save.addEventListener("click", handleSaveClick);
}
