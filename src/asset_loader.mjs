import { images } from "./preload_config.mjs";

// Custom image class - sets imgObj.img.src after imgObj.draw() has been called
class MyImage {
    constructor(src_, backupColor_) {
        this.src = src_;
        this.backupColor = backupColor_;

        // Create image object with no source path
        this.img = new Image();
        this.canDraw = false;
        this.drawBackup = false;

        this.img.onload = () => {
            this.canDraw = true;
        }
        this.img.onerror = () => {
            this.canDraw = false;
            this.drawBackup = true;
            throw "Unable to load image " + this.src;
        }

    }
    draw(x, y, xs, ys) {
        if (xs == undefined) {
            xs = this.img.width | 100;
            ys = this.img.height | 100;
        }
        // If img.src is undefined - set it
        if (!this.img.src) {
            // Load image
            this.img.src = this.src;
        } else if (this.canDraw) {
            try {
                engine.context2d.drawImage(this.img, x, y, xs, ys);
            } catch (e) {
                this.canDraw = false;
                this.drawBackup = true;
                throw e;
            }
        } else if (this.drawBackup) {
            engine.context2d.fillStyle = this.backupColor;
            engine.context2d.fillRect(x, y, xs, ys);
        }
    }
    preload() {
        this.img.src = this.src;
    }
}

// Attach image objects to global scope
function initGlobalImages() {
    // Load all images from ./images folder "BY HAND"
    const imageObjectList = images;

    // For each element of array - create a global variable
    for (let i = 0; i < imageObjectList.length; i++) {
        let name = imageObjectList[i].imageName,
            backupColor = imageObjectList[i].backupColor;

        // Handle image names like "asdfg[21]"
        if (name.indexOf("[") > -1) {
            let arrayName = name.slice(0, name.indexOf("["));
            let arrayNumber = name.slice(name.indexOf("[") + 1, name.indexOf("]"));
            if (!window[arrayName]) {
                window[arrayName] = [];
            }
            window[arrayName][arrayNumber] = tryToLoad(name, backupColor);
        } else {
            // Handle image names like "backMountains.png"
            window[name] = tryToLoad(name, backupColor);
        }
    }
};



function tryToLoad(imageNameWithoutDotPng, backupColor) {
    return new MyImage("./images/" + imageNameWithoutDotPng + ".png", backupColor);
}

function tryToLoadWithFullPath(pathAndImageName, backupColor) {
    return new MyImage(pathAndImageName, backupColor);
}

export {MyImage, initGlobalImages, tryToLoad, tryToLoadWithFullPath}