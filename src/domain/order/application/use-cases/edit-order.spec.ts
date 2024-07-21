import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { EditOrderUseCase } from './edit-order';
import { makeOrder } from '@test/factories/make-order';
import dayjs from 'dayjs';

let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: EditOrderUseCase;

describe('Edit Order', () => {
  beforeEach(() => {
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new EditOrderUseCase(inMemoryOrdersRepository);
  });

  it('should be able edit a order', async () => {
    const order = makeOrder();

    inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      id: order.id.toString(),
      description: 'description-1',
      collectionAddress: {
        street: 'street-1',
        city: 'city-1',
        state: 'state-1',
        zipCode: '33333-333',
      },
      deliveryAddress: {
        street: 'street-1',
        city: 'city-1',
        state: 'state-1',
        zipCode: '33333-333',
      },
      deadline: dayjs().add(8, 'day').toDate(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrdersRepository.items[0].deliveryAddress.city).toEqual(
      'city-1',
    );
  });
});
