import { AggregateRoot } from '@src/core/entities/aggregate-root';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';

export enum DeliveryStatusEnum {
  InTransit = 'em trânsito',
  Delivered = 'entregue',
  AwaitingPickup = 'aguardando coleta',
  Delayed = 'atrasado',
}

export interface DeliveryStatusProps {
  orderId: UniqueEntityID;
  updatedAt: Date;
  currentLocation: string;
  status: DeliveryStatusEnum;
}

export class DeliveryStatus extends AggregateRoot<DeliveryStatusProps> {
  private constructor(props: DeliveryStatusProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get orderId(): UniqueEntityID {
    return this.props.orderId;
  }

  set orderId(orderId: UniqueEntityID) {
    this.props.orderId = orderId;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get currentLocation(): string {
    return this.props.currentLocation;
  }

  set currentLocation(currentLocation: string) {
    this.props.currentLocation = currentLocation;
  }

  get status(): DeliveryStatusEnum {
    return this.props.status;
  }

  set status(status: DeliveryStatusEnum) {
    this.props.status = status;
  }

  static create(props: DeliveryStatusProps, id?: UniqueEntityID) {
    const delivryStatus = new DeliveryStatus(
      {
        orderId: props.orderId,
        status: props.status,
        currentLocation: props.currentLocation,
        updatedAt: props.updatedAt,
      },
      id,
    );

    return delivryStatus;
  }
}
