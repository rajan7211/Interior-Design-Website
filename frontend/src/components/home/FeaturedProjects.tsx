import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '../../types';
import { Badge } from '../ui/Badge';

interface FeaturedProjectsProps {
  projects: Project[];
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <section id="explore-section" className="w-full bg-[#F2EDE4] py-16 sm:py-24 border-t border-[#E4DCD0] overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="space-y-2">
            <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#181716]">
              Selected Architectural Commissions
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] text-[#181716] hover:text-[#5D6853] transition-colors border-b border-[#181716] pb-1 w-fit"
          >
            <span>View All Works ({projects.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* Asymmetrical Project Showcase */}
        <div className="space-y-16 sm:space-y-24">
          {featured.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={project.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center`}
              >
                {/* Image Column */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <Link
                    to={`/projects/${project.slug}`}
                    className="block group overflow-hidden bg-[#E2DBD0] aspect-[16/10] relative shadow-sm"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                  </Link>
                </div>

                {/* Content Column */}
                <div
                  className={`lg:col-span-5 space-y-5 text-left ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="olive">{project.category}</Badge>
                    <span className="text-xs font-sans text-[#757069]">
                      {project.location} • {project.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-[#181716]">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="hover:text-[#5D6853] transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h3>

                  <p className="text-xs uppercase tracking-[0.16em] font-sans text-[#847262]">
                    {project.subtitle}
                  </p>

                  <p className="text-sm font-sans text-[#55504A] leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center text-xs font-sans uppercase tracking-[0.2em] font-medium text-[#181716] group hover:text-[#5D6853] transition-colors"
                    >
                      <span className="border-b border-[#181716] group-hover:border-[#5D6853] pb-0.5">
                        Discover Project
                      </span>
                      <ArrowUpRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

