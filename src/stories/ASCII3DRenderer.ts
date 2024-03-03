import { ASCII3DRenderer } from "../renderer";

export interface ASCII3DRendererProps {}

export const createRenderer = ({}: ASCII3DRendererProps) => {
  const container = document.createElement("div");

  const renderer = new ASCII3DRenderer(container);

  return container;
};
