import * as PIXI from "pixi.js";

type AnimalOptions = {
    app: PIXI.Application;
    x: number;
    y: number;
    size: number;
    backgroundColor: string;
}
export class Animal {
    public animal: PIXI.Graphics;

    constructor({ app, x, y, size, backgroundColor }: AnimalOptions) {
        const animal = new PIXI.Graphics();
        animal.circle(0, 0, size);
        animal.fill(backgroundColor);
        animal.x = x;
        animal.y = y;
        this.animal = animal;
        app.stage.addChild(animal);
    }

    public getAnimal() {
        return this.animal;
    }
}