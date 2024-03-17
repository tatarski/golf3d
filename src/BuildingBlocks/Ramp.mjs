import * as THREE from "three.js";
import * as CANNON from "cannon";
import { engine } from "../engine.mjs";

class Ramp {
    constructor(x, y, z, width, dir, angle) {
        // Block visual representation

        var rampGeometry = new THREE.BoxGeometry(width, 1, width);
        var borderGeometry = new THREE.BoxGeometry(width, 3, 2);

        var grassMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
        var woodMaterial = new THREE.MeshPhongMaterial({ color: 0x964B00 });


        var cube = new THREE.Mesh(rampGeometry, grassMaterial);
        var border1 = new THREE.Mesh(borderGeometry, woodMaterial);
        var border2 = new THREE.Mesh(borderGeometry, woodMaterial);

        border1.position.set(0, 0, 0 - width/2);
        border2.position.set(0, 0, 0 + width/2);
        cube.position.set(0, 0, 0);

        // Групираме ги щото искаме да ги трансформираме само веднъж
        let rampGroup = new THREE.Group();
        rampGroup.add(cube, border1, border2);
        rampGroup.rotation.y = dir;
        rampGroup.rotation.z = angle;
        rampGroup.position.set(x, y, z);
        // cube.rotation.y = dir;
        // cube.rotation.z = angle;
        // border1.rotation.y = dir;
        // border1.rotation.z = angle;
        // border2.rotation.y = dir;
        // border2.rotation.z = angle;

        engine.scene.add(rampGroup);

        // Block physics and collision detection
        const groundMaterialPhysics = new CANNON.Material(); // Create a new material
        groundMaterialPhysics.restitution = 0.5; // Set the restitution coefficient to 0.5 (adjust as needed)
        var cubeShape = new CANNON.Box(new CANNON.Vec3(width/2, 1/2, width/2));
        var borderShape = new CANNON.Box(new CANNON.Vec3(width/2, 1.5, 1));

        var cubeBody = new CANNON.Body({ mass: 1000, material: groundMaterialPhysics});
        var border1Body = new CANNON.Body({ mass: 1000, material: groundMaterialPhysics});


        cubeBody.addShape(cubeShape);
        border1Body.addShape(borderShape);


        // Копираме позиция/ ротация от three.js групата
        cubeBody.position.copy(rampGroup.position);
        cubeBody.quaternion.copy(rampGroup.quaternion);
        
        border1Body.position.copy(rampGroup.position);
        border1Body.quaternion.copy(rampGroup.quaternion);

        cubeBody.type = CANNON.Body.STATIC;
        engine.cannonjs_world.addBody(cubeBody);
    }
}

export {Ramp};