import { Camera } from './camera';
import { Loader } from './loader';
import { Matrix44, Polygon, Vector2, Vector3, Vector4 } from './math';
import { World } from './world';

export class ASCII3DRenderer {
  el: HTMLElement;
  width: number;
  height: number;
  frameBuffer: string[][];
  mesh: Polygon[] = [];

  camera: Camera;
  world: World;

  angle: number;

  constructor(_el: HTMLElement, width: number, height: number) {
    this.el = _el;
    this.width = width;
    this.height = height;
    this.frameBuffer = new Array(height + 1).fill(null).map(() => new Array(width + 1).fill(' '));

    this.camera = new Camera();
    this.world = new World();

    this.angle = 0;
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
        this.angle += 0.01;
        if (this.angle >= 2 * 3.14) this.angle -= 2 * 3.14;
      }

      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);
  }

  private render() {
    this.clearFrameBuffer();
    this.vertexProcess();
    this.drawFrameBuffer();
  }

  private vertexProcess() {
    this.camera.calculateViewMatrix();
    const projMat = this.camera.calculatePerspectiveMatrix(70, this.width / 2 / this.height, 0.1, 1000);

    this.world.matrix.setIdentity();
    this.world.translate(new Vector3(0, 0.1, -3));

    this.world.rotateX(this.angle);
    this.world.rotateY(this.angle);
    this.world.rotateZ(this.angle);

    this.mesh.forEach((polygon) => {
      let v1 = new Vector4(polygon.vertices[0].x, polygon.vertices[0].y, polygon.vertices[0].z, 1);
      let v2 = new Vector4(polygon.vertices[1].x, polygon.vertices[1].y, polygon.vertices[1].z, 1);
      let v3 = new Vector4(polygon.vertices[2].x, polygon.vertices[2].y, polygon.vertices[2].z, 1);

      // World transform
      v1.translate(this.world.matrix);
      v2.translate(this.world.matrix);
      v3.translate(this.world.matrix);

      // View transform
      v1.translate(this.camera.viewMatrix);
      v2.translate(this.camera.viewMatrix);
      v3.translate(this.camera.viewMatrix);

      const line1 = new Vector3(v1.x, v1.y, v1.z);
      line1.subtract(new Vector3(v2.x, v2.y, v2.z));

      const line2 = new Vector3(v1.x, v1.y, v1.z);
      line2.subtract(new Vector3(v3.x, v3.y, v3.z));

      const normal = line1.copy();
      normal.cross(line2);
      normal.normalize();

      const cameraRay = new Vector3(v1.x, v1.y, v1.z);
      cameraRay.subtract(this.camera.eye);

      if (normal.dot(cameraRay) < 0) {
        return;
      }

      // Projection transform
      v1 = this.transformVertex(v1, projMat);
      v2 = this.transformVertex(v2, projMat);
      v3 = this.transformVertex(v3, projMat);

      // Draw
      this.rasterize(
        new Vector4(v1.x, v1.y, v1.z, v1.w),
        new Vector4(v2.x, v2.y, v2.z, v2.w),
        new Vector4(v3.x, v3.y, v3.z, v3.w)
      );
    });
  }

  private transformVertex(vertex: Vector4, mat44: Matrix44) {
    vertex.translate(mat44);

    vertex.x /= vertex.w;
    vertex.y /= vertex.w;
    vertex.z /= vertex.w;

    return vertex;
  }

  private rasterize(V1: Vector4, V2: Vector4, V3: Vector4) {
    const halfWidth = this.width / 2;
    const halfHeight = this.height / 2;

    const v1 = new Vector2(V1.x * halfWidth + halfWidth, -V1.y * halfHeight + halfHeight);
    const v2 = new Vector2(V2.x * halfWidth + halfWidth, -V2.y * halfHeight + halfHeight);
    const v3 = new Vector2(V3.x * halfWidth + halfWidth, -V3.y * halfHeight + halfHeight);

    const minX = Math.floor(Math.max(0, Math.min(v1.x, Math.min(v2.x, v3.x))));
    const minY = Math.floor(Math.max(0, Math.min(v1.y, Math.min(v2.y, v3.y))));

    const maxX = Math.floor(Math.min(this.width, Math.max(v1.x, Math.max(v2.x, v3.x)) + 1));
    const maxY = Math.floor(Math.min(this.height, Math.max(v1.y, Math.max(v2.y, v3.y)) + 1));

    for (let i = minY; i < maxY; i++) {
      for (let j = minX; j < maxX; j++) {
        if (this.isPointInTriangle(j, i, v1, v2, v3)) {
          this.frameBuffer[i][j] = '#';
        }
      }
    }
  }

  private isPointInTriangle(x: number, y: number, v1: Vector2, v2: Vector2, v3: Vector2): boolean {
    const wv1 =
      ((v2.y - v3.y) * (x - v3.x) + (v3.x - v2.x) * (y - v3.y)) /
      ((v2.y - v3.y) * (v1.x - v3.x) + (v3.x - v2.x) * (v1.y - v3.y));

    const wv2 =
      ((v3.y - v1.y) * (x - v3.x) + (v1.x - v3.x) * (y - v3.y)) /
      ((v2.y - v3.y) * (v1.x - v3.x) + (v3.x - v2.x) * (v1.y - v3.y));

    const wv3 = 1 - wv1 - wv2;

    const one = wv1 < -0.001;
    const two = wv2 < -0.001;
    const three = wv3 < -0.001;

    return one == two && two == three;
  }

  private drawFrameBuffer() {
    this.el.innerHTML = '';
    this.frameBuffer.forEach((row) => {
      const div = document.createElement('div');
      div.innerHTML = row.join('').replace(/\ /g, '&nbsp;');
      this.el.appendChild(div);
    });
  }

  private clearFrameBuffer() {
    this.frameBuffer = new Array(this.height + 1).fill(null).map(() => new Array(this.width + 1).fill(' '));
  }
}
