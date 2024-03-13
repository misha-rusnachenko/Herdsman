import * as PIXI from "pixi.js";

type GameFieldOptions = {
    app: PIXI.Application;
    width: number;
    height: number;
    backgroundColor: string;
}

export class GameField {
    public gameField: PIXI.Graphics;

    constructor({ app, width, height, backgroundColor }: GameFieldOptions) {
        const gameField = new PIXI.Graphics();
        gameField.rect(0, 0, width, height);
        gameField.fill(backgroundColor);
        this.gameField = gameField;
        app.stage.addChild(gameField);
    }

    public getGameField() {
        return this.gameField;
    }
}