import { DeliverersRepository } from '../repositories/deliverers-repository';
import { Deliverer } from '../../enterprise/entities/deliverier';
import { ContactInfo } from '../../enterprise/entities/value-objects/contact-info';
import { Address } from '../../enterprise/entities/value-objects/address';
import { VehicleInfo } from '../../enterprise/entities/value-objects/vehicle-info';
import { AvailabilityStatus } from '../../enterprise/entities/enums/availability-status';
import { Either, left, right } from '@src/core/either';
import { ResourceNotFoundError } from './errors/resource-not-found-error';

interface CreateDelivererRequest {
  name: string;
  cpf: string;
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
  vehicleInfo: {
    type: string;
    licensePlate: string;
  };
  availabilityStatus: AvailabilityStatus;
}

type CreateDelivererResponse = Either<
  ResourceNotFoundError,
  {
    deliverer: Deliverer;
  }
>;

export class CreateDelivererUseCase {
  constructor(private delivererRepository: DeliverersRepository) {}

  async execute(
    request: CreateDelivererRequest,
  ): Promise<CreateDelivererResponse> {
    const { name, cpf, contactInfo, address, vehicleInfo, availabilityStatus } =
      request;

    const existingDeliverer = await this.delivererRepository.findByCPF(cpf);

    if (existingDeliverer) {
      return left(new ResourceNotFoundError());
    }

    const contact = new ContactInfo(contactInfo.phone, contactInfo.email);
    const addr = new Address(
      address.street,
      address.city,
      address.state,
      address.zipCode,
    );
    const vehicle = new VehicleInfo(vehicleInfo.type, vehicleInfo.licensePlate);

    const deliverer = Deliverer.create({
      name,
      cpf,
      contactInfo: contact,
      address: addr,
      vehicleInfo: vehicle,
      availabilityStatus,
    });

    await this.delivererRepository.create(deliverer);

    return right({ deliverer });
  }
}
