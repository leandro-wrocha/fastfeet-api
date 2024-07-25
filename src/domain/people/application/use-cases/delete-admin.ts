import { AdminsRepository } from '../repositories/admins-repository';
import { Either, left, right } from '@src/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface DeleteAdminUseCaseRequest {
  id: string;
}

export type DeleteAdminUseCaseResponse = Either<ResourceNotFoundError, null>;

export class DeleteAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(
    request: DeleteAdminUseCaseRequest,
  ): Promise<DeleteAdminUseCaseResponse> {
    const { id } = request;

    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    await this.adminsRepository.delete(admin);

    return right(null);
  }
}
