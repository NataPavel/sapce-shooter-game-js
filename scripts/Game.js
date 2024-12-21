import Asteroid from "./Entities/Asteroid";
import Bullet from "./Entities/Bullet";
import Player from "./Entities/Player";
import { Text } from "pixi.js";

// Game class is the main class where everything works
export default class Game{
    #app;

    #asteroids = [];
    #asteroidsInterval;

    #player;

    #bullets = [];
    #bulletQuantity = 10; // curent quantity of bullets 
    #bulletQuantityText;

    #timerText;
    #timeRemaining = 60;
    #timeStop;

    #loseText;
    #bossText;
    

    constructor(app){
        this.#app = app;

        this.#player = new Player(); // creating main space ship which will be operated by player
        
        // assign coordinates of main space ship
        this.#player.x = this.#app.screen.width / 2;
        this.#player.y = this.#app.screen.height - 200;
        this.#app.stage.addChild(this.#player);

        this.#asteroidsInterval = setInterval(() => {
            this.spawnAsteroidsRandomly();
        }, 7000);
  
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

        this.setTimer();
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

    // Check for Bullet-Asteroid collision (UPD: Obj1-Obj2 collision)
    isCollision(obj1, obj2){
        const objBounds1 = obj1.getBounds();
        const objBounds2 = obj2.getBounds();

        return (objBounds1.x < objBounds2.x + objBounds2.width &&
                objBounds1.x + objBounds1.width > objBounds2.x &&
                objBounds1.y < objBounds2.y + objBounds2.height &&
                objBounds1.y + objBounds1.height > objBounds2.y
        );
    }

    // Delete Objects ob collision
    deleteOnCollision(obj1, obj2){
        obj1.forEach((item1, index1) => {
            obj2.forEach((item2, index2) =>{
                if(this.isCollision(item1, item2)){
                    this.#app.stage.removeChild(item2);
                    this.#app.stage.removeChild(item1);

                    obj2.splice(index2, 1);
                    obj1.splice(index1, 1);
                }
            });
        });
    }

    // Lose if Asteroid hit Player
    playerAsteroidCollision(){
        this.#asteroids.forEach((asteroid, index) => {
            if(this.isCollision(asteroid, this.#player)){
                clearInterval(this.#timeStop);
                this.loseMessage();

                this.#app.stage.removeChild(this.#player);

                this.#app.stage.removeChild(asteroid);
                this.#asteroids.splice(index, 1);
            }
        })
    }

    setTimer(){
        this.#timerText = new Text({
            text: `Time left: ${this.#timeRemaining}`,
            style: {
                fontSize: 24,
                fill: 'red'
            }
        });

        this.#timerText.x  = this.#app.screen.width - 150;
        this.#timerText.y = 30;

        this.#app.stage.addChild(this.#timerText);

        this.#timeStop = setInterval(() => {
            this.updateTimer();
        }, 1000);
    }

    updateTimer(){
        if(this.#timeRemaining > 0){
            this.#timeRemaining -= 1;
            this.#timerText.text = `Time left: ${this.#timeRemaining}`;
        }else{
            this.#timerText.text = 'Time left: 0';
            clearInterval(this.#asteroidsInterval);
            if(this.#asteroids.length > 0){
                this.loseMessage();
            } else {
                this.bossMessage();
            }
            
        }
    }

    
    loseMessage(){
        this.#loseText = new Text({
            text: 'YOU LOSE',
            style:{
                fontSize: 54,
                fill: 'red',
                align: 'center'
            }
        });

        this.#loseText.x = (this.#app.screen.width - this.#loseText.width )/ 2;
        this.#loseText.y = this.#app.screen.height / 2;

        this.#app.stage.addChild(this.#loseText);

        console.log('You lose');
    }

    bossMessage(){
        this.#bossText = new Text({
            text: 'BOSS',
            style:{
                fontSize: 54,
                fill: 'red',
                align: 'center'
            }
        });

        this.#bossText.x = (this.#app.screen.width - this.#bossText.width )/ 2;
        this.#bossText.y = this.#app.screen.height / 2;

        this.#app.stage.addChild(this.#bossText);

        console.log('BOSS');
    }

    // frame update function
    update(){
        this.#asteroids.forEach(asteroid => asteroid.update());
        this.#player.update();
        this.#bullets.forEach(bullet => bullet.update());

        // Bullet-Asteroid collision
        this.deleteOnCollision(this.#bullets, this.#asteroids);

        // Asteroid-Player collision
        this.playerAsteroidCollision();

        console.log(this.#asteroids);
        console.log(this.#bullets);
    }
}