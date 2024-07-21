import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { CreateOrderUseCase } from './create-order';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: CreateOrderUseCase;

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new CreateOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able create a order', async () => {
    const result = await sut.execute({
      sender: 'sender-1',
      recipient: 'recipient-1',
      deliveryAddress: 'rua três',
      deadline: new Date(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrdersRepository.items).length(1);
  });
});
