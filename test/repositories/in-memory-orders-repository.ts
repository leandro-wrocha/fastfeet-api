import { OrdersRepository } from '@src/domain/order/application/repositories/orders-repository';
import { Order } from '@src/domain/order/enterprise/entities/order';

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }
}
