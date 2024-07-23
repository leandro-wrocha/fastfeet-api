import { InMemoryRecipientsRepository } from '@test/repositories/in-memory-recipients-repository';
import { CreateRecipientUseCase } from './create-recipient';

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: CreateRecipientUseCase;

describe('Create Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new CreateRecipientUseCase(inMemoryRecipientsRepository);
  });

  it('should be able create a recipient', async () => {
    const result = await sut.execute({
      name: 'name-1',
      address: {
        city: 'city-1',
        street: 'street-1',
        state: 'state-1',
        zipCode: '111111111',
      },
      contactInfo: {
        phone: '11111111111',
        email: 'teste@mail.com',
      },
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientsRepository.items[0].name).toEqual('name-1');
  });
});
