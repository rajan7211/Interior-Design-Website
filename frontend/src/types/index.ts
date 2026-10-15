export type ProjectCategory = 
  | 'All'
  | 'Residential Architecture' 
  | 'Penthouse & Loft' 
  | 'Coastal Villa' 
  | 'Heritage Restoration' 
  | 'Commercial Atelier';

export type RoomType = 
  | 'All' 
  | 'Living Sanctuary' 
  | 'Culinary Studio' 
  | 'Master Suite' 
  | 'Bath & Spa' 
  | 'Library & Study' 
  | 'Outdoor Living';

export interface ProjectImage {
  id: string;
  url: string;
  caption?: string;
  isCover?: boolean;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  roomTypes: RoomType[];
  location: string;
  year: number;
  area: string;
  duration: string;
  coverImage: string;
  gallery: string[];
  description: string;
  architecturalStory: string;
  materials: string[];
  featured: boolean;
  published: boolean;
  clientTier?: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface Service {
  id: string;
  slug: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  scopeOverview: string;
  deliverables: ServiceDeliverable[];
  idealFor: string;
  image: string;
  timeline: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  projectType: string;
  location: string;
  year: number;
  rating?: number;
  avatar?: string;
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  timeline: string;
  budgetRange: string;
  message: string;
}

export type InquiryStatus = 'New' | 'Reviewed' | 'Contacted' | 'Scheduled' | 'Archived';

export interface CustomerInquiry extends InquiryFormData {
  id: string;
  createdAt: string;
  status: InquiryStatus;
  notes?: string;
}

export interface ConsultationFormData {
  fullName: string;
  email: string;
  phone: string;
  propertyLocation: string;
  serviceInterest: string;
  propertyType: string;
  estimatedSquareFootage: string;
  budgetBracket: string;
  preferredDate: string;
  preferredTimeSlot: string;
  notesAndVision: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Rescheduled' | 'Completed' | 'Cancelled';

export interface ConsultationAppointment extends ConsultationFormData {
  id: string;
  createdAt: string;
  status: AppointmentStatus;
  meetingLink?: string;
}

export interface StudioMember {
  id: string;
  name: string;
  role: string;
  credentials: string;
  bio: string;
  image: string;
}

export interface StudioAward {
  year: number;
  title: string;
  organization: string;
  category: string;
}

/* Maisoné / Dribbble Reference Extensions */
export interface FurnitureProduct {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
  badge?: string;
}

export interface Article {
  id: string;
  title: string;
  image: string;
  readTime: string;
  category: string;
}

export interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  x: number; // percentage from left
  y: number; // percentage from top
  image?: string;
}
