import { Either, left, right } from '@src/core/either';
import { DeliveryStatusRepository } from '../repositories/delivery-status-repository';
import {
  DeliveryStatus,
  DeliveryStatusEnum,
} from '../../enterprise/entities/delivery-status';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export interface EditDeliveryStatusUseCaseRequest {
  deliveryStatusId: string;
  updatedAt?: Date;
  currentLocation?: string;
  status?: DeliveryStatusEnum;
}

export type EditDeliveryStatusUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryStatus: DeliveryStatus;
  }
>;

export class EditDeliveryStatusUseCase {
  constructor(private deliveryStatusRepository: DeliveryStatusRepository) {}

  async execute(
    request: EditDeliveryStatusUseCaseRequest,
  ): Promise<EditDeliveryStatusUseCaseResponse> {
    const { deliveryStatusId, updatedAt, currentLocation, status } = request;

    const deliveryStatus =
      await this.deliveryStatusRepository.findById(deliveryStatusId);

    if (!deliveryStatus) {
      return left(new ResourceNotFoundError());
    }

    deliveryStatus.updatedAt = updatedAt;
    deliveryStatus.currentLocation = currentLocation;
    deliveryStatus.status = status;

    await this.deliveryStatusRepository.save(deliveryStatus);

    return right({ deliveryStatus });
  }
}
