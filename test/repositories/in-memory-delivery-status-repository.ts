import { DeliveryStatusRepository } from '@src/domain/order/application/repositories/delivery-status-repository';
import { DeliveryStatus } from '@src/domain/order/enterprise/entities/delivery-status';

export class InMemoryDeliveryStatusRepository
  implements DeliveryStatusRepository
{
  public items: DeliveryStatus[] = [];

  async findMany(): Promise<DeliveryStatus[]> {
    const deliveryStatus = this.items;

    return deliveryStatus;
  }

  async findById(id: string): Promise<DeliveryStatus | null> {
    const deliveryStatus = this.items.find((item) => item.id.toString() === id);

    if (!deliveryStatus) {
      return null;
    }

    return deliveryStatus;
  }

  async create(deliveryStatus: DeliveryStatus): Promise<void> {
    this.items.push(deliveryStatus);
  }

  async save(deliveryStatus: DeliveryStatus): Promise<void> {
    const deliveryStatusIndex = this.items.findIndex((item) =>
      item.id.equals(deliveryStatus.id),
    );

    this.items[deliveryStatusIndex] = deliveryStatus;
  }
}
