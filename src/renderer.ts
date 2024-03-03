import { Loader } from "./loader";
import { Polygon, Vector2 } from "./math";

export class ASCII3DRenderer {
  el: HTMLElement;
  width: number;
  height: number;
  frameBuffer: string[][];
  mesh: Polygon[] = [];

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
    // this.drawMesh();
    this.clearFrameBuffer();

    this.mesh.forEach((polygon) => {
      for (let i = 0; i < polygon.vertices.length; i++) {
        const h_width = this.width / 2;
        const h_height = this.height / 2;
        const V1 = polygon.vertices[0];
        const V2 = polygon.vertices[1];
        const V3 = polygon.vertices[2];

        const v1 = new Vector2(
          V1.x * h_width + h_width,
          -V1.y * h_height + h_height
        );
        const v2 = new Vector2(
          V2.x * h_width + h_width,
          -V2.y * h_height + h_height
        );
        const v3 = new Vector2(
          V3.x * h_width + h_width,
          -V3.y * h_height + h_height
        );

        this.drawLine(v1, v2);
        this.drawLine(v1, v3);
        this.drawLine(v2, v3);
      }
    });

    this.drawFrameBuffer();
  }

  private vertexProcess() {}

  private drawPolygon() {}

  private drawLine(v1: Vector2, v2: Vector2) {
    let result = v2.subtract(v1);
    const distance = result.distance();
    result = result.normalize();

    for (let i = 0; i < distance; i += 1) {
      const pipe1 = result.scale(i);
      const pipe2 = pipe1.add(v1);

      const x = Math.round(pipe2.x);
      const y = Math.round(pipe2.y);

      this.frameBuffer[y][x] = "#";
    }
  }

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
