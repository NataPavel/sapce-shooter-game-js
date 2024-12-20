import { Container, Graphics } from "pixi.js";

// Asteroid - enemy class at the first level of the game
export default class Asteroid extends Container{

    #attackSpeed = 1; // speed of asteroid's attack

    constructor(){
            super();
            const view = new Graphics();
    
            view.circle(0, 0, 50);
            view.stroke({
                width: 8,
                color: '8d0b41',
            });
    
            this.addChild(view)
        }

    // frame update function
    update(){
        this.y += this.#attackSpeed;
    }
}