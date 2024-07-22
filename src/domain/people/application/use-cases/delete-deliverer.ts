import { DeliverersRepository } from '../repositories/deliverers-repository';
import { Either, left, right } from '@src/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

export interface DeleteDelivererUseCaseRequest {
  id: string;
}

export type DeleteDeliveryUseCaseResponse = Either<ResourceNotFoundError, null>;

export class DeleteDelivererUseCase {
  constructor(private deliverersRepository: DeliverersRepository) {}

  async execute({
    id,
  }: DeleteDelivererUseCaseRequest): Promise<DeleteDeliveryUseCaseResponse> {
    const deliverer = await this.deliverersRepository.findById(id);

    if (!deliverer) {
      return left(new ResourceNotFoundError());
    }

    await this.deliverersRepository.delete(deliverer);

    return right(null);
  }
}
