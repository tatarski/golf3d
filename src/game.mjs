import { engine } from "./engine.mjs";
import { drawImage } from "./utils.mjs";
import * as THREE from "three.js";
import * as CANNON from "cannon";
import OrbitControls_ from 'three-orbit-controls';
import { BuildingBlock } from "./BuildingBlocks/BuildingBlock.mjs";
import { create } from "lodash";

let ballMesh = null;
let ballBody = null;
function createBall(x, y, z) {
    // Ball
    const ballMaterialPhysics = new CANNON.Material(); // Create a new material
    ballMaterialPhysics.friction = 1
    ballMaterialPhysics.restitution = 0.5; // Set the restitution coefficient to 0.5 (adjust as needed)

    const ballShape = new CANNON.Sphere(1); // Radius 1
    ballBody = new CANNON.Body({ mass: 10, position: new CANNON.Vec3(x, y, z), shape: ballShape, material: ballMaterialPhysics});
    // Adds the Linear Damping to the ball.
    ballBody.linearDamping = 0.3
    engine.cannonjs_world.addBody(ballBody);
    // Create visual representations (meshes)
    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    const ballMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

    window.ballMesh = ballMesh;
    window.ballBody = ballBody;

    ballMesh.position.set(x, y, z);
    engine.scene.add(ballMesh);
}
function createGround() {
    // Create ground plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
    groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2); // Set rotation to align with Cannon.js
    groundBody.position.set(0, 0, 0); // Set position
    engine.cannonjs_world.addBody(groundBody);


    // Create visual representation of ground (in Three.js)
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
    groundMesh.rotation.x = -Math.PI / 2; // Rotate to align with Cannon.js
    engine.scene.add(groundMesh);
}
function initGame() {
    let x = canvas2d.width / 2, y = canvas2d.height / 2;

    // Orbit controls
    const OrbitControls = new OrbitControls_(THREE);
    const controls = new OrbitControls(engine.camera);

    // Set up camera
    engine.camera.position.set(0, 20, 80);
    engine.camera.lookAt(0, 10, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    engine.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffaaff, 0.5);
    directionalLight.position.set(10, 20, 10);
    directionalLight.lookAt(0, 0, 0);
    engine.scene.add(directionalLight);

    createBall(10, 30, 0);
    // createGround();
    const block1 = new BuildingBlock(0, 5, 0, 20, 10, 20);
    const block2 = new BuildingBlock(20, 0, 0, 50, 10, 20);

    // Set custom update function
    engine.update = (() => {
        x += (engine.mouseX - x) / 100;
        y += (engine.mouseY - y) / 100;


        // Update ball position
        ballMesh.position.copy(ballBody.position);
        // ballMesh.quaternion.copy(ballBody.quaternion);
    });

    // Set custom draw function
    engine.draw2d = (() => {
        engine.context2d.clearRect(0, 0, engine.canvas2d.width, engine.canvas2d.height);
        drawImage(femaleAction, x, y, 60, 80);
        context2d.strokeRect(0, 0, canvas2d.width, canvas2d.height);
    });
    
    engine.onmouseup = () => {
        console.log("CUSTOM MOUSE UP");
    }
}

let game = {
    init: initGame
}
export { game }