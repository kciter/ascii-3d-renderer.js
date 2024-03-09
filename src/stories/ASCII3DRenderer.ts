import { ASCII3DRenderer } from '../renderer';
import * as Mesh from './raw';

export interface ASCII3DRendererProps {
  width: number;
  height: number;
}

export const createRenderer = ({ width, height }: ASCII3DRendererProps) => {
  const container = document.createElement('div');
  const screen = document.createElement('div');

  console.log(width, height);

  let renderer = new ASCII3DRenderer(screen, 150, 50);
  renderer.loadFromString(Mesh['cube']);
  renderer.run();

  container.className = 'ascii3d-renderer';

  ['cube', 'donut', 'octahedron', 'teapot', 'rocket', 'ship', 'cow'].forEach((name) => {
    const button = document.createElement('button');
    button.textContent = name;
    button.onclick = () => {
      renderer.loadFromString(Mesh[name as keyof typeof Mesh]);
    };
    container.appendChild(button);
  });

  container.appendChild(screen);

  return container;
};
