function areColliding(Ax, Ay, Awidth, Aheight, Bx, By, Bwidth, Bheight) {
    if (Bx <= Ax + Awidth) {
        if (Ax <= Bx + Bwidth) {
            if (By <= Ay + Aheight) {
                if (Ay <= By + Bheight) {
                    return 1;
                }
            }
        }
    }
    return 0;
};

function randomInteger(upTo) {
    return Math.floor(Math.random() * upTo);
}

function drawLine(startX, startY, endX, endY) {
    // For better performance bunch calls to lineTo without beginPath() and stroke() inbetween.
    engine.context.beginPath(); // resets the current path
    engine.context.moveTo(startX, startY);
    engine.context.lineTo(endX, endY);
    engine.context.stroke();
}
function drawImage(myImageObject, x, y, xs, ys) {
    myImageObject.draw(x, y, xs, ys);
}

function isFunction(f) {
    return typeof (f) == "function";
}

export {areColliding, randomInteger, drawLine, drawImage, isFunction};