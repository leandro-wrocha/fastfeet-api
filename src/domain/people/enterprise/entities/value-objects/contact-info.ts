export class ContactInfo {
  private readonly _phone: string;
  private readonly _email: string;

  constructor(phone: string, email: string) {
    if (!this.validatePhone(phone)) {
      throw new Error('Invalid phone number');
    }
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email address');
    }
    this._phone = phone;
    this._email = email;
  }

  private validatePhone(phone: string): boolean {
    const phoneRegex = /^\d{10,11}$/; // Simple validation
    return phoneRegex.test(phone);
  }

  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  get phone() {
    return this._phone;
  }

  get email() {
    return this._email;
  }
}
