import { engine} from "./engine.mjs";
import { game } from "./game.mjs"
import { initGlobalImages } from "./asset_loader.mjs";
    
document.body.onload = () => {
    console.log("ASDFG: Front end scripts starting.");
    initGlobalImages();
    //initGLobalSounds();
    engine.init();
    game.init();
};