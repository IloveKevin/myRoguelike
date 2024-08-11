import MyGame from "./MyGame";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {
    myGame: MyGame;

    private static _instance: Home;

    public static get Instance(): Home {
        return this._instance;
    }

    protected onLoad(): void {
        let self = this;
        Home._instance = self;
    }

    protected start(): void {
        let self = this;

        self.myGame = new MyGame();

        self.myGame.init();
    }

    protected update(dt: number): void {
        let self = this;

        self.myGame?.update(dt);
    }
}
