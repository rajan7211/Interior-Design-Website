import React from 'react';
import { Layout } from '../components/layout/Layout';
import { STUDIO_INFO, STUDIO_TEAM, STUDIO_AWARDS } from '../data/mockData';
import { CtaBanner } from '../components/home/CtaBanner';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '../components/ui/Motion';

export const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="w-full bg-[#FBF9F5] pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn direction="up">
            <div className="max-w-3xl mb-12 sm:mb-16 text-left">
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
                Established 2012 • London & Worldwide
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#181716] mt-2">
                The Architecture of Stillness
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#55504A] mt-4 leading-relaxed">
                Founded on the belief that meaningful architecture transcends transient fashion, AURELLE creates quiet, emotionally resonant environments grounded in timeless materials and natural light.
              </p>
            </div>
          </FadeIn>

          {/* Large Studio Visual with Floating Manifesto */}
          <FadeIn direction="up" delay={0.1}>
            <div className="relative w-full aspect-[16/9] lg:aspect-[21/9] bg-[#EAE4D7] overflow-hidden mb-16 sm:mb-24 shadow-sm group">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80"
                alt="AURELLE Interiors Studio Atelier"
                className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 max-w-xl text-left text-[#FBF9F5]">
                <p className="font-serif text-xl sm:text-2xl lg:text-3xl font-light italic leading-snug">
                  "We do not decorate rooms. We sculpt the voids where life unfolds with quiet dignity."
                </p>
                <p className="text-[10px] sm:text-xs uppercase font-sans tracking-[0.2em] text-[#C5A880] mt-2">
                  — Eleanor Vance, Architectural Association Dipl.
                </p>
              </div>
            </div>
          </FadeIn>

          {/* Philosophy Narrative */}
          <FadeIn direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mb-20 sm:mb-28 text-left">
              <div className="lg:col-span-5 space-y-4">
                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#847262] font-semibold">
                  Our Architectural Tenets
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#181716]">
                  Three Pillars of Enduring Design
                </h2>
              </div>
              <div className="lg:col-span-7 space-y-6 text-sm font-sans text-[#55504A] leading-relaxed">
                <div>
                  <h3 className="font-serif text-xl text-[#181716] mb-1 font-normal">
                    I. Proportional Restraint
                  </h3>
                  <p>
                    We prioritize spatial geometry over decorative noise. Sightlines are unburdened, thresholds are celebrated, and volumes are sculpted to foster a palpable sense of sanctuary.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#181716] mb-1 font-normal">
                    II. Material Integrity
                  </h3>
                  <p>
                    We select authentic raw substances: unlacquered brass, vein-cut travertine, hand-planed French oak, and Belgian linen. We embrace their capacity to patina, gathering character and memory over decades.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-xl text-[#181716] mb-1 font-normal">
                    III. Luminescence as Architecture
                  </h3>
                  <p>
                    Natural sunlight is our supreme collaborator. By analyzing daily celestial arcs, our architectural layouts track solar orientations to illuminate tactile textures throughout every season.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Leadership Team Showcase */}
          <div className="mb-20 sm:mb-28">
            <FadeIn direction="up">
              <div className="text-left mb-12">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
                  Atelier Direction
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#181716] mt-1">
                  Studio Leadership
                </h2>
              </div>
            </FadeIn>

            <FadeInStagger staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {STUDIO_TEAM.map((member) => (
                <FadeInStaggerItem key={member.id}>
                  <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-6 shadow-sm space-y-4 hover:border-[#C5BBAF] transition-all duration-300">
                    <div className="aspect-[4/5] bg-[#EAE4D7] overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105"
                      />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#181716]">
                        {member.name}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.16em] font-sans text-[#5D6853] mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-[10px] uppercase tracking-[0.12em] font-sans text-[#757069] mt-0.5">
                        {member.credentials}
                      </p>
                    </div>
                    <p className="text-xs font-sans text-[#55504A] leading-relaxed pt-2 border-t border-[#F2EDE4]">
                      {member.bio}
                    </p>
                  </div>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          </div>

          {/* Critical Honors & Press Recognition */}
          <div className="mb-20 sm:mb-28 text-left">
            <FadeIn direction="up">
              <div className="mb-10">
                <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
                  Distinctions & Peer Recognition
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-light text-[#181716] mt-1">
                  Selected Critical Honors
                </h2>
              </div>
            </FadeIn>
            <FadeInStagger staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STUDIO_AWARDS.map((award, i) => (
                <FadeInStaggerItem key={i}>
                  <div className="bg-white border border-[#E7E2D8] p-6 space-y-2 hover:border-[#C5BBAF] transition-colors duration-300">
                    <span className="text-xs font-serif text-[#5D6853] block">{award.year}</span>
                    <h3 className="font-serif text-lg font-light text-[#181716]">{award.title}</h3>
                    <p className="text-xs font-sans text-[#757069]">{award.organization}</p>
                    <p className="text-[10px] uppercase tracking-wider font-sans text-[#847262] pt-2 border-t border-[#F2EDE4]">{award.category}</p>
                  </div>
                </FadeInStaggerItem>
              ))}
            </FadeInStagger>
          </div>

          {/* Global Studios Grid */}
          <FadeIn direction="up">
            <div className="bg-[#F2EDE4] border border-[#E4DCD0] p-8 sm:p-12 mb-16 text-left">
              <div className="max-w-2xl mb-8">
                <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#847262] block mb-1">
                  Global Footprint
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#181716]">
                  Our Atelier Locations
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {STUDIO_INFO.offices.map((office) => (
                  <div key={office.city} className="space-y-2 bg-[#FBF9F5] p-6 border border-[#E7E2D8] hover:border-[#C5BBAF] transition-colors duration-300">
                    <h3 className="font-serif text-xl text-[#181716] font-normal">
                      {office.city} Atelier
                    </h3>
                    <div className="flex items-start text-xs font-sans text-[#55504A] pt-1">
                      <MapPin className="w-3.5 h-3.5 mr-2 mt-0.5 text-[#5D6853] flex-shrink-0" />
                      <span>{office.address}</span>
                    </div>
                    <div className="flex items-center text-xs font-sans text-[#757069]">
                      <Phone className="w-3.5 h-3.5 mr-2 text-[#847262] flex-shrink-0" />
                      <span>{office.phone}</span>
                    </div>
                    <div className="flex items-center text-xs font-sans text-[#757069]">
                      <Mail className="w-3.5 h-3.5 mr-2 text-[#847262] flex-shrink-0" />
                      <span>{office.email}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      <CtaBanner />
    </Layout>
  );
};
