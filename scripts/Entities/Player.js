import { Container, Graphics } from "pixi.js";


// Player class - space ship which controlled by player
export default class Player extends Container{

    // movement properties
    #speed = 5;
    #left = false;
    #right = false;

    constructor(){
        super();
        const view = new Graphics();

        view.rect(0, 0, 100, 150);
        view.stroke({
            width: 8,
            color: '5db996',
        });

        this.addChild(view)

        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(event){ 
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A'){ 
            this.#left = true; 
        } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D'){ 
            this.#right = true; 
        } 
    }

    onKeyUp(event){ 
        if (event.key === 'ArrowLeft' || event.key === 'a' || event.key === 'A'){ 
            this.#left = false; 
        } else if (event.key === 'ArrowRight' || event.key === 'd' || event.key === 'D'){ 
            this.#right = false; 
        } 
    }


    update(){
        if (this.#left && this.x > 0){ 
            this.x -= this.#speed; 
        } else if (this.#right && this.x < 1180){ 
            this.x += this.#speed; 
        }
    }
}
