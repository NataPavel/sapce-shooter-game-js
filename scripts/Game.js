import Asteroid from "./Entities/Asteroid";
import Bullet from "./Entities/Bullet";
import Player from "./Entities/Player";
import { Text } from "pixi.js";

// Game class is the main class where everything works
export default class Game{
    #app;
    #asteroids = [];
    #player;
    #bullets = [];
    #bulletQuantity = 10; // curent quantity of bullets 
    #bulletQuantityText;

    constructor(app){
        this.#app = app;

        this.#player = new Player(); // creating main space ship which will be operated by player
        
        // assign coordinates of main space ship
        this.#player.x = this.#app.screen.width / 2;
        this.#player.y = this.#app.screen.height - 200;
        this.#app.stage.addChild(this.#player);
  
        setInterval(() => {
            this.spawnAsteroidsRandomly();
        }, 6000);

        // Create a text element to display bullet limit message
        this.#bulletQuantityText = new Text({
            text: 'Bullets: 10 / 10',
            style:{
                fontSize: 24,
                fill: 'red'
            }
        });

        this.#bulletQuantityText.x = 10;
        this.#bulletQuantityText.y = 10;
        this.#app.stage.addChild(this.#bulletQuantityText);

        window.addEventListener('keypress', this.onKeyPress.bind(this));
    }

    // Method to spawn new asteroids at random position of x coordinate 
    spawnAsteroidsRandomly(){
        const asteroid = new Asteroid();

        asteroid.x = Math.random() * 1280;
        asteroid.y = 0;

        this.#app.stage.addChild(asteroid);
        this.#asteroids.push(asteroid);
    }

    // Methods that generates bullets
    onKeyPress(event){
        if(event.key === " " && this.#bulletQuantity > 0){
            this.shootBullet();
        }
    }

    shootBullet(){
        const bullet = new Bullet(this.#player);
        this.#app.stage.addChild(bullet);
        this.#bullets.push(bullet);
        this.#bulletQuantity -= 1;

        this.#bulletQuantityText.text = `Bullets: ${this.#bulletQuantity} / 10`;
        if(this.#bulletQuantity == 0){
            this.#bulletQuantityText.text = 'Bullet limit reached!';
        }
    }

    // frame update function
    update(){
        this.#asteroids.forEach(asteroid => asteroid.update());
        this.#player.update();
        this.#bullets.forEach(bullet => bullet.update());
    }
}