import { Either, right } from '@src/core/either';
import { Order } from '../../enterprise/entities/order';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { OrdersRepository } from '../repositories/orders-repository';

interface EditOrderUseCaseRequest {
  id: string;
  deliveryAddress: string;
  deadline: Date;
}

type EditOrderUseCaseResponse = Either<
  null,
  {
    order: Order;
  }
>;

export class EditOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    id,
    deliveryAddress,
    deadline,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(id);

    order.deliveryAddress = deliveryAddress;
    order.deadline = deadline;

    await this.ordersRepository.save(order);

    return right({ order });
  }
}
