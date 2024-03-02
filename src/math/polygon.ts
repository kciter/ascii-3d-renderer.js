import { Vector3 } from "./vector3";

export class Polygon {
  vertices: Vector3[];

  constructor(vertices: Vector3[]) {
    this.vertices = vertices;
  }
}
