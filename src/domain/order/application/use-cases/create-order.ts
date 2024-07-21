import { Either, right } from '@src/core/either';
import { Order } from '../../enterprise/entities/order';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { OrdersRepository } from '../repositories/orders-repository';

interface CreateOrderUseCaseRequest {
  sender: string;
  recipient: string;
  deliveryAddress: string;
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
    sender,
    recipient,
    deliveryAddress,
    deadline,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      id: new UniqueEntityID(),
      sender: new UniqueEntityID(sender),
      recipient: new UniqueEntityID(recipient),
      deliveryAddress,
      deadline,
    });

    await this.ordersRepository.create(order);

    return right({ order });
  }
}
