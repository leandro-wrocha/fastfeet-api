import { OrdersRepository } from '@src/domain/order/application/repositories/orders-repository';
import { Order } from '@src/domain/order/enterprise/entities/order';

export class InMemoryOrdersRepository implements OrdersRepository {
  public items: Order[] = [];

  async findMany(): Promise<Order[]> {
    const orders = this.items;

    return orders;
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.items.find((item) => item.id.toString() === id);

    if (!order) {
      return null;
    }

    return order;
  }

  async create(order: Order): Promise<void> {
    this.items.push(order);
  }

  async save(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex((item) => item.id.equals(order.id));

    this.items[orderIndex] = order;
  }

  async delete(order: Order): Promise<void> {
    const orderIndex = this.items.findIndex((item) => item.id.equals(order.id));

    this.items.splice(orderIndex, 1);
  }
}
