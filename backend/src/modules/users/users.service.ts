import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '../../common/enums/role.enum';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email: email.toLowerCase().trim() },
    });
  }

  async findById(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);

    const user = this.usersRepository.create({
      email: createUserDto.email.toLowerCase().trim(),
      password: hashedPassword,
      name: createUserDto.name,
      role: createUserDto.role || Role.ADMIN,
    });

    return this.usersRepository.save(user);
  }

  async seedAdminUser(email: string, pass: string, name: string): Promise<User> {
    const cleanEmail = email.toLowerCase().trim();
    const existing = await this.findByEmail(cleanEmail);
    if (existing) {
      return existing;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);

    const admin = this.usersRepository.create({
      email: cleanEmail,
      password: hashedPassword,
      name,
      role: Role.ADMIN,
    });

    const saved = await this.usersRepository.save(admin);
    this.logger.log(`Default administrator seeded successfully: ${saved.email}`);
    return saved;
  }
}

