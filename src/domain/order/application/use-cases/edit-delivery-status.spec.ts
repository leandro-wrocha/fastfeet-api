import { InMemoryDeliveryStatusRepository } from '@test/repositories/in-memory-delivery-status-repository';
import { EditDeliveryStatusUseCase } from './edit-delivery-status';
import { makeDeliveryStatus } from '@test/factories/make-delivery-status';

let inMemoryDeliveryStatusRepository: InMemoryDeliveryStatusRepository;
let sut: EditDeliveryStatusUseCase;

describe('Edit Delivery Status', () => {
  beforeEach(() => {
    inMemoryDeliveryStatusRepository = new InMemoryDeliveryStatusRepository();
    sut = new EditDeliveryStatusUseCase(inMemoryDeliveryStatusRepository);
  });

  it('should be able edit a delivery status', async () => {
    const deliveryStatus = makeDeliveryStatus();

    await inMemoryDeliveryStatusRepository.create(deliveryStatus);

    const result = await sut.execute({
      deliveryStatusId: deliveryStatus.id.toString(),
      currentLocation: 'location-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliveryStatusRepository.items[0].currentLocation).toEqual(
      'location-1',
    );
  });
});
