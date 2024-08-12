import ResManager from "./ResManager";

export default class Enemy {
    node: cc.Node;

    sprite: cc.Sprite;

    animation: cc.Animation;

    animationState: cc.AnimationState;

    async init(): Promise<void> {
        let self = this;

        let textures = await self.loadTextures();

        self.createdNode();

        self.createdAnimation(textures);
    }

    loadTextures(): Promise<Array<cc.SpriteFrame>> {
        let self = this;

        return ResManager.Instance.loadDir("texture/enemy/carcassFeeder", cc.SpriteFrame);
    }

    createdNode(): void {
        let self = this;

        let node = new cc.Node("enemy");

        node.scale = 2;

        let sp = node.addComponent(cc.Sprite);

        self.sprite = sp;

        self.node = node;
    }

    //创建动画
    createdAnimation(frames: Array<cc.SpriteFrame>): void {
        let self = this;

        let animation = self.node.addComponent(cc.Animation);

        let clip = cc.AnimationClip.createWithSpriteFrames(frames, 24);

        clip.name = "run";

        clip.wrapMode = cc.WrapMode.Loop;

        clip.speed = 0.5;

        animation.addClip(clip);

        self.animation = animation;

        self.playAnimation("run");
    }

    playAnimation(name: string): void {
        let self = this;
        self.animationState = self.animation.play(name);
    }

    stopAnimation(): void {
        let self = this;
        self.animation.stop();

        self.animationState = null;
    }
}