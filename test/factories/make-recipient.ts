import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import {
  Recipient,
  RecipientProps,
} from '@src/domain/people/enterprise/entities/recipient';
import { Address } from '@src/domain/people/enterprise/entities/value-objects/address';
import { ContactInfo } from '@src/domain/people/enterprise/entities/value-objects/contact-info';

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
): Recipient {
  const address = new Address(
    faker.location.street(),
    faker.location.city(),
    faker.location.state(),
    faker.location.zipCode('########'),
  );

  const contactInfo = new ContactInfo(
    faker.string.numeric({ length: 10 }),
    faker.internet.email(),
  );

  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      address: address,
      contactInfo: contactInfo,
      ...override,
    },
    id,
  );

  return recipient;
}
