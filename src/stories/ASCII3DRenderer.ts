import { Vector3 } from '../math';
import { Object } from '../object';
import { Cow } from '../objects/cow';
import { Cube } from '../objects/cube';
import { ASCII3DRenderer } from '../renderer';
import * as Mesh from './raw';

export const createRenderer = () => {
  const container = document.createElement('div');
  const screen = document.createElement('div');

  let angle = 0;

  let renderer = new ASCII3DRenderer(screen, 150, 50);
  const object = new Cube();
  // object.update = (object) => {
  //   angle += 0.007;
  //   if (angle >= 2 * 3.14) angle -= 2 * 3.14;
  //   object.setRotateX(angle);
  //   object.setRotateY(angle);
  //   object.setRotateZ(angle);
  //   object.setTranslate(new Vector3(-2, -1, 0));
  // };
  // renderer.placeObject(object);

  const object2 = new Cow();
  renderer.placeObject(object2);

  renderer.run();

  container.className = 'ascii3d-renderer';

  ['cube', 'donut', 'octahedron', 'teapot', 'rocket', 'ship', 'cow'].forEach((name) => {
    const button = document.createElement('button');
    button.textContent = name;
    button.onclick = () => {
      // renderer.loadFromString(Mesh[name as keyof typeof Mesh]);
    };
    container.appendChild(button);
  });

  container.appendChild(screen);

  return container;
};
