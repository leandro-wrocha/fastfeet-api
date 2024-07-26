import { InMemoryDeliveryStatusRepository } from '@test/repositories/in-memory-delivery-status-repository';
import { InMemoryOrdersRepository } from '@test/repositories/in-memory-orders-repository';
import { CreateDeliveryStatusUseCase } from './create-delivery-status';
import { makeOrder } from '@test/factories/make-order';
import { DeliveryStatusEnum } from '../../enterprise/entities/delivery-status';

let inMemoryDeliveryStatusRepository: InMemoryDeliveryStatusRepository;
let inMemoryOrdersRepository: InMemoryOrdersRepository;
let sut: CreateDeliveryStatusUseCase;

describe('Create Delivery Status', () => {
  beforeEach(() => {
    inMemoryDeliveryStatusRepository = new InMemoryDeliveryStatusRepository();
    inMemoryOrdersRepository = new InMemoryOrdersRepository();
    sut = new CreateDeliveryStatusUseCase(
      inMemoryDeliveryStatusRepository,
      inMemoryOrdersRepository,
    );
  });

  it('should be able create a delivery status', async () => {
    const order = makeOrder();

    await inMemoryOrdersRepository.create(order);

    const result = await sut.execute({
      orderId: order.id.toString(),
      status: DeliveryStatusEnum.InTransit,
      currentLocation: 'location-1',
      updatedAt: new Date(),
    });

    expect(result.isRight()).toBe(true);
    expect(
      inMemoryDeliveryStatusRepository.items[0].orderId.toString(),
    ).toEqual(order.id.toString());
  });
});
