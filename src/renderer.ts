import { Loader } from "./loader";

export class ASCII3DRenderer {
  constructor(el: HTMLElement) {
    // ...
  }

  async loadFromFile(file: File) {
    const polygons = await Loader.loadFromFile(file);
    console.log(polygons);
  }

  async loadFromString(string: string) {
    const polygons = await Loader.loadFromString(string);
    console.log(polygons);
  }
}
