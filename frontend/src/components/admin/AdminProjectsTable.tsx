import React from 'react';
import { Edit2, Trash2, ExternalLink, Star } from 'lucide-react';
import { Project } from '../../types';
import { Badge } from '../ui/Badge';

interface AdminProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
  onTogglePublished: (project: Project) => void;
}

export const AdminProjectsTable: React.FC<AdminProjectsTableProps> = ({
  projects,
  onEdit,
  onDelete,
  onTogglePublished,
}) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E2D8] bg-[#FBF9F5] text-[10px] font-sans uppercase tracking-[0.2em] text-[#757069]">
              <th className="py-4 px-6">Work / Monograph</th>
              <th className="py-4 px-6">Category</th>
              <th className="py-4 px-6">Location & Specs</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E2D8] text-xs font-sans">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-[#FDFCF9] transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center space-x-3">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-14 h-10 object-cover bg-[#EAE4D7] flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-base font-normal text-[#181716]">
                          {project.title}
                        </span>
                        {project.featured && (
                          <span title="Featured on Homepage" className="text-[#C5A880]">
                            <Star className="w-3.5 h-3.5 fill-current" />
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#757069] line-clamp-1">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <Badge variant="olive" size="sm">
                    {project.category}
                  </Badge>
                </td>

                <td className="py-4 px-6">
                  <p className="text-[#181716] font-medium">{project.location}</p>
                  <p className="text-[#757069] text-[11px]">{project.year} • {project.area}</p>
                </td>

                <td className="py-4 px-6">
                  <button
                    type="button"
                    onClick={() => onTogglePublished(project)}
                    className="focus:outline-none"
                  >
                    <Badge
                      variant={project.published ? 'default' : 'outline'}
                      size="sm"
                    >
                      {project.published ? 'Published' : 'Draft'}
                    </Badge>
                  </button>
                </td>

                <td className="py-4 px-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <a
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#757069] hover:text-[#181716] transition-colors"
                      title="Preview on live site"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      type="button"
                      onClick={() => onEdit(project)}
                      className="p-1.5 text-[#757069] hover:text-[#5D6853] transition-colors"
                      title="Edit project"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove "${project.title}" from archive?`)) {
                          onDelete(project.id);
                        }
                      }}
                      className="p-1.5 text-[#757069] hover:text-red-600 transition-colors"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

