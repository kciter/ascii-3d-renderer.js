export class Vector2 {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  add(vector: Vector2) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector2) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  multiply(scalar: number) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  distance() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const distance = this.distance();
    return new Vector2(this.x /= distance, this.y /= distance)
  }

  scale(scalar: number) {
    return new Vector2(this.x *= scalar, this.y *= scalar)
  }
}
