import { ASCII3DRenderer } from '../renderer';
import { cube, donut, teapot } from './raw';

export interface ASCII3DRendererProps {}

export const createRenderer = ({}: ASCII3DRendererProps) => {
  const container = document.createElement('div');

  // const renderer = new ASCII3DRenderer(container, 120, 60);
  const renderer = new ASCII3DRenderer(container, 100, 30);
  renderer.loadFromString(teapot);
  renderer.run();

  container.className = 'ascii3d-renderer';

  return container;
};
