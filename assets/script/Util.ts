/**
 * 获取随机数
 * @param min 最小值 
 * @param max 最大值
 * @returns 随机数
 * @example 
 * ```typescript
 * random(1, 10) // 1 ~ 10
 */
export function randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min);
}