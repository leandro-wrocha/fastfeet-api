import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { Order, OrderProps } from '@src/domain/order/enterprise/entities/order';

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
): Order {
  const order = Order.create(
    {
      sender: new UniqueEntityID(),
      recipient: new UniqueEntityID(),
      deliveryAddress: 'rua test three',
      deadline: new Date(),
      ...override,
    },
    id,
  );

  return order;
}
