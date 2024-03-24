import * as THREE from "three.js";
import * as CANNON from "cannon-es";

// Function to create labels
function addLabel(id, text, where) {
  let label = document.createElement("label");
  label.for = id;
  label.innerHTML = text;
  where.appendChild(label);
}

// Create UI elements
let inputs = document.createElement("div");
inputs.id = "inputs";
inputs.style.position = "absolute";
inputs.style.right = "0px";
inputs.style.display = "flex";
inputs.style.flexDirection = "column";
inputs.style.justifyContent = "start";
inputs.style.gap = "10px";
document.body.appendChild(inputs);

let power = document.createElement("input");
power.type = "range";
power.id = "power";
power.min = 0.1;
power.max = 1;
power.step = 0.025;
addLabel("power", "Power:", inputs);
inputs.appendChild(power);

let direction = document.createElement("input");
direction.type = "range";
direction.id = "direction";
direction.min = 0;
direction.max = 360;
direction.value = 0.1;
direction.step = 1;
addLabel("direction", "Direction:", inputs);
inputs.appendChild(direction);

let angle = document.createElement("input");
angle.type = "range";
angle.id = "angle";
angle.min = 0;
angle.max = 1;
angle.value = 0;
angle.step = 0.01;
addLabel("angle", "Angle:", inputs);
inputs.appendChild(angle);

let button = document.createElement("button");
button.id = "shoot";
button.onclick=shoot;
button.innerHTML = "Shoot";
inputs.appendChild(button);

// Firing data object
let firingTheBall = {
  shoot: shoot,
  power: 0.1,
  direction: 0,
  angle: 0,
};

// Shoot function with error handling
function shoot() {
  // Check if ballBody exists
  if (!ballBody) {
    console.error("Error: ballBody not defined");
    return;
  }

  console.log("Creating audio object");
  const audio = new Audio("./music/golf ball hit.wav");
  console.log("Playing audio");
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);});

  

  let calPower = firingTheBall.power * 2;
  let calAngle = firingTheBall.angle;
  let calDirection = (firingTheBall.direction - 180) * Math.PI / 180;

  let impulse = new CANNON.Vec3(
    Math.cos(calDirection) * calPower,
    calAngle * calPower * 10,
    Math.sin(calDirection) * calPower
  );
  let relativePoint = new CANNON.Vec3();
  ballBody.applyImpulse(impulse, relativePoint);
}

// Update firingTheBall object on slider changes
power.addEventListener("input", () => {
  firingTheBall.power = parseFloat(power.value);
});

direction.addEventListener("input", () => {
  firingTheBall.direction = parseFloat(direction.value);
});

angle.addEventListener("input", () => {
  firingTheBall.angle = parseFloat(angle.value);
});


// Export firingTheBall object
export { firingTheBall };
