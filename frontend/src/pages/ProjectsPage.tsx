import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from '../components/layout/Layout';
import { PortfolioFilter } from '../components/portfolio/PortfolioFilter';
import { ProjectCard } from '../components/portfolio/ProjectCard';
import { projectService } from '../services/api';
import { Project, ProjectCategory, RoomType } from '../types';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { FadeIn } from '../components/ui/Motion';
import { motion, AnimatePresence } from 'motion/react';

const CATEGORIES: ProjectCategory[] = [
  'All',
  'Residential Architecture',
  'Penthouse & Loft',
  'Coastal Villa',
  'Heritage Restoration',
  'Commercial Atelier',
];

const ROOM_TYPES: RoomType[] = [
  'All',
  'Living Sanctuary',
  'Culinary Studio',
  'Master Suite',
  'Bath & Spa',
  'Library & Study',
  'Outdoor Living',
];

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedRoom, setSelectedRoom] = useState<RoomType>('All');

  useEffect(() => {
    projectService.getAll().then((data) => {
      setProjects(data.filter((p) => p.published));
      setLoading(false);
    });
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchCat = selectedCategory === 'All' || project.category === selectedCategory;
      const matchRoom = selectedRoom === 'All' || project.roomTypes.includes(selectedRoom);
      return matchCat && matchRoom;
    });
  }, [projects, selectedCategory, selectedRoom]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedRoom('All');
  };

  return (
    <Layout>
      <div className="w-full bg-[#FBF9F5] pt-8 sm:pt-14 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Editorial Header */}
          <FadeIn direction="up">
            <div className="max-w-3xl mb-10 sm:mb-14 text-left">
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
                Archive of Built Commissions
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#181716] mt-2">
                Architectural Works & Portfolios
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#55504A] mt-4 leading-relaxed">
                Explore our comprehensive portfolio spanning historic conversions in London, penthouses across Manhattan, and private hillside estates worldwide.
              </p>
            </div>
          </FadeIn>

          {/* Interactive Filters */}
          <FadeIn direction="up" delay={0.1}>
            <PortfolioFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedRoom={selectedRoom}
              onSelectRoom={setSelectedRoom}
              categories={CATEGORIES}
              roomTypes={ROOM_TYPES}
              totalCount={filteredProjects.length}
            />
          </FadeIn>

          {/* Loading State */}
          {loading && (
            <div className="py-24 flex flex-col items-center justify-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#5D6853]" />
              <p className="text-xs uppercase tracking-[0.2em] font-sans text-[#757069]">
                Accessing Studio Archives...
              </p>
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProjects.length === 0 && (
            <FadeIn direction="up">
              <div className="py-20 text-center bg-[#F2EDE4]/60 border border-[#E7E2D8] p-8 sm:p-12 space-y-4 max-w-xl mx-auto">
                <Sparkles className="w-6 h-6 mx-auto text-[#847262]" />
                <h3 className="font-serif text-2xl font-light text-[#181716]">
                  No Works Matched Your Criteria
                </h3>
                <p className="text-xs sm:text-sm font-sans text-[#757069] leading-relaxed">
                  There are currently no published monographs under "{selectedCategory}" with a "{selectedRoom}" spatial focus.
                </p>
                <div className="pt-2">
                  <Button variant="outline" size="sm" onClick={resetFilters}>
                    Clear All Filters
                  </Button>
                </div>
              </div>
            </FadeIn>
          )}

          {/* Portfolio Grid */}
          {!loading && filteredProjects.length > 0 && (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10"
            >
              <AnimatePresence>
                {filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
};

