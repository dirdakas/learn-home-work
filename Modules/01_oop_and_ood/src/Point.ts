export class Point {
  x: number;
  y: number;
 
  constructor()
  constructor(x: number, y: number)
  constructor(x?: number, y?: number){
    this.x = x ? x : 0;
    this.y = y ? y : 0;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`
  }

  distance(): number;
  distance(point: Point): number;
  distance(x: number, y: number): number;

  distance(paramOne?: number | Point, paramTwo?: number): number {
    if (!paramOne) {
      return this.getDistance();
    } else if (paramOne instanceof Point && !paramTwo) {
      return this.getDistance(paramOne.x, paramOne.y);
    } else if (typeof paramOne === 'number' && typeof paramTwo === 'number') {
      return this.getDistance(paramOne, paramTwo);
    }

    throw new Error('Invalid parameters provided')
  }

  private getDistance(x: number = 0, y: number = 0): number {
    return Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
  }
}
