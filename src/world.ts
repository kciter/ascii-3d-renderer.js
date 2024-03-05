import { Matrix44, Vector3, Vector4 } from './math';

// prettier-ignore
export class World {
  matrix: Matrix44;

  constructor() {
    this.matrix = Matrix44.identity();
  }

  transform(v: Vector4) {
    return v.transform(this.matrix);
  }

  translate(v: Vector3) {
    this.matrix = this.matrix.translate(v);
  }

  rotateX(angle: number) {
    this.matrix.rotate(new Vector3(1, 0, 0), angle);
  }

  rotateY(angle: number) {
    this.matrix.rotate(new Vector3(0, 1, 0), angle);
  }

  rotateZ(angle: number) {
    this.matrix.rotate(new Vector3(0, 0, 1), angle);
  }
}
