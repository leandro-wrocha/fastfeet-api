import { Deliverer } from '@src/domain/people/enterprise/entities/deliverier';

export interface DeliverersRepository {
  findMany(): Promise<Deliverer[]>;
  findById(id: string): Promise<Deliverer | null>;
  findByCPF(cpf: string): Promise<Deliverer | null>;
  create(deliverer: Deliverer): Promise<void>;
  save(deliverer: Deliverer): Promise<void>;
  delete(deliverer: Deliverer): Promise<void>;
}
