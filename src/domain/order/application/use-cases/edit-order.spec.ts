import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { EditOrderUseCase } from './edit-order';
import { makeOrder } from '@test/factories/make-order';

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
      deliveryAddress: 'rua quatro',
      deadline: new Date(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryOrdersRepository.items[0].deliveryAddress).toEqual(
      'rua quatro',
    );
  });
});
