import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AppointmentStatus } from '../../../common/enums/status.enum';

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ default: 'Not specified' })
  location: string;

  @Column({ default: 'Entire Residence' })
  roomType: string;

  @Column({ default: '$50,000 - $100,000' })
  budget: string;

  @Column({ nullable: true })
  preferredDate: string;

  @Column({ default: 'Morning (10:00 AM - 1:00 PM)' })
  preferredTime: string;

  @Column({ type: 'text', nullable: true })
  requirements: string;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @Column({ nullable: true })
  meetingLink: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

