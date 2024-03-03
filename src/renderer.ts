import { Loader } from "./loader";

export class ASCII3DRenderer {
  el: HTMLElement;

  constructor(_el: HTMLElement) {
    this.el = _el;
  }

  async loadFromFile(file: File) {
    const polygons = await Loader.loadFromFile(file);
    console.log(polygons);
  }

  async loadFromString(string: string) {
    const polygons = await Loader.loadFromString(string);
    console.log(polygons);
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
    this.el.innerHTML = "rendered" + Date.now();
  }
}
