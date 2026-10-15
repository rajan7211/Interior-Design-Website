import { Project, Service, Testimonial, StudioMember, StudioAward, CustomerInquiry, ConsultationAppointment, Hotspot, Article } from '../types';

export const STUDIO_INFO = {
  name: 'AURELLE Interiors',
  tagline: 'Architectural Interiors & Bespoke Atelier',
  foundingYear: 2012,
  statement: 'We curate timeless sanctuaries where quiet architectural proportion, artisanal materials, and natural luminescence converge.',
  offices: [
    {
      city: 'London',
      address: '28 Kensington Church Street, London W8 4EP',
      phone: '+44 (0)20 7946 0812',
      email: 'london@aurelleinteriors.com',
      hours: 'Mon — Fri, 09:00 — 18:00 BST'
    },
    {
      city: 'New York',
      address: '142 Franklin Street, Tribeca, New York, NY 10013',
      phone: '+1 (212) 555-0198',
      email: 'newyork@aurelleinteriors.com',
      hours: 'Mon — Fri, 09:00 — 18:00 EST'
    },
    {
      city: 'Paris',
      address: '17 Rue de Grenelle, 75007 Paris',
      phone: '+33 1 42 68 55 00',
      email: 'paris@aurelleinteriors.com',
      hours: 'Mon — Fri, 09:30 — 18:30 CET'
    }
  ],
  socials: [
    { label: 'Instagram', url: 'https://instagram.com' },
    { label: 'Architectural Digest', url: 'https://architecturaldigest.com' },
    { label: 'Pinterest', url: 'https://pinterest.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' }
  ],
  stats: [
    { label: 'Global Atelier Projects', value: '140+' },
    { label: 'International Design Honors', value: '26' },
    { label: 'Square Metres Realized', value: '85,000' },
    { label: 'Artisanal Guild Collaborators', value: '60+' }
  ]
};

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-01',
    slug: 'the-kensington-maisonette',
    title: 'The Kensington Maisonette',
    subtitle: 'Victorian Restoration & Contemporary Minimalist Wing',
    category: 'Heritage Restoration',
    roomTypes: ['Living Sanctuary', 'Culinary Studio', 'Master Suite', 'Bath & Spa'],
    location: 'Kensington, London',
    year: 2024,
    area: '4,850 sq.ft',
    duration: '18 Months',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'A Grade II-listed Victorian residence reimagined with hand-hewn French limestone, custom oiled European oak millwork, and bespoke bronze apertures that open into a private courtyard garden.',
    architecturalStory: 'The intervention honors the classical 1870s moldings while puncturing the posterior elevation with monolithic bronze sliding glass screens. The culinary studio centers around a solid fluted Roman travertine monolith, creating an anchor of tactile stillness amidst the central London buzz.',
    materials: ['Roman Vein-cut Travertine', 'Fumed European Oak', 'Raw Patinated Bronze', 'Belgian Linen Weaves', 'Hand-applied Microcement'],
    featured: true,
    published: true,
    clientTier: 'Private Family Office'
  },
  {
    id: 'proj-02',
    slug: 'tribeca-cast-iron-loft',
    title: 'Tribeca Cast-Iron Sanctuary',
    subtitle: 'Warm Minimalist Loft in Historic Manhattan',
    category: 'Penthouse & Loft',
    roomTypes: ['Living Sanctuary', 'Culinary Studio', 'Library & Study', 'Master Suite'],
    location: 'Tribeca, New York',
    year: 2024,
    area: '5,600 sq.ft',
    duration: '14 Months',
    coverImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'An expansive 19th-century mercantile warehouse transformed into a warm, contemplative aerie for an international collector of modern sculpture.',
    architecturalStory: 'We preserved the raw 14-foot fluted cast-iron columns while introducing curved lime-wash partitions that gently sculpt the light flowing from eleven original arched windows. Custom floating oak joinery and concealed museum-grade illumination showcase contemporary art without visual clutter.',
    materials: ['Aged White Oak Planks', 'Calacatta Paonazzo Marble', 'Slaked Lime Plaster', 'Burnished Gunmetal', 'Cashmere Upholstery'],
    featured: true,
    published: true,
    clientTier: 'Private Collector'
  },
  {
    id: 'proj-03',
    slug: 'villa-bellagio-lake-como',
    title: 'Villa Bellagio',
    subtitle: 'Lakeside Terraced Retreat & Private Boathouse',
    category: 'Coastal Villa',
    roomTypes: ['Living Sanctuary', 'Outdoor Living', 'Master Suite', 'Bath & Spa'],
    location: 'Lake Como, Italy',
    year: 2023,
    area: '8,200 sq.ft',
    duration: '22 Months',
    coverImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'A multi-tiered hillside villa harmonizing Italian rationalism with indigenous Lombardy limestone and panoramic alpine vistas.',
    architecturalStory: 'Positioned dramatically overlooking Lake Como, Villa Bellagio is organized around continuous horizontal sightlines. Seamless indoor-outdoor limestone flooring extends out to cantilevered terraces, while deep eave overhangs temper the Mediterranean summer glow.',
    materials: ['Moltrasio Local Stone', 'Canaletto Walnut', 'Brushed Brass Accents', 'Custom Terracotta Tiles', 'Natural Raw Linen'],
    featured: true,
    published: true,
    clientTier: 'Private Residential'
  },
  {
    id: 'proj-04',
    slug: 'saint-germain-pied-a-terre',
    title: 'Saint-Germain Pied-à-Terre',
    subtitle: 'Haussmannian Elegance Infused with 1970s Italian Sensibility',
    category: 'Residential Architecture',
    roomTypes: ['Living Sanctuary', 'Culinary Studio', 'Master Suite'],
    location: '6th Arrondissement, Paris',
    year: 2023,
    area: '2,800 sq.ft',
    duration: '11 Months',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'Restored Versailles parquet floors meet sculptured lacquer cabinetry, Pierre Paulin vintage seating, and bookmatched Breccia Capraia marble.',
    architecturalStory: 'The apartment was meticulously restored down to the gilded boiserie, while the layout was unlocked into an open sequence of interconnected salons. Subtle olive and parchment hues create a velvety atmosphere calibrated for evening salon gatherings.',
    materials: ['Point de Hongrie Parquet', 'Breccia Capraia Marble', 'Hand-rubbed Lacquer', 'Pierre Frey Mohair Velvet', 'Antiqued Mirrored Panels'],
    featured: true,
    published: true,
    clientTier: 'Diplomatic Client'
  },
  {
    id: 'proj-05',
    slug: 'kyoto-residence-chado',
    title: 'The Kyoto Chado Pavilion',
    subtitle: 'Sukiya-style Architecture Harmonized with Contemporary Living',
    category: 'Residential Architecture',
    roomTypes: ['Living Sanctuary', 'Library & Study', 'Outdoor Living', 'Bath & Spa'],
    location: 'Higashiyama, Kyoto',
    year: 2024,
    area: '3,400 sq.ft',
    duration: '20 Months',
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'A serene urban retreat constructed in partnership with 15th-generation temple carpenters, framing an ancient moss garden with cedar engawa verandas.',
    architecturalStory: 'Designed according to the principles of Ma (negative space), every joint is hand-mortised without nails. The residence transitions from deep tatami-scented meditative corridors to an open glass tea pavilion cantilevering over reflective koi ponds.',
    materials: ['Japanese Hinoki Cypress', 'Washi Paper Screens', 'Kyoto Juraku Clay Wall Plaster', 'Black Basalt Pavers'],
    featured: false,
    published: true,
    clientTier: 'Cultural Foundation'
  },
  {
    id: 'proj-06',
    slug: 'mayfair-private-atelier',
    title: 'Mayfair Haute Horlogerie Atelier',
    subtitle: 'Private Salon & Commissioning Lounge for Fine Timepieces',
    category: 'Commercial Atelier',
    roomTypes: ['Living Sanctuary', 'Library & Study'],
    location: 'Mayfair, London',
    year: 2023,
    area: '3,100 sq.ft',
    duration: '9 Months',
    coverImage: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80',
      'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=80'
    ],
    description: 'An ultra-exclusive client gallery with acoustic walnut fluting, bespoke saddlery-leather display pods, and climate-stabilized vaulting.',
    architecturalStory: 'The design captures the precision of Swiss watchmaking in an architectural envelope. Integrated microfiber acoustic walls, dark bronze vitrines, and velvet banquettes create an intimate, soundproof haven for private viewings.',
    materials: ['Saddlery Calfskin Leather', 'Smoked European Walnut', 'Antiquated Bronze Mesh', 'Dark Imperial Marble'],
    featured: false,
    published: true,
    clientTier: 'Swiss Luxury Manufacture'
  }
];

