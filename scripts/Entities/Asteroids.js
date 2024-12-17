import { Container, Graphics } from "pixi.js";

// Asteroids - enemy class at the first level of the game
export default class Asteroids extends Container{

    #attackSpeed = 1; // speed of asteroids' attack

    constructor(){
            super();
            const view = new Graphics();
    
            view.circle(0, 0, 50, 50);
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