import { Camera } from './camera';
import { Vector2, Vector3, Vector4 } from './math';
import { Object } from './object';
import { Projection } from './projection';

export class ASCII3DRenderer {
  el: HTMLElement;
  width: number;
  height: number;
  frameBuffer: string[][];
  depthBuffer: number[][];

  objects: Object[] = [];
  camera: Camera = new Camera();
  projection: Projection;

  // private Shade = '.;ox%@';
  private Shade = '·┼╬░▒▓█';

  constructor(_el: HTMLElement, width: number, height: number) {
    this.el = _el;
    this.width = width;
    this.height = height;
    this.frameBuffer = new Array(height + 1).fill(null).map(() => new Array(width + 1).fill(' '));
    this.depthBuffer = new Array(height + 1).fill(null).map(() => new Array(width + 1).fill(255));
    this.projection = new Projection(70, width / 2 / height, 0.1, 100);

    this.camera.eye = new Vector3(0, 0, -2);
  }

  placeObject(object: Object) {
    this.objects.push(object);
  }

  clearObjects() {
    this.objects = [];
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
        this.update();
      }

      requestAnimationFrame(renderFrame);
    };

    requestAnimationFrame(renderFrame);
  }

  private render() {
    this.clearFrameBuffer();
    this.process();
    this.drawFrameBuffer();
  }

  private update() {
    this.objects.forEach((object) => {
      object.update();
    });
  }

  private process() {
    for (const object of this.objects) {
      for (const polygon of object.mesh) {
        // 4x4 행렬 연산을 위해 Vector4로 변환
        let v1 = new Vector4(polygon.vertices[0].x, polygon.vertices[0].y, polygon.vertices[0].z, 1);
        let v2 = new Vector4(polygon.vertices[1].x, polygon.vertices[1].y, polygon.vertices[1].z, 1);
        let v3 = new Vector4(polygon.vertices[2].x, polygon.vertices[2].y, polygon.vertices[2].z, 1);

        // 월드 변환
        v1 = object.transform(v1);
        v2 = object.transform(v2);
        v3 = object.transform(v3);

        // 뷰 변환
        v1 = this.camera.transform(v1);
        v2 = this.camera.transform(v2);
        v3 = this.camera.transform(v3);

        // 광원 계산
        const brightness = this.calculateLight(v1, v2, v3);

        // 투영 변환
        v1 = this.projection.transform(v1);
        v2 = this.projection.transform(v2);
        v3 = this.projection.transform(v3);

        // 래스터화
        this.rasterize(v1, v2, v3, brightness);
      }
    }
  }

  private rasterize(v1: Vector4, v2: Vector4, v3: Vector4, brightness: number) {
    // 점들을 화면 좌표로 변환
    const p1 = new Vector2(((v1.x + 1) * this.width) / 2, ((1 - v1.y) * this.height) / 2);
    const p2 = new Vector2(((v2.x + 1) * this.width) / 2, ((1 - v2.y) * this.height) / 2);
    const p3 = new Vector2(((v3.x + 1) * this.width) / 2, ((1 - v3.y) * this.height) / 2);

    // 삼각형의 경계 박스 계산
    const minX = Math.floor(Math.max(0, Math.min(p1.x, p2.x, p3.x)));
    const minY = Math.floor(Math.max(0, Math.min(p1.y, p2.y, p3.y)));
    const maxX = Math.floor(Math.min(this.width, Math.max(p1.x, p2.x, p3.x)));
    const maxY = Math.floor(Math.min(this.height, Math.max(p1.y, p2.y, p3.y)));

    // 박스 내부 순회
    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        // 화면 밖이라면 무시
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
          continue;
        }

        const p = new Vector2(x, y);

        // 삼각형 내부에 있다면
        if (this.isPointInTriangle(p, p1, p2, p3)) {
          // 더 낮은 깊이라면 덮어쓴다
          if ((v1.w + v2.w + v3.w) / 3.0 <= this.depthBuffer[y][x]) {
            const shade = this.Shade[Math.round(brightness * (this.Shade.length - 1))];
            this.frameBuffer[y][x] = shade;
            this.depthBuffer[y][x] = (v1.w + v2.w + v3.w) / 3.0;
          }
        }
      }
    }
  }

  private calculateLight(v1: Vector4, v2: Vector4, v3: Vector4): number {
    // 광원의 방향 벡터
    // 카메라가 바라보는 방향 (0, 0, 1)을 사용함
    const lightDirection = new Vector3(0, 0, 1).normalize();

    // 삼각형의 표면 법선 벡터 계산
    const normal = this.calculateSurfaceNormal(
      new Vector3(v1.x, v1.y, v1.z),
      new Vector3(v2.x, v2.y, v2.z),
      new Vector3(v3.x, v3.y, v3.z)
    );

    // 광원과 표면 법선 벡터 간의 각도 계산
    const cosAngle = normal.dot(lightDirection);

    // 광원 각도에 따라 픽셀의 밝기 결정
    const brightness = Math.max(0, cosAngle);

    return brightness;
  }

  private calculateSurfaceNormal(v1: Vector3, v2: Vector3, v3: Vector3): Vector3 {
    // 두 변을 정의
    const edge1 = v3.subtract(v2);
    const edge2 = v1.subtract(v3);

    // 외적을 계산하여 표면 법선 벡터 반환
    return edge1.cross(edge2).normalize();
  }

  private isPointInTriangle(p: Vector2, p1: Vector2, p2: Vector2, p3: Vector2): boolean {
    // 세 개의 부분 삼각형의 부호 계산
    const b1 = this.sign(p, p1, p2) < 0;
    const b2 = this.sign(p, p2, p3) < 0;
    const b3 = this.sign(p, p3, p1) < 0;

    // 모든 부분 삼각형의 부호가 같으면 삼각형 내부에 있는 것으로 간주
    return b1 === b2 && b2 === b3;
  }

  private sign(p1: Vector2, p2: Vector2, p3: Vector2) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  }

  private drawLine(p1: Vector2, p2: Vector2) {
    const result = p2.subtract(p1);
    const len = result.length();
    const normalized = result.normalize();

    for (let i = 0; i < len; i++) {
      const current = normalized.multiply(i);
      const pixel = p1.add(current);

      if (pixel.x >= 0 && pixel.x < this.width && pixel.y >= 0 && pixel.y < this.height) {
        this.frameBuffer[Math.round(pixel.y)][Math.round(pixel.x)] = '#';
      }
    }
  }

  private drawFrameBuffer() {
    const ascii = this.frameBuffer.map((row) => row.join('').replace(/\ /g, '&nbsp;')).join('<br />');
    this.el.innerHTML = ascii;
  }

  private clearFrameBuffer() {
    this.frameBuffer = new Array(this.height + 1).fill(null).map(() => new Array(this.width + 1).fill(' '));
    this.depthBuffer = new Array(this.height + 1).fill(null).map(() => new Array(this.width + 1).fill(255));
  }
}
