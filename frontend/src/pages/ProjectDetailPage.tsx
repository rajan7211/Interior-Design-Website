import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { projectService } from '../services/api';
import { Project } from '../types';
import { ArrowLeft, ArrowRight, ArrowUpRight, Maximize2, X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '../components/ui/Motion';
import { motion, AnimatePresence } from 'motion/react';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    projectService.getAll().then((list) => {
      setAllProjects(list);
      const found = list.find((p) => p.slug === slug);
      setProject(found || null);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#5D6853]" />
          <p className="text-xs uppercase tracking-[0.2em] font-sans text-[#757069]">
            Loading Monograph Details...
          </p>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 space-y-4">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#181716]">
            Monograph Not Found
          </h1>
          <p className="text-sm font-sans text-[#757069] max-w-md">
            The architectural monograph you are seeking may have been archived or does not exist.
          </p>
          <Link to="/projects">
            <Button variant="primary" size="sm">
              Return to Selected Works
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  // Previous and Next project navigation
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  const galleryImages = project.gallery.length > 0 ? project.gallery : [project.coverImage];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? galleryImages.length - 1 : lightboxIndex - 1);
    }
  };
  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === galleryImages.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <Layout>
      <article className="w-full bg-[#FBF9F5] pt-6 sm:pt-10 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E7E2D8] mb-8">
            <Link
              to="/projects"
              className="inline-flex items-center text-xs uppercase font-sans tracking-[0.2em] text-[#757069] hover:text-[#181716] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-2" />
              <span>Back to Archives</span>
            </Link>
            <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#847262]">
              Monograph #{project.slug}
            </span>
          </div>

          {/* Hero Header */}
          <FadeIn direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-10 sm:mb-14 text-left">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="olive">{project.category}</Badge>
                  {project.clientTier && (
                    <Badge variant="outline">{project.clientTier}</Badge>
                  )}
                </div>
                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-[#181716] leading-tight">
                  {project.title}
                </h1>
                <p className="font-serif text-lg sm:text-xl text-[#847262] italic">
                  {project.subtitle}
                </p>
              </div>

              {/* Quick Specs Column */}
              <div className="lg:col-span-4 bg-[#F2EDE4]/70 border border-[#E7E2D8] p-6 space-y-4">
                <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#757069] block border-b border-[#E7E2D8] pb-2">
                  Architectural Metrics
                </span>
                <div className="grid grid-cols-2 gap-4 text-xs font-sans">
                  <div>
                    <span className="text-[#757069] block text-[10px] uppercase tracking-wider">Location</span>
                    <p className="font-medium text-[#181716] mt-0.5">{project.location}</p>
                  </div>
                  <div>
                    <span className="text-[#757069] block text-[10px] uppercase tracking-wider">Completion</span>
                    <p className="font-medium text-[#181716] mt-0.5">{project.year}</p>
                  </div>
                  <div>
                    <span className="text-[#757069] block text-[10px] uppercase tracking-wider">Scale</span>
                    <p className="font-medium text-[#181716] mt-0.5">{project.area}</p>
                  </div>
                  <div>
                    <span className="text-[#757069] block text-[10px] uppercase tracking-wider">Timeline</span>
                    <p className="font-medium text-[#181716] mt-0.5">{project.duration}</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Large Hero Image */}
          <FadeIn direction="up" delay={0.1}>
            <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#EAE4D7] mb-12 sm:mb-16 shadow-sm group">
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <button
                onClick={() => openLightbox(0)}
                className="absolute bottom-4 right-4 bg-[#181716]/80 text-[#FBF9F5] p-2 sm:px-4 sm:py-2 flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.16em] hover:bg-[#181716] transition-colors"
                aria-label="View fullscreen gallery"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Enlarge Gallery ({galleryImages.length})</span>
              </button>
            </div>
          </FadeIn>

          {/* Narrative & Materiality Grid */}
          <FadeIn direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-16 sm:mb-24 text-left">
              <div className="lg:col-span-7 space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#181716]">
                  Spatial Intervention & Narrative
                </h2>
                <p className="text-sm sm:text-base font-sans text-[#55504A] leading-relaxed">
                  {project.description}
                </p>
                <p className="text-sm sm:text-base font-sans text-[#55504A] leading-relaxed">
                  {project.architecturalStory}
                </p>

                {/* Spatial Rooms Tagging */}
                <div className="pt-4 border-t border-[#E7E2D8]">
                  <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#847262] block mb-2">
                    Spatial Environments Addressed
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.roomTypes.map((room) => (
                      <span
                        key={room}
                        className="text-xs font-sans bg-[#F2EDE4] text-[#181716] px-3 py-1 border border-[#E7E2D8]"
                      >
                        {room}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Materiality Palette Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-6 sm:p-8 space-y-6 shadow-sm">
                  <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#5D6853] font-medium block">
                    Materiality & Guilds
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-light text-[#181716]">
                    Artisanal Tactile Palette
                  </h3>
                  <ul className="space-y-3">
                    {project.materials.map((mat, i) => (
                      <li key={i} className="flex items-center space-x-3 text-xs sm:text-sm font-sans text-[#55504A] border-b border-[#F2EDE4] pb-2">
                        <span className="w-1.5 h-1.5 bg-[#5D6853] rounded-full flex-shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link to={`/consultation?project=${encodeURIComponent(project.title)}`}>
                      <Button variant="primary" size="md" className="w-full" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                        Inquire for Similar Commission
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Full Gallery Grid */}
          <div className="space-y-8 mb-20">
            <FadeIn direction="up">
              <div className="flex items-center justify-between pb-4 border-b border-[#E7E2D8]">
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#181716]">
                  Architectural Monograph Gallery
                </h2>
                <span className="text-xs font-sans text-[#757069]">
                  {galleryImages.length} Curated Plates
                </span>
              </div>
            </FadeIn>

            <FadeInStagger staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {galleryImages.map((imgUrl, idx) => (
                <FadeInStaggerItem key={idx}>
                  <div
                    onClick={() => openLightbox(idx)}
                    className="group relative aspect-[4/3] bg-[#EAE4D7] overflow-hidden cursor-pointer shadow-sm"
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} - Plate 0${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[#FBF9F5]">
                      <div className="bg-[#181716]/80 px-4 py-2 flex items-center space-x-2 text-xs font-sans uppercase tracking-[0.16em]">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Plate 0{idx + 1}</span>
                      </div>
                    </div>
                  </div>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          </div>

          {/* Next / Prev Project Navigation Footer */}
          <FadeIn direction="up">
            <div className="border-t border-[#E7E2D8] pt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {prevProject && (
                  <Link
                    to={`/projects/${prevProject.slug}`}
                    className="p-6 bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#181716] transition-colors flex items-center space-x-4 group text-left"
                  >
                    <ArrowLeft className="w-5 h-5 text-[#757069] group-hover:text-[#181716] group-hover:-translate-x-1 transition-transform" />
                    <div>
                      <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#757069] block">
                        Previous Work
                      </span>
                      <h4 className="font-serif text-lg font-light text-[#181716]">
                        {prevProject.title}
                      </h4>
                    </div>
                  </Link>
                )}

                {nextProject && (
                  <Link
                    to={`/projects/${nextProject.slug}`}
                    className="p-6 bg-[#FFFFFF] border border-[#E7E2D8] hover:border-[#181716] transition-colors flex items-center justify-between group text-right sm:text-left"
                  >
                    <div className="sm:ml-auto">
                      <span className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#757069] block">
                        Next Work
                      </span>
                      <h4 className="font-serif text-lg font-light text-[#181716]">
                        {nextProject.title}
                      </h4>
                    </div>
                    <ArrowRight className="w-5 h-5 text-[#757069] group-hover:text-[#181716] group-hover:translate-x-1 transition-transform sm:ml-4" />
                  </Link>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </article>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
          >
            <div className="flex items-center justify-between text-[#FBF9F5] z-10">
              <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#A39180]">
                Plate {lightboxIndex + 1} of {galleryImages.length} • {project.title}
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 text-[#FBF9F5] hover:text-[#C5A880] transition-colors"
                aria-label="Close Lightbox"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              <motion.img
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] as const }}
                src={galleryImages[lightboxIndex]}
                alt={`${project.title} - Plate ${lightboxIndex + 1}`}
                className="max-h-[80vh] max-w-full object-contain shadow-2xl"
              />
              <button
                onClick={prevLightbox}
                className="absolute left-2 sm:left-6 p-3 bg-black/50 text-white hover:bg-black transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextLightbox}
                className="absolute right-2 sm:right-6 p-3 bg-black/50 text-white hover:bg-black transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="text-center text-xs font-sans text-[#757069] pb-2">
              Use arrow keys or click buttons to navigate. Press ESC to close.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};
