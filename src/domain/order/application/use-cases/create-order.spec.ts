import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { CreateOrderUseCase } from './create-order';

let inMemoryCreateOrdersRepository: InMemoryOrdersRepository;
let sut: CreateOrderUseCase;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryCreateOrdersRepository = new InMemoryOrdersRepository();
    sut = new CreateOrderUseCase(inMemoryCreateOrdersRepository);
  });

  it('should be able create a order', async () => {
    const result = await sut.execute({
      sender: 'sender-1',
      recipient: 'recipient-1',
      deliveryAddress: 'rua três',
      deadline: new Date(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryCreateOrdersRepository.items).length(1);
  });
});
