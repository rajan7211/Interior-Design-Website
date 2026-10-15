import React from 'react';
import { Layout } from '../components/layout/Layout';
import { ServiceDetailCard } from '../components/services/ServiceDetailCard';
import { STUDIO_SERVICES } from '../data/mockData';
import { CtaBanner } from '../components/home/CtaBanner';
import { ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { FadeIn, FadeInStagger, FadeInStaggerItem } from '../components/ui/Motion';

export const ServicesPage: React.FC = () => {
  return (
    <Layout>
      <div className="w-full bg-[#FBF9F5] pt-8 sm:pt-14 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn direction="up">
            <div className="max-w-3xl mb-12 sm:mb-16 text-left">
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
                Architecture & Design Capabilities
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#181716] mt-2">
                Bespoke Interior Disciplines
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#55504A] mt-4 leading-relaxed">
                We provide an integrated, turnkey practice spanning structural spatial architecture, bespoke cabinetry craftsmanship, curated antique sourcing, and fiduciary project delivery.
              </p>
            </div>
          </FadeIn>

          {/* Core Services Detailed List */}
          <FadeInStagger staggerDelay={0.15} className="space-y-4 mb-20">
            {STUDIO_SERVICES.map((service, index) => (
              <FadeInStaggerItem key={service.id} distance={28}>
                <ServiceDetailCard service={service} index={index} />
              </FadeInStaggerItem>
            ))}
          </FadeInStagger>

          {/* Atelier Engagement Criteria */}
          <FadeIn direction="up" delay={0.1}>
            <div className="bg-[#F2EDE4] border border-[#E4DCD0] p-8 sm:p-12 mb-16 text-left">
              <div className="max-w-3xl mb-8">
                <span className="text-[10px] uppercase font-sans tracking-[0.22em] text-[#847262] block mb-1">
                  Transparency & Practice Standards
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-light text-[#181716]">
                  Our Engagement Principles
                </h2>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm font-sans text-[#55504A]">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#181716] font-medium">
                  <Compass className="w-4 h-4 text-[#5D6853]" />
                  <h4>Strict Project Selectivity</h4>
                </div>
                <p className="leading-relaxed">
                  We limit our active commissions to no more than twelve projects annually. This guarantees direct principal involvement from founders Eleanor Vance and Julian Montgomery.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#181716] font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#5D6853]" />
                  <h4>Fiduciary Cost Transparency</h4>
                </div>
                <p className="leading-relaxed">
                  All trade contractor discounts, artisan fabrication rates, and procurement invoices are passed directly to clients without marked-up hidden spreads.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[#181716] font-medium">
                  <Sparkles className="w-4 h-4 text-[#5D6853]" />
                  <h4>Global Execution Reach</h4>
                </div>
                <p className="leading-relaxed">
                  Headquartered across London, New York, and Paris, our atelier coordinates projects across Europe, the Americas, the Middle East, and Asia.
                </p>
              </div>
            </div>
          </div>
          </FadeIn>
        </div>
      </div>

      <CtaBanner />
    </Layout>
  );
};

