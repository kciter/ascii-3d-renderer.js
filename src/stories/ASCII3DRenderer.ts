import { ASCII3DRenderer } from "../renderer";

export interface ASCII3DRendererProps {}

export const createRenderer = ({}: ASCII3DRendererProps) => {
  const container = document.createElement("div");

  const renderer = new ASCII3DRenderer(container, 300, 300);
  renderer.loadFromString(mesh);
  renderer.run();

  container.className = "ascii3d-renderer";

  return container;
};

const mesh = `
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
