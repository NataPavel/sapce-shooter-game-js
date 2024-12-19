import Asteroids from "./Entities/Asteroids";
import Player from "./Entities/Player";

// Game class is the main class where everything works
export default class Game{
    #app;
    #asteroid;
    #player;

    constructor(app){
        this.#app = app;

        this.#player = new Player() // creating main space ship which will be operated by player
        
        // assign coordinates of main space ship
        this.#player.x = this.#app.screen.width / 2;
        this.#player.y = this.#app.screen.height - 200;
        this.#app.stage.addChild(this.#player);

        this.#asteroid = new Asteroids(); // creating main ateroid object
        this.#asteroid.x = 250;
        this.#asteroid.y = 70;
        this.#app.stage.addChild(this.#asteroid);
    }

    // frame update function
    update(){
        this.#asteroid.update();
        this.#player.update();
    }
}