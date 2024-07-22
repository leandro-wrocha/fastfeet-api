import { AggregateRoot } from '@src/core/entities/aggregate-root';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { Optional } from '@src/core/types/optional';
import { Address } from './value-objects/address';
import { ContactInfo } from './value-objects/contact-info';
import { VehicleInfo } from './value-objects/vehicle-info';
import { AvailabilityStatus } from './enums/availability-status';

export interface DelivererProps {
  id?: UniqueEntityID;
  name: string;
  cpf: string;
  contactInfo: ContactInfo;
  address: Address;
  vehicleInfo: VehicleInfo;
  availabilityStatus: AvailabilityStatus;
  createdAt?: Date;
}

export class Deliverer extends AggregateRoot<DelivererProps> {
  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get cpf() {
    return this.props.cpf;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get contactInfo() {
    return this.props.contactInfo;
  }

  set contactInfo(contactInfo: ContactInfo) {
    this.props.contactInfo = contactInfo;
  }

  get address() {
    return this.props.address;
  }

  set address(address: Address) {
    this.props.address = address;
  }

  get vehicleInfo() {
    return this.props.vehicleInfo;
  }

  set vehicleInfo(vehicleInfo: VehicleInfo) {
    this.props.vehicleInfo = vehicleInfo;
  }

  get availabilityStatus() {
    return this.props.availabilityStatus;
  }

  set availabilityStatus(status: AvailabilityStatus) {
    this.props.availabilityStatus = status;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  static create(
    props: Optional<DelivererProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    if (
      !props.name ||
      !props.cpf ||
      !props.contactInfo ||
      !props.address ||
      !props.vehicleInfo
    ) {
      throw new Error('All deliverer properties must be provided');
    }

    const deliverer = new Deliverer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return deliverer;
  }
}
