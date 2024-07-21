import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { DeleteOrderUseCase } from './delete-order';
import { makeOrder } from '@test/factories/make-order';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: DeleteOrderUseCase;

describe('Delete Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new DeleteOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able delete a order', async () => {
    const order = makeOrder({}, new UniqueEntityID('order-1'));

    await inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      id: order.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrdersRepository.items).length(0);
  });
});
