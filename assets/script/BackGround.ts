import ResManager from "./ResManager";
import { randomInt } from "./Util";

export default class BackGround {
    node: cc.Node;

    //受限制的节点，不允许出现在地图外
    limitNodes: Array<cc.Node> = [];

    async init(): Promise<void> {
        let self = this;

        let spriteFrames = await self.loadSprtieFrames();

        let spriteFrame = spriteFrames[randomInt(0, spriteFrames.length - 1)];

        self.createdNode(spriteFrame);
    }

    loadSprtieFrames(): Promise<Array<cc.SpriteFrame>> {
        let self = this;

        return ResManager.Instance.loadDir("texture/tiles", cc.SpriteFrame);
    }

    createdNode(spriteFrame: cc.SpriteFrame): void {
        let self = this;

        let node = new cc.Node("backGround");

        let sp = node.addComponent(cc.Sprite);

        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;

        sp.type = cc.Sprite.Type.TILED;

        sp.spriteFrame = spriteFrame;

        let size = spriteFrame.getOriginalSize();

        let scale = 32;

        node.zIndex = -1000;

        size.width *= scale;
        size.height *= scale;

        node.setContentSize(size);

        self.node = node;
    }

    update(dt: number): void {
        let self = this;

        let backGroundBox = self.node.getBoundingBox();

        for (let i = 0; i < self.limitNodes.length; i++) {
            let node = self.limitNodes[i];

            if (!cc.isValid(node)) {
                self.limitNodes.splice(i, 1);
                i--;
            }

            let box = node.getBoundingBox();

            if (box.xMax > backGroundBox.xMax) {
                node.x = backGroundBox.xMax - box.width / 2;
            }

            if (box.xMin < backGroundBox.xMin) {
                node.x = backGroundBox.xMin + box.width / 2;
            }

            if (box.yMax > backGroundBox.yMax) {
                node.y = backGroundBox.yMax - box.height / 2;
            }

            if (box.yMin < backGroundBox.yMin) {
                node.y = backGroundBox.yMin + box.height / 2;
            }

        }
    }
}