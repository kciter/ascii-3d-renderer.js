class Vector2 {
  constructor(public x: number, public y: number) {}

  add(vector: Vector2) {
    return new Vector2(this.x + vector.x, this.y + vector.y);
  }

  subtract(vector: Vector2) {
    return new Vector2(this.x - vector.x, this.y - vector.y);
  }

  multiply(scalar: number) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }
}
