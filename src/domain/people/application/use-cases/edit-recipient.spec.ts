import { InMemoryRecipientsRepository } from '@test/repositories/in-memory-recipients-repository';
import { makeRecipient } from '@test/factories/make-recipient';
import { EditRecipientUseCase } from './edit-recipient';

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: EditRecipientUseCase;

describe('Edit Deliverer', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new EditRecipientUseCase(inMemoryRecipientsRepository);
  });

  it('should be able edit a recipient', async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientsRepository.create(recipient);

    const result = await sut.execute({
      id: recipient.id.toString(),
      name: 'name-2',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientsRepository.items[0].name).toEqual('name-2');
  });
});
