import * as PIXI from "pixi.js";

type HeroOptions = {
    x: number;
    y: number;
    size: number;
    backgroundColor: string;
}

export class Hero {
    public hero: PIXI.Graphics;

    constructor({ x, y, size, backgroundColor }: HeroOptions) {
        const hero = new PIXI.Graphics();
        hero.circle(0, 0, size);
        hero.fill(backgroundColor);
        hero.x = x;
        hero.y = y;
        this.hero = hero;
    }

    public getHero() {
        return this.hero;
    }
}