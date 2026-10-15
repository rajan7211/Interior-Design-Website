import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InquiryStatus } from '../../../common/enums/status.enum';

@Entity('inquiries')
export class Inquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ default: 'General Atelier Inquiry' })
  subject: string;

  @Column({ type: 'text' })
  message: string;

  @Column({
    type: 'enum',
    enum: InquiryStatus,
    default: InquiryStatus.NEW,
  })
  status: InquiryStatus;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

