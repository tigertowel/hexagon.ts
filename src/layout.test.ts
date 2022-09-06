import { Cube } from "./cube";
import { FlatLayout, PointyLayout } from "./layout";

const layouts = [
    new PointyLayout(),
    new FlatLayout(),
];

test('cubeToPoint / pointToCube back and forth', () => {
    layouts.forEach(layout => {
        const cube = Cube.fromAxis(2, 3);
        const [x, y] = layout.cubeToPoint(cube);
        expect(layout.pointToCube(x, y)).toEqual(cube);
    });
});

test('getPolygon', () => {
    layouts.forEach(layout => {
        expect(layout.getPolygon().length).toEqual(6);
    });
});