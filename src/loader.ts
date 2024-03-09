import { Polygon, Vector3 } from './math';

export class Loader {
  static loadFromFile(file: File): Promise<Polygon[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (result) {
          resolve(this.parseOBJ(result as string));
        } else {
          reject(new Error('Failed to load file'));
        }
      };
      reader.readAsText(file);
    });
  }

  static loadFromString(string: string): Polygon[] {
    return this.parseOBJ(string);
  }

  private static parseOBJ(data: string): Polygon[] {
    const lines = data.split('\n');

    const vertices: Vector3[] = [];
    const polygons: Polygon[] = [];

    for (const line of lines) {
      const parts = line
        .trim()
        .split(' ')
        .filter((part) => part !== '');
      if (parts[0] === 'v') {
        vertices.push(new Vector3(parseFloat(parts[1]), parseFloat(parts[2]), parseFloat(parts[3])));
      } else if (parts[0] === 'f') {
        polygons.push(
          new Polygon([
            vertices[parseInt(parts[1]) - 1],
            vertices[parseInt(parts[2]) - 1],
            vertices[parseInt(parts[3]) - 1],
          ])
        );
      }
    }

    return polygons;
  }
}
