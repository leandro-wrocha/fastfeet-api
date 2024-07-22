import { InMemoryDeliverersRepository } from '@test/repositories/in-memory-deliveriers-repository';
import { makeDeliverer } from '@test/factories/make-deliverer';
import { DeleteDelivererUseCase } from './delete-deliverer';

let inMemoryDeliverersRepository: InMemoryDeliverersRepository;
let sut: DeleteDelivererUseCase;

describe('Delete Deliverer', () => {
  beforeEach(() => {
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository();
    sut = new DeleteDelivererUseCase(inMemoryDeliverersRepository);
  });

  it('should be able delete a deliverer', async () => {
    const deliverer = makeDeliverer(makeDeliverer());

    await inMemoryDeliverersRepository.create(deliverer);

    const result = await sut.execute({ id: deliverer.id.toString() });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliverersRepository.items).length(0);
  });
});
