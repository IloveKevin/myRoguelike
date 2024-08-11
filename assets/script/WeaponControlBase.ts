import WeaponBase from "./WeaponBase";

export default class WeaponControlBase {
    //攻击力
    attack: number;
    //攻击间隔
    attackInterval: number;
    //攻击范围
    attackRange: number;
    //描述信息
    desc: string;
    //发射计时器
    fireTimer: number;

    weapons: Array<WeaponBase> = new Array<WeaponBase>();

    get canFire(): boolean {
        let self = this;

        return self.fireTimer >= self.attackInterval;
    }

    init(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    getWeapon(): WeaponBase {
        throw new Error("Method not implemented.");
    }

    update(dt: number): void {
        let self = this;

        self.fireTimer += dt;

        self.weapons.forEach(weapon => {
            weapon.update(dt);
        });
    }
}