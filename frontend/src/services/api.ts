import axios from 'axios';
import { 
  Project, 
  Service, 
  InquiryFormData, 
  CustomerInquiry, 
  ConsultationFormData, 
  ConsultationAppointment, 
  InquiryStatus, 
  AppointmentStatus 
} from '../types';
import { 
  INITIAL_PROJECTS, 
  STUDIO_SERVICES, 
  INITIAL_INQUIRIES, 
  INITIAL_APPOINTMENTS 
} from '../data/mockData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'; // default to true until NestJS is running

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('aurelle_admin_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Local storage keys for stateful mock persistence
const STORAGE_KEYS = {
  PROJECTS: 'aurelle_mock_projects',
  INQUIRIES: 'aurelle_mock_inquiries',
  APPOINTMENTS: 'aurelle_mock_appointments',
  SERVICES: 'aurelle_mock_services',
};

const getStored = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
};

// Seed storage initially if empty
if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
  setStored(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
}
if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
  setStored(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
}
if (!localStorage.getItem(STORAGE_KEYS.APPOINTMENTS)) {
  setStored(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
}
if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
  setStored(STORAGE_KEYS.SERVICES, STUDIO_SERVICES);
}

export const projectService = {
  async getAll(): Promise<Project[]> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 150));
      return getStored<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    }
    const res = await apiClient.get<Project[]>('/projects');
    return res.data;
  },

  async getBySlug(slug: string): Promise<Project | null> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 100));
      const list = getStored<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
      return list.find((p) => p.slug === slug) || null;
    }
    const res = await apiClient.get<Project>(`/projects/slug/${slug}`);
    return res.data;
  },

  async create(projectData: Omit<Project, 'id'>): Promise<Project> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      const list = getStored<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
      const newProj: Project = {
        ...projectData,
        id: `proj-${Date.now().toString().slice(-4)}`,
      };
      setStored(STORAGE_KEYS.PROJECTS, [newProj, ...list]);
      return newProj;
    }
    const res = await apiClient.post<Project>('/projects', projectData);
    return res.data;
  },

  async update(id: string, updates: Partial<Project>): Promise<Project> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      const list = getStored<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
      const index = list.findIndex((p) => p.id === id);
      if (index === -1) throw new Error('Project not found');
      const updated = { ...list[index], ...updates };
      list[index] = updated;
      setStored(STORAGE_KEYS.PROJECTS, list);
      return updated;
    }
    const res = await apiClient.patch<Project>(`/projects/${id}`, updates);
    return res.data;
  },

  async delete(id: string): Promise<boolean> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 200));
      const list = getStored<Project[]>(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
      const filtered = list.filter((p) => p.id !== id);
      setStored(STORAGE_KEYS.PROJECTS, filtered);
      return true;
    }
    await apiClient.delete(`/projects/${id}`);
    return true;
  },
};

export const serviceService = {
  async getAll(): Promise<Service[]> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 100));
      return getStored<Service[]>(STORAGE_KEYS.SERVICES, STUDIO_SERVICES);
    }
    const res = await apiClient.get<Service[]>('/services');
    return res.data;
  },

  async getBySlug(slug: string): Promise<Service | null> {
    if (USE_MOCK) {
      const list = getStored<Service[]>(STORAGE_KEYS.SERVICES, STUDIO_SERVICES);
      return list.find((s) => s.slug === slug) || null;
    }
    const res = await apiClient.get<Service>(`/services/slug/${slug}`);
    return res.data;
  },
};

