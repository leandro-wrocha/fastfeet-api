import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { CreateOrderUseCase } from './create-order';
import dayjs from 'dayjs';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: CreateOrderUseCase;

describe('Create Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new CreateOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able create a order', async () => {
    const result = await sut.execute({
      recipient: 'recipient-1',
      description: 'description-1',
      collectionAddress: {
        street: 'street-1',
        city: 'city-1',
        state: 'state-1',
        zipCode: '33333-333',
      },
      deliveryAddress: {
        street: 'street-2',
        city: 'city-1',
        state: 'state-1',
        zipCode: '44444-444',
      },
      deadline: dayjs().add(8, 'day').toDate(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrdersRepository.items).length(1);
    expect(inMemoryOrdersRepository.items[0].deliveryAddress.zipCode).toEqual(
      '44444-444',
    );
  });
});
