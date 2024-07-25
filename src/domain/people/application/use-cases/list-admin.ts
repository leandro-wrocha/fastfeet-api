import { AdminsRepository } from '../repositories/admins-repository';
import { Either, right } from '@src/core/either';
import { Admin } from '../../enterprise/entities/admin';

interface ListAdminUseCaseRequest {}

export type ListAdminUseCaseResponse = Either<
  null,
  {
    admins: Admin[];
  }
>;

export class ListAdminUseCase {
  constructor(private adminsRepository: AdminsRepository) {}

  async execute({}: ListAdminUseCaseRequest): Promise<ListAdminUseCaseResponse> {
    const admins = await this.adminsRepository.findMany();

    return right({ admins });
  }
}
