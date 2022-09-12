"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
class View {
    constructor(adapter, layout) {
        this.offset = {
            x: 0,
            y: 0,
        };
        this.size = {
            x: 50,
            y: 50,
        };
        this.adapter = adapter;
        this.layout = layout;
    }
    setOffset(point) {
        const [x, y] = this.adapter.extract(point);
        this.offset = { x, y };
        return this;
    }
    setSize(point) {
        const [x, y] = this.adapter.extract(point);
        this.size = { x, y };
        return this;
    }
    setAngle(angle, radius) {
        const x = Math.cos(Math.PI / 3.0) * 2 * radius;
        const y = Math.cos(angle) * x;
        return this.setSize(this.adapter.create(x, y));
    }
    cubeToPoint(cube) {
        const [x, y] = this.layout.cubeToPoint(cube);
        return this.adapter.create(x * this.size.x + this.offset.x, y * this.size.y + this.offset.y);
    }
    pointToCube(point) {
        const [x, y] = this.adapter.extract(point);
        return this.layout.pointToCube((x - this.offset.x) / this.size.x, (y - this.offset.y) / this.size.y);
    }
    getPolygon() {
        return this.layout.getPolygon().map(([x, y]) => {
            return this.adapter.create(x, y);
        });
    }
}
exports.View = View;
