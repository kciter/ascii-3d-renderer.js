import { Vector3 } from '../math';
import { Object } from '../object';

export class Cube extends Object {
  angle = 0;

  constructor() {
    super();
    this.loadFromString(mesh);
  }

  override update(): void {
    this.setRotateX(-this.angle * 2);
    this.setRotateY(-this.angle * 2);
    this.setRotateZ(-this.angle);
    this.setTranslate(new Vector3(1, 1, -5));
    this.angle += 0.007;
  }
}

export const mesh = `
# Blender v2.90.1 OBJ File: ''
# www.blender.org
o Cube
v -1.000000 1.000000 1.000000
v -1.000000 -1.000000 1.000000
v -1.000000 1.000000 -1.000000
v -1.000000 -1.000000 -1.000000
v 1.000000 1.000000 1.000000
v 1.000000 -1.000000 1.000000
v 1.000000 1.000000 -1.000000
v 1.000000 -1.000000 -1.000000
s off
f 5 3 1
f 3 8 4
f 7 6 8
f 2 8 6
f 1 4 2
f 5 2 6
f 5 7 3
f 3 7 8
f 7 5 6
f 2 4 8
f 1 3 4
f 5 1 2
`;
