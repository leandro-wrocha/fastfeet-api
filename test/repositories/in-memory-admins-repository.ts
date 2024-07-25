import { AdminsRepository } from '@src/domain/people/application/repositories/admins-repository';
import { Admin } from '@src/domain/people/enterprise/entities/admin';

export class InMemoryAdminsRepository implements AdminsRepository {
  public items: Admin[] = [];

  async findMany(): Promise<Admin[]> {
    const admins = this.items;

    return admins;
  }

  async findById(id: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.id.toString() === id);

    if (!admin) {
      return null;
    }

    return admin;
  }

  async findByCPF(cpf: string): Promise<Admin | null> {
    const admin = this.items.find((item) => item.cpf === cpf);

    if (!admin) {
      return null;
    }

    return admin;
  }

  async create(admin: Admin): Promise<void> {
    this.items.push(admin);
  }

  async save(admin: Admin): Promise<void> {
    const adminIndex = this.items.findIndex((item) => item.id.equals(admin.id));

    this.items[adminIndex] = admin;
  }

  async delete(admin: Admin): Promise<void> {
    const adminIndex = this.items.findIndex((item) => item.id.equals(admin.id));

    this.items.splice(adminIndex, 1);
  }
}
