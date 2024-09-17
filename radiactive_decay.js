/* 
This code implements the radiactive decay simulation using a set of coins shaked inside a rectangular plate. If a coin touch the drawn lines, it is removed and the experiment is repeated. Plotting the number of coins as function of the try, will result in an exponential decay.
Coded by: L. Felipe Ramirez <luisf.ramirez@udea.edu.co>
*/

//Click control
  let clicked = false;
// Circle properties
  let circleRadius = 10;
  let numCircles = 100;
// Define the rectangle's position and size
  let rectX = 50;  // X position of the rectangle
  let rectY = 50;  // Y position of the rectangle
  let rectWidth = 700;  // Width of the rectangle
  let rectHeight = 700; // Height of the rectangle
// Define the offset for the lines from the center of the rectangle
  let lineOffset = 30;
// Calculates the center of the rectangle
  let centerX = rectX + rectWidth / 2; 

function setup() {
  // Define the canvas size
  createCanvas(800, 800);
  drawBox();
  let textInitNumCircles=String(numCircles);
  drawTextBox("Click to start shaking "+textInitNumCircles+" coins.");
}

function drawTextBox(message){
  fill(255);
  stroke(0);
  strokeWeight(2);
  rect(rectX, rectY-40, rectWidth, 28);
  textSize(16);
  fill(0);
  strokeWeight(0);
  text(message, rectX+10, rectY-20);
  fill(255);
  strokeWeight(2);
}

function drawBox(){
  // Draw the rectangle
  background(255); // white background
  fill(217, 195, 191); // Fill for the rectangle
  stroke(0); // Black border for the rectangle
  strokeWeight(2); // Thicker stroke for the rectangle
  rect(rectX, rectY, rectWidth, rectHeight);
    
  // Draw two vertical lines
  stroke(0); // Black stroke for lines
  strokeWeight(2); // Thicker lines
  line(centerX - lineOffset, rectY, centerX - lineOffset, rectY + rectHeight);
  line(centerX + lineOffset, rectY, centerX + lineOffset, rectY + rectHeight);
}

function drawCircles(N){
  let touchCounter=0; //Counter that detects if a circle touch one of the lines
  for (let i = 0; i < N; i++) {
    let x = random(rectX + circleRadius, rectX + rectWidth - circleRadius);
    let y = random(rectY + circleRadius, rectY + rectHeight - circleRadius);
    
    if((x >= (centerX - lineOffset - circleRadius) && x <= (centerX - lineOffset + circleRadius)) || (x >= (centerX + lineOffset - circleRadius) && x <= (centerX + lineOffset + circleRadius))){
      touchCounter++;
      fill(242, 91, 63);
    }else{
      fill(209, 200, 199);
    }
    
    // Draw the circle
    ellipse(x, y, circleRadius * 2);
  }
  return N-touchCounter; //Returns the initial number of drawn circles diminished by the number that touched the lines
}

function mousePressed() {
  // Change the flag to stop waiting for a click
  clicked = true;
}

function draw() {
  if (clicked) {
    drawBox(); //Redraws the box to clear the previous circles
    numCircles=drawCircles(numCircles);
    print(numCircles);
    let textNumCircles=String(numCircles);
    let textMessage = "The coins that touched the lines will be removed. Click to shake the remaining "+textNumCircles+" coins";
    drawTextBox(textMessage);
    
    clicked = false;
    return;
  }
}
