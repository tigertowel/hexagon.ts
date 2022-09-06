import { Cube } from "./cube";

const SQRT3 = Math.sqrt(3);

export interface Layout {
    cubeToPoint(cube: Cube): [x: number, y: number];
    pointToCube(x: number, y: number): Cube;
    getPolygon(): [x: number, y: number][];
}

export class PointyLayout implements Layout {

    protected polygonOffset: number = 0;

    public cubeToPoint(cube: Cube): [x: number, y: number] {
        return [
            cube.q * SQRT3 + cube.r * SQRT3 / 2,
            cube.r * 1.5,
        ];
    }

    public pointToCube(x: number, y: number): Cube {
        return Cube.fromAxis(
            x * SQRT3 / 3 - y / 3,
            y / 1.5,
        ).round();
    }

    public getPolygon(): [x: number, y: number][] {
        return new Array(6).fill(1).map((_, i) => {
            const v = Math.PI / 3 * i + this.polygonOffset;
            return [Math.sin(v), Math.cos(v)];
        });
    }
}

export class FlatLayout<T> extends PointyLayout {

    protected polygonOffset: number = Math.PI / 6;

    public cubeToPoint(cube: Cube): [x: number, y: number] {
        return [
            cube.q * 1.5,
            cube.q * SQRT3 / 2 + cube.r * SQRT3,
        ];
    }

    public pointToCube(x: number, y: number): Cube {
        return Cube.fromAxis(
            x / 1.5,
            y * SQRT3 / 3 - x / 3,
        ).round();
    }
}