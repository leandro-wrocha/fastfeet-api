import { faker } from '@faker-js/faker';

import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { Order, OrderProps } from '@src/domain/order/enterprise/entities/order';
import { Address } from '@src/domain/order/enterprise/entities/value-objects/address';
import { Deadline } from '@src/domain/order/enterprise/entities/value-objects/deadline';
import dayjs from 'dayjs';

export function makeOrder(
  override: Partial<OrderProps> = {},
  id?: UniqueEntityID,
): Order {
  const order = Order.create(
    {
      recipient: new UniqueEntityID(),
      collectionAddress: new Address({
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('#####-###'),
      }),
      deliveryAddress: new Address({
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('#####-###'),
      }),
      description: faker.lorem.sentence(10),
      deadline: new Deadline(dayjs().add(8, 'day').toDate()),
      ...override,
    },
    id,
  );

  return order;
}
