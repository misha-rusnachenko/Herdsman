import * as PIXI from "pixi.js";

type YardOptions = {
    app: PIXI.Application;
    x: number;
    y: number;
    size: number;
    backgroundColor: string;
}

export class Yard {
    public yard: PIXI.Graphics;

    constructor({ app, x, y, size, backgroundColor }: YardOptions) {
        const yard = new PIXI.Graphics();
        yard.rect(x, y, size, size);
        yard.fill(backgroundColor);
        this.yard = yard;
        app.stage.addChild(yard);
    }

    public getYard() {
        return this.yard;
    }
}