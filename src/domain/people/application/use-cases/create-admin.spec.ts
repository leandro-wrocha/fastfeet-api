import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { CreateAdminUseCase } from './create-admin';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let sut: CreateAdminUseCase;

describe('Create Admin', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    sut = new CreateAdminUseCase(inMemoryAdminsRepository);
  });

  it('should be able create a admin', async () => {
    const result = await sut.execute({ name: 'name-1', cpf: '11111111111' });

    expect(result.isRight()).toBe(true);
    expect(result.value.admin.cpf).toEqual('11111111111');
  });
});
