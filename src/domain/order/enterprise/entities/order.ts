import { AggregateRoot } from '@src/core/entities/aggregate-root';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { Optional } from '@src/core/types/optinonal';

export interface OrderProps {
  id?: UniqueEntityID;
  sender: UniqueEntityID;
  recipient: UniqueEntityID;
  deliveryAddress: string;
  deadline: Date;
  created_at?: Date;
}

export class Order extends AggregateRoot<OrderProps> {
  get sender() {
    return this.props.sender;
  }

  get recipient() {
    return this.props.recipient;
  }

  get deliveryAddress() {
    return this.props.deliveryAddress;
  }

  set deliveryAddress(deliveryAddress: string) {
    this.props.deliveryAddress = deliveryAddress;
  }

  get deadline() {
    return this.props.deadline;
  }

  set deadline(deadline: Date) {
    this.props.deadline = deadline;
  }

  static create(
    props: Optional<OrderProps, 'created_at'>,
    id?: UniqueEntityID,
  ) {
    const order = new Order(
      {
        ...props,
        created_at: props.created_at ?? new Date(),
      },
      id,
    );

    return order;
  }
}
