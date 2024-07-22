import { UniqueEntityID } from '@src/core/entities/unique-entity-id';
import {
  Deliverer,
  DelivererProps,
} from '@src/domain/people/enterprise/entities/deliverier';
import { AvailabilityStatus } from '@src/domain/people/enterprise/entities/enums/availability-status';
import { Address } from '@src/domain/people/enterprise/entities/value-objects/address';
import { ContactInfo } from '@src/domain/people/enterprise/entities/value-objects/contact-info';
import { VehicleInfo } from '@src/domain/people/enterprise/entities/value-objects/vehicle-info';

export function makeDeliverer(
  override: Partial<DelivererProps> = {},
  id?: UniqueEntityID,
): Deliverer {
  const order = Deliverer.create(
    {
      name: 'name-1',
      cpf: 'cpf-1',
      address: new Address('street-1', 'city-1', 'state-1', 'zipcode-1'),
      contactInfo: new ContactInfo('11111111111', 'teste@email.com'),
      vehicleInfo: new VehicleInfo('type-1', 'plate-1'),
      availabilityStatus: AvailabilityStatus.AVAILABLE,
      ...override,
    },
    id,
  );

  return order;
}
