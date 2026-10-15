import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { Badge } from '../ui/Badge';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <article className="group flex flex-col justify-between text-left">
      <Link
        to={`/projects/${project.slug}`}
        className="block relative aspect-[4/3] bg-[#EAE4D7] overflow-hidden mb-5 shadow-sm"
      >
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
        
        <div className="absolute top-3 left-3">
          <Badge variant="charcoal" size="sm">
            {project.category}
          </Badge>
        </div>
      </Link>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-sans text-[#757069]">
          <span>{project.location}</span>
          <span>{project.year} • {project.area}</span>
        </div>

        <h3 className="font-serif text-2xl font-light text-[#181716] group-hover:text-[#5D6853] transition-colors flex items-center justify-between">
          <Link to={`/projects/${project.slug}`}>
            {project.title}
          </Link>
          <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[#5D6853]" />
        </h3>

        <p className="text-xs font-sans text-[#55504A] line-clamp-2 leading-relaxed">
          {project.description}
        </p>

        <div className="pt-2 flex flex-wrap gap-1">
          {project.roomTypes.slice(0, 3).map((room) => (
            <span
              key={room}
              className="text-[10px] font-sans text-[#847262] bg-[#F2EDE4] px-2 py-0.5"
            >
              {room}
            </span>
          ))}
          {project.roomTypes.length > 3 && (
            <span className="text-[10px] font-sans text-[#757069] px-1 py-0.5">
              +{project.roomTypes.length - 3} more
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

