import { RecipientsRepository } from '../repositories/recipients-repository';
import { Either, left, right } from '@src/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteRecipientUseCaseRequest {
  id: string;
}

type DeleteRecipientUseCaseResponse = Either<ResourceNotFoundError, null>;

export class DeleteRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute(
    request: DeleteRecipientUseCaseRequest,
  ): Promise<DeleteRecipientUseCaseResponse> {
    const { id } = request;

    const recipient = await this.recipientsRepository.findById(id);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    await this.recipientsRepository.delete(recipient);

    return right(null);
  }
}
