import Asteroids from "./Entities/Asteroids";
import HeroSpaceShip from "./Entities/HeroSpaceShip";

// Game class is the main class where everything works
export default class Game{
    #app;
    #asteroid;

    constructor(app){
        this.#app = app;

        const hero = new HeroSpaceShip() // creating main space ship which will be operated by player
        
        // assign coordinates of main space ship
        hero.x = this.#app.screen.width / 2;
        hero.y = this.#app.screen.height - 200;
        this.#app.stage.addChild(hero);

        this.#asteroid = new Asteroids(); // creating main ateroid object
        this.#asteroid.x = 250;
        this.#asteroid.y = 70;
        this.#app.stage.addChild(this.#asteroid);
    }

    // frame update function
    update(){
        this.#asteroid.update();
    }
}