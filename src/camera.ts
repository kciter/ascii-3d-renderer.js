import { Matrix44, Vector3 } from "./math";

class Camera {
  position: Vector3;
  rotation: Vector3;

  constructor(position: Vector3, rotation: Vector3) {
    this.position = position;
    this.rotation = rotation;
  }

  calculateViewMatrix(viewMatrix: Matrix44) {}
}
