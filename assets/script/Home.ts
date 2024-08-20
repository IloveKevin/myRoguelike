import CameraFollow from "./camera/CameraFollow";
import KeyboardInput from "./input/KeyboardInput";
import Player from "./module/Player";


const { ccclass, property } = cc._decorator;

@ccclass
export default class Home extends cc.Component {

    player: Player;

    cameraFollow: CameraFollow;

    protected async start(): Promise<void> {
        let self = this;

        let player = new Player(new KeyboardInput())

        await player.init(self.node);

        self.player = player;

        let cameraFollow = new CameraFollow(cc.Camera.main, player.Node);

        self.cameraFollow = cameraFollow;
    }

    protected update(dt: number): void {
        let self = this;

        self.player?.update(dt);

        self.cameraFollow?.update(dt);
    }
}
