export interface AddressConstructProps {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

export class Address {
  private readonly _street: string;
  private readonly _city: string;
  private readonly _state: string;
  private readonly _zipCode: string;

  constructor({ street, city, state, zipCode }: AddressConstructProps) {
    if (!street || !city || !state || !zipCode) {
      throw new Error('All address fields must be provided');
    }
    this._street = street;
    this._city = city;
    this._state = state;
    this._zipCode = zipCode;
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zipCode() {
    return this._zipCode;
  }
}
