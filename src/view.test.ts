import { Cube } from "./cube";
import { PointyLayout } from "./layout";
import { Adapter, View } from "./view";

type Point = {
    x: number
    y: number
};

const adapter: Adapter<Point> = {
    create: (x: number, y: number): Point => {
        return { x, y }
    },
    extract: (point: Point) => {
        return [point.x, point.y]
    },
}

const view = new View<Point>(adapter, new PointyLayout());

test('cubeToPoint / pointToCube back and forth', () => {
    const cube = Cube.fromAxis(6, -4);
    const point = view.cubeToPoint(cube);

    expect(view.pointToCube(point)).toEqual(cube);
});

test('getPolygon', () => {
    expect(view.getPolygon().length).toEqual(6);
});