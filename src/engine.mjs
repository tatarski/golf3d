import * as THREE from "three.js";
import * as CANNON from "cannon";

let engine = {
    // Start engine
    init: initEngine,
    // Game update function
    update: () => {console.log("No update function is set in game engine."); engine.isCustomUpdate = false},
    isCustomUpdate: true,
    // Game 2d draw function (draws on 2d canvas)
    draw2d: default_draw,
    draw3d: default_draw3d,
    // Events
    onkeyup: keyCode => {console.log("Default keyup. keycode:", keyCode)},
    onkeydown: keyCode => {console.log("Default keydown. keycode:", keyCode)},
    oninit: () => {console.log("Default oninit.")},
    onmouseup: () => {console.log("Mouseup: ", engine.mouseX, engine.mouseY)},
    onmousedown: () => {console.log("Mousedown: ", engine.mouseX, engine.mouseY)},
    onmousemove: () => {},
    // context2d objects
    context2d: null,
    canvas2d: null,
    updateTime : 10,
    mouseX : 0,
    mouseY : 0,
    isKeyPressed : new Array(256).fill(0),
    endlessCanvas: false,
    // Three js objects
    scene: null,
    camera: null,
    renderer: null,
    // Cannon js
    cannonjs_world: null
};

const reqAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
    setTimeout(callback, 1000 / 30);
};


function updateMousePosition(e) {
    let boundingRect = engine.canvas2d.getBoundingClientRect();
    engine.mouseX = e.pageX - boundingRect.x;
    engine.mouseY = e.pageY - boundingRect.y;
}

function updateMousePositionTouchEvent(e) {
    let boundingRect = engine.canvas2d.getBoundingClientRect();
    let touchobj = e.changedTouches[0];
    engine.mouseX = touchobj.pageX - boundingRect.x;
    engine.mouseY = touchobj.pageY - boundingRect.y;
}

function init2dCanvas() {
    // Get engine.canvas element
    let canvasElement = document.createElement('canvas');
    canvasElement.id = "engine-canvas";
    document.body.appendChild(canvasElement);

    canvasElement.style.position = "absolute"; // Position canvas absolutely
    canvasElement.style.left = "0"; // Align canvas to the left of the parent element
    canvasElement.style.top = "0"; // Align canvas to the top of the parent element
    canvasElement.style.zIndex = "1"; // Set higher zIndex to display over other elements
    // canvasElement.style.pointerEvents = "none"; // Disable pointer events to allow interaction with underlying canvas

    engine.canvas2d = canvasElement;

    if (engine.endlessCanvas) {
        engine.canvas2d.width = window.innerWidth;
        engine.canvas2d.height = window.innerHeight;

        // Change engine.canvas.width and .height on browser resize
        window.onresize = function () {
            engine.canvas2d.width = window.innerWidth;
            engine.canvas2d.height = window.innerHeight;
        };
    } else {
        // Default engine.canvas size
        engine.canvas2d.width = 800;
        engine.canvas2d.height = 600;
    }

    // Get 2d engine.context
    engine.context2d = engine.canvas2d.getContext("2d");
    engine.context2d.fillStyle = "#0000ff";
}

function initThreeJS() {
    if(!engine.canvas2d) throw "2d canvas should be initialized first";

    engine.scene = new THREE.Scene();
    engine.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    engine.renderer = new THREE.WebGLRenderer();
    engine.renderer.setSize(canvas2d.width, canvas2d.height);
    engine.renderer.domElement.style.margin = 0;
    document.body.appendChild(engine.renderer.domElement);

    engine.cannonjs_world = new CANNON.World();
    engine.cannonjs_world.gravity.set(0, -9.82, 0); // Set gravity
    engine.cannonjs_world.broadphase = new CANNON.NaiveBroadphase(); // Use naive broadphase
    engine.cannonjs_world.solver.iterations = 10; // Set solver iterations
}

function initEvents() {
    // Events for touchscreen devices
    if ('ontouchstart' in window || navigator.maxTouchPoints) {
        window.addEventListener("touchstart", function (e) {
            // Update global mouseX, mouseY variables
            updateMousePositionTouchEvent(e);
                engine.onmousedown();
        });
        window.addEventListener("touchend", function (e) {
            updateMousePositionTouchEvent(e);
                engine.onmouseup();
        });
        window.addEventListener("touchmove", function (e) {
            updateMousePositionTouchEvent(e);
        });
    }

    // Update global mouseX, mouseY variables
    window.addEventListener("mousemove", updateMousePosition);

    // Call mousemove, mouseup, mousedown function from game.js if they exist
    window.addEventListener("mousemove", () => {engine.onmousemove()});
    window.addEventListener("mouseup", () => {engine.onmouseup()});
    window.addEventListener("mousedown", () => {engine.onmousedown()});

    // Update global isKeyPressed array
    window.addEventListener("keydown", function (e) {
        engine.isKeyPressed[e.keyCode] = 1;
        engine.onkeydown(e.keyCode);
    });
    window.addEventListener("keyup", function (e) {
        engine.isKeyPressed[e.keyCode] = 0;
        engine.onkeyup(e.keyCode);
    });
}
// Redraw will be executed many times
function redraw() {
    engine.cannonjs_world.step(1/20);
    engine.context2d.save();

    // Call draw function from game.js
    engine.draw2d();
    engine.draw3d();

    engine.renderer.render(engine.scene, engine.camera);
    engine.context2d.restore();
    // Call redraw after some time (the browser decides this time)
    reqAnimationFrame(redraw);
};

function default_draw() {
    engine.context2d.clearRect(0, 0, engine.canvas2d.width, engine.canvas2d.height);
    engine.context2d.globalAlpha = 1;
    engine.context2d.fillStyle = "#FF0000";
    engine.context2d.font = "20px Arial";

    engine.context2d.fillText("No 2d draw function set. (calling default engine.draw2d function).", 40, 40);

    if(!engine.isCustomUpdate) {
        engine.isCustomUpdate = true;
        engine.context2d.fillText("No update function set. (calling default engine.update function).", 40, 80);
    }
}

function default_draw3d() {

}

// Init game engine
function initEngine() {
    init2dCanvas();

    // Attach basic mouse and keyboard events
    initEvents();

    // Attach common objects to global scope
    window.engine = engine;
    window.context2d = engine.context2d;
    window.canvas2d = engine.canvas2d;

    initThreeJS();

    // Start draw loop
    redraw();
    // Start update loop
    setInterval(() => {engine.update()}, engine.updateTime);
}


export {engine};