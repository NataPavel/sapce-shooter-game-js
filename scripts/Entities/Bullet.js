import { Container, Graphics } from "pixi.js";

// Bullet class - used to generate bullets
export default class Bullet extends Container{

    #player;
    #speed = 10;
    #view;

    constructor(player){
        super();
        this.#player = player;

        this.#view = new Graphics();
        this.#view.ellipse(this.#player.x + 50, this.#player.y, 5, 15);
        this.#view.fill('79D7BE');

        this.addChild(this.#view);
    }

    update(){
        this.y -= this.#speed;
    }
}