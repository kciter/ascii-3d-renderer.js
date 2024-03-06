import { ASCII3DRenderer } from '../renderer';
import { cube, donut, rocket, ship, teapot } from './raw';

export interface ASCII3DRendererProps {
  width: number;
  height: number;
}

export const createRenderer = ({ width, height }: ASCII3DRendererProps) => {
  const container = document.createElement('div');

  console.log(width, height);

  const renderer = new ASCII3DRenderer(container, 150, 50);
  renderer.loadFromString(teapot);
  renderer.run();

  container.className = 'ascii3d-renderer';

  return container;
};
