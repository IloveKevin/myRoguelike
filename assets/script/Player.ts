import Home from "./Home";
import ResManager from "./ResManager";
import { playerAnimationSpriteFrames } from "./Struct";

export default class Player {
    node: cc.Node;

    sprite: cc.Sprite;

    animation: cc.Animation;

    animationState: cc.AnimationState;

    private readonly keyMap: Map<number, string> = new Map<number, string>([ //键盘映射表
        [cc.macro.KEY.a, "left"],
        [cc.macro.KEY.d, "right"],
        [cc.macro.KEY.w, "up"],
        [cc.macro.KEY.s, "down"],
    ]);

    inputDir: { left: number, right: number, up: number, down: number } = { left: 0, right: 0, up: 0, down: 0 };

    async init(): Promise<void> {
        let self = this;

        self.createdNode();

        let textures = await self.loadTextures();

        let frames = self.getSpriteFrames(textures);

        self.createdAnimation(frames);

        self.registerEvent();

        setInterval(() => {

            self.fire(cc.v2(1, 1));

        }, 1000);
    }

    //注册键盘事件
    registerEvent(): void {
        let self = this;

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, self.onKeyDown, self);

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, self);
    }

    //取消键盘事件
    unregisterEvent(): void {
        let self = this;

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, self.onKeyDown, self);

        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, self);
    }

    onKeyDown(event: cc.Event.EventKeyboard): void {
        let self = this;

        let key = event.keyCode;

        let dir = self.keyMap.get(key);

        if (!dir) return;

        self.inputDir[dir] = 1;

    }

    onKeyUp(event: cc.Event.EventKeyboard): void {
        let self = this;
        let key = event.keyCode;
        let dir = self.keyMap.get(key);
        if (!dir) return;

        self.inputDir[dir] = 0;
    }

    async fire(dir: cc.Vec2): Promise<void> {
        let self = this;

        let spriteFrame = await ResManager.Instance.loadRes("texture/weapon/sword/1", cc.SpriteFrame);

        let node = new cc.Node("weapon");

        let visual = new cc.Node("1");

        visual.addComponent(cc.Sprite).spriteFrame = spriteFrame;

        visual.scaleX = -1;

        visual.angle = -45;

        visual.setParent(node);

        node.setParent(Home.Instance.node);

        let pos = dir.normalize().mul(500);

        node.setPosition(self.node.getPosition());

        cc.tween(node)
            // .by(0.5, { angle: -360 })
            // .repeatForever()
            .by(0.5, { position: cc.v3(pos.x, pos.y, 0) })
            .call(() => {
                node.destroy();
            })
            .start();
    }

    //加载图像资源
    async loadTextures(): Promise<Array<cc.SpriteFrame>> {
        return await ResManager.Instance.loadDir("texture/player", cc.SpriteFrame);
    }

    //对图像资源进行规整返回需要的格式
    getSpriteFrames(textureFrames: Array<cc.SpriteFrame>): Array<playerAnimationSpriteFrames> {

        let datas = new Array<playerAnimationSpriteFrames>();

        for (let i = 0; i < textureFrames.length; i++) {
            let frame = textureFrames[i];

            let infos = frame.name.split("_");

            let key = infos[0];

            let dir = infos[1];

            let index = parseInt(infos[2]);

            let data = datas.find((value) => { return value.name == key; });

            if (!data) {
                data = { name: key, up: [], down: [], left: [], right: [] };
                datas.push(data);
            }

            data[dir][index] = frame;

        }
        return datas;
    }

    //创建节点
    createdNode(): void {
        let self = this;

        let node = new cc.Node("player");

        node.setScale(2);

        self.sprite = node.addComponent(cc.Sprite);

        self.node = node;
    }

    //创建动画
    createdAnimation(frames: Array<playerAnimationSpriteFrames>): void {
        let self = this;

        let animation = self.node.addComponent(cc.Animation);

        for (let i = 0; i < frames.length; i++) {
            let frame = frames[i];
            let name = frame.name;

            let keys = Object.keys(frame).filter(v => v !== "name");

            for (let j = 0; j < keys.length; j++) {
                let key = keys[j];

                let data = frame[key];

                let clip = cc.AnimationClip.createWithSpriteFrames(data, 24);

                clip.speed = 0.5;

                clip.name = name + "_" + key;

                clip.wrapMode = cc.WrapMode.Loop;

                animation.addClip(clip);
            }
        }

        self.animation = animation;

        self.playAnimation("idle_down");
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

    getDirection(): cc.Vec2 {
        let self = this;

        let inputDir = self.inputDir;

        let dir = cc.v2(0, 0);

        if (inputDir.left) {
            dir.x = -1;
        }

        if (inputDir.right) {
            dir.x = 1;
        }

        if (inputDir.up) {
            dir.y = 1;
        }

        if (inputDir.down) {
            dir.y = -1;
        }

        return dir;
    }

    move(dt: number): void {
        let self = this;

        let speed = 100 * dt;

        let dir = self.getDirection().normalize();

        let pos = self.node.getPosition().add(dir.mul(speed));

        self.node.setPosition(pos);
    }

    //处理动画
    handleAnimation(): void {
        let self = this;

        let inputDir = self.getDirection();

        let isStop = inputDir.equals(cc.Vec2.ZERO);

        if (isStop) {
            let dir = self.animationState.name.split("_")[1];
            let name = "idle_" + dir;

            if (self.animationState.name == name) return;

            self.playAnimation(name);
            return;
        }

        let dir = "";

        if (inputDir.x > 0) {
            dir = "right";
        }

        if (inputDir.x < 0) {
            dir = "left";
        }

        if (inputDir.y > 0) {
            dir = "up";
        }

        if (inputDir.y < 0) {
            dir = "down";
        }

        let name = "run_" + dir;

        if (self.animationState.name == name) return;

        self.playAnimation(name);
    }

    update(dt: number): void {
        let self = this;

        self.move(dt);

        self.handleAnimation();
    }

    destroy(): void {
        let self = this;

        self.node.destroy();

        self.unregisterEvent();
    }
}