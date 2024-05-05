import { Vector3 } from '../math';
import { Cow, Cube, Donut, Rocket, Ship, Teapot } from '../objects';
import { ASCII3DRenderer } from '../renderer';

export const createRenderer = () => {
  const container = document.createElement('div');
  const screen = document.createElement('div');

  let renderer = new ASCII3DRenderer(screen, 150, 50);
  const cube = new Cube();
  cube.setTranslate(new Vector3(0.5, 0.5, -3));
  renderer.placeObject(cube);
  renderer.run();

  container.className = 'ascii3d-renderer';

  ['cube', 'donut', 'teapot', 'rocket', 'ship', 'cow'].forEach((name) => {
    const button = document.createElement('button');
    button.textContent = name;
    button.onclick = () => {
      renderer.clearObjects();
      switch (name) {
        case 'cube':
          const cube = new Cube();
          cube.setTranslate(new Vector3(0.5, 0.5, -3));
          renderer.placeObject(cube);
          break;
        case 'cow':
          const cow = new Cow();
          cow.setTranslate(new Vector3(0, 1, -5));
          renderer.placeObject(cow);
          break;
        case 'donut':
          const donut = new Donut();
          donut.setTranslate(new Vector3(0, 0.5, -1));
          renderer.placeObject(donut);
          break;
        case 'rocket':
          const rocket = new Rocket();
          rocket.setTranslate(new Vector3(0, 0.5, -2));
          renderer.placeObject(rocket);
          break;
        case 'ship':
          const ship = new Ship();
          ship.setTranslate(new Vector3(-0.5, 1, -7));
          renderer.placeObject(ship);
          break;
        case 'teapot':
          const teapot = new Teapot();
          teapot.setTranslate(new Vector3(0, 1, -4));
          renderer.placeObject(teapot);
          break;
      }
    };
    container.appendChild(button);
  });

  container.appendChild(screen);

  return container;
};
