import { AggregateRoot } from '@src/core/entities/aggregate-root';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { ContactInfo } from './value-objects/contact-info';
import { Address } from './value-objects/address';
import { Optional } from '@src/core/types/optional';

export interface RecipientProps {
  id?: UniqueEntityID;
  name: string;
  contactInfo: ContactInfo;
  address: Address;
  createdAt?: Date;
}

export class Recipient extends AggregateRoot<RecipientProps> {
  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get contactInfo(): ContactInfo {
    return this.props.contactInfo;
  }

  set contactInfo(contactInfo: ContactInfo) {
    this.props.contactInfo = contactInfo;
  }

  get address(): Address {
    return this.props.address;
  }

  set address(address: Address) {
    this.props.address = address;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(
    props: Optional<RecipientProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Recipient {
    return new Recipient({ ...props, createdAt: new Date() }, id);
  }
}
