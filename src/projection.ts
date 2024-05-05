import { Matrix44, Vector4 } from './math';

export class Projection {
  fov: number;
  aspect: number;
  near: number;
  far: number;

  constructor(fov: number, aspect: number, near: number, far: number) {
    this.fov = fov;
    this.aspect = aspect;
    this.near = near;
    this.far = far;
  }

  transform(v: Vector4) {
    const fovRad = this.fov * (Math.PI / 180);
    const f = 1.0 / Math.tan(fovRad / 2);
    const rangeInv = 1.0 / (this.near - this.far);

    // prettier-ignore
    const matrix = new Matrix44(
      f / this.aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (this.near + this.far) * rangeInv, -1,
      0, 0, this.near * this.far * rangeInv * 2, 0
    );

    const transformed = v.transform(matrix);

    transformed.x /= transformed.w;
    transformed.y /= transformed.w;
    transformed.z /= transformed.w;

    return transformed;
  }
}
