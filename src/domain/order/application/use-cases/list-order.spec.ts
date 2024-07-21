import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { makeOrder } from '@test/factories/make-order';
import { ListOrderUseCase } from './list-order';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: ListOrderUseCase;

describe('List Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new ListOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able list a orders', async () => {
    await inMemoryOrdersRepository.create(makeOrder());
    await inMemoryOrdersRepository.create(makeOrder());

    const result = await sut.execute({});

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrdersRepository.items).length(2);
  });
});
