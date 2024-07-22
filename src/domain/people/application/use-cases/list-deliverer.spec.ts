import { InMemoryDeliverersRepository } from '@test/repositories/in-memory-deliveriers-repository';
import { ListDelivererUseCase } from './list-deliverer';
import { makeDeliverer } from '@test/factories/make-deliverer';

let inMemoryDeliverersRepository: InMemoryDeliverersRepository;
let sut: ListDelivererUseCase;

describe('List Deliverers', () => {
  beforeEach(() => {
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository();
    sut = new ListDelivererUseCase(inMemoryDeliverersRepository);
  });

  it('should be able list deliverers', async () => {
    await inMemoryDeliverersRepository.create(makeDeliverer());
    await inMemoryDeliverersRepository.create(makeDeliverer());

    const result = await sut.execute();

    expect(result.isRight()).toBe(true);
    expect(result.value.deliverers).length(2);
  });
});
