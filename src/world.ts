import { Matrix44, Vector3 } from './math';

// prettier-ignore
export class World {
  matrix: Matrix44;

  constructor() {
    this.matrix = Matrix44.identity();
  }

  translate(v: Vector3) {
    this.matrix = this.matrix.translate(v);
  }

  rotateX(angle: number) {
    this.matrix = this.matrix.rotateX(angle);
  }

  rotateY(angle: number) {
    this.matrix = this.matrix.rotateY(angle);
  }

  rotateZ(angle: number) {
    this.matrix = this.matrix.rotateZ(angle);
  }
}
