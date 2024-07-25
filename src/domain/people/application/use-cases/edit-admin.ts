import { AdminsRepository } from '../repositories/admins-repository';
import { Either, left, right } from '@src/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditAdminUseCaseRequest {
  id: string;
  name?: string;
  cpf?: string;
}

export type EditAdminUseCaseResponse = Either<ResourceNotFoundError, null>;

export class EditAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(
    request: EditAdminUseCaseRequest,
  ): Promise<EditAdminUseCaseResponse> {
    const { id, name, cpf } = request;

    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      return left(new ResourceNotFoundError());
    }

    admin.name = name;
    admin.cpf = cpf;

    await this.adminsRepository.save(admin);

    return right(null);
  }
}
