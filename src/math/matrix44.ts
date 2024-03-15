import { Vector3 } from './vector3';

// prettier-ignore
export class Matrix44 {
  m00: number; m01: number; m02: number; m03: number;
  m10: number; m11: number; m12: number; m13: number;
  m20: number; m21: number; m22: number; m23: number;
  m30: number; m31: number; m32: number; m33: number;

  constructor(
    m00: number, m01: number, m02: number, m03: number,
    m10: number, m11: number, m12: number, m13: number,
    m20: number, m21: number, m22: number, m23: number,
    m30: number, m31: number, m32: number, m33: number
  ) {
    this.m00 = m00; this.m01 = m01; this.m02 = m02; this.m03 = m03;
    this.m10 = m10; this.m11 = m11; this.m12 = m12; this.m13 = m13;
    this.m20 = m20; this.m21 = m21; this.m22 = m22; this.m23 = m23;
    this.m30 = m30; this.m31 = m31; this.m32 = m32; this.m33 = m33;
  }

  static zero() {
    return new Matrix44(
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    );
  }

  static identity() {
    return new Matrix44(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }

  add(matrix: Matrix44) {
    return new Matrix44(
      this.m00 + matrix.m00, this.m01 + matrix.m01, this.m02 + matrix.m02, this.m03 + matrix.m03,
      this.m10 + matrix.m10, this.m11 + matrix.m11, this.m12 + matrix.m12, this.m13 + matrix.m13,
      this.m20 + matrix.m20, this.m21 + matrix.m21, this.m22 + matrix.m22, this.m23 + matrix.m23,
      this.m30 + matrix.m30, this.m31 + matrix.m31, this.m32 + matrix.m32, this.m33 + matrix.m33
    );
  }

  subtract(matrix: Matrix44) {
    return new Matrix44(
      this.m00 - matrix.m00, this.m01 - matrix.m01, this.m02 - matrix.m02, this.m03 - matrix.m03,
      this.m10 - matrix.m10, this.m11 - matrix.m11, this.m12 - matrix.m12, this.m13 - matrix.m13,
      this.m20 - matrix.m20, this.m21 - matrix.m21, this.m22 - matrix.m22, this.m23 - matrix.m23,
      this.m30 - matrix.m30, this.m31 - matrix.m31, this.m32 - matrix.m32, this.m33 - matrix.m33
    );
  }

  multiply(matrix: Matrix44) {
    return new Matrix44(
      this.m00 * matrix.m00 + this.m01 * matrix.m10 + this.m02 * matrix.m20 + this.m03 * matrix.m30,
      this.m00 * matrix.m01 + this.m01 * matrix.m11 + this.m02 * matrix.m21 + this.m03 * matrix.m31,
      this.m00 * matrix.m02 + this.m01 * matrix.m12 + this.m02 * matrix.m22 + this.m03 * matrix.m32,
      this.m00 * matrix.m03 + this.m01 * matrix.m13 + this.m02 * matrix.m23 + this.m03 * matrix.m33,
      this.m10 * matrix.m00 + this.m11 * matrix.m10 + this.m12 * matrix.m20 + this.m13 * matrix.m30,
      this.m10 * matrix.m01 + this.m11 * matrix.m11 + this.m12 * matrix.m21 + this.m13 * matrix.m31,
      this.m10 * matrix.m02 + this.m11 * matrix.m12 + this.m12 * matrix.m22 + this.m13 * matrix.m32,
      this.m10 * matrix.m03 + this.m11 * matrix.m13 + this.m12 * matrix.m23 + this.m13 * matrix.m33,
      this.m20 * matrix.m00 + this.m21 * matrix.m10 + this.m22 * matrix.m20 + this.m23 * matrix.m30,
      this.m20 * matrix.m01 + this.m21 * matrix.m11 + this.m22 * matrix.m21 + this.m23 * matrix.m31,
      this.m20 * matrix.m02 + this.m21 * matrix.m12 + this.m22 * matrix.m22 + this.m23 * matrix.m32,
      this.m20 * matrix.m03 + this.m21 * matrix.m13 + this.m22 * matrix.m23 + this.m23 * matrix.m33,
      this.m30 * matrix.m00 + this.m31 * matrix.m10 + this.m32 * matrix.m20 + this.m33 * matrix.m30,
      this.m30 * matrix.m01 + this.m31 * matrix.m11 + this.m32 * matrix.m21 + this.m33 * matrix.m31,
      this.m30 * matrix.m02 + this.m31 * matrix.m12 + this.m32 * matrix.m22 + this.m33 * matrix.m32,
      this.m30 * matrix.m03 + this.m31 * matrix.m13 + this.m32 * matrix.m23 + this.m33 * matrix.m33,
    );
  }

  static scale(v: Vector3) {
    return new Matrix44(
      v.x, 0, 0, 0,
      0, v.y, 0, 0,
      0, 0, v.z, 0,
      0, 0, 0, 1
    );
  }

  static translate(v: Vector3) {
    return new Matrix44(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      v.x, v.y, v.z, 1
    );
  }

  static rotateX(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix44(
      1, 0, 0, 0,
      0, cos, -sin, 0,
      0, sin, cos, 0,
      0, 0, 0, 1
    );
  }

  static rotateY(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix44(
      cos, 0, -sin, 0,
      0, 1, 0, 0,
      sin, 0, cos, 0,
      0, 0, 0, 1
    );
  }

  static rotateZ(angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Matrix44(
      cos, -sin, 0, 0,
      sin, cos, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    );
  }

  setIdentity() {
    this.m00 = 1; this.m01 = 0; this.m02 = 0; this.m03 = 0;
    this.m10 = 0; this.m11 = 1; this.m12 = 0; this.m13 = 0;
    this.m20 = 0; this.m21 = 0; this.m22 = 1; this.m23 = 0;
    this.m30 = 0; this.m31 = 0; this.m32 = 0; this.m33 = 1;
  }
}
