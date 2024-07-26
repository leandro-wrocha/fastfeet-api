import { Either, left, right } from '@src/core/either';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import { OrdersRepository } from '../repositories/orders-repository';
import { DeliveryStatusRepository } from '../repositories/delivery-status-repository';
import {
  DeliveryStatus,
  DeliveryStatusEnum,
} from '../../enterprise/entities/delivery-status';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export interface CreateDeliveryStatusUseCaseRequest {
  orderId: string;
  updatedAt: Date;
  currentLocation: string;
  status: DeliveryStatusEnum;
}

export type CreateDeliveryStatusUseCaseResponse = Either<
  ResourceNotFoundError,
  null
>;

export class CreateDeliveryStatusUseCase {
  constructor(
    private deliveryStatusRepository: DeliveryStatusRepository,
    private ordersRepository: OrdersRepository,
  ) {}

  async execute(
    request: CreateDeliveryStatusUseCaseRequest,
  ): Promise<CreateDeliveryStatusUseCaseResponse> {
    const { orderId, updatedAt, currentLocation, status } = request;

    const order = await this.ordersRepository.findById(orderId);

    if (!order) {
      return left(new ResourceNotFoundError());
    }

    const deliveryStatus = DeliveryStatus.create({
      orderId: new UniqueEntityID(orderId),
      updatedAt,
      currentLocation,
      status,
    });

    await this.deliveryStatusRepository.create(deliveryStatus);

    return right(null);
  }
}
