import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 255, nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ unique: true, length: 4 })
  code: string;

  @Column({ length: 50 })
  created_user: string;

  @Column({ length: 50, nullable: true })
  updated_user: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP', type: 'timestamp' })
  created_date: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    type: 'timestamp',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated_date: Date;

  @Column({ default: true })
  status: boolean;

  @DeleteDateColumn()
  deleted_date: Date;
}
