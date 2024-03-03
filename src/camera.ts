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
  }

  calculateViewMatrix(fov: number, aspect: number, near: number, far: number) {
    // prettier-ignore
    this.viewMatrix = new Matrix44(
      1 / (Math.tan(fov / 2) * aspect), 0, 0, 0,
      0, 1 / Math.tan(fov / 2), 0, 0,
      0, 0, (far + near) / (near - far), (2 * far * near) / (near - far),
      0, 0, -1, 0
    );
  }
}
