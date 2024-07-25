import { Admin } from '@src/domain/people/enterprise/entities/admin';

export interface AdminsRepository {
  findMany(): Promise<Admin[]>;
  findById(id: string): Promise<Admin | null>;
  findByCPF(cpf: string): Promise<Admin | null>;
  create(admin: Admin): Promise<void>;
  save(admin: Admin): Promise<void>;
  delete(admin: Admin): Promise<void>;
}
