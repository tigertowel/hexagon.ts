"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatLayout = exports.PointyLayout = void 0;
const cube_1 = require("./cube");
const SQRT3 = Math.sqrt(3);
class PointyLayout {
    constructor() {
        this.polygonOffset = 0;
    }
    cubeToPoint(cube) {
        return [
            cube.q * SQRT3 + cube.r * SQRT3 / 2,
            cube.r * 1.5,
        ];
    }
    pointToCube(x, y) {
        return cube_1.Cube.fromAxis(x * SQRT3 / 3 - y / 3, y / 1.5).round();
    }
    getPolygon() {
        return new Array(6).fill(1).map((_, i) => {
            const v = Math.PI / 3 * i + this.polygonOffset;
            return [Math.sin(v), Math.cos(v)];
        });
    }
}
exports.PointyLayout = PointyLayout;
class FlatLayout extends PointyLayout {
    constructor() {
        super(...arguments);
        this.polygonOffset = Math.PI / 6;
    }
    cubeToPoint(cube) {
        return [
            cube.q * 1.5,
            cube.q * SQRT3 / 2 + cube.r * SQRT3,
        ];
    }
    pointToCube(x, y) {
        return cube_1.Cube.fromAxis(x / 1.5, y * SQRT3 / 3 - x / 3).round();
    }
}
exports.FlatLayout = FlatLayout;
