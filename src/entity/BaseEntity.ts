import { PrimaryGeneratedColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  private id: string;

  public getId(): string {
    return this.id;
  }
}
