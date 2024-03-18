import * as THREE from "three.js";
// import * as CANNON from "cannon.js";

let inputs = document.createElement("div");
inputs.id = "inputs";
inputs.style.position = "absolute";
inputs.style.right = "0";
inputs.style.display = "flex";
inputs.style.flexDirection = "column";
inputs.style.justifyContent = "start";
inputs.style.gap = "10px";
document.body.appendChild(inputs);

let power = document.createElement("input");
power.type = "range";
power.id = "power";
power.min = 0;
power.max = 1;
power.value = 0;
power.step = 0.025;
addLabel("power", "Power:", inputs);
inputs.appendChild(power);

let direction = document.createElement("input");
direction.type = "range";
direction.id = "direction";
direction.min = 0;
direction.max = 1;
direction.value = 0
direction.step = 0.025;
addLabel("direction", "Direction:", inputs);
inputs.appendChild(direction);

let angle = document.createElement("input");
angle.type = "range";
angle.id = "angle";
angle.min = 0;
angle.max = 1;
angle.value = 0;
angle.step = 0.025;
addLabel("angle", "Angle:", inputs);
inputs.appendChild(angle);

let firingTheBall = {
    Shoot: shoot(),
    power: 0,
    direction: 0,
    angle: 0
};

function shoot() {
    // Add the shooting
}

power.addEventListener("input", () => {
    firingTheBall.power = parseFloat(power.value)
})

direction.addEventListener("input", () => {
    firingTheBall.direction = parseFloat(direction.value)
})

angle.addEventListener("input", () => {
    firingTheBall.angle = parseFloat(angle.value)
})

function addLabel(id, text, where) {
    let label = document.createElement("label");
    label.for = id;
    label.innerHTML = text;
    where.appendChild(label);
}

export {firingTheBall};