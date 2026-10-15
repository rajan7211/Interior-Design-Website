import React, { useState, useEffect } from 'react';
import { Project, ProjectCategory, RoomType } from '../../types';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Upload, Loader2 } from 'lucide-react';
import { uploadService } from '../../services/api';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (projectData: Omit<Project, 'id'>) => Promise<void>;
  initialData?: Project | null;
}

const CATEGORIES: ProjectCategory[] = [
  'Residential Architecture',
  'Penthouse & Loft',
  'Coastal Villa',
  'Heritage Restoration',
  'Commercial Atelier',
];

const ROOM_OPTIONS: RoomType[] = [
  'Living Sanctuary',
  'Culinary Studio',
  'Master Suite',
  'Bath & Spa',
  'Library & Study',
  'Outdoor Living',
];

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    slug: '',
    title: '',
    subtitle: '',
    category: 'Residential Architecture',
    roomTypes: ['Living Sanctuary'],
    location: '',
    year: new Date().getFullYear(),
    area: '',
    duration: '',
    coverImage: '',
    gallery: [],
    description: '',
    architecturalStory: '',
    materials: [],
    featured: false,
    published: true,
  });

  const [galleryInput, setGalleryInput] = useState('');
  const [materialsInput, setMaterialsInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const res = await uploadService.uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        coverImage: res.url,
      }));
      setGalleryInput((prev) => (prev.trim() ? `${prev}\n${res.url}` : res.url));
    } catch (err) {
      console.error('Image upload failed:', err);
    } finally {
      setUploadingImage(false);
    }
  };

  useEffect(() => {
    if (initialData) {
      setFormData({
        slug: initialData.slug,
        title: initialData.title,
        subtitle: initialData.subtitle,
        category: initialData.category,
        roomTypes: initialData.roomTypes,
        location: initialData.location,
        year: initialData.year,
        area: initialData.area,
        duration: initialData.duration,
        coverImage: initialData.coverImage,
        gallery: initialData.gallery,
        description: initialData.description,
        architecturalStory: initialData.architecturalStory,
        materials: initialData.materials,
        featured: initialData.featured,
        published: initialData.published,
      });
      setGalleryInput(initialData.gallery.join('\n'));
      setMaterialsInput(initialData.materials.join(', '));
    } else {
      setFormData({
        slug: '',
        title: '',
        subtitle: '',
        category: 'Residential Architecture',
        roomTypes: ['Living Sanctuary'],
        location: '',
        year: new Date().getFullYear(),
        area: '3,500 sq.ft',
        duration: '12 Months',
        coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
        gallery: [
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
          'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80'
        ],
        description: '',
        architecturalStory: '',
        materials: ['French Limestone', 'Fumed Oak', 'Patinated Bronze'],
        featured: false,
        published: true,
      });
      setGalleryInput('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80\nhttps://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80');
      setMaterialsInput('French Limestone, Fumed Oak, Patinated Bronze');
    }
  }, [initialData, isOpen]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    setFormData((prev) => ({
      ...prev,
      title,
      slug: initialData ? prev.slug : slug,
    }));
  };

  const handleRoomToggle = (room: RoomType) => {
    setFormData((prev) => {
      const exists = prev.roomTypes.includes(room);
      return {
        ...prev,
        roomTypes: exists
          ? prev.roomTypes.filter((r) => r !== room)
          : [...prev.roomTypes, room],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const gallery = galleryInput
        .split('\n')
        .map((url) => url.trim())
        .filter(Boolean);
      const materials = materialsInput
        .split(',')
        .map((m) => m.trim())
        .filter(Boolean);

      await onSubmit({
        ...formData,
        gallery: gallery.length ? gallery : [formData.coverImage],
        materials: materials.length ? materials : ['Artisanal Limestone'],
      });
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Architectural Project' : 'Commission New Project'}
      subtitle="Atelier Archives Management"
      maxWidth="2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Project Title"
            required
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="e.g. The Kensington Maisonette"
          />
          <Input
            label="Slug Identifier"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="the-kensington-maisonette"
          />
        </div>

        <Input
          label="Subtitle / Design Concept"
          required
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          placeholder="Victorian Restoration & Contemporary Minimalist Wing"
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
            options={CATEGORIES.map((c) => ({ value: c, label: c }))}
          />
          <Input
            label="Location"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Mayfair, London"
          />
          <Input
            label="Year of Completion"
            type="number"
            required
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) || 2024 })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Area (Square Footage)"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
            placeholder="4,850 sq.ft"
          />
          <Input
            label="Project Timeline"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            placeholder="16 Months"
          />
        </div>

        <div>
          <label className="block text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-[#3D3934] mb-2">
            Spatial Rooms
          </label>
          <div className="flex flex-wrap gap-2">
            {ROOM_OPTIONS.map((room) => {
              const active = formData.roomTypes.includes(room);
              return (
                <button
                  key={room}
                  type="button"
                  onClick={() => handleRoomToggle(room)}
                  className={`px-3 py-1 text-xs font-sans border transition-colors ${
                    active
                      ? 'bg-[#181716] text-[#FBF9F5] border-[#181716]'
                      : 'bg-[#FFFFFF] text-[#55504A] border-[#E7E2D8] hover:border-[#181716]'
                  }`}
                >
                  {room}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-[#3D3934]">
              Primary Cover Image
            </label>
            <div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="inline-flex items-center gap-1.5 text-xs font-sans text-[#E05A2B] hover:text-[#C8481D] font-medium transition-colors"
              >
                {uploadingImage ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </>
                )}
              </button>
            </div>
          </div>
          <Input
            required
            value={formData.coverImage}
            onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
            placeholder="https://images.unsplash.com/... or upload above"
          />
        </div>

        <Textarea
          label="Gallery Images (One URL per line)"
          rows={3}
          value={galleryInput}
          onChange={(e) => setGalleryInput(e.target.value)}
          placeholder="https://images.unsplash.com/image-1\nhttps://images.unsplash.com/image-2"
        />

        <Textarea
          label="Executive Description"
          required
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Overview of spatial intervention, historical context, and architectural volumes..."
        />

        <Textarea
          label="Architectural Story / Monograph"
          rows={3}
          value={formData.architecturalStory}
          onChange={(e) => setFormData({ ...formData, architecturalStory: e.target.value })}
          placeholder="Deep dive into spatial flow, craftsmanship, engineering milestones, and custom fixtures..."
        />

        <Input
          label="Tactile Materials (Comma-separated)"
          value={materialsInput}
          onChange={(e) => setMaterialsInput(e.target.value)}
          placeholder="Roman Travertine, Fumed Oak, Slaked Lime Plaster"
        />

        <div className="flex items-center space-x-6 pt-2">
          <label className="flex items-center space-x-2 text-xs font-sans text-[#181716] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
              className="w-4 h-4 text-[#5D6853] focus:ring-[#5D6853] border-[#E7E2D8]"
            />
            <span>Feature on Studio Homepage</span>
          </label>

          <label className="flex items-center space-x-2 text-xs font-sans text-[#181716] cursor-pointer">
            <input
              type="checkbox"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 text-[#5D6853] focus:ring-[#5D6853] border-[#E7E2D8]"
            />
            <span>Published in Public Archives</span>
          </label>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-[#E7E2D8]">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={isSubmitting}>
            {initialData ? 'Save Changes' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

