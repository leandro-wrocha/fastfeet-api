import { AdminsRepository } from '../repositories/admins-repository';
import { Either, right } from '@src/core/either';
import { Admin } from '../../enterprise/entities/admin';
interface CreateAdminUseCaseRequest {
  name: string;
  cpf: string;
}

export type CreateAdminUseCaseResponse = Either<
  null,
  {
    admin: Admin;
  }
>;

export class CreateAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute(
    request: CreateAdminUseCaseRequest,
  ): Promise<CreateAdminUseCaseResponse> {
    const { name, cpf } = request;

    const admin = Admin.create({
      name,
      cpf,
    });

    await this.adminsRepository.create(admin);

    return right({ admin });
  }
}
