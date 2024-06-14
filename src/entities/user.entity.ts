import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // Auto-generated primary key
  @PrimaryGeneratedColumn()
  id: number;

  // User's name
  @Column()
  name: string;

  // User's email address
  @Column()
  email: string;

  // User's phone number
  @Column()
  phoneNumber: string;

  // User's address
  @Column()
  address: string;
}
