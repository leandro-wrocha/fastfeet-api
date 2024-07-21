import { OrdersRepository } from '../repositories/orders-repository';
import { Either, left, right } from '@src/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export interface DeleteOrderUseCaseRequest {
  id: string;
}

export type DeleteOrderUSeCaseResponse = Either<ResourceNotFoundError, null>;

export class DeleteOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({
    id,
  }: DeleteOrderUseCaseRequest): Promise<DeleteOrderUSeCaseResponse> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    await this.ordersRepository.delete(order);

    return right(null);
  }
}
