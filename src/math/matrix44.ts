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
      this.m30 * matrix.m02 + this.m31 * matrix.m12 + this.m32 * matrix.m22 + this.m33 * matrix.m33,
      this.m30 * matrix.m03 + this.m31 * matrix.m13 + this.m32 * matrix.m23 + this.m33 * matrix.m33
    );
  }

  scale(scalar: number) {
    return new Matrix44(
      this.m00 * scalar, this.m01 * scalar, this.m02 * scalar, this.m03 * scalar,
      this.m10 * scalar, this.m11 * scalar, this.m12 * scalar, this.m13 * scalar,
      this.m20 * scalar, this.m21 * scalar, this.m22 * scalar, this.m23 * scalar,
      this.m30 * scalar, this.m31 * scalar, this.m32 * scalar, this.m33 * scalar
    );
  }

  translate(v: Vector3) {
    const m30 = this.m30 + this.m00 * v.x + this.m10 * v.y + this.m20 * v.z;
    const m31 = this.m31 + this.m01 * v.x + this.m11 * v.y + this.m21 * v.z;
    const m32 = this.m32 + this.m02 * v.x + this.m12 * v.y + this.m22 * v.z;
    const m33 = this.m33 + this.m03 * v.x + this.m13 * v.y + this.m23 * v.z;

    return new Matrix44(
      this.m00, this.m01, this.m02, this.m03,
      this.m10, this.m11, this.m12, this.m13,
      this.m20, this.m21, this.m22, this.m23,
      m30, m31, m32, m33
    );

    // const matrix = new Matrix44(
    //   1, 0, 0, v.x,
    //   0, 1, 0, v.y,
    //   0, 0, 1, v.z,
    //   0, 0, 0, 1
    // );
    // return this.multiply(matrix);
  }

  rotate(eulerAxis: Vector3, angle: number) {
    const c = Math.cos(angle);
    const s = Math.sin(angle);
    const oneminusc = 1.0 - c;
    const xy = eulerAxis.x*eulerAxis.y;
    const yz = eulerAxis.y*eulerAxis.z;
    const xz = eulerAxis.x*eulerAxis.z;
    const xs = eulerAxis.x*s;
    const ys = eulerAxis.y*s;
    const zs = eulerAxis.z*s;

    const f00 = eulerAxis.x*eulerAxis.x*oneminusc+c;
    const f01 = xy*oneminusc+zs;
    const f02 = xz*oneminusc-ys;
    const f10 = xy*oneminusc-zs;
    const f11 = eulerAxis.y*eulerAxis.y*oneminusc+c;
    const f12 = yz*oneminusc+xs;
    const f20 = xz*oneminusc+ys;
    const f21 = yz*oneminusc-xs;
    const f22 = eulerAxis.z*eulerAxis.z*oneminusc+c;

    const t00 = this.m00 * f00 + this.m10 * f01 + this.m20 * f02;
    const t01 = this.m01 * f00 + this.m11 * f01 + this.m21 * f02;
    const t02 = this.m02 * f00 + this.m12 * f01 + this.m22 * f02;
    const t03 = this.m03 * f00 + this.m13 * f01 + this.m23 * f02;
    const t10 = this.m00 * f10 + this.m10 * f11 + this.m20 * f12;
    const t11 = this.m01 * f10 + this.m11 * f11 + this.m21 * f12;
    const t12 = this.m02 * f10 + this.m12 * f11 + this.m22 * f12;
    const t13 = this.m03 * f10 + this.m13 * f11 + this.m23 * f12;

    this.m20 = this.m00 * f20 + this.m10 * f21 + this.m20 * f22;
    this.m21 = this.m01 * f20 + this.m11 * f21 + this.m21 * f22;
    this.m22 = this.m02 * f20 + this.m12 * f21 + this.m22 * f22;
    this.m23 = this.m03 * f20 + this.m13 * f21 + this.m23 * f22;
    this.m00 = t00;
    this.m01 = t01;
    this.m02 = t02;
    this.m03 = t03;
    this.m10 = t10;
    this.m11 = t11;
    this.m12 = t12;
    this.m13 = t13;
  }

  // rotateX(angle: number) {
  //   const cos = Math.cos(angle);
  //   const sin = Math.sin(angle);
  //   const matrix = new Matrix44(
  //     1, 0, 0, 0,
  //     0, cos, -sin, 0,
  //     0, sin, cos, 0,
  //     0, 0, 0, 1
  //   );
  //   return this.multiply(matrix);
  // }

  // rotateY(angle: number) {
  //   const cos = Math.cos(angle);
  //   const sin = Math.sin(angle);
  //   const matrix = new Matrix44(
  //     cos, 0, -sin, 0,
  //     0, 1, 0, 0,
  //     sin, 0, cos, 0,
  //     0, 0, 0, 1
  //   );
  //   return this.multiply(matrix);
  // }

  // rotateZ(angle: number) {
  //   const cos = Math.cos(angle);
  //   const sin = Math.sin(angle);
  //   const matrix = new Matrix44(
  //     cos, -sin, 0, 0,
  //     sin, cos, 0, 0,
  //     0, 0, 1, 0,
  //     0, 0, 0, 1
  //   );
  //   return this.multiply(matrix);
  // }

  detMat44() {
    let f = this.m00 * ((this.m11 * this.m22 * this.m33 + this.m12 * this.m23 * this.m31 + this.m13 * this.m21 * this.m32)
      - this.m13 * this.m22 * this.m31
      - this.m11 * this.m23 * this.m32
      - this.m12 * this.m21 * this.m33);
    f -= this.m01 * ((this.m10 * this.m22 * this.m33 + this.m12 * this.m23 * this.m30 + this.m13 * this.m20 * this.m32)
        - this.m13 * this.m22 * this.m30
        - this.m10 * this.m23 * this.m32
        - this.m12 * this.m20 * this.m33);
    f += this.m02 * ((this.m10 * this.m21 * this.m33 + this.m11 * this.m23 * this.m30 + this.m13 * this.m20 * this.m31)
        - this.m13 * this.m21 * this.m30
        - this.m10 * this.m23 * this.m31
        - this.m11 * this.m20 * this.m33);
    f -= this.m03 * ((this.m10 * this.m21 * this.m32 + this.m11 * this.m22 * this.m30 + this.m12 * this.m20 * this.m31)
        - this.m12 * this.m21 * this.m30
        - this.m10 * this.m22 * this.m31
        - this.m11 * this.m20 * this.m32);

    return f;
  }

  invert() {
    function DET33(t00, t01, t02, t10, t11, t12, t20, t21, t22) {
      return (((t00) * ((t11) * (t22) - (t12) * (t21))) + ((t01) * ((t12) * (t20) - (t10) * (t22))) + ((t02) * ((t10) * (t21) - (t11) * (t20))))
    }

    const det = this.detMat44();
    
    if (det != 0) {
      const determinant_inv = 1.0 / det;

      const t00 =  DET33(this.m11, this.m12, this.m13, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33);
      const t01 = -DET33(this.m10, this.m12, this.m13, this.m20, this.m22, this.m23, this.m30, this.m32, this.m33);
      const t02 =  DET33(this.m10, this.m11, this.m13, this.m20, this.m21, this.m23, this.m30, this.m31, this.m33);
      const t03 = -DET33(this.m10, this.m11, this.m12, this.m20, this.m21, this.m22, this.m30, this.m31, this.m32);

      const t10 = -DET33(this.m01, this.m02, this.m03, this.m21, this.m22, this.m23, this.m31, this.m32, this.m33);
      const t11 =  DET33(this.m00, this.m02, this.m03, this.m20, this.m22, this.m23, this.m30, this.m32, this.m33);
      const t12 = -DET33(this.m00, this.m01, this.m03, this.m20, this.m21, this.m23, this.m30, this.m31, this.m33);
      const t13 =  DET33(this.m00, this.m01, this.m02, this.m20, this.m21, this.m22, this.m30, this.m31, this.m32);

      const t20 =  DET33(this.m01, this.m02, this.m03, this.m11, this.m12, this.m13, this.m31, this.m32, this.m33);
      const t21 = -DET33(this.m00, this.m02, this.m03, this.m10, this.m12, this.m13, this.m30, this.m32, this.m33);
      const t22 =  DET33(this.m00, this.m01, this.m03, this.m10, this.m11, this.m13, this.m30, this.m31, this.m33);
      const t23 = -DET33(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m30, this.m31, this.m32);

      const t30 = -DET33(this.m01, this.m02, this.m03, this.m11, this.m12, this.m13, this.m21, this.m22, this.m23);
      const t31 =  DET33(this.m00, this.m02, this.m03, this.m10, this.m12, this.m13, this.m20, this.m22, this.m23);
      const t32 = -DET33(this.m00, this.m01, this.m03, this.m10, this.m11, this.m13, this.m20, this.m21, this.m23);
      const t33 =  DET33(this.m00, this.m01, this.m02, this.m10, this.m11, this.m12, this.m20, this.m21, this.m22);

      this.m00 = t00*determinant_inv;
      this.m11 = t11*determinant_inv;
      this.m22 = t22*determinant_inv;
      this.m33 = t33*determinant_inv;
      this.m01 = t10*determinant_inv;
      this.m10 = t01*determinant_inv;
      this.m20 = t02*determinant_inv;
      this.m02 = t20*determinant_inv;
      this.m12 = t21*determinant_inv;
      this.m21 = t12*determinant_inv;
      this.m03 = t30*determinant_inv;
      this.m30 = t03*determinant_inv;
      this.m13 = t31*determinant_inv;
      this.m31 = t13*determinant_inv;
      this.m32 = t23*determinant_inv;
      this.m23 = t32*determinant_inv;
    }
  }


  setIdentity() {
    this.m00 = 1; this.m01 = 0; this.m02 = 0; this.m03 = 0;
    this.m10 = 0; this.m11 = 1; this.m12 = 0; this.m13 = 0;
    this.m20 = 0; this.m21 = 0; this.m22 = 1; this.m23 = 0;
    this.m30 = 0; this.m31 = 0; this.m32 = 0; this.m33 = 1;
  }
}
