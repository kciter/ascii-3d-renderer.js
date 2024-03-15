export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static zero() {
    return new Vector3(0, 0, 0);
  }

  add(v: Vector3) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  subtract(v: Vector3) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  multiply(s: number) {
    return new Vector3(this.x * s, this.y * s, this.z * s);
  }

  rotateX(angle: number) {
    return new Vector3(
      this.x,
      this.y * Math.cos(angle) - this.z * Math.sin(angle),
      this.y * Math.sin(angle) + this.z * Math.cos(angle)
    );
  }

  rotateY(angle: number) {
    return new Vector3(
      this.x * Math.cos(angle) + this.z * -Math.sin(angle),
      this.y,
      this.x * Math.sin(angle) + this.z * Math.cos(angle)
    );
  }

  rotateZ(angle: number) {
    return new Vector3(
      this.x * Math.cos(angle) - this.y * Math.sin(angle),
      this.x * Math.sin(angle) + this.y * Math.cos(angle),
      this.z
    );
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  cross(v: Vector3) {
    return new Vector3(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
  }

  normalize() {
    const length = this.length();
    return new Vector3(this.x / length, this.y / length, this.z / length);
  }

  dot(v: Vector3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }
}
