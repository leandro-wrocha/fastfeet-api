import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { DeleteAdminUseCase } from './delete-admin';
import { makeAdmin } from '@test/factories/make-admin';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let sut: DeleteAdminUseCase;

describe('Delete Admin', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    sut = new DeleteAdminUseCase(inMemoryAdminsRepository);
  });

  it('should be able delete a admin', async () => {
    const admin = makeAdmin();

    await inMemoryAdminsRepository.create(admin);

    const result = await sut.execute({ id: admin.id.toString() });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAdminsRepository.items).length(0);
  });
});
