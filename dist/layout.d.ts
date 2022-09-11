import { Cube } from "./cube";
export interface Layout {
    cubeToPoint(cube: Cube): [x: number, y: number];
    pointToCube(x: number, y: number): Cube;
    getPolygon(): [x: number, y: number][];
}
export declare class PointyLayout implements Layout {
    protected polygonOffset: number;
    cubeToPoint(cube: Cube): [x: number, y: number];
    pointToCube(x: number, y: number): Cube;
    getPolygon(): [x: number, y: number][];
}
export declare class FlatLayout extends PointyLayout {
    protected polygonOffset: number;
    cubeToPoint(cube: Cube): [x: number, y: number];
    pointToCube(x: number, y: number): Cube;
}
