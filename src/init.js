import { engine} from "./engine.mjs";
import { game } from "./game.mjs"
import { initGlobalImages } from "./asset_loader.mjs";

document.body.onload = () => {
    console.log("Front end scripts starting.");
    initGlobalImages();
    engine.init();
    game.init();
};