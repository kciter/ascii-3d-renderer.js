export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  subtract(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  multiply(s: number) {
    return new Vector2(this.x * s, this.y * s);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const length = this.length();
    return new Vector2(this.x / length, this.y / length);
  }
}
