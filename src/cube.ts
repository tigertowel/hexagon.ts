export class Cube {
    public readonly q: number;
    public readonly r: number;
    public readonly s: number;

    public constructor(q: number, r: number, s: number) {
        this.q = q;
        this.r = r;
        this.s = s;
    }

    static fromAxis(q: number, r: number): Cube {
        return new Cube(q, r, -q - r);
    }

    public add(other: Cube): Cube {
        return new Cube(
            this.q + other.q,
            this.r + other.r,
            this.s + other.s,
        );
    }

    public subtract(other: Cube): Cube {
        return new Cube(
            this.q - other.q,
            this.r - other.r,
            this.s - other.s,
        );
    }

    public multiply(factor: number): Cube {
        return new Cube(
            this.q * factor,
            this.r * factor,
            this.s * factor,
        );
    }

    public divide(divisor: number): Cube {
        return new Cube(
            this.q / divisor,
            this.r / divisor,
            this.s / divisor,
        );
    }

    public invert(): Cube {
        return new Cube(
            -this.q,
            -this.r,
            -this.s,
        );
    }

    public lerp(other: Cube, t: number): Cube {
        return other.subtract(this).multiply(t);
    }

    public getDistanceTo(other: Cube): number {
        return (Math.abs(this.q - other.q)
            + Math.abs(this.r - other.r)
            + Math.abs(this.s - other.s)) / 2;
    }

    public getLineTo(other: Cube): Cube[] {
        let line = [];
        const dist = this.getDistanceTo(other);
        const diff = other.subtract(this);
        for (let n = 1; n < dist; n++) {
            line.push(diff.multiply(n / dist).round());
        }
        return line;
    }

    public getNear(dist: number): Cube[] {
        let near = [];
        for (let q = -dist; q <= dist; q++) {
            for (let r = Math.max(-dist, -q - dist); r <= Math.min(dist, dist - q); r++) {
                near.push(this.add(Cube.fromAxis(q, r)));
            }
        }
        return near;
    }

    public round() {
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

    public getNeighbours(): Cube[] {
        return Neighbours.map(n => n.add(this));
    }

    public toString(): string {
        return `${this.q}:${this.r}`;
    }
}

const Neighbours = [
    Cube.fromAxis(1, 0),
    Cube.fromAxis(1, -1),
    Cube.fromAxis(0, -1),
    Cube.fromAxis(-1, 0),
    Cube.fromAxis(-1, 1),
    Cube.fromAxis(0, 1),
];