export const inquiryService = {
  async create(data: InquiryFormData): Promise<CustomerInquiry> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 350));
      const list = getStored<CustomerInquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
      const newInq: CustomerInquiry = {
        ...data,
        id: `inq-${Date.now().toString().slice(-4)}`,
        createdAt: new Date().toISOString(),
        status: 'New',
      };
      setStored(STORAGE_KEYS.INQUIRIES, [newInq, ...list]);
      return newInq;
    }
    const res = await apiClient.post<CustomerInquiry>('/inquiries', data);
    return res.data;
  },

  async getAll(): Promise<CustomerInquiry[]> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 150));
      return getStored<CustomerInquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
    }
    const res = await apiClient.get<CustomerInquiry[]>('/inquiries');
    return res.data;
  },

  async updateStatus(id: string, status: InquiryStatus, notes?: string): Promise<CustomerInquiry> {
    if (USE_MOCK) {
      const list = getStored<CustomerInquiry[]>(STORAGE_KEYS.INQUIRIES, INITIAL_INQUIRIES);
      const item = list.find((i) => i.id === id);
      if (!item) throw new Error('Inquiry not found');
      item.status = status;
      if (notes !== undefined) item.notes = notes;
      setStored(STORAGE_KEYS.INQUIRIES, [...list]);
      return item;
    }
    const res = await apiClient.patch<CustomerInquiry>(`/inquiries/${id}/status`, { status, notes });
    return res.data;
  },
};

export const consultationService = {
  async create(data: ConsultationFormData): Promise<ConsultationAppointment> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      const list = getStored<ConsultationAppointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
      const newApt: ConsultationAppointment = {
        ...data,
        id: `apt-${Date.now().toString().slice(-4)}`,
        createdAt: new Date().toISOString(),
        status: 'Pending',
      };
      setStored(STORAGE_KEYS.APPOINTMENTS, [newApt, ...list]);
      return newApt;
    }
    const res = await apiClient.post<ConsultationAppointment>('/appointments', data);
    return res.data;
  },

  async getAll(): Promise<ConsultationAppointment[]> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 150));
      return getStored<ConsultationAppointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
    }
    const res = await apiClient.get<ConsultationAppointment[]>('/appointments');
    return res.data;
  },

  async updateStatus(id: string, status: AppointmentStatus, meetingLink?: string): Promise<ConsultationAppointment> {
    if (USE_MOCK) {
      const list = getStored<ConsultationAppointment[]>(STORAGE_KEYS.APPOINTMENTS, INITIAL_APPOINTMENTS);
      const item = list.find((a) => a.id === id);
      if (!item) throw new Error('Appointment not found');
      item.status = status;
      if (meetingLink !== undefined) item.meetingLink = meetingLink;
      setStored(STORAGE_KEYS.APPOINTMENTS, [...list]);
      return item;
    }
    const res = await apiClient.patch<ConsultationAppointment>(`/appointments/${id}/status`, { status, meetingLink });
    return res.data;
  },
};

export const authService = {
  async login(email: string, pass: string): Promise<{ token: string; user: { id: string; email: string; name: string; role: string } }> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 300));
      if (email.trim() && pass.length >= 6) {
        return {
          token: 'mock_jwt_token_aurelle_admin',
          user: {
            id: 'mock-admin-id',
            email: email.trim(),
            name: 'Principal Director',
            role: 'admin',
          },
        };
      }
      throw new Error('Invalid email or password');
    }
    const res = await apiClient.post<{ token: string; user: { id: string; email: string; name: string; role: string } }>('/auth/login', {
      email,
      password: pass,
    });
    return res.data;
  },

  async getProfile(): Promise<{ id: string; email: string; name: string; role: string }> {
    if (USE_MOCK) {
      const stored = localStorage.getItem('aurelle_admin_user');
      return stored ? JSON.parse(stored) : { id: 'mock-admin', email: 'admin@aurelleinteriors.com', name: 'Principal Director', role: 'admin' };
    }
    const res = await apiClient.get<{ id: string; email: string; name: string; role: string }>('/auth/me');
    return res.data;
  },

  logout() {
    localStorage.removeItem('aurelle_admin_token');
    localStorage.removeItem('aurelle_admin_user');
  },
};

export const uploadService = {
  async uploadImage(file: File): Promise<{ url: string; publicId: string; originalName: string }> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      // Return a beautiful object URL for mock preview
      const objectUrl = URL.createObjectURL(file);
      return {
        url: objectUrl,
        publicId: `mock-img-${Date.now()}`,
        originalName: file.name,
      };
    }
    const formData = new FormData();
    formData.append('file', file);
    const res = await apiClient.post<{ url: string; publicId: string; originalName: string }>('/uploads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
};

