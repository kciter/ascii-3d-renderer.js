import { Matrix44, Vector3, Vector4 } from './math';

export class Camera {
  eye: Vector3;
  look: Vector3;
  up: Vector3;
  rotation: Vector3;
  viewMatrix: Matrix44;

  constructor() {
    this.eye = new Vector3(0, 0, 0);
    this.look = new Vector3(0, 0, 1);
    this.up = new Vector3(0, 1, 0);
    this.rotation = new Vector3(0, 0, 0);
    this.viewMatrix = Matrix44.identity();
  }

  transform(v: Vector4) {
    return v.transform(this.viewMatrix);
  }

  calculateViewMatrix() {
    const target = this.look.rotateX(this.rotation.x).rotateY(this.rotation.y).rotateZ(this.rotation.z).add(this.eye);

    const newForward = target.subtract(this.eye).normalize();

    const a = newForward.multiply(this.up.dot(newForward));
    const newUp = this.up.subtract(a).normalize();

    const newRight = newUp.cross(newForward);

    // prettier-ignore
    this.viewMatrix = new Matrix44(
      newRight.x, newRight.y, newRight.z, 0,
      newUp.x, newUp.y, newUp.z, 0,
      newForward.x, newForward.y, newForward.z, 0,
      this.eye.x, this.eye.y, this.eye.z, 1
    );
  }

  calculatePerspectiveMatrix(fov: number, aspect: number, near: number, far: number) {
    const matrix = Matrix44.identity();
    const f = Math.tan((fov / 2) * (3.141592 / 180));

    matrix.m00 = 1 / f / aspect;
    matrix.m11 = 1 / f;
    matrix.m22 = (-2 * near) / (far - near) - 1;
    matrix.m23 = -1;
    matrix.m32 = -(far * -near) / (far - near);

    return matrix;
  }
}
