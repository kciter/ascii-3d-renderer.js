export class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(v: Vector3) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
  }

  subtract(v: Vector3) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
  }

  multiply(s: number) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
  }

  rotateX(angle: number) {
    this.y = this.y * Math.cos(angle) - this.x * Math.sin(angle);
    this.z = -Math.sin(angle) * this.y + Math.cos(angle) * this.z;
  }

  rotateY(angle: number) {
    this.x = this.x * Math.cos(angle) + this.z * -Math.sin(angle);
    this.z = Math.sin(angle) * this.x + Math.cos(angle) * this.z;
  }

  rotateZ(angle: number) {
    this.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    this.y = this.x * -Math.sin(angle) + this.y * Math.cos(angle);
  }

  distance() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  cross(v: Vector3) {
    this.x = this.y * v.z - this.z * v.y;
    this.y = this.z * v.x - this.x * v.z;
    this.z = this.x * v.y - this.y * v.x;
  }

  normalize() {
    const distance = this.distance();
    this.x /= distance;
    this.y /= distance;
    this.z /= distance;
  }

  dot(v: Vector3) {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  copy() {
    return new Vector3(this.x, this.y, this.z);
  }
}
