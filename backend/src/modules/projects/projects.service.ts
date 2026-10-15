import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  private slugify(title: string): string {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  async findAll(query?: {
    roomType?: string;
    category?: string;
    featured?: string;
    publishedOnly?: boolean;
  }): Promise<Project[]> {
    const qb = this.projectsRepository.createQueryBuilder('project');

    if (query?.publishedOnly !== false) {
      qb.where('project.published = :published', { published: true });
    }

    if (query?.roomType && query.roomType !== 'All') {
      qb.andWhere('LOWER(project.roomType) = LOWER(:roomType)', {
        roomType: query.roomType,
      });
    }

    if (query?.category && query.category !== 'All') {
      qb.andWhere('LOWER(project.category) = LOWER(:category)', {
        category: query.category,
      });
    }

    if (query?.featured === 'true') {
      qb.andWhere('project.featured = :featured', { featured: true });
    }

    qb.orderBy('project.createdAt', 'DESC');
    return qb.getMany();
  }

  async findBySlug(slug: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { slug } });
    if (!project) {
      throw new NotFoundException(`Project with slug '${slug}' not found`);
    }
    return project;
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with id '${id}' not found`);
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    let slug = createProjectDto.slug;
    if (!slug) {
      slug = this.slugify(createProjectDto.title);
      // Ensure unique slug
      const existing = await this.projectsRepository.findOne({ where: { slug } });
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    const project = this.projectsRepository.create({
      ...createProjectDto,
      slug,
      gallery: createProjectDto.gallery || [createProjectDto.coverImage],
    });

    return this.projectsRepository.save(project);
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.findById(id);

    if (updateProjectDto.title && !updateProjectDto.slug) {
      const newSlug = this.slugify(updateProjectDto.title);
      const existing = await this.projectsRepository.findOne({ where: { slug: newSlug } });
      if (!existing || existing.id === id) {
        project.slug = newSlug;
      }
    }

    Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(project);
  }

  async remove(id: string): Promise<boolean> {
    const project = await this.findById(id);
    await this.projectsRepository.remove(project);
    return true;
  }
}

