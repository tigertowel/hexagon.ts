import { Cube } from "./cube";
import { Layout } from "./layout";

type Point = {
    x: number
    y: number
};

/**
 * Adapter to handle different Vector2D objects / classes
 */
export interface Adapter<T> {
    create(x: number, y: number): T;
    extract(point: T): [x: number, y: number];
}

export class View<T>  {

    protected adapter: Adapter<T>;

    protected layout: Layout;

    protected offset: Point = {
        x: 0,
        y: 0,
    };

    protected size: Point = {
        x: 50,
        y: 50,
    };

    constructor(adapter: Adapter<T>, layout: Layout) {
        this.adapter = adapter;
        this.layout = layout;
    }

    public setOffset(point: T): this {
        const [x, y] = this.adapter.extract(point);
        this.offset = { x, y };
        return this;
    }

    public setSize(point: T): this {
        const [x, y] = this.adapter.extract(point);
        this.size = { x, y };
        return this;
    }

    public setAngle(angle: number, radius: number): this {
        const x = Math.cos(Math.PI / 3.0) * 2 * radius;
        const y = Math.cos(angle) * x;
        return this.setSize(this.adapter.create(x, y));
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