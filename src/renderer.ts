import { Loader } from "./loader";

export class ASCII3DRenderer {
  constructor(el: HTMLElement) {
    // ...
  }

  async load(file: File) {
    const polygons = await Loader.load(file);
    console.log(polygons);
  }
}
