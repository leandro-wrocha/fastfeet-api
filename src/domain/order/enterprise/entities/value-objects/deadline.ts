export class Deadline {
  private readonly _value: Date;

  constructor(value: Date) {
    if (value <= new Date()) {
      throw new Error('Deadline must be a future date');
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }
}
