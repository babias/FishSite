const canvas = document.getElementById("canvas");
const drawing = canvas.getContext("2d");
const colorButtons = document.querySelectorAll(".color-button");
const colorDisplay = document.getElementById("color-display");
const clearCanvasButton = document.getElementById("clear-canvas");
const colorPicker = document.getElementById("color-picker");
const redSlider = document.getElementById("red-slider");
const greenSlider = document.getElementById("green-slider");
const blueSlider = document.getElementById("blue-slider");
const eraser = document.getElementById("eraser-button")

let selectedColor = "black";

// default line width
drawing.lineWidth = 2; // line width
let eraserMode = false; // will be true only when erase button is active

// function to draw on the canvas
//function draw(e) {
//    drawing.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
//    drawing.stroke();
//}

// function to draw or erase on the canvas
function draw(e) {
    if (eraserMode) {
        drawing.clearRect(e.clientX - canvas.getBoundingClientRect().left - 5, e.clientY - canvas.getBoundingClientRect().top - 5, 10, 10); // will clear a 10x10 rectangle
    } else {
        drawing.lineTo(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top);
        drawing.stroke();
    }
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
        eraserMode = false; // will keep eraser "off"
    });
});

// event listener to clear the canvas
clearCanvasButton.addEventListener("click", () => {
    drawing.clearRect(0, 0, canvas.width, canvas.height); // will actually draw a rectagle same size as the canvas
});

colorPicker.addEventListener("input", () => {
    selectedColor = colorPicker.value;
    colorDisplay.style.backgroundColor = selectedColor;
    drawing.strokeStyle = selectedColor;
    eraserMode = false; // will keep eraser "off"
});

// event listener for color picker
redSlider.addEventListener("input", updateColor);
greenSlider.addEventListener("input", updateColor);
blueSlider.addEventListener("input", updateColor);

// function to select color based on slider values
function updateColor() {
    const redValue = redSlider.value;
    const greenValue = greenSlider.value;
    const blueValue = blueSlider.value;
    selectedColor = `rgb(${redValue},${greenValue},${blueValue})`;
    colorDisplay.style.backgroundColor = selectedColor;
    drawing.strokeStyle = selectedColor; 
    eraserMode = false; // will keep eraser "off"
};

// event listener for eraser button
eraser.addEventListener("click", () => {
    eraserMode = true; // will enable eraser mode, this will change the draw/erase fuction to erase mode
    drawing.strokeStyle = selectedColor;
    colorDisplay.style.backgroundColor = selectedColor;
});


