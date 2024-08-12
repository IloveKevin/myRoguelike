import BackGround from "./BackGround";
import CameraFollow from "./CameraFollow";
import Enemy from "./Enemy";
import Home from "./Home";
import Player from "./Player";

export default class MyGame {

    player: Player;

    cameraFollow: CameraFollow;

    backGround: BackGround;

    async init(): Promise<void> {
        let self = this;

        let backGround = new BackGround();

        await backGround.init();

        backGround.node.setParent(Home.Instance.node);

        self.backGround = backGround;

        let player = new Player();

        await player.init();

        player.node.setParent(Home.Instance.node);

        self.player = player;

        self.backGround.limitNodes.push(player.node);

        self.cameraFollow = new CameraFollow(cc.Camera.main, player.node);

        let enemy = new Enemy();

        await enemy.init();

        enemy.node.setParent(Home.Instance.node);
    }

    update(dt: number): void {
        let self = this;

        self.player?.update(dt);

        self.cameraFollow?.update(dt);

        self.backGround?.update(dt);
    }
}