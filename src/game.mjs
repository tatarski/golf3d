import { engine } from "./engine.mjs";
import { drawImage } from "./utils.mjs";
import * as THREE from "three.js";
import * as CANNON from "cannon-es";
import OrbitControls_ from 'three-orbit-controls';
import { Ramp } from "./BuildingBlocks/Ramp.mjs";
import {BuildingBlock} from "./BuildingBlocks/BuildingBlock.mjs";
import { MovingPlatform } from "./BuildingBlocks/MovingPlatform.mjs";
//Visuals for the game
import {Skybox, skybox_texture} from "./BuildingBlocks/Visuals.mjs";
import { firingTheBall } from "./firingTheBall.mjs";
import { Sounds } from "./Sounds.mjs";

let ballMesh = null;
let ballBody = null;

const orbitControls = true;

let oldBallPosision = {x: 0, y: 0, z: 0};

function createBall(x, y, z) {
    // Ball
    const ballMaterialPhysics = new CANNON.Material(); // Create a new material
    ballMaterialPhysics.friction = 1
    ballMaterialPhysics.restitution = 0.5; // Set the restitution coefficient to 0.5 (adjust as needed)
    ballMaterialPhysics.friction = 0.2;
    const ballShape = new CANNON.Sphere(1); // Radius 1
    ballBody = new CANNON.Body({ mass: 1, position: new CANNON.Vec3(x, y, z), shape: ballShape, material: ballMaterialPhysics});
    // Adds the Linear Damping to the ball.
    ballBody.linearDamping = 0.3;
    engine.cannonjs_world.addBody(ballBody);

    // Create visual representations (meshes)
    const ballGeometry = new THREE.SphereGeometry(1, 32, 32);
    const ballMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 });
    ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);

    window.ballMesh = ballMesh;
    window.ballBody = ballBody;

    ballMesh.position.set(x, y, z);
    engine.scene.add(ballMesh);
}

function createGround() {
    // Create ground plane
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 2, shape: groundShape });
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

let time = 0;

function initGame() {
    // Orbit controls
    if(orbitControls) {
        const OrbitControls = new OrbitControls_(THREE);
        const controls = new OrbitControls(engine.camera, engine.canvas2d);
    }

    // Set up camera
    engine.camera.position.set(0, 20, 80);
    engine.camera.lookAt(0, 10, 0);
    
    //change far frustum plane to account for skybox
    engine.far = 10000

    // Lighting

    //Ambient light is now the skybox
    const ambientLight = new THREE.AmbientLight(skybox_texture, 0.5);
    engine.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffdd66, 0.5);
    directionalLight.position.set(10, 20, 10);
    directionalLight.lookAt(0, 0, 0);
    engine.scene.add(directionalLight);

    //Setup visuals
    const skybox = new Skybox()
    //Setup game
    createBall(10, 30, 0);

    // createGround();
    const block1 = new BuildingBlock(0, 5, 0, 20, 10, 20);
    // const block2 = new BuildingBlock(20, 0, 0, 50, 10, 20);

    // new BuildingBlock(0, 5, 0, 20, 10, 20);
    new Ramp(16.5, 2.5, 0, 20, Math.PI, Math.PI/4);
    new Ramp(40, -5, 0, 20, Math.PI/2, 0);
    
    new BuildingBlock(30, -10, 0, 40, 10, 20);

    new MovingPlatform(10, 15, 0, 30, 30, 30, 10, 10, 10);
    // Set custom update function
    engine.update = (() => {
        time++;
        
        // Update ball position
        ballMesh.position.copy(ballBody.position);
        
        // Makes the ball static when it isn't moving
        if(time%100 == 0) {
            let error = 
            (Math.abs(ballMesh.position.x) - Math.abs(oldBallPosision.x))+
            (Math.abs(ballMesh.position.y) - Math.abs(oldBallPosision.y))+
            (Math.abs(ballMesh.position.z) - Math.abs(oldBallPosision.z));
            
            if(error < 0.) {
                ballBody.type = CANNON.Body.STATIC;
                oldBallPosision = {x: 0, y: 0, z: 0};
            }

            oldBallPosision = ballMesh.position.clone();;
        }

        // ballMesh.quaternion.copy(ballBody.quaternion);
    });

    // Set custom draw function
    engine.draw2d = (() => {
        engine.context2d.clearRect(0, 0, engine.canvas2d.width, engine.canvas2d.height);
        

        engine.context2d.strokeRect(0, 0, canvas2d.width, canvas2d.height);
    });
    
    engine.onmouseup = () => {
        // CUSTOM MOUSE UP
    }
}

let game = {
    init: initGame
}

export { game }