import { InMemoryDeliverersRepository } from '@test/repositories/in-memory-deliveriers-repository';
import { CreateDelivererUseCase } from './create-deliverer';
import { AvailabilityStatus } from '../../enterprise/entities/enums/availability-status';

let inMemoryDeliverersRepository: InMemoryDeliverersRepository;
let sut: CreateDelivererUseCase;

describe('Create Deliverer', () => {
  beforeEach(() => {
    inMemoryDeliverersRepository = new InMemoryDeliverersRepository();
    sut = new CreateDelivererUseCase(inMemoryDeliverersRepository);
  });

  it('should be able create a deliverer', async () => {
    const result = await sut.execute({
      name: 'name-1',
      cpf: '11111111111',
      address: {
        city: 'city-1',
        street: 'street-1',
        state: 'state-1',
        zipCode: '111111111',
      },
      availabilityStatus: AvailabilityStatus.AVAILABLE,
      contactInfo: {
        phone: '11111111111',
        email: 'teste@mail.com',
      },
      vehicleInfo: {
        type: 'motocycle',
        licensePlate: 'ddd',
      },
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryDeliverersRepository.items[0].name).toEqual('name-1');
  });
});
