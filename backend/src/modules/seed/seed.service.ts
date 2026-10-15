import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Project } from '../projects/entities/project.entity';
import { Service } from '../services/entities/service.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    @InjectRepository(Service)
    private servicesRepository: Repository<Service>,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.seedAdmin();
      await this.seedProjects();
      await this.seedServices();
    } catch (err) {
      this.logger.warn(`Database seeding notice: ${(err as Error).message}`);
    }
  }

  private async seedAdmin() {
    const adminConfig = this.configService.get('defaultAdmin');
    const email = adminConfig?.email || 'admin@aurelleinteriors.com';
    const password = adminConfig?.password || 'aurelle2026';
    const name = adminConfig?.name || 'Aurelle Executive Director';

    await this.usersService.seedAdminUser(email, password, name);
  }

  private async seedProjects() {
    const count = await this.projectsRepository.count();
    if (count > 0) return;

    this.logger.log('Seeding initial atelier portfolio projects...');

    const initialProjects: Partial<Project>[] = [
      {
        slug: 'the-kensington-maisonette',
        title: 'The Kensington Maisonette',
        roomType: 'Living Room',
        category: 'Residential',
        location: 'Kensington, London',
        year: 2024,
        area: '4,850 sq.ft',
        client: 'Private Family Office',
        shortDescription: 'A Grade II-listed Victorian residence reimagined with hand-hewn French limestone and custom oiled European oak millwork.',
        fullDescription: 'The intervention honors classical moldings while introducing monolithic bronze sliding screens. The culinary studio centers around a fluted Roman travertine monolith, creating an anchor of tactile stillness.',
        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
        ],
        featured: true,
        published: true,
      },
      {
        slug: 'tribeca-cast-iron-loft',
        title: 'Tribeca Cast-Iron Sanctuary',
        roomType: 'Workspace',
        category: 'Residential',
        location: 'Tribeca, New York',
        year: 2024,
        area: '5,600 sq.ft',
        client: 'Private Collector',
        shortDescription: 'An expansive 19th-century mercantile warehouse transformed into a warm, contemplative aerie for modern sculpture.',
        fullDescription: 'We preserved raw 14-foot fluted cast-iron columns while introducing curved lime-wash partitions that gently sculpt the light flowing from eleven arched windows.',
        coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
        ],
        featured: true,
        published: true,
      },
      {
        slug: 'villa-bellagio-lake-como',
        title: 'Villa Bellagio',
        roomType: 'Living Room',
        category: 'Residential',
        location: 'Lake Como, Italy',
        year: 2023,
        area: '8,200 sq.ft',
        client: 'Private Client',
        shortDescription: 'A multi-tiered hillside villa harmonizing Italian rationalism with indigenous Lombardy limestone and panoramic alpine vistas.',
        fullDescription: 'Organized around continuous horizontal sightlines. Seamless indoor-outdoor limestone flooring extends out to cantilevered terraces overlooking the lake.',
        coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80',
        ],
        featured: true,
        published: true,
      },
      {
        slug: 'saint-germain-pied-a-terre',
        title: 'Saint-Germain Pied-à-Terre',
        roomType: 'Bedroom',
        category: 'Residential',
        location: '6th Arrondissement, Paris',
        year: 2023,
        area: '2,800 sq.ft',
        client: 'Diplomatic Client',
        shortDescription: 'Restored Versailles parquet floors meet sculptured lacquer cabinetry and bookmatched Breccia Capraia marble.',
        fullDescription: 'The apartment was meticulously restored down to the gilded boiserie, while the layout was unlocked into an open sequence of interconnected salons.',
        coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
        ],
        featured: true,
        published: true,
      },
      {
        slug: 'kyoto-residence-chado',
        title: 'The Kyoto Chado Pavilion',
        roomType: 'Dining',
        category: 'Residential',
        location: 'Higashiyama, Kyoto',
        year: 2024,
        area: '3,400 sq.ft',
        client: 'Private Foundation',
        shortDescription: 'Sukiya-style architecture harmonized with contemporary living, featuring Japanese Hinoki cypress and tatami suites.',
        fullDescription: 'Custom shoji screens slide into wall pockets to dissolve borders between the central tatami salon and a private maple moss garden.',
        coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
        ],
        featured: false,
        published: true,
      },
      {
        slug: 'aspen-alpine-sanctuary',
        title: 'Aspen Mountain Compound',
        roomType: 'Living Room',
        category: 'Residential',
        location: 'Red Mountain, Aspen, Colorado',
        year: 2023,
        area: '9,400 sq.ft',
        client: 'Private Client',
        shortDescription: 'A ski-in ski-out modernist chalet clad in blackened timber, rough Colorado quartzite, and triple-glazed thermal glass.',
        fullDescription: 'Designed to withstand alpine temperatures while preserving sweeping 360-degree views of the Roaring Fork Valley.',
        coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
        ],
        featured: false,
        published: true,
      },
    ];

    for (const p of initialProjects) {
      const proj = this.projectsRepository.create(p);
      await this.projectsRepository.save(proj);
    }

    this.logger.log(`Seeded ${initialProjects.length} initial projects successfully.`);
  }

  private async seedServices() {
    const count = await this.servicesRepository.count();
    if (count > 0) return;

    this.logger.log('Seeding initial atelier design services...');

    const initialServices: Partial<Service>[] = [
      {
        slug: 'full-interior-architecture',
        title: 'Full Interior Architecture',
        shortDescription: 'Comprehensive structural reconfiguration, spatial orchestration, and permit-ready drawing packages.',
        fullDescription: 'We treat interior spaces as sculptural volumes. Our team coordinates directly with structural engineers and heritage authorities to strip away spatial inefficiencies, maximizing natural daylight, proportional balance, and intuitive flow.',
        features: [
          'Spatial Planning & 3D Volumetric Studies',
          'Technical Construction Drawing Packages',
          'Statutory & Heritage Regulatory Filings',
          'On-site Construction Supervision & Alignment',
        ],
        icon: 'compass',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        startingPrice: 'Starting at $25,000',
        active: true,
      },
      {
        slug: 'bespoke-millwork-joinery',
        title: 'Bespoke Millwork & Material Craft',
        shortDescription: 'Custom cabinetry, artisanal stonework, and proprietary architectural fixtures.',
        fullDescription: 'Nothing off-the-shelf. Every dressing room, culinary island, concealed door, and library mantle is drafted custom by AURELLE and hand-crafted by our partner master joiners in England, Italy, and France.',
        features: [
          'Custom Cabinetry & Wardrobe Suites',
          'Monolithic Stone & Marble Fabrication',
          'Architectural Metalwork & Apertures',
          'Artisanal Slaked Lime & Tadelakt Finishes',
        ],
        icon: 'sparkles',
        image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        startingPrice: 'Starting at $18,000',
        active: true,
      },
      {
        slug: 'curated-ffe-art-advisory',
        title: 'Curated FF&E & Art Advisory',
        shortDescription: 'Rare collectible design, vintage acquisitions, and gallery-level art placement.',
        fullDescription: 'We layer tactile warmth and emotional depth into each residence. Drawing upon an international network of antique dealers, contemporary galleries, and independent textile weavers, we curate a dialogue of timeless heirlooms.',
        features: [
          'Bespoke Furniture & Architectural Lighting',
          'Art Curation, Auction Previews & Acquisition',
          'Artisanal Textiles & Handwoven Rugs',
          'Turnkey Styling & Private Scent Architecture',
        ],
        icon: 'sparkles',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        startingPrice: 'Starting at $15,000',
        active: true,
      },
      {
        slug: 'turnkey-project-management',
        title: 'Turnkey Project Management',
        shortDescription: 'End-to-end execution, fiduciary budget stewardship, and flawless white-glove delivery.',
        fullDescription: 'We act as your dedicated owner representative from groundbreaking to the day we place fresh peonies on your dining table. Experience complete peace of mind through structured milestones, transparent accounting, and single-point accountability.',
        features: [
          'Comprehensive Budget & Cash Flow Planning',
          'Tender Process & Master Contractor Vetting',
          'Program & Multi-Trade Logistics Orchestration',
          'Turnkey Reveal, Deep Cleaning & Digital Archive',
        ],
        icon: 'clock',
        image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        startingPrice: '12% — 18% of Project Scope',
        active: true,
      },
    ];

    for (const s of initialServices) {
      const serv = this.servicesRepository.create(s);
      await this.servicesRepository.save(serv);
    }

    this.logger.log(`Seeded ${initialServices.length} initial services successfully.`);
  }
}

