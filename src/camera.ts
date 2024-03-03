import { Matrix44, Vector3 } from "./math";

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

  calculateViewMatrix() {
    const target = this.look.copy();
    target.rotateX(this.rotation.x);
    target.rotateY(this.rotation.y);
    target.rotateZ(this.rotation.z);
    target.add(this.eye);

    const newForward = target.copy();
    const newUp = this.up.copy();

    newForward.subtract(this.eye);
    newForward.normalize();

    const a = newForward.copy();
    a.multiply(this.up.dot(newForward));
    newUp.subtract(a);
    newUp.normalize();

    const newRight = newUp.copy();
    newRight.cross(newForward);

    // prettier-ignore
    this.viewMatrix = new Matrix44(
      newRight.x, newRight.y, newRight.z, 0,
      newUp.x, newUp.y, newUp.z, 0,
      -newForward.x, -newForward.y, -newForward.z, 0,
      this.eye.x, this.eye.y, this.eye.z, 1
    );
  }
}
