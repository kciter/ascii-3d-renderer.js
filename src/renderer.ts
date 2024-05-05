import { Camera } from './camera';
import { Matrix44, Vector2, Vector3, Vector4 } from './math';
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
  }

  placeObject(object: Object) {
    this.objects.push(object);
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
    this.camera.eye = new Vector3(0, 0, -3);

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

        // 투영 변환
        v1 = this.projection.transform(v1);
        v2 = this.projection.transform(v2);
        v3 = this.projection.transform(v3);

        // 래스터화
        this.rasterize(v1, v2, v3);
      }
    }
  }

  private rasterize(v1: Vector4, v2: Vector4, v3: Vector4) {
    // 점들을 화면 좌표로 변환
    const p1 = new Vector2(((v1.x + 1) * this.width) / 2, ((1 - v1.y) * this.height) / 2);
    const p2 = new Vector2(((v2.x + 1) * this.width) / 2, ((1 - v2.y) * this.height) / 2);
    const p3 = new Vector2(((v3.x + 1) * this.width) / 2, ((1 - v3.y) * this.height) / 2);

    // 삼각형 그리기
    this.drawTriangle(p1, p2, p3);
  }

  private drawTriangle(p1: Vector2, p2: Vector2, p3: Vector2) {
    // this.drawLine(p1, p2);
    // this.drawLine(p2, p3);
    // this.drawLine(p3, p1);

    this.fillTriangle(p1, p2, p3);
  }

  private fillTriangle(p1: Vector2, p2: Vector2, p3: Vector2) {
    // 삼각형의 경계 상자 계산
    const minX = Math.min(p1.x, p2.x, p3.x);
    const maxX = Math.max(p1.x, p2.x, p3.x);
    const minY = Math.min(p1.y, p2.y, p3.y);
    const maxY = Math.max(p1.y, p2.y, p3.y);

    // 광원의 방향 벡터
    const lightDirection = new Vector3(0, 0, 1).normalize(); // 예시로 (0, 0, 1)을 사용함

    // 삼각형의 표면 법선 벡터 계산
    const normal = this.calculateSurfaceNormal(p1, p2, p3);

    // 광원과 표면 법선 벡터 간의 각도 계산
    const cosAngle = normal.dot(lightDirection);

    // 광원 각도에 따라 픽셀의 밝기 결정
    const brightness = Math.max(0, cosAngle);

    // 밝기를 색상에 반영하여 픽셀의 색 결정
    const shade = this.Shade[Math.round(brightness * this.Shade.length)];

    for (let x = minX; x < maxX; x++) {
      for (let y = minY; y < maxY; y++) {
        const p = new Vector2(x, y);

        // 삼각형 내부에 있다면
        if (this.isPointInTriangle(p, p1, p2, p3)) {
          this.setPixel(x, y, shade);
        }
      }
    }
  }

  private calculateSurfaceNormal(p1: Vector2, p2: Vector2, p3: Vector2): Vector3 {
    // 두 변을 정의
    const edge1 = p1.subtract(p2);
    const edge2 = p1.subtract(p3);

    // 외적을 계산하여 표면 법선 벡터 반환
    return new Vector3(edge1.x, edge1.y, 1).cross(new Vector3(edge2.x, edge2.y, 1)).normalize();
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

      this.setPixel(pixel.x, pixel.y, '#');
    }
  }

  private setPixel(x: number, y: number, shade: string) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.frameBuffer[Math.floor(y)][Math.floor(x)] = shade;
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
