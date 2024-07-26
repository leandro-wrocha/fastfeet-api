import { DeliveryStatus } from '../../enterprise/entities/delivery-status';

export interface DeliveryStatusRepository {
  findById(id: string): Promise<DeliveryStatus | null>;
  create(deliveryStatus: DeliveryStatus): Promise<void>;
  save(deliveryStatus: DeliveryStatus): Promise<void>;
}
