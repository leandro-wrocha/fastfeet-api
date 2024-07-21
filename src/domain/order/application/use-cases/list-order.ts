import { Either, right } from '@src/core/either';
import { OrdersRepository } from '../repositories/orders-repository';
import { Order } from '../../enterprise/entities/order';

export interface ListOrderUseCaseRequest {}

export type ListOrderUseCaseResponse = Either<
  null,
  {
    orders: Order[];
  }
>;

export class ListOrderUseCase {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async execute({}: ListOrderUseCaseRequest): Promise<ListOrderUseCaseResponse> {
    const orders = await this.ordersRepository.findMany();

    return right({ orders });
  }
}
