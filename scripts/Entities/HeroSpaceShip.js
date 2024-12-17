import { Container, Graphics } from "pixi.js";

// HeroSpaceShip class - space ship which controlled by player
export default class HeroSpaceShip extends Container{
    constructor(){
        super();
        const view = new Graphics();

        view.rect(0, 0, 100, 150);
        view.stroke({
            width: 8,
            color: '5db996',
        });

        this.addChild(view)
    }
}