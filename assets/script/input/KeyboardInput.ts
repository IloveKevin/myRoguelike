import IInput from "../interface/IInput";

export default class KeyboardInput implements IInput {
    private inputKeyMap: Map<cc.macro.KEY, boolean> = new Map<cc.macro.KEY, boolean>();

    constructor() {
        let self = this;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, self.onKeyDown, self);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, self.onKeyUp, self);
    }

    onKeyDown(event: cc.Event.EventKeyboard): void {
        let self = this;

        self.inputKeyMap.set(event.keyCode, true);
    }

    onKeyUp(event: cc.Event.EventKeyboard): void {
        let self = this;

        self.inputKeyMap.set(event.keyCode, false);
    }

    getInputDirection(): cc.Vec2 {
        let self = this;

        let vec = cc.Vec2.ZERO;
        if (self.inputKeyMap.get(cc.macro.KEY.up)) {
            vec.y = 1;
        }
        if (self.inputKeyMap.get(cc.macro.KEY.down)) {
            vec.y = -1;
        }
        if (self.inputKeyMap.get(cc.macro.KEY.left)) {
            vec.x = -1;
        }
        if (self.inputKeyMap.get(cc.macro.KEY.right)) {
            vec.x = 1;
        }
        return vec;
    }
}