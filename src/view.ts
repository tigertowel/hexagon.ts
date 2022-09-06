import { Cube } from "./cube";
import { Layout } from "./layout";

type Point = {
    x: number
    y: number
};

export interface Adapter<T> {
    create(x: number, y: number): T;
    extract(point: T): [x: number, y: number];
}

export class View<T>  {

    protected adapter: Adapter<T>;

    protected layout: Layout;

    protected offset: Point;

    protected size: Point;

    constructor(adapter: Adapter<T>, layout: Layout) {
        this.adapter = adapter;
        this.layout = layout;
    }

    public setOffset(x: number, y: number): this {
        this.offset = { x, y };
        return this;
    }

    public setSize(x: number, y: number): this {
        this.size = { x, y };
        return this;
    }

    public setAngle(angle: number, radius: number): this {
        const x = Math.cos(Math.PI / 3.0) * 2 * radius;
        const y = Math.cos(angle) * x;
        return this.setSize(x, y);
    }

    public cubeToPoint(cube: Cube): T {
        const [x, y] = this.layout.cubeToPoint(cube);
        return this.adapter.create(
            x * this.size.x + this.offset.x,
            y * this.size.y + this.offset.y,
        );
    }

    public pointToCube(point: T): Cube {
        const [x, y] = this.adapter.extract(point);
        return this.layout.pointToCube(
            (x - this.offset.x) / this.size.x,
            (y - this.offset.y) / this.size.y,
        );
    }

    public getPolygon(): T[] {
        return this.layout.getPolygon().map(([x, y]) => {
            return this.adapter.create(x, y);
        });
    }
}