import { InMemoryDeliverersRepository } from '@test/repositories/in-memory-deliveriers-repository';
import { EditDelivererUseCase } from './edit-deliverer';
import { makeDeliverer } from '@test/factories/make-deliverer';
import { AvailabilityStatus } from '../../enterprise/entities/enums/availability-status';

let inMemoryDeliverersRepository: InMemoryDeliverersRepository;
let sut: EditDelivererUseCase;

describe('Edit Deliverer', () => {
  beforeEach(() => {
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository();
    sut = new EditDelivererUseCase(inMemoryDeliverersRepository);
  });

  it('should be able edit a deliverer', async () => {
    const deliverer = makeDeliverer();

    await inMemoryDeliverersRepository.create(deliverer);

    const result = await sut.execute({
      id: deliverer.id.toString(),
      availabilityStatus: AvailabilityStatus.UNAVAILABLE,
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliverersRepository.items[0].availabilityStatus).toEqual(
      AvailabilityStatus.UNAVAILABLE,
    );
  });
});