export const STUDIO_SERVICES: Service[] = [
  {
    id: 'serv-01',
    slug: 'full-interior-architecture',
    number: '01',
    title: 'Full Interior Architecture',
    tagline: 'Comprehensive structural reconfiguration, spatial orchestration, and permit-ready drawing packages.',
    description: 'We treat interior spaces as sculptural volumes. Our team coordinates directly with structural engineers and heritage authorities to strip away spatial inefficiencies, maximizing natural daylight, proportional balance, and intuitive flow.',
    scopeOverview: 'From concept schematic to building control approvals, our architectural team authors complete technical drawing sets including MEP integration, reflected ceiling plans, and detailed masonry schedules.',
    deliverables: [
      { title: 'Spatial Planning & 3D Volumetric Studies', description: 'CAD layouts and photorealistic CGI architectural renders exploring light and circulation.' },
      { title: 'Technical Drawing Sets', description: 'Full construction packages, partition details, MEP, electrical layouts, and lighting schemes.' },
      { title: 'Statutory & Heritage Filings', description: 'Listed building consents, landlord licenses to alter, and council planning coordination.' },
      { title: 'On-site Construction Supervision', description: 'Weekly contractor walkthroughs, quality inspections, and sub-contractor alignment.' }
    ],
    idealFor: 'Full-scale renovations, historic townhouse conversions, and newly acquired bare-shell residences.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    timeline: '6 — 18 Months'
  },
  {
    id: 'serv-02',
    slug: 'bespoke-millwork-joinery',
    number: '02',
    title: 'Bespoke Millwork & Material Craft',
    tagline: 'Custom cabinetry, artisanal stonework, and proprietary architectural fixtures.',
    description: 'Nothing off-the-shelf. Every dressing room, culinary island, concealed door, and library mantle is drafted custom by AURELLE and hand-crafted by our partner master joiners in England, Italy, and France.',
    scopeOverview: 'We curate rare marbles directly from quarries in Carrara and Verona, hand-select lumber flitches, and engineer precision mechanical pivots for seamless architectural integration.',
    deliverables: [
      { title: 'Custom Cabinetry & Wardrobe Suites', description: 'Tailored dressing rooms with integrated LED lighting, suede lined drawers, and bronze hardware.' },
      { title: 'Monolithic Stone Fabrication', description: 'Full slab selection, bookmatching, carved stone basins, and stone cantilever details.' },
      { title: 'Architectural Metalwork & Apertures', description: 'Hand-patinated bronze screens, pocketing steel glazed dividers, and custom ironmongery.' },
      { title: 'Finish & Texture Sourcing', description: 'Bespoke slaked lime plasters, artisanal tadelakt, and low-VOC mineral coatings.' }
    ],
    idealFor: 'Clients seeking museum-grade joinery and completely personalized functional storage.',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    timeline: '4 — 8 Months'
  },
  {
    id: 'serv-03',
    slug: 'curated-ffe-art-advisory',
    number: '03',
    title: 'Curated FF&E & Art Advisory',
    tagline: 'Rare collectible design, vintage acquisitions, and gallery-level art placement.',
    description: 'We layer tactile warmth and emotional depth into each residence. Drawing upon an international network of antique dealers, contemporary galleries, and independent textile weavers, we curate a dialogue of timeless heirlooms.',
    scopeOverview: 'Our procurement team oversees worldwide shipping, customs clearance, climate-controlled warehousing, white-glove installation, and museum-standard picture hanging.',
    deliverables: [
      { title: 'Bespoke Furniture & Lighting', description: 'Custom sofas, dining tables, and sculptural hand-blown chandeliers scaled to your architecture.' },
      { title: 'Art Curation & Acquisition', description: 'Access to auction previews, primary market gallery sourcing, and conservation framing.' },
      { title: 'Artisanal Textiles & Window Dressings', description: 'Handwoven linens, wool-silk bouclés, motorized sheer drapery, and custom bespoke rugs.' },
      { title: 'Styling & Final Curation', description: 'Rare first-edition books, ceramic vessels, tactile objects, and scent architecture.' }
    ],
    idealFor: 'Complete interior furnishing of high-end residences, vacation estates, and private yachts.',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
    timeline: '3 — 6 Months'
  },
  {
    id: 'serv-04',
    slug: 'turnkey-project-management',
    number: '04',
    title: 'Turnkey Project Management',
    tagline: 'End-to-end execution, fiduciary budget stewardship, and flawless white-glove delivery.',
    description: 'We act as your dedicated owner representative from groundbreaking to the day we place fresh peonies on your dining table. Experience complete peace of mind through structured milestones, transparent accounting, and single-point accountability.',
    scopeOverview: 'Our seasoned project directors oversee general contractors, manage procurement schedules, track budgets against milestones, and coordinate municipal inspections.',
    deliverables: [
      { title: 'Comprehensive Budget & Cash Flow Planning', description: 'Itemized, audited cost schedules with real-time financial tracking.' },
      { title: 'Tender Process & Contractor Selection', description: 'Rigorous vetting and contract negotiation with premier builders and artisans.' },
      { title: 'Program & Logistics Orchestration', description: 'Critical-path scheduling ensuring seamless handoffs between trades.' },
      { title: 'Turnkey Reveal & Handover', description: 'Full home setup, deep cleaning, staff manuals, and digital asset archive.' }
    ],
    idealFor: 'International homeowners and busy executives requiring hands-off, meticulous execution.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    timeline: 'Duration of Entire Project'
  }
];

