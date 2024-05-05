import { Matrix44, Vector3, Vector4 } from './math';

export class Camera {
  eye: Vector3; // Camera position
  look: Vector3; // Camera target
  up: Vector3; // Camera up vector

  constructor() {
    this.eye = new Vector3(0, 0, 0);
    this.look = new Vector3(0, 0, 1);
    this.up = new Vector3(0, 1, 0);
  }

  transform(v: Vector4) {
    const forward = this.look.subtract(this.eye).normalize();
    const newUp = forward.cross(this.up).normalize();
    const right = newUp.cross(forward);

    // prettier-ignore
    const matrix = new Matrix44(
      right.x, right.y, right.z, 0,
      newUp.x, newUp.y, newUp.z, 0,
      forward.x, forward.y, forward.z, 0,
      this.eye.x, this.eye.y, this.eye.z, 1
    );

    return v.transform(matrix);
  }
}
