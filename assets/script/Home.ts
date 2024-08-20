import KeyboardInput from "./input/KeyboardInput";
import Player from "./models/Player";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    player: Player;

    protected async start(): Promise<void> {
        let self = this;

        let player = new Player(new KeyboardInput())

        await player.init(self.node);

        self.player = player;
    }

    protected update(dt: number): void {
        let self = this;

        self.player?.update(dt);
    }
}
