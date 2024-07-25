import { AggregateRoot } from '@src/core/entities/aggregate-root';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';

export interface AdminProps {
  id?: UniqueEntityID;
  name: string;
  cpf: string;
  createdAt?: Date;
}

export class Admin extends AggregateRoot<AdminProps> {
  private constructor(props: AdminProps, id?: UniqueEntityID) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  static create(
    props: Omit<AdminProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Admin {
    return new Admin({ ...props, createdAt: new Date() }, id);
  }
}
