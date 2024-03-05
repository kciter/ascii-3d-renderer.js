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
    return new Vector4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
  }

  subtract(v: Vector4) {
    return new Vector4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
  }

  multiply(s: number) {
    return new Vector4(this.x * s, this.y * s, this.z * s, this.w * s);
  }

  transform(m44: Matrix44) {
    const x = this.x;
    const y = this.y;
    const z = this.z;
    const w = this.w;

    return new Vector4(
      m44.m00 * x + m44.m10 * y + m44.m20 * z + m44.m30 * w,
      m44.m01 * x + m44.m11 * y + m44.m21 * z + m44.m31 * w,
      m44.m02 * x + m44.m12 * y + m44.m22 * z + m44.m32 * w,
      m44.m03 * x + m44.m13 * y + m44.m23 * z + m44.m33 * w
    );
  }
}
