import { IMovementProvider } from "../interface/IMovementProvider";

export default class MovementController {
    private node: cc.Node;

    private movementProvider: IMovementProvider;

    constructor(node: cc.Node, movementProvider: IMovementProvider) {
        let self = this;

        self.node = node;
        self.movementProvider = movementProvider;
    }

    move(dt: number): void {
        let self = this;

        let dir = self.movementProvider.getDirection();

        let speed = self.movementProvider.getSpeed();

        let pos = self.node.getPosition();

        pos = pos.addSelf(dir.multiplyScalar(speed * dt));

        self.node.setPosition(pos);
    }

    update(dt: number): void {
        let self = this;

        self.move(dt);
    }
}