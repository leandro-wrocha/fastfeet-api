import { Order } from '../../enterprise/entities/order';

export interface OrdersRepository {
  findMany(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  create(order: Order): Promise<void>;
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
}
