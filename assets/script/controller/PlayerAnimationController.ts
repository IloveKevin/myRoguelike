import { IDirectionProvider } from "../interface/IDirectionProvider";
import AnimationController from "./AnimationController";

type dirType = "up" | "down" | "left" | "right";

export default class PlayerAnimationController extends AnimationController {

    private directionProvider: IDirectionProvider;

    private lastDirType: dirType = "down";

    constructor(node: cc.Node, directionProvider: IDirectionProvider) {
        super(node);
        let self = this;
        self.directionProvider = directionProvider;
    }

    //播放行走动画
    public playWalk(dir: dirType): void {
        let self = this;

        let name = `run_${dir}`;

        self.lastDirType = dir;

        self.playIfNotPlaying(name);
    }

    //播放站立动画
    public playIdle(): void {
        let self = this;

        let dir = self.lastDirType;

        let name = `idle_${dir}`;
        self.playIfNotPlaying(name);
    }

    update(dt: number): void {
        let self = this;

        let dir = self.directionProvider.getDirection();

        let dirType = self.getDirTypeByVec(dir);

        let isIdle = dir.equals(cc.Vec2.ZERO);
        isIdle ? self.playIdle() : self.playWalk(dirType);
    }

    getDirTypeByVec(vec: cc.Vec2): dirType {
        if (vec.y > 0) return "up";
        if (vec.y < 0) return "down";
        if (vec.x > 0) return "right";
        if (vec.x < 0) return "left";
        return "up";
    }
}