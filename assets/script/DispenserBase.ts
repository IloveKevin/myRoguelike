import WeaponBase from "./WeaponBase";

export default class DispenserBase {
    weapon: WeaponBase;

    constructor(weapon: WeaponBase) {
        let self = this;
        self.weapon = weapon;
    }

    tryFire(): boolean {
        let self = this;

        return false;
    }
}