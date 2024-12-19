import Asteroid from "./Entities/Asteroid";
import Player from "./Entities/Player";

// Game class is the main class where everything works
export default class Game{
    #app;
    #asteroids = [];
    #player;

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
    }

    // Method to spawn new asteroids at random position of x coordinate 
    spawnAsteroidsRandomly(){
        const asteroid = new Asteroid();

        asteroid.x = Math.random() * 1280;
        asteroid.y = 0;

        this.#app.stage.addChild(asteroid);
        this.#asteroids.push(asteroid);
    }

    // frame update function
    update(){
        this.#asteroids.forEach(asteroid => asteroid.update());
        this.#player.update();
    }
}