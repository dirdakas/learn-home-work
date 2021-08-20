import { Point } from './Point';

export abstract class Shape {
    private readonly DEFAULT_MIN_POINTS: number = 3;
    protected color: string;
    protected filled: boolean;
 
    points: Point[];

    constructor(points: Point[]);
    constructor(points: Point[], color: string, filled: boolean);
    constructor(points: Point[], color?: string, filled?: boolean) {
        if (points.length < this.DEFAULT_MIN_POINTS)
            throw `Atleast ${this.DEFAULT_MIN_POINTS} points should be given`;
        
        this.points = points;

        if (color) {
            this.color = color
            this.filled = !!filled;
        } else {
            this.color = 'green';
            this.filled = true;
        }
    }
    
    abstract getType(): string;

    toString(): string {
        return `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'not filled'}. Points: ${this.points.reduce((a, b, i) => {
            return a + b.toString() + (i < this.points.length - 1 ? ', ' : '.');
        }, '')}`;
    }

    getPerimeter(): number {
        return this.points.reduce((a, b, i) => {
            let add: number = 0;
            if (i < this.points.length - 1) {
                add += b.distance(this.points[i + 1])
            } else {
                add += b.distance(this.points[0])
            }

            return a + add;
        }, 0);
    }
}
