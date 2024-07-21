export class Dimensions {
  private readonly _height: number;
  private readonly _width: number;
  private readonly _depth: number;

  constructor(height: number, width: number, depth: number) {
    if (height <= 0 || width <= 0 || depth <= 0) {
      throw new Error('Dimensions must be greater than zero');
    }
    this._height = height;
    this._width = width;
    this._depth = depth;
  }

  get height() {
    return this._height;
  }

  get width() {
    return this._width;
  }

  get depth() {
    return this._depth;
  }

  get volume() {
    return this._height * this._width * this._depth;
  }
}
