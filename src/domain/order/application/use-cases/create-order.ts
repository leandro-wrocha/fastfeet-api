import { Either, right } from '@src/core/either';
import { Order } from '../../enterprise/entities/order';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { OrdersRepository } from '../repositories/orders-repository';
import { Address } from '../../enterprise/entities/value-objects/address';
import { Deadline } from '../../enterprise/entities/value-objects/deadline';

interface CreateOrderUseCaseRequest {
  recipient: string;
  description: string;
  collectionAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  deadline: Date;
}

type CreateOrderUseCaseResponse = Either<
  null,
  {
    order: Order;
  }
>;

export class CreateOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    recipient,
    description,
    collectionAddress,
    deliveryAddress,
    deadline,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      id: new UniqueEntityID(),
      recipient: new UniqueEntityID(recipient),
      description,
      collectionAddress: new Address({
        street: collectionAddress.street,
        city: collectionAddress.city,
        state: collectionAddress.state,
        zipCode: collectionAddress.zipCode,
      }),
      deliveryAddress: new Address({
        street: deliveryAddress.street,
        state: deliveryAddress.state,
        city: deliveryAddress.city,
        zipCode: deliveryAddress.zipCode,
      }),
      deadline: new Deadline(deadline),
    });

    await this.ordersRepository.create(order);

    return right({ order });
  }
}
