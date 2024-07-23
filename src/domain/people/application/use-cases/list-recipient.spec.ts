import { InMemoryRecipientsRepository } from '@test/repositories/in-memory-recipients-repository';
import { ListRecipientUseCase } from './list-recipient';
import { makeRecipient } from '@test/factories/make-recipient';

let inMemoryRecipientsRepository: InMemoryRecipientsRepository;
let sut: ListRecipientUseCase;

describe('List Recipients', () => {
  beforeEach(() => {
    inMemoryRecipientsRepository = new InMemoryRecipientsRepository();
    sut = new ListRecipientUseCase(inMemoryRecipientsRepository);
  });

  it('should be able list recipients', async () => {
    await inMemoryRecipientsRepository.create(makeRecipient());
    await inMemoryRecipientsRepository.create(makeRecipient());

    const result = await sut.execute({});

    expect(result.isRight()).toBe(true);
    expect(result.value.recipients).length(2);
  });
});