export const DESIGN_PROCESS_STEPS = [
  {
    step: '01',
    title: 'Dialogue & Discovery',
    phase: 'Week 1 — 3',
    description: 'We begin with an in-depth lifestyle audit, reviewing your daily rituals, aesthetic affinities, and architectural aspirations alongside site surveys and light orientation studies.'
  },
  {
    step: '02',
    title: 'Concept & Spatial Narrative',
    phase: 'Week 4 — 7',
    description: 'We present physical material mood trays, volumetric sketches, and spatial flow diagrams, refining the sensory atmosphere and architectural language until aligned with your vision.'
  },
  {
    step: '03',
    title: 'Detail Design & Craftsmanship',
    phase: 'Week 8 — 14',
    description: 'Our studio generates comprehensive millwork blueprints, lighting schematics, and stone specifications, commissioning bespoke artisanal pieces and contractor tenders.'
  },
  {
    step: '04',
    title: 'Execution & Turnkey Reveal',
    phase: 'Build Phase',
    description: 'We supervise construction with obsessive rigor. Final installation concludes with white-glove styling, artwork mounting, and the presentation of your complete turnkey sanctuary.'
  }
];

export const STUDIO_TEAM: StudioMember[] = [
  {
    id: 'team-01',
    name: 'Eleanor Vance',
    role: 'Founder & Principal Creative Director',
    credentials: 'AA Dipl. (Hons), RIBA Associate',
    bio: 'Educated at the Architectural Association in London, Eleanor spent a decade collaborating with leading Milanese ateliers before founding AURELLE in 2012. Her work is celebrated for its quiet spatial restraint and tactile honesty.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'team-02',
    name: 'Julian Montgomery',
    role: 'Partner & Head of Architecture',
    credentials: 'M.Arch Harvard GSD, AIA',
    bio: 'Julian leads structural interventions and heritage conversions across London and New York. His engineering precision ensures that bold contemporary gestures respect historic architectural fabrics.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'team-03',
    name: 'Sophie de La Tour',
    role: 'Director of FF&E and Art Curation',
    credentials: 'École du Louvre, Paris',
    bio: 'With an extensive background in French decorative arts and 20th-century design auctions, Sophie scours antique markets and global art fairs to assemble deeply personal interiors.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    quote: 'AURELLE brought an extraordinary sense of calm to our Kensington home. Their ability to balance Victorian heritage with clean modern light exceeded every expectation we had.',
    clientName: 'Lord & Lady Harrington',
    projectType: 'Heritage Townhouse Restoration',
    location: 'Kensington, London',
    year: 2024
  },
  {
    id: 'test-02',
    quote: 'The level of craftsmanship in the custom travertine island and bronze millwork is museum-grade. Eleanor and Julian have created an enduring masterpiece for our family.',
    clientName: 'Marcus & Céline Sterling',
    projectType: 'Tribeca Cast-Iron Loft',
    location: 'Tribeca, New York',
    year: 2024
  },
  {
    id: 'test-03',
    quote: 'Living in Villa Bellagio feels like residing inside an Italian sculpture garden. The team’s project management was disciplined, transparent, and flawless.',
    clientName: 'Alessandro Rossi',
    projectType: 'Private Lakeside Villa',
    location: 'Lake Como, Italy',
    year: 2023
  }
];

