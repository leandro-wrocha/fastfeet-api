import { InMemoryAdminsRepository } from '@test/repositories/in-memory-admins-repository';
import { EditAdminUseCase } from './edit-admin';
import { makeAdmin } from '@test/factories/make-admin';

let inMemoryAdminsRepository: InMemoryAdminsRepository;
let sut: EditAdminUseCase;

describe('Edit Admin', () => {
  beforeEach(() => {
    inMemoryAdminsRepository = new InMemoryAdminsRepository();
    sut = new EditAdminUseCase(inMemoryAdminsRepository);
  });

  it('should be able edit a admin', async () => {
    const admin = makeAdmin();

    await inMemoryAdminsRepository.create(admin);

    const result = await sut.execute({
      id: admin.id.toString(),
      name: 'name-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryAdminsRepository.items[0].name).toEqual('name-1');
  });
});
