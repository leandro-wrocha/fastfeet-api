import { InMemoryRecipientsRepository } from '@test/repositories/in-memory-recipients-repository';
import { DeleteRecipientUseCase } from './delete-recipient';
import { makeRecipient } from '@test/factories/make-recipient';

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: DeleteRecipientUseCase;

describe('Delete Recipient', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new DeleteRecipientUseCase(inMemoryRecipientsRepository);
  });

  it('should be able delete a recipient', async () => {
    const recipient = makeRecipient();

    await inMemoryRecipientsRepository.create(recipient);

    const result = await sut.execute({ id: recipient.id.toString() });

    expect(result.isRight()).toBe(true);
    expect(inMemoryRecipientsRepository.items).length(0);
  });
});
