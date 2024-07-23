import { RecipientsRepository } from '../repositories/recipients-repository';
import { Either, right } from '@src/core/either';
import { Recipient } from '../../enterprise/entities/recipient';
import { ContactInfo } from '../../enterprise/entities/value-objects/contact-info';
import { Address } from '../../enterprise/entities/value-objects/address';

interface CreateRecipientUseCaseRequest {
  name: string;
  contactInfo: {
    phone: string;
    email: string;
  };
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

type CreateRecipientUseCaseResponse = Either<
  null,
  {
    recipient: Recipient;
  }
>;

export class CreateRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute(
    request: CreateRecipientUseCaseRequest,
  ): Promise<CreateRecipientUseCaseResponse> {
    const { name, contactInfo, address } = request;

    const contact = new ContactInfo(contactInfo.phone, contactInfo.email);
    const addr = new Address(
      address.street,
      address.city,
      address.state,
      address.zipCode,
    );
    const recipient = Recipient.create({
      name,
      contactInfo: contact,
      address: addr,
    });

    await this.recipientsRepository.create(recipient);

    return right({ recipient });
  }
}
