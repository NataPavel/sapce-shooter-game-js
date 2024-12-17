// Load all assets
import { Assets } from "pixi.js";

export async function loadAssets() {
    await Assets.load([
        {
            alias: 'starBackground',
            src: '../assets/images/star_bg3.jpg'
        },
    ]);
}

export function getTextureByAlias(alias) {
    return Assets.get(alias);
}