export const STUDIO_AWARDS: StudioAward[] = [
  { year: 2024, title: 'Architectural Digest AD100', organization: 'Condé Nast International', category: 'Best Global Interior Studio' },
  { year: 2023, title: 'Heritage Architecture Award of Excellence', organization: 'British Institute of Interior Design (BIID)', category: 'Historic Residential Restoration' },
  { year: 2022, title: 'International Design & Architecture Award', organization: 'design et al', category: 'Lakeside Residence of the Year' },
  { year: 2021, title: 'Prix Versailles Special Prize', organization: 'UNESCO & International Union of Architects', category: 'Commercial Atelier Interior' }
];

export const INITIAL_INQUIRIES: CustomerInquiry[] = [
  {
    id: 'inq-01',
    fullName: 'Charlotte Cavendish',
    email: 'charlotte.cavendish@luxuryestate.co.uk',
    phone: '+44 7700 900142',
    projectType: 'Full Townhouse Architecture & FF&E',
    location: 'Mayfair, London',
    timeline: '6 — 9 Months',
    budgetRange: '£500,000 — £1,200,000',
    message: 'We have recently acquired a Georgian terrace in Mayfair. We want to restore original cornicing while introducing a minimal kitchen pavilion and master suite.',
    createdAt: '2026-10-10T11:30:00Z',
    status: 'Reviewed',
    notes: 'High priority. Schedule preliminary video discovery with Eleanor.'
  },
  {
    id: 'inq-02',
    fullName: 'David & Sarah Chen',
    email: 'd.chen@chenpartners.com',
    phone: '+1 (917) 555-8834',
    projectType: 'Penthouse Renovation',
    location: 'Central Park West, New York',
    timeline: '12 — 18 Months',
    budgetRange: '$1,500,000 — $3,000,000',
    message: 'Looking for a complete gut renovation of our duplex penthouse overlooking Central Park. We love your Tribeca loft work.',
    createdAt: '2026-10-12T14:15:00Z',
    status: 'New'
  },
  {
    id: 'inq-03',
    fullName: 'Baroness Helena von Berg',
    email: 'helena@vonberg-art.ch',
    phone: '+41 22 555 4321',
    projectType: 'Lakefront Estate Modernization',
    location: 'Geneva / Montreux, Switzerland',
    timeline: 'Immediate (Within 3 Months)',
    budgetRange: 'CHF 2,000,000+',
    message: 'Seeking turnkey design and art advisory for our private lakeside residence.',
    createdAt: '2026-10-13T09:45:00Z',
    status: 'Scheduled',
    notes: 'In-person meeting confirmed for Geneva studio visit next month.'
  }
];

