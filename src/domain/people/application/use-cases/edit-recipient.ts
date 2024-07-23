import { RecipientsRepository } from '../repositories/recipients-repository';
import { Either, left, right } from '@src/core/either';
import { Recipient } from '../../enterprise/entities/recipient';
import { ContactInfo } from '../../enterprise/entities/value-objects/contact-info';
import { Address } from '../../enterprise/entities/value-objects/address';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface EditRecipientUseCaseRequest {
  id: string;
  name?: string;
  contactInfo?: {
    phone: string;
    email: string;
  };
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

type EditRecipientUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient;
  }
>;

export class EditRecipientUseCase {
  constructor(private recipientsRepository: RecipientsRepository) {}

  async execute(
    request: EditRecipientUseCaseRequest,
  ): Promise<EditRecipientUseCaseResponse> {
    const { id, name, contactInfo, address } = request;

    const recipient = await this.recipientsRepository.findById(id);

    if (!recipient) {
      return left(new ResourceNotFoundError());
    }

    if (name) {
      recipient.name = name;
    }

    if (contactInfo) {
      const contact = new ContactInfo(contactInfo.phone, contactInfo.email);
      recipient.contactInfo = contact;
    }

    if (address) {
      const addr = new Address(
        address.street,
        address.city,
        address.state,
        address.zipCode,
      );
      recipient.address = addr;
    }

    await this.recipientsRepository.save(recipient);

    return right({ recipient });
  }
}
