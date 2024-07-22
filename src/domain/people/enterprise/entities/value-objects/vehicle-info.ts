export class VehicleInfo {
  private readonly _type: string;
  private readonly _licensePlate: string;

  constructor(type: string, licensePlate: string) {
    if (!type || !licensePlate) {
      throw new Error('Vehicle type and license plate must be provided');
    }
    this._type = type;
    this._licensePlate = licensePlate;
  }

  get type() {
    return this._type;
  }

  get licensePlate() {
    return this._licensePlate;
  }
}
