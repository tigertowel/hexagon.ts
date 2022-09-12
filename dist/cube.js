"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CubeNeighbours = exports.Cube = void 0;
class Cube {
    constructor(q, r, s) {
        this.q = q;
        this.r = r;
        this.s = s;
    }
    static fromAxis(q, r) {
        return new Cube(q, r, -q - r);
    }
    add(other) {
        return new Cube(this.q + other.q, this.r + other.r, this.s + other.s);
    }
    subtract(other) {
        return new Cube(this.q - other.q, this.r - other.r, this.s - other.s);
    }
    scale(factor) {
        return new Cube(this.q * factor, this.r * factor, this.s * factor);
    }
    invert() {
        return new Cube(-this.q, -this.r, -this.s);
    }
    lerp(other, t) {
        return other.subtract(this).scale(t);
    }
    getDistanceTo(other) {
        return (Math.abs(this.q - other.q)
            + Math.abs(this.r - other.r)
            + Math.abs(this.s - other.s)) / 2;
    }
    getLineTo(other) {
        let line = [];
        const dist = this.getDistanceTo(other);
        const diff = other.subtract(this);
        for (let n = 1; n < dist; n++) {
            line.push(diff.scale(n / dist).round());
        }
        return line;
    }
    getNeighbours() {
        return exports.CubeNeighbours.map(n => n.add(this));
    }
    getSurrounding(dist) {
        let near = [];
        for (let q = -dist; q <= dist; q++) {
            for (let r = Math.max(-dist, -q - dist); r <= Math.min(dist, dist - q); r++) {
                near.push(this.add(Cube.fromAxis(q, r)));
            }
        }
        return near;
    }
    round() {
        let q = Math.round(this.q);
        let r = Math.round(this.r);
        let s = Math.round(this.s);
        let dq = Math.abs(this.q - q);
        let dr = Math.abs(this.r - r);
        let ds = Math.abs(this.s - s);
        if (dq > dr && dq > ds) {
            return new Cube(-r - s, r, s);
        }
        if (dr > ds) {
            return new Cube(q, -q - s, s);
        }
        return new Cube(q, r, -q - r);
    }
    toString() {
        return `${this.q}:${this.r}`;
    }
}
exports.Cube = Cube;
exports.CubeNeighbours = [
    Cube.fromAxis(1, 0),
    Cube.fromAxis(1, -1),
    Cube.fromAxis(0, -1),
    Cube.fromAxis(-1, 0),
    Cube.fromAxis(-1, 1),
    Cube.fromAxis(0, 1),
];
