import { Matrix44, Polygon, Vector3, Vector4 } from './math';

export class Mesh {
  position: Vector3;
  scale: Vector3;
  rotate: Vector3;

  polygons: Polygon[];

  constructor(polygons: Polygon[]) {
    this.position = Vector3.zero();
    this.scale = new Vector3(1, 1, 1);
    this.rotate = Vector3.zero();
    this.polygons = polygons;
  }

  transform(matrix: Matrix44) {
    this.position = this.position.transform(matrix);
    this.polygons = this.polygons.map((p) => p.transform(matrix));
  }

  render() {
    const matrix = Matrix44.identity()
      .multiply(Matrix44.scale(this.scale))
      .multiply(Matrix44.rotateX(this.rotate.x))
      .multiply(Matrix44.rotateY(this.rotate.y))
      .multiply(Matrix44.rotateZ(this.rotate.z))
      .multiply(Matrix44.translate(this.position));

    this.polygons.forEach((polygon) => {
      let v1 = new Vector4(polygon.vertices[0].x, polygon.vertices[0].y, polygon.vertices[0].z, 1);
      let v2 = new Vector4(polygon.vertices[1].x, polygon.vertices[1].y, polygon.vertices[1].z, 1);
      let v3 = new Vector4(polygon.vertices[2].x, polygon.vertices[2].y, polygon.vertices[2].z, 1);

      v1 = v1.transform(matrix);
      v2 = v2.transform(matrix);
      v3 = v3.transform(matrix);
    });
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
