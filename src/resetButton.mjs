import { engine } from "./engine.mjs";
import { createButton, areColliding } from "./utils.mjs";
import { ballBody } from "./ball.mjs";
import { firingTheBall } from "./firingTheBall.mjs";
import { menuConfig } from "./menu.mjs";

function resetBallPosition() {
    ballBody.position.set(11, 30, 0);
    ballBody.velocity.set(0, 0, 0);
    ballBody.angularVelocity.set(0, 0, 0);
    ballBody.type = CANNON.Body.STATIC;
    firingTheBall.isBallShot = false;
}

function createResetButton() {
    engine.draw2d = () => {
        engine.context2d.clearRect(0, 0, engine.canvas2d.width, engine.canvas2d.height);
        if (menuConfig.gameStarted) {
            createButton("Reset", 50, 50, 100, 50, "blue", 20, "white");
        }
    };

    engine.onmouseup = (e) => {
        let mouseX = e.clientX;
        let mouseY = e.clientY;
        if (menuConfig.gameStarted && areColliding(mouseX, mouseY, 1, 1, 50, 50, 100, 50)) {
            resetBallPosition();
        }
    };
}

export { createResetButton };
