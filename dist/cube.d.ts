export declare class Cube {
    readonly q: number;
    readonly r: number;
    readonly s: number;
    constructor(q: number, r: number, s: number);
    static fromAxis(q: number, r: number): Cube;
    add(other: Cube): Cube;
    subtract(other: Cube): Cube;
    scale(factor: number): Cube;
    invert(): Cube;
    lerp(other: Cube, t: number): Cube;
    getDistanceTo(other: Cube): number;
    getLineTo(other: Cube): Cube[];
    getNeighbours(): Cube[];
    getSurrounding(dist: number): Cube[];
    round(): Cube;
    toString(): string;
}
export declare const CubeNeighbours: Cube[];
