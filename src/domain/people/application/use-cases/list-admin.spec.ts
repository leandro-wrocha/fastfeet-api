import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { ListAdminUseCase } from './list-admin';
import { makeAdmin } from '@test/factories/make-admin';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let sut: ListAdminUseCase;

describe('List Admin', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    sut = new ListAdminUseCase(inMemoryAdminsRepository);
  });

  it('should be able return a list of admins', async () => {
    await inMemoryAdminsRepository.create(makeAdmin());
    await inMemoryAdminsRepository.create(makeAdmin());

    const result = await sut.execute({});

    expect(result.isRight()).toBe(true);
    expect(result.value.admins).length(2);
  });
});
