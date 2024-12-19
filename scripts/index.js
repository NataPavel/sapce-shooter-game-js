// index.js file is initialize application file
import { Application, Assets, Sprite, Texture, TilingSprite } from "pixi.js";
import Game from "./Game";
import { loadAssets, getTextureByAlias } from "./assetsLoader"

(async () => {
    const app =  new Application();

    await app.init({
        width: 1280,
        height: 720,
    });

    app.canvas.style.position = 'absolute';

    document.body.appendChild(app.canvas);

    // Load assets
    await loadAssets();

    // set up background
    const bgTexture = getTextureByAlias('starBackground');
    const starBg = new TilingSprite({
        texture: bgTexture,
        width: app.screen.width,
        height: app.screen.height
    });

    starBg.tileScale.set(0.95, 0.95);

    app.stage.addChild(starBg);

    // injecting pixi into game 
    const game = new Game(app);
    app.ticker.add(game.update, game);
})();