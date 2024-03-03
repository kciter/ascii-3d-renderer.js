import { Matrix44 } from "./math";

// prettier-ignore
export class World {
  matrix: Matrix44;

  constructor() {
    this.matrix = Matrix44.identity();
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
