import { DeliverersRepository } from '@src/domain/people/application/repositories/deliverers-repository';
import { Deliverer } from '@src/domain/people/enterprise/entities/deliverier';

export class InMemoryDeliverersRepository implements DeliverersRepository {
  public items: Deliverer[] = [];

  async findMany(): Promise<Deliverer[]> {
    const deliverers = this.items;

    return deliverers;
  }

  async findById(id: string): Promise<Deliverer | null> {
    const deliverer = this.items.find((item) => item.id.toString() === id);

    if (!deliverer) {
      return null;
    }

    return deliverer;
  }

  async findByCPF(cpf: string): Promise<Deliverer | null> {
    const deliverer = this.items.find((item) => item.cpf === cpf);

    if (!deliverer) {
      return null;
    }

    return deliverer;
  }

  async create(deliverer: Deliverer): Promise<void> {
    this.items.push(deliverer);
  }

  async save(deliverer: Deliverer): Promise<void> {
    const delivererIndex = this.items.findIndex((item) =>
      item.id.equals(deliverer.id),
    );

    this.items[delivererIndex] = deliverer;
  }

  async delete(deliverer: Deliverer): Promise<void> {
    const delivererIndex = this.items.findIndex((item) =>
      item.id.equals(deliverer.id),
    );

    this.items.splice(delivererIndex, 1);
  }
}
