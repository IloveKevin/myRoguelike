export default class CameraFollow {
    camera: cc.Camera;

    target: cc.Node;

    constructor(camera: cc.Camera, target: cc.Node) {
        let self = this;

        self.camera = camera;

        self.target = target;
    }

    update(dt: number): void {
        let self = this;

        if (!cc.isValid(self.camera) || !cc.isValid(self.target)) return;

        self.camera.node.setPosition(self.target.position);
    }
}