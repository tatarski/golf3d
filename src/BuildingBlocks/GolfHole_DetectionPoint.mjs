import * as THREE from "three";
import * as CANNON from "cannon-es";
import { engine } from "../engine.mjs";

class GolfHole_Detection{
    constructor_detectionPoint(x,y,z, radiusTop, RadiusBottom ,Height) {
        var geometry = new THREE.CylinderGeometry(radiusTop, RadiusBottom ,Height);
        var material = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 1 });
        var ellipse = new THREE.Mesh(geometry, material);
        ellipse.position.set(x,y,z);
        engine.scene.add(ellipse);
        
        const groundMaterialPhysics2 = new CANNON.Material(); 
        groundMaterialPhysics2.restitution = 1; 
        var cylinderShape = new CANNON.Cylinder(radiusTop, RadiusBottom, Height, 32); 
        var cylinderBody = new CANNON.Body({ mass: 0, material: groundMaterialPhysics2 });
        cylinderBody.addShape(cylinderShape);
        cylinderBody.position.set(x, y, z);
        console.log(cylinderBody.position, ellipse.position);
        cylinderBody.type = CANNON.Body.STATIC;
        engine.cannonjs_world.addBody(cylinderBody);
        }
}
export { GolfHole_Detection };