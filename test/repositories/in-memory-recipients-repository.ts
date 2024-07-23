import { RecipientsRepository } from '@src/domain/people/application/repositories/recipients-repository';
import { Recipient } from '@src/domain/people/enterprise/entities/recipient';

export class InMemoryRecipientsRepository implements RecipientsRepository {
  public items: Recipient[] = [];

  async findMany(): Promise<Recipient[]> {
    const recipients = this.items;

    return recipients;
  }

  async findById(id: string): Promise<Recipient | null> {
    const recipient = this.items.find((item) => item.id.toString() === id);

    if (!recipient) {
      return null;
    }

    return recipient;
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient);
  }

  async save(recipient: Recipient): Promise<void> {
    const recipientIndex = this.items.findIndex((item) =>
      item.id.equals(recipient.id),
    );

    this.items[recipientIndex] = recipient;
  }

  async delete(recipient: Recipient): Promise<void> {
    const recipientIndex = this.items.findIndex((item) =>
      item.id.equals(recipient.id),
    );

    this.items.splice(recipientIndex, 1);
  }
}
