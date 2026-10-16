import React from 'react';
import { Layout } from '../components/layout/Layout';
import { HeroSection } from '../components/home/HeroSection';
import { StatsIntroSection } from '../components/home/StatsIntroSection';
import { ProductPlacementSection } from '../components/home/ProductPlacementSection';
import { ExclusiveFurnitureSection } from '../components/home/ExclusiveFurnitureSection';
import { BeforeAfterSliderSection } from '../components/home/BeforeAfterSliderSection';
import { WhatWeOfferSection } from '../components/home/WhatWeOfferSection';
import { FeaturedCollectionSection } from '../components/home/FeaturedCollectionSection';
import { ExploreCollectionSection } from '../components/home/ExploreCollectionSection';
import { DribbbleTestimonialSection } from '../components/home/DribbbleTestimonialSection';
import { NumberedAccordionSection } from '../components/home/NumberedAccordionSection';
import { LatestNewsSection } from '../components/home/LatestNewsSection';
import { NewsletterBannerSection } from '../components/home/NewsletterBannerSection';

export const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section  */}
      <HeroSection />

      {/*  Timeless Elegance & $80M+ Stats Section  */}
      <StatsIntroSection />

      {/* Interactive Product Placement & Hotspots  */}
      <ProductPlacementSection />

      {/* Exclusive Furniture 4-Category Grid  */}
      <ExclusiveFurnitureSection />

      {/*  Interactive Before / After Reimagine Split Slider  */}
      <BeforeAfterSliderSection />

      {/* What We Offer / 3 Service Cards  */}
      <WhatWeOfferSection />

      {/* Best Selling / Featured Collection Products  */}
      <FeaturedCollectionSection />

      {/* Explore Collection Categories with Hover Preview  */}
      <ExploreCollectionSection />

      {/* Testimonial / Transforming Visions  */}
      <DribbbleTestimonialSection />

      {/*  Discover Your Perfect Furniture / Numbered Accordion  */}
      <NumberedAccordionSection />

      {/* Latest News / 4 Editorial Cards  */}
      <LatestNewsSection />

      {/* Join Our Home Decor Circle Newsletter Banner */}
      <NewsletterBannerSection />
    </Layout>
  );
};
