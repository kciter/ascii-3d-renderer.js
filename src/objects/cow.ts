import { Vector3 } from '../math';
import { Object } from '../object';
import { cow } from '../stories/raw/cow';

export class Cow extends Object {
  angle = 0;

  constructor() {
    super();
    this.loadFromString(cow);
  }

  override update(): void {
    this.setRotateX(-this.angle * 2);
    this.setRotateY(-this.angle * 2);
    this.setRotateZ(-this.angle);
    this.setTranslate(new Vector3(1, 1, -5));
    this.angle += 0.007;
  }
}
