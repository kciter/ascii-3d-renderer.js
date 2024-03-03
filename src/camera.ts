import { Matrix44, Vector3 } from "./math";

class Camera {
  position: Vector3;
  rotation: Vector3;
  projectionMatrix: Matrix44;

  constructor(position: Vector3, rotation: Vector3) {
    this.position = position;
    this.rotation = rotation;
  }

  calculateViewMatrix(fov: number, aspect: number, near: number, far: number) {
    // prettier-ignore
    this.projectionMatrix = new Matrix44(
      1 / (Math.tan(fov / 2) * aspect), 0, 0, 0,
      0, 1 / Math.tan(fov / 2), 0, 0,
      0, 0, (far + near) / (near - far), (2 * far * near) / (near - far),
      0, 0, -1, 0
    );
  }
}
