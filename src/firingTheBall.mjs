import * as CANNON from "cannon-es";
import { playRandomSoundEffect, playMusic } from "./Sounds.mjs";
import { ballBody } from "./ball.mjs";
import { menuConfig } from "./menu.mjs";

let lastShotTime = 0;
const cooldownTime = 10 * 500; // 10 seconds in milliseconds

let firingTheBall = {
  power: 1,
  direction: 0,
  Shoot: () => { shoot() },
  isBallShot: false,
  shotFromWhere: {x: 0, y: 0, z: 0},
  initUI: initShootingUI
};

function addLabel(id, text, where) {
  let labelEl = document.createElement("label");
  labelEl.for = id;
  labelEl.innerHTML = text;
  where.appendChild(labelEl);
}

function initShootingUI() {
  // Create UI elements
  let inputsDivEl = document.createElement("div");
  inputsDivEl.id = "inputs";
  inputsDivEl.style.position = "absolute";
  inputsDivEl.style.right = "0";
  inputsDivEl.style.top = "0";
  inputsDivEl.style.display = "flex";
  inputsDivEl.style.flexDirection = "column";
  inputsDivEl.style.justifyContent = "start";
  inputsDivEl.style.gap = "10px";
  document.body.appendChild(inputsDivEl);

  let powerSliderEl = document.createElement("input");
  powerSliderEl.type = "range";
  powerSliderEl.id = "power";
  powerSliderEl.min = 0.1;
  powerSliderEl.max = 100;
  powerSliderEl.step = 0.1
  powerSliderEl.value = 1;
  addLabel("power", "Power:", inputsDivEl);
  inputsDivEl.appendChild(powerSliderEl);


  let shootButtonEl = document.createElement("button");
  shootButtonEl.id = "shootB";
  shootButtonEl.innerHTML = "Shoot";
  shootButtonEl.onclick = shoot;
  inputsDivEl.appendChild(shootButtonEl);

  powerSliderEl.addEventListener("input", () => {
    firingTheBall.power = parseFloat(powerSliderEl.value);
  });
}


function shoot() {
  const currentTime = Date.now();
  
  // Check if enough time has passed since the last shot
  if (currentTime - lastShotTime < cooldownTime) {0
    console.log("Cooldown period active. Ostavat ti owe", (currentTime - lastShotTime)/1000, "sekundi do 5" );
    return;
  }

  // Reset last shot time to current time
  lastShotTime = currentTime;

  firingTheBall.isBallShot = true;
  if (menuConfig.sfxEnabled) { 
    playRandomSoundEffect(); 
  }
  firingTheBall.shotFromWhere.x = ballBody.position.x;
  firingTheBall.shotFromWhere.y = ballBody.position.y;
  firingTheBall.shotFromWhere.z = ballBody.position.z;

  if (ballBody.type == CANNON.Body.STATIC) {
    ballBody.type = CANNON.Body.DYNAMIC;
  }

  let calPower = firingTheBall.power;
  let calDirection = firingTheBall.direction;

  let impulse = new CANNON.Vec3(Math.cos(calDirection) * calPower, 0, Math.sin(calDirection) * calPower);
  let relativePoint = new CANNON.Vec3();
  ballBody.applyImpulse(impulse, relativePoint);
}


export { firingTheBall };