export const INITIAL_APPOINTMENTS: ConsultationAppointment[] = [
  {
    id: 'apt-01',
    fullName: 'Alexander Beaumont',
    email: 'alexander@beaumontcap.com',
    phone: '+44 7911 123456',
    propertyLocation: 'Holland Park, London',
    serviceInterest: 'Full Interior Architecture',
    propertyType: 'Detached Victorian Villa',
    estimatedSquareFootage: '6,200 sq.ft',
    budgetBracket: '£750,000 — £1,500,000',
    preferredDate: '2026-10-24',
    preferredTimeSlot: '11:00 AM — 12:00 PM BST',
    notesAndVision: 'Interested in full spatial reconfiguration with bespoke basement wellness suite.',
    createdAt: '2026-10-12T16:00:00Z',
    status: 'Confirmed',
    meetingLink: 'https://meet.google.com/aur-kns-lon'
  },
  {
    id: 'apt-02',
    fullName: 'Victoria Sterling-Vaux',
    email: 'victoria@vaux-estates.com',
    phone: '+1 (310) 555-9012',
    propertyLocation: 'Bel Air, Los Angeles',
    serviceInterest: 'Curated FF&E & Art Advisory',
    propertyType: 'Modern Hillside Estate',
    estimatedSquareFootage: '9,500 sq.ft',
    budgetBracket: '$2,000,000+',
    preferredDate: '2026-10-28',
    preferredTimeSlot: '02:00 PM — 03:00 PM EST',
    notesAndVision: 'Need collectible design furnishings and custom lighting plan for new architectural build.',
    createdAt: '2026-10-13T10:20:00Z',
    status: 'Pending'
  }
];

