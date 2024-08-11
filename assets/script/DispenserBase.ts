import WeaponControlBase from "./WeaponControlBase";

/**
 * 发射器基类
 * 发射器的作用是按照规则发射武器
 * 发射器持有一个武器管理器，武器管理器可以返回一个武器的实例
 */
export default class DispenserBase {
    //这是按照规则发射出去的武器
    weapon: WeaponControlBase;

    tryFire(): boolean {
        throw new Error("Method not implemented.");
    }

    update(dt: number): void {
        let self = this;

        self.weapon?.update(dt);
    }
}