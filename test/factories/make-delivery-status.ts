import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import {
  DeliveryStatus,
  DeliveryStatusEnum,
  DeliveryStatusProps,
} from '@src/domain/order/enterprise/entities/delivery-status';

export function makeDeliveryStatus(
  override: Partial<DeliveryStatusProps> = {},
  id?: UniqueEntityID,
): DeliveryStatus {
  const deliveryStatus = DeliveryStatus.create(
    {
      orderId: new UniqueEntityID('order-1'),
      currentLocation: faker.location.street(),
      status: DeliveryStatusEnum.AwaitingPickup,
      updatedAt: new Date(),
      ...override,
    },
    id,
  );

  return deliveryStatus;
}
