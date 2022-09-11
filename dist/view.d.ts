import { Cube } from "./cube";
import { Layout } from "./layout";
declare type Point = {
    x: number;
    y: number;
};
/**
 * Adapter to handle different Vector2D objects / classes
 */
export interface Adapter<T> {
    create(x: number, y: number): T;
    extract(point: T): [x: number, y: number];
}
export declare class View<T> {
    protected adapter: Adapter<T>;
    protected layout: Layout;
    protected offset: Point;
    protected size: Point;
    constructor(adapter: Adapter<T>, layout: Layout);
    setOffset(point: T): this;
    setSize(point: T): this;
    setAngle(angle: number, radius: number): this;
    cubeToPoint(cube: Cube): T;
    pointToCube(point: T): Cube;
    getPolygon(): T[];
}
export {};