/* =========================================================================
   Maisoné / Dribbble Design Reference Mock Datasets
   ========================================================================= */

export const FEATURED_PRODUCTS = [
  {
    id: 'prod-01',
    title: 'Billow Sofa',
    price: '₹84,999',
    category: 'Living Room',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    badge: 'Popular'
  },
  {
    id: 'prod-02',
    title: 'Minimalist Stool',
    price: '₹21,500',
    category: 'Dining & Kitchen',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-03',
    title: 'Eura Bar Chair',
    price: '₹42,500',
    category: 'Bar & Lounge',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'prod-04',
    title: 'Lamp Stand',
    price: '₹34,000',
    category: 'Lighting',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80'
  }
];

export const ROOM_CATEGORIES = [
  {
    id: 'rc-1',
    title: 'Living Room',
    description: 'Comfort-focused designs with modern character.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    slug: 'living'
  },
  {
    id: 'rc-2',
    title: 'Bedroom',
    description: 'Calm, easy and thoughtfully crafted interiors.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    slug: 'bedroom'
  },
  {
    id: 'rc-3',
    title: 'Workspace',
    description: 'Functional designs that inspire productivity.',
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    slug: 'workspace'
  },
  {
    id: 'rc-4',
    title: 'Kitchen',
    description: 'Clean, practical, and beautifully balanced pieces.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    slug: 'kitchen'
  }
];

export const NUMBERED_ROOM_ACCORDION = [
  {
    number: '01',
    name: 'Living',
    description: 'Designed for comfort and style that elevate everyday living, creating spaces that feel warm, functional, and beautifully timeless.',
    count: '105 Products',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    number: '02',
    name: 'Dining',
    description: 'Beautifully crafted pieces designed for shared moments and meaningful gatherings, with style and warmth into every space.',
    count: '115 Products',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    number: '03',
    name: 'Sleeping',
    description: 'Calm, cozy bedroom furniture thoughtfully designed with elegant detailing, soft textures, and balanced proportions to create a peaceful retreat, each piece lends comfort and sophistication, enhancing relaxation while adding timeless character, subtle luxury, and a warm, inviting atmosphere to your personal living space.',
    count: '98 Products',
    images: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    number: '04',
    name: 'Outdoor',
    description: 'Strong, stylish furniture crafted for open-air comfort, designed to endure outdoor conditions while enhancing modern living.',
    count: '71 Products',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    number: '05',
    name: 'Lighting',
    description: 'Carefully curated lighting designed to create the right atmosphere, enhancing mood, warmth, harmony throughout every space.',
    count: '35 Products',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1600&q=85'
    ]
  }
];

export const HOTSPOT_ITEMS: Hotspot[] = [
  {
    id: 'hs-1',
    title: 'Autumn Birch Framed Canvas',
    subtitle: 'Limited Artist Edition',
    price: '₹38,500',
    x: 56,
    y: 28,
  },
  {
    id: 'hs-2',
    title: 'Ceramic Planter & Fiddle Fig',
    subtitle: 'Botanical Curation',
    price: '₹10,500',
    x: 32,
    y: 52,
  },
  {
    id: 'hs-3',
    title: 'Nara Mustard Lounge Chair',
    subtitle: 'Italian Bouclé & Beech',
    price: '₹76,000',
    x: 75,
    y: 72,
  }
];

export const LATEST_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Ultimate Guide to Choosing Furniture for Your Home',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80',
    readTime: '5 min read',
    category: 'Design Guide'
  },
  {
    id: 'art-2',
    title: 'Minimal Furniture Guide: Form Meets Function',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    readTime: '4 min read',
    category: 'Styling'
  },
  {
    id: 'art-3',
    title: 'Designing Dreams: Creating Art-Inspired Interiors',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    readTime: '6 min read',
    category: 'Inspiration'
  },
  {
    id: 'art-4',
    title: 'Smart Living: Furniture That Fits Modern Lifestyles',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    readTime: '3 min read',
    category: 'Lifestyle'
  }
];

export const MAIN_TESTIMONIAL = {
  quote: 'Working with this team was an absolute pleasure from start to finish. They truly understood our vision and transformed our home into a beautifully designed space that perfectly reflects our personality, lifestyle, and everyday needs. Exceeding expectations with creativity, care, and attention to detail.',
  author: 'Sarah John',
  role: 'Entrepreneur',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80'
};


