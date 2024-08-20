import MovementController from "../controller/MovementController";
import PlayerAnimationController from "../controller/PlayerAnimationController";
import IInput from "../interface/IInput";
import { IMovementProvider } from "../interface/IMovementProvider";
import ResManager from "../manager/ResManager";

export default class Player implements IMovementProvider {
    private node: cc.Node;
    public get Node(): cc.Node { return this.node; }

    private visualNode: cc.Node;

    private animationController: PlayerAnimationController;

    private movementController: MovementController;

    private input: IInput;

    //是否完成初始化
    private isInit: boolean = false;

    private speed: number = 100;

    constructor(input: IInput) {
        let self = this;

        self.input = input;
    }

    public async init(parent: cc.Node): Promise<void> {
        let self = this;

        await self.initNode(parent);

        self.initAnimationController();

        self.initMovementController();

        self.isInit = true;
    }

    //初始化节点
    private async initNode(parent: cc.Node): Promise<void> {
        let self = this;
        let prefab = await ResManager.Instance.loadRes("prefab/player", cc.Prefab);

        let node = cc.instantiate(prefab);

        node.setParent(parent);

        self.node = node;

        let visualNode = node.getChildByName("visual");

        self.visualNode = visualNode;
    }

    //初始化动画控制器
    private initAnimationController(): void {
        let self = this;

        let animationController = new PlayerAnimationController(self.visualNode, self);
        self.animationController = animationController;
    }

    //初始化移动控制器
    private initMovementController(): void {
        let self = this;

        let movementController = new MovementController(self.node, self);
        self.movementController = movementController;
    }

    getSpeed(): number {
        let self = this;

        return self.speed;
    }

    getDirection(): cc.Vec2 {
        let self = this;

        return self.input.getInputDirection().normalizeSelf();
    }

    update(dt: number): void {
        let self = this;

        if (!self.isInit) return;

        self.movementController.update(dt);

        self.animationController.update(dt);
    }
}