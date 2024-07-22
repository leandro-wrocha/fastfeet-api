import { DeliverersRepository } from '../repositories/deliverers-repository';
import { Either, left, right } from '@src/core/either';
import { Deliverer } from '../../enterprise/entities/deliverier';
import { ContactInfo } from '../../enterprise/entities/value-objects/contact-info';
import { Address } from '../../enterprise/entities/value-objects/address';
import { VehicleInfo } from '../../enterprise/entities/value-objects/vehicle-info';
import { AvailabilityStatus } from '../../enterprise/entities/enums/availability-status';

interface EditDelivererRequest {
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
  vehicleInfo?: {
    type: string;
    licensePlate: string;
  };
  availabilityStatus?: AvailabilityStatus;
}

interface EditDelivererResponse {
  deliverer: Deliverer;
}

export class EditDelivererUseCase {
  constructor(private deliverersRepository: DeliverersRepository) {}

  async execute(
    request: EditDelivererRequest,
  ): Promise<Either<string, EditDelivererResponse>> {
    const { id, name, contactInfo, address, vehicleInfo, availabilityStatus } =
      request;

    const deliverer = await this.deliverersRepository.findById(id);

    if (!deliverer) {
      return left('Deliverer not found');
    }

    if (name) {
      deliverer.name = name;
    }

    if (contactInfo) {
      const contact = new ContactInfo(contactInfo.phone, contactInfo.email);
      deliverer.contactInfo = contact;
    }

    if (address) {
      const addr = new Address(
        address.street,
        address.city,
        address.state,
        address.zipCode,
      );
      deliverer.address = addr;
    }

    if (vehicleInfo) {
      const vehicle = new VehicleInfo(
        vehicleInfo.type,
        vehicleInfo.licensePlate,
      );
      deliverer.vehicleInfo = vehicle;
    }

    if (availabilityStatus) {
      deliverer.availabilityStatus = availabilityStatus;
    }

    await this.deliverersRepository.save(deliverer);

    return right({ deliverer });
  }
}
