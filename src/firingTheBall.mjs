import * as THREE from "three.js";
import * as CANNON from "cannon-es";
import { engine } from "./engine.mjs";

let firingTheBall = {
    power: 1,
    direction: 0,
    Shoot: () => {shoot()}
};

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
power.min = 0.1;
power.max = 100;
power.step = 0.1
power.value = 1;
addLabel("power", "Power:", inputs);
inputs.appendChild(power);

let shootB = document.createElement("button");
shootB.id = "shootB";
shootB.innerHTML = "Shoot";
shootB.onclick = shoot;
inputs.appendChild(shootB);

function shoot() {
    // Is STATIC
    if(ballBody.type == CANNON.Body.STATIC) {
        ballBody.type = CANNON.Body.DYNAMIC;
    }

    let calPower = firingTheBall.power;
    let calDirection = firingTheBall.direction;
    
    // let impulse = new CANNON.Vec3(velocityX, velocityY, velocityZ);
    let impulse = new CANNON.Vec3(Math.cos(calDirection) * calPower, 0, Math.sin(calDirection) * calPower);
    let relativePoint = new CANNON.Vec3();
    ballBody.applyImpulse(impulse, relativePoint);
}

power.addEventListener("input", () => {
    firingTheBall.power = parseFloat(power.value);
})

function addLabel(id, text, where) {
    let label = document.createElement("label");
    label.for = id;
    label.innerHTML = text;
    where.appendChild(label);
}

export {firingTheBall};