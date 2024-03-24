import * as THREE from "three.js";
import * as CANNON from "cannon";
import { engine } from "../engine.mjs";

class BuildingBlock{
    constructor(x, y, z, width, height, depth) {

        // Block visual representation
        var geometry = new THREE.BoxGeometry(width, height, depth);
        var material = new THREE.MeshPhongMaterial({ color: 0xff00ff });
        var cube = new THREE.Mesh(geometry, material);
        cube.position.set(x, y, z);
        engine.scene.add(cube);

        // Block physics and collision detection
        const groundMaterialPhysics = new CANNON.Material(); // Create a new material
        groundMaterialPhysics.restitution = 0.5; // Set the restitution coefficient to 0.5 (adjust as needed)
        groundMaterialPhysics.friction = 1;
        var cubeShape = new CANNON.Box(new CANNON.Vec3(width/2, height/2, depth/2));
        var cubeBody = new CANNON.Body({ mass: 1000, material: groundMaterialPhysics});
        cubeBody.addShape(cubeShape);
        cubeBody.position.set(x, y, z);
        cubeBody.type = CANNON.Body.STATIC;
        engine.cannonjs_world.addBody(cubeBody);
    }
}
export {BuildingBlock}