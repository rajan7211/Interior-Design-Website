import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ default: 'Living Room' })
  roomType: string;

  @Column({ default: 'Residential' })
  category: string;

  @Column()
  location: string;

  @Column({ type: 'int', default: 2026 })
  year: number;

  @Column({ default: '3,800 sq.ft' })
  area: string;

  @Column({ default: 'Private Commission' })
  client: string;

  @Column({ type: 'text', nullable: true })
  shortDescription: string;

  @Column({ type: 'text' })
  fullDescription: string;

  @Column()
  coverImage: string;

  @Column('simple-array')
  gallery: string[];

  @Column({ default: false })
  featured: boolean;

  @Column({ default: true })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

