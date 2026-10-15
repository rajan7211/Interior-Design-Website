import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('services')
export class Service {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: 'text' })
  shortDescription: string;

  @Column({ type: 'text' })
  fullDescription: string;

  @Column('simple-array')
  features: string[];

  @Column({ default: 'compass' })
  icon: string;

  @Column()
  image: string;

  @Column({ default: 'By Atelier Proposal' })
  startingPrice: string;

  @Column({ default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

