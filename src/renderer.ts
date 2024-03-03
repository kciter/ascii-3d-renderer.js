import { Camera } from "./camera";
import { Loader } from "./loader";
import { Polygon, Vector2 } from "./math";
import { World } from "./world";

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
    this.frameBuffer = new Array(height + 1)
      .fill(null)
      .map(() => new Array(width + 1).fill(" "));
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

  private vertexProcess() {}

  private drawPolygon() {}

  private drawFrameBuffer() {
    this.el.innerHTML = "";
    this.frameBuffer.forEach((row) => {
      const div = document.createElement("div");
      div.innerHTML = row.join("").replace(/\./g, "&nbsp;");
      this.el.appendChild(div);
    });
  }

  private clearFrameBuffer() {
    this.frameBuffer = new Array(this.height + 1)
      .fill(null)
      .map(() => new Array(this.width + 1).fill(" "));
  }
}
