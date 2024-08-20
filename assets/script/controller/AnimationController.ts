export default class AnimationController {
    private animation: cc.Animation;

    private animationState: cc.AnimationState;

    private resolve: (value: boolean | PromiseLike<boolean>) => void;

    constructor(node: cc.Node) {
        let self = this;

        let animation = node.getComponent(cc.Animation) || node.addComponent(cc.Animation);

        animation.on(cc.Animation.EventType.FINISHED, self.onFinish, self);

        self.animation = animation;
    }

    private onFinish(event: cc.Event.EventCustom): void {
        let self = this

        if (!self.resolve) return;

        self.resolve(true);

        self.resolve = null;
    }

    public play(name: string): Promise<boolean> {
        let self = this;

        return new Promise((resolve) => {
            if (self.resolve) {
                self.resolve(false);
            }
            self.resolve = resolve;
            self.animationState = self.animation.play(name);
        });
    }

    //如果正在播放则不播放的方法
    public playIfNotPlaying(name: string): Promise<boolean> {
        let self = this;
        if (!self.animationState || self.animationState.name != name) {
            return self.play(name);
        } else {
            return Promise.resolve(true);
        }
    }

    public stop(): void {
        let self = this;

        self.animation.stop();

        self.animationState = null;

        if (self.resolve) {
            self.resolve(false);
            self.resolve = null;
        }
    }
}