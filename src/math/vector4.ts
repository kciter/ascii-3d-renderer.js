import { Matrix44 } from './matrix44';

export class Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }

  add(v: Vector4) {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    this.w += v.w;
  }

  subtract(v: Vector4) {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    this.w -= v.w;
  }

  multiply(s: number) {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    this.w *= s;
  }

  translate(matrix44: Matrix44) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;

    this.x = matrix44.m00 * x + matrix44.m10 * y + matrix44.m20 * z + matrix44.m30 * w;
    this.y = matrix44.m01 * x + matrix44.m11 * y + matrix44.m21 * z + matrix44.m31 * w;
    this.z = matrix44.m02 * x + matrix44.m12 * y + matrix44.m22 * z + matrix44.m32 * w;
    this.w = matrix44.m03 * x + matrix44.m13 * y + matrix44.m23 * z + matrix44.m33 * w;
  }

  copy() {
    return new Vector4(this.x, this.y, this.z, this.w);
  }
}
