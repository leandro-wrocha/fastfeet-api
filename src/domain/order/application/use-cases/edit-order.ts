import { Either, right } from '@src/core/either';
import { Order } from '../../enterprise/entities/order';
import { OrdersRepository } from '../repositories/orders-repository';
import { Address } from '../../enterprise/entities/value-objects/address';

interface EditOrderUseCaseRequest {
  id: string;
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
    description,
    collectionAddress,
    deliveryAddress,
    deadline,
  }: EditOrderUseCaseRequest): Promise<EditOrderUseCaseResponse> {
    const order = await this.ordersRepository.findById(id);

    order.description = description;
    order.collectionAddress = new Address(collectionAddress);
    order.deliveryAddress = new Address(deliveryAddress);
    order.deadline = deadline;

    await this.ordersRepository.save(order);

    return right({ order });
  }
}
