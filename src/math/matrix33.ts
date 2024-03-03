// prettier-ignore
export class Matrix33 {
  m00: number; m01: number; m02: number;
  m10: number; m11: number; m12: number;
  m20: number; m21: number; m22: number;

  constructor(
    m00: number, m01: number, m02: number,
    m10: number, m11: number, m12: number,
    m20: number, m21: number, m22: number
  ) {
    this.m00 = m00; this.m01 = m01; this.m02 = m02;
    this.m10 = m10; this.m11 = m11; this.m12 = m12;
    this.m20 = m20; this.m21 = m21; this.m22 = m22;
  }

  static identity() {
    return new Matrix33(
      1, 0, 0,
      0, 1, 0,
      0, 0, 1
    );
  }

  add(matrix: Matrix33) {
    return new Matrix33(
      this.m00 + matrix.m00, this.m01 + matrix.m01, this.m02 + matrix.m02,
      this.m10 + matrix.m10, this.m11 + matrix.m11, this.m12 + matrix.m12,
      this.m20 + matrix.m20, this.m21 + matrix.m21, this.m22 + matrix.m22
    );
  }

  subtract(matrix: Matrix33) {
    return new Matrix33(
      this.m00 - matrix.m00, this.m01 - matrix.m01, this.m02 - matrix.m02,
      this.m10 - matrix.m10, this.m11 - matrix.m11, this.m12 - matrix.m12,
      this.m20 - matrix.m20, this.m21 - matrix.m21, this.m22 - matrix.m22
    );
  }

  multiply(scalar: number) {
    return new Matrix33(
      this.m00 * scalar, this.m01 * scalar, this.m02 * scalar,
      this.m10 * scalar, this.m11 * scalar, this.m12 * scalar,
      this.m20 * scalar, this.m21 * scalar, this.m22 * scalar
    );
  }

  setIdentity() {
    this.m00 = 1; this.m01 = 0; this.m02 = 0;
    this.m10 = 0; this.m11 = 1; this.m12 = 0;
    this.m20 = 0; this.m21 = 0; this.m22 = 1;
  }
}
