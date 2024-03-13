import './style.css'
import * as PIXI from 'pixi.js';
import {Hero} from "./entities/hero.ts";
import {Yard} from "./entities/yard.ts";
import {GameField} from "./entities/gameField.ts";
import {ScoreBoard} from "./entities/scoreBoard.ts";
import {Animal} from "./entities/animal.ts";
import {
    ANIMAL_SIZE,
    GAME_HEIGHT,
    GAME_WIDTH,
    GROUPING_DISTANCE,
    MAIN_HERO_SIZE,
    MAX_ANIMALS_IN_GROUP,
    YARD_SIZE
} from "./constants.ts";
import {PositionType} from "./types.ts";

class Game {
    private readonly app: PIXI.Application;
    private readonly hero: PIXI.Graphics;
    private readonly scoreBoard: ScoreBoard;

    constructor() {
        this.app = new PIXI.Application();
        this.hero = new Hero({
            x: GAME_WIDTH / 2,
            y: GAME_HEIGHT / 2,
            size: MAIN_HERO_SIZE,
            backgroundColor: '0xF44336',
        }).getHero();
        this.scoreBoard = new ScoreBoard({
            x: 10,
            y: 10,
            initialScore: 0,
        })
    }

    async init() {
        await this.app.init({
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
        });
        document.body.appendChild(this.app.canvas);

        // Draw GameField
        new GameField({
            app: this.app,
            width: GAME_WIDTH,
            height: GAME_HEIGHT,
            backgroundColor: '#20B2AA',
        })

        // Draw Yard
        new Yard({
            app: this.app,
            x: GAME_WIDTH - YARD_SIZE,
            y: GAME_HEIGHT - YARD_SIZE,
            size: YARD_SIZE,
            backgroundColor: '#FFFF00',
        });

        // Draw Hero
        this.app.stage.addChild(this.hero);

        // Draw ScoreBoard
        this.app.stage.addChild(this.scoreBoard.getScoreText());

        const animals: PIXI.Graphics[] = [];
        const minAnimals = 5;
        const maxAnimals = 10;
        const animalsCount = Math.floor(Math.random() * (maxAnimals - minAnimals + 1)) + minAnimals

        for (let i = 0; i < animalsCount; i++) {
            const animal = new Animal({
                app: this.app,
                size: ANIMAL_SIZE,
                x: Math.random() * GAME_WIDTH,
                y: Math.random() * GAME_HEIGHT,
                backgroundColor: '0xffffff',
            }).getAnimal();
            animals.push(animal);
        }

        this.runGameEngine(animals);

        this.handleHeroMovement();
    }

    private runGameEngine(animals: PIXI.Graphics[]) {
        const animalGroup: PIXI.Graphics[] = [];

        this.app.ticker.add(() => {
            animals.forEach(animal => {
                if (this.distance(this.hero, animal) < GROUPING_DISTANCE) {
                    if (animalGroup.length < MAX_ANIMALS_IN_GROUP) {
                        animalGroup.push(animal);
                        animals.splice(animals.indexOf(animal), 1);
                    }
                }
            });

            if (animalGroup.length > 0) {
                const groupOffset = 25;
                animalGroup.forEach((animal, index) => {
                    const angle = Math.atan2(this.hero.y - animal.y, this.hero.x - animal.x);
                    const offsetX = groupOffset * Math.cos(angle);
                    const offsetY = groupOffset * Math.sin(angle);
                    animal.x = this.hero.x - offsetX * (index + 1);
                    animal.y = this.hero.y - offsetY * (index + 1);
                });
            }

            if (
                animalGroup.length > 0 &&
                this.distance(this.hero, { x: GAME_WIDTH - YARD_SIZE / 2, y: GAME_HEIGHT - YARD_SIZE / 2 }) < GROUPING_DISTANCE
            ) {
                this.scoreBoard.updateScore(animalGroup.length);
                animalGroup.forEach(animal => {
                    this.app.stage.removeChild(animal);
                });
                animalGroup.length = 0;
            }
        });
    }

    private handleHeroMovement() {
        this.app.stage.interactive = true;
        this.app.stage.on("pointerdown", (event) => {
            const newPosition = event.data.getLocalPosition(this.app.stage);
            this.hero.x = newPosition.x;
            this.hero.y = newPosition.y;
        });
    }

    private distance(obj1: PositionType, obj2: PositionType): number {
        return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
    }
}

const game = new Game();
game.init();



