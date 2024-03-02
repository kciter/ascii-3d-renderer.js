export class Matrix44 {
  m00: number;
  m01: number;
  m02: number;
  m03: number;
  m10: number;
  m11: number;
  m12: number;
  m13: number;
  m20: number;
  m21: number;
  m22: number;
  m23: number;
  m30: number;
  m31: number;
  m32: number;
  m33: number;

  constructor(
    m00: number,
    m01: number,
    m02: number,
    m03: number,
    m10: number,
    m11: number,
    m12: number,
    m13: number,
    m20: number,
    m21: number,
    m22: number,
    m23: number,
    m30: number,
    m31: number,
    m32: number,
    m33: number
  ) {
    this.m00 = m00;
    this.m01 = m01;
    this.m02 = m02;
    this.m03 = m03;
    this.m10 = m10;
    this.m11 = m11;
    this.m12 = m12;
    this.m13 = m13;
    this.m20 = m20;
    this.m21 = m21;
    this.m22 = m22;
    this.m23 = m23;
    this.m30 = m30;
    this.m31 = m31;
    this.m32 = m32;
    this.m33 = m33;
  }

  add(matrix: Matrix44) {
    return new Matrix44(
      this.m00 + matrix.m00,
      this.m01 + matrix.m01,
      this.m02 + matrix.m02,
      this.m03 + matrix.m03,
      this.m10 + matrix.m10,
      this.m11 + matrix.m11,
      this.m12 + matrix.m12,
      this.m13 + matrix.m13,
      this.m20 + matrix.m20,
      this.m21 + matrix.m21,
      this.m22 + matrix.m22,
      this.m23 + matrix.m23,
      this.m30 + matrix.m30,
      this.m31 + matrix.m31,
      this.m32 + matrix.m32,
      this.m33 + matrix.m33
    );
  }

  subtract(matrix: Matrix44) {
    return new Matrix44(
      this.m00 - matrix.m00,
      this.m01 - matrix.m01,
      this.m02 - matrix.m02,
      this.m03 - matrix.m03,
      this.m10 - matrix.m10,
      this.m11 - matrix.m11,
      this.m12 - matrix.m12,
      this.m13 - matrix.m13,
      this.m20 - matrix.m20,
      this.m21 - matrix.m21,
      this.m22 - matrix.m22,
      this.m23 - matrix.m23,
      this.m30 - matrix.m30,
      this.m31 - matrix.m31,
      this.m32 - matrix.m32,
      this.m33 - matrix.m33
    );
  }

  multiply(scalar: number) {
    return new Matrix44(
      this.m00 * scalar,
      this.m01 * scalar,
      this.m02 * scalar,
      this.m03 * scalar,
      this.m10 * scalar,
      this.m11 * scalar,
      this.m12 * scalar,
      this.m13 * scalar,
      this.m20 * scalar,
      this.m21 * scalar,
      this.m22 * scalar,
      this.m23 * scalar,
      this.m30 * scalar,
      this.m31 * scalar,
      this.m32 * scalar,
      this.m33 * scalar
    );
  }
}
