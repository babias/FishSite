const canvas = document.getElementById("canvas");
const drawing = canvas.getContext("2d");
const colorButtons = document.querySelectorAll(".color-button");
const colorDisplay = document.getElementById("color-display");
const clearCanvasButton = document.getElementById("clear-canvas");

let selectedColor = "black";

// default line width
drawing.lineWidth = 2; // You can adjust the line width as needed

// function to draw on the canvas
function draw(e) {
    drawing.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    drawing.stroke();
}

// event listener for mouse movement and actions on the canvas
canvas.addEventListener("mousedown", (e) => {
    drawing.beginPath(); // start a new path
    drawing.moveTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
    canvas.addEventListener("mousemove", draw);
});
canvas.addEventListener("mouseup", () => {
    canvas.removeEventListener("mousemove", draw);
});
canvas.addEventListener("mouseout", () => {
    canvas.removeEventListener("mousemove", draw);
});

// event listener for color boxes/buttons
colorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedColor = button.style.backgroundColor;
        colorDisplay.style.backgroundColor = selectedColor;
        drawing.strokeStyle = selectedColor; // will update the drawing color
    });
});

// event listener to clear the canvas
clearCanvasButton.addEventListener("click", () => {
    drawing.clearRect(0, 0, canvas.width, canvas.height);
});

