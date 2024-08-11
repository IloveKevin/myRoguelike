import Home from "./Home";
import Player from "./Player";

export default class MyGame {

    player: Player;

    async init(): Promise<void> {
        let self = this;

        let player = new Player();

        await player.init();

        player.node.setParent(Home.Instance.node);

        self.player = player;
    }

    update(dt: number): void {
        let self = this;

        self.player?.update(dt);
    }
}