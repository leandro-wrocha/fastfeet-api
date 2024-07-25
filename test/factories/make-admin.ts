import { faker } from '@faker-js/faker';
import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import {
  Admin,
  AdminProps,
} from '@src/domain/people/enterprise/entities/admin';

export function makeAdmin(
  override: Partial<AdminProps> = {},
  id?: UniqueEntityID,
): Admin {
  const order = Admin.create(
    {
      name: faker.person.fullName(),
      cpf: faker.string.numeric({ length: 11 }),
      ...override,
    },
    id,
  );

  return order;
}
