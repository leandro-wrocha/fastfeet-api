import { DeliverersRepository } from '../repositories/deliverers-repository';
import { Either, right } from '@src/core/either';
import { Deliverer } from '../../enterprise/entities/deliverier';

export type ListDelivererUseCaseResponse = Either<
  null,
  {
    deliverers: Deliverer[];
  }
>;

export class ListDelivererUseCase {
  constructor(private deliverersRepository: DeliverersRepository) {}

  async execute(): Promise<ListDelivererUseCaseResponse> {
    const deliverers = await this.deliverersRepository.findMany();

    return right({ deliverers });
  }
}
