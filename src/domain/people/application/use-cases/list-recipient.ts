import { RecipientsRepository } from '../repositories/recipients-repository';
import { Either, right } from '@src/core/either';
import { Recipient } from '../../enterprise/entities/recipient';

interface ListRecipientUseCaseRequest {}

type ListRecipientUseCaseResponse = Either<
  null,
  {
    recipients: Recipient[];
  }
>;

export class ListRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute({}: ListRecipientUseCaseRequest): Promise<ListRecipientUseCaseResponse> {
    const recipients = await this.recipientsRepository.findMany();

    return right({ recipients });
  }
}
