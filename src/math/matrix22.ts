// prettier-ignore
export class Matrix22 {
  m00: number;
  m01: number;
  m10: number;
  m11: number;

  constructor(
    m00: number, m01: number, 
    m10: number, m11: number
  ) {
    this.m00 = m00; this.m01 = m01;
    this.m10 = m10; this.m11 = m11;
  }

  static identity() {
    return new Matrix22(
      1, 0, 
      0, 1
    );
  }

  add(matrix: Matrix22) {
    return new Matrix22(
      this.m00 + matrix.m00, this.m01 + matrix.m01,
      this.m10 + matrix.m10, this.m11 + matrix.m11
    );
  }

  subtract(matrix: Matrix22) {
    return new Matrix22(
      this.m00 - matrix.m00, this.m01 - matrix.m01,
      this.m10 - matrix.m10, this.m11 - matrix.m11
    );
  }

  scale(scalar: number) {
    return new Matrix22(
      this.m00 * scalar, this.m01 * scalar,
      this.m10 * scalar, this.m11 * scalar
    );
  }

  setIdentity() {
    this.m00 = 1; this.m01 = 0;
    this.m10 = 0; this.m11 = 1;
  }
}
