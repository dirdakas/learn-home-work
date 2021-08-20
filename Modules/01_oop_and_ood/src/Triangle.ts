import { Shape } from './Shape';
import { Point } from './Point';

export class Triangle extends Shape {

  constructor(a: Point, b: Point, c: Point)
  constructor(a: Point, b: Point, c: Point, color: string, filled: boolean)
  constructor(a: Point, b: Point, c: Point, color?: string, filled?: boolean) {
    super([a, b, c], color, filled);
  }

  toString(): string {
    return `Triangle[v1=${this.points[0].toString()},v2=${this.points[1].toString()},v3=${this.points[2].toString()}]`;
  }

  getType(): string {
    const s1: number = Math.round((this.points[0].distance(this.points[1])) * 100) / 100;
    const s2: number = Math.round((this.points[1].distance(this.points[2])) * 100) / 100;
    const s3: number = Math.round((this.points[2].distance(this.points[0])) * 100) / 100;

    if (this.isEquilateral(s1, s2, s3)) {
      return 'equilateral triangle';
    } else if (this.isIsosceles(s1, s2, s3)) {
      return 'isosceles triangle';
    } else if (this.isScalene(s1, s2, s3)) {
      return 'scalene triangle';
    }

    return 'something happened';
  }

  // all 3 sides equal
  private isEquilateral(s1, s2, s3): boolean {
    return s1 === s2 && s1 === s3;
	};

  // 2 equal sides
	private isIsosceles(s1, s2, s3): boolean {
		return s1 === s2 || s1 === s3 || s2 === s3
	};

  // no equal sides
	private isScalene(s1, s2, s3): boolean {
    return (s1 === s2 || s1 === s3 || s2 === s3) ? false : true;
	};
}
