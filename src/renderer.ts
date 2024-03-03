import { Camera } from './camera';
import { Loader } from './loader';
import { Matrix44, Polygon, Vector2, Vector4 } from './math';
import { World } from './world';

export class ASCII3DRenderer {
  el: HTMLElement;
  width: number;
  height: number;
  frameBuffer: string[][];
  mesh: Polygon[] = [];

  camera: Camera;
  world: World;

  constructor(_el: HTMLElement, width: number, height: number) {
    this.el = _el;
    this.width = width;
    this.height = height;
    this.frameBuffer = new Array(height + 1).fill(null).map(() => new Array(width + 1).fill(' '));

    this.camera = new Camera();
    this.world = new World();
  }

  async loadFromFile(file: File) {
    const polygons = await Loader.loadFromFile(file);
    this.mesh = polygons;
  }

  async loadFromString(string: string) {
    const polygons = await Loader.loadFromString(string);
    this.mesh = polygons;
  }

  run() {
    const fps = 60;
    const interval = 1000 / fps;
    let then = Date.now();
    let now;
    let delta;

    const renderFrame = () => {
      now = Date.now();
      delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        this.render();
      }

      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);
  }

  private render() {
    this.clearFrameBuffer();
    this.drawFrameBuffer();
  }

  private vertexProcess() {
    this.camera.calculateViewMatrix();

    this.world.rotateX(0.001);
    this.world.rotateY(0.001);
    this.world.rotateZ(0.001);

    this.mesh.forEach((polygon) => {
      const v1 = new Vector4(polygon.vertices[0].x, polygon.vertices[0].y, polygon.vertices[0].z, 1);
      const v2 = new Vector4(polygon.vertices[1].x, polygon.vertices[1].y, polygon.vertices[1].z, 1);
      const v3 = new Vector4(polygon.vertices[2].x, polygon.vertices[2].y, polygon.vertices[2].z, 1);

      // World transform
      v1.translate(this.world.matrix);
      v2.translate(this.world.matrix);
      v3.translate(this.world.matrix);

      // View transform
      v1.translate(this.camera.viewMatrix);
      v2.translate(this.camera.viewMatrix);
      v3.translate(this.camera.viewMatrix);

      // Projection transform
    });
  }

  private drawPolygon() {}

  private drawFrameBuffer() {
    this.el.innerHTML = '';
    this.frameBuffer.forEach((row) => {
      const div = document.createElement('div');
      div.innerHTML = row.join('').replace(/\./g, '&nbsp;');
      this.el.appendChild(div);
    });
  }

  private clearFrameBuffer() {
    this.frameBuffer = new Array(this.height + 1).fill(null).map(() => new Array(this.width + 1).fill(' '));
  }
}
