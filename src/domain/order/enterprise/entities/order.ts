import { AggregateRoot } from '@src/core/entities/aggregate-root';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { Optional } from '@src/core/types/optional';
import { Address } from './value-objects/address';
import { Deadline } from './value-objects/deadline';

export interface OrderProps {
  id?: UniqueEntityID;
  recipient: UniqueEntityID;
  description: string;
  collectionAddress: Address;
  deliveryAddress: Address;
  deadline: Deadline;
  createdAt?: Date;
}

export class Order extends AggregateRoot<OrderProps> {
  get recipient() {
    return this.props.recipient;
  }

  get description() {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get collectionAddress() {
    return this.props.collectionAddress;
  }

  set collectionAddress(collectionAddress: Address) {
    this.props.collectionAddress = collectionAddress;
  }

  get deliveryAddress() {
    return this.props.deliveryAddress;
  }

  set deliveryAddress(deliveryAddress: Address) {
    this.props.deliveryAddress = deliveryAddress;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get deadline() {
    return this.props.deadline.value;
  }

  set deadline(deadline: Date) {
    this.props.deadline = new Deadline(deadline);
  }

  static create(props: Optional<OrderProps, 'createdAt'>, id?: UniqueEntityID) {
    const order = new Order(
      {
        ...props,
        collectionAddress: new Address({
          street: props.collectionAddress.street,
          city: props.collectionAddress.city,
          state: props.collectionAddress.state,
          zipCode: props.collectionAddress.zipCode,
        }),
        deliveryAddress: new Address({
          street: props.deliveryAddress.street,
          city: props.deliveryAddress.city,
          state: props.deliveryAddress.state,
          zipCode: props.deliveryAddress.zipCode,
        }),
        deadline: new Deadline(props.deadline.value),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    );

    return order;
  }
}
