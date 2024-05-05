import type { Meta } from '@storybook/html';
import './renderer.css';
import { ASCII3DRenderer } from '../renderer';
import { Cow, Cube, Donut, Rocket, Ship, Teapot } from '../objects';
import { Vector3 } from '../math';

const meta = {
  title: 'Example/ASCII3DRenderer',
} satisfies Meta;

export default meta;

export const Default = () => {
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

export const Many = () => {
  const container = document.createElement('div');
  const screen = document.createElement('div');

  let renderer = new ASCII3DRenderer(screen, 150, 50);

  const cube = new Cube();
  cube.setTranslate(new Vector3(0.5, 4, -5));
  renderer.placeObject(cube);

  const donut = new Donut();
  donut.setTranslate(new Vector3(1, 0, -1));
  renderer.placeObject(donut);

  const teapot = new Teapot();
  teapot.setTranslate(new Vector3(-2, -5, -7));
  renderer.placeObject(teapot);

  renderer.run();

  container.className = 'ascii3d-renderer';

  container.appendChild(screen);

  return container;
};

export const CameraControl = () => {
  const container = document.createElement('div');
  const screen = document.createElement('div');

  let renderer = new ASCII3DRenderer(screen, 150, 50);

  const cube = new Cube();
  cube.setTranslate(new Vector3(0.5, 4, -5));
  renderer.placeObject(cube);

  const donut = new Donut();
  donut.setTranslate(new Vector3(1, 0, -1));
  renderer.placeObject(donut);

  const teapot = new Teapot();
  teapot.setTranslate(new Vector3(-2, -5, -7));
  renderer.placeObject(teapot);

  renderer.run();

  container.className = 'ascii3d-renderer';

  ['up', 'down', 'left', 'right', 'zoomin', 'zoomout'].forEach((name) => {
    const button = document.createElement('button');
    button.textContent = name;
    button.onclick = () => {
      switch (name) {
        case 'up':
          renderer.camera.eye.y -= 0.3;
          break;
        case 'down':
          renderer.camera.eye.y += 0.3;
          break;
        case 'left':
          renderer.camera.eye.x += 0.3;
          break;
        case 'right':
          renderer.camera.eye.x -= 0.3;
          break;
        case 'zoomin':
          renderer.camera.eye.z += 0.3;
          break;
        case 'zoomout':
          renderer.camera.eye.z -= 0.3;
          break;
      }
    };
    container.appendChild(button);
  });

  container.appendChild(screen);

  return container;
};
