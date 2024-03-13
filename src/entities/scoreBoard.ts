import * as PIXI from "pixi.js";

type ScoreBoardOptions = {
    x: number;
    y: number;
    initialScore: number;
}
export class ScoreBoard {
    public scoreText: PIXI.Text;
    public score: number;

    constructor({ x, y, initialScore }: ScoreBoardOptions) {
        this.score = initialScore;
        const scoreText = new PIXI.Text({
            text: `Score: ${this.score}`,
            style: {
                fill: 0xffffff,
            }
        });
        scoreText.position.set(x, y);
        this.scoreText = scoreText;
    }

    public getScoreText() {
        return this.scoreText;
    }

    updateScore(newScore: number) {
        this.score += newScore;
        this.scoreText.text = `Score: ${this.score}`;
    }
}