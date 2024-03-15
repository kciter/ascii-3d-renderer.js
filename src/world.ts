import { Matrix44, Vector3, Vector4 } from './math';

export class World {
  position: Vector3;
  rotate: Vector3;

  constructor() {
    this.position = new Vector3(0, 0, 0);
    this.rotate = new Vector3(0, 0, 0);
  }

  transform(v: Vector4) {
    const matrix = Matrix44.identity()
      .multiply(Matrix44.rotateX(this.rotate.x))
      .multiply(Matrix44.rotateY(this.rotate.y))
      .multiply(Matrix44.rotateZ(this.rotate.z))
      .multiply(Matrix44.translate(this.position));

    return v.transform(matrix);
  }

  translate(v: Vector3) {
    this.position = v;
  }

  rotateX(angle: number) {
    this.rotate.x = angle;
  }

  rotateY(angle: number) {
    this.rotate.y = angle;
  }

  rotateZ(angle: number) {
    this.rotate.z = angle;
  }
}
