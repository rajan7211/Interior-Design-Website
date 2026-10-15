import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './entities/service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async findAll(activeOnly = true): Promise<Service[]> {
    return this.servicesRepository.find({
      where: activeOnly ? { active: true } : {},
      order: { createdAt: 'ASC' },
    });
  }

  async findBySlug(slug: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({ where: { slug } });
    if (!service) {
      throw new NotFoundException(`Service '${slug}' not found`);
    }
    return service;
  }

  async findById(id: string): Promise<Service> {
    const service = await this.servicesRepository.findOne({ where: { id } });
    if (!service) {
      throw new NotFoundException(`Service '${id}' not found`);
    }
    return service;
  }

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    let slug = createServiceDto.slug;
    if (!slug) {
      slug = this.slugify(createServiceDto.title);
      const existing = await this.servicesRepository.findOne({ where: { slug } });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const service = this.servicesRepository.create({
      ...createServiceDto,
      slug,
      features: createServiceDto.features || [],
    });

    return this.servicesRepository.save(service);
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<Service> {
    const service = await this.findById(id);

    if (updateServiceDto.title && !updateServiceDto.slug) {
      const newSlug = this.slugify(updateServiceDto.title);
      const existing = await this.servicesRepository.findOne({ where: { slug: newSlug } });
      if (!existing || existing.id === id) {
        service.slug = newSlug;
      }
    }

    Object.assign(service, updateServiceDto);
    return this.servicesRepository.save(service);
  }

  async remove(id: string): Promise<boolean> {
    const service = await this.findById(id);
    await this.servicesRepository.remove(service);
    return true;
  }
}

