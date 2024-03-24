import * as THREE from "three.js";
import * as CANNON from "cannon";
import { engine } from "../engine.mjs";

let skybox_texture = new THREE.TextureLoader().load('./images/SkyboxTexture.jpg')
class Skybox {
    constructor() {
        this.x = 0
        this.y = 0
        this.z = 0

        //Load texture
        

        //Threejs setup
        this.geometry = new THREE.SphereGeometry(500, 32, 16)
        this.material = new THREE.MeshBasicMaterial({map: skybox_texture, side: THREE.BackSide, fog: false, })
        this.mesh = new THREE.Mesh( this.geometry, this.material);


        //Add to scene
        this.mesh.position.set(this.x, this.y, this.z)
        engine.scene.add(this.mesh)
    }
}
export {Skybox, skybox_texture}