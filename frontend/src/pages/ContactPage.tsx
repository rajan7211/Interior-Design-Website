import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { inquiryService } from '../services/api';
import { InquiryFormData } from '../types';
import { STUDIO_INFO } from '../data/mockData';
import { MapPin, Phone, Mail, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { FadeIn } from '../components/ui/Motion';

const contactSchema = z.object({
  fullName: z.string().min(2, 'Please provide your full legal name or principal name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please provide a contact phone number with country code'),
  projectType: z.string().min(1, 'Please select your project scope'),
  location: z.string().min(2, 'Please specify your property city or region'),
  timeline: z.string().min(1, 'Please select your intended timeline'),
  budgetRange: z.string().min(1, 'Please select your anticipated investment bracket'),
  message: z.string().min(10, 'Please share a brief summary of your architectural vision (minimum 10 characters)'),
});

type ContactSchemaType = z.infer<typeof contactSchema>;

const PROJECT_TYPE_OPTIONS = [
  { value: 'Full Architectural Intervention & Renovation', label: 'Full Architectural Intervention & Renovation' },
  { value: 'New Build Interior Architecture', label: 'New Build Interior Architecture' },
  { value: 'Bespoke Millwork & Joinery Suite', label: 'Bespoke Millwork & Joinery Suite' },
  { value: 'Curated FF&E, Collectible Design & Art Advisory', label: 'Curated FF&E, Collectible Design & Art Advisory' },
  { value: 'Commercial Atelier, Gallery or Private Club', label: 'Commercial Atelier, Gallery or Private Club' },
  { value: 'Other Bespoke Commission', label: 'Other Bespoke Commission' },
];

const TIMELINE_OPTIONS = [
  { value: 'Immediate (Within 1 — 3 Months)', label: 'Immediate (Within 1 — 3 Months)' },
  { value: '3 — 6 Months', label: '3 — 6 Months' },
  { value: '6 — 12 Months', label: '6 — 12 Months' },
  { value: 'Future Planning (12+ Months)', label: 'Future Planning (12+ Months)' },
];

const BUDGET_OPTIONS = [
  { value: '£250,000 — £500,000 / $300k — $600k', label: '£250,000 — £500,000 / $300k — $600k' },
  { value: '£500,000 — £1,000,000 / $600k — $1.2M', label: '£500,000 — £1,000,000 / $600k — $1.2M' },
  { value: '£1,000,000 — £2,500,000 / $1.2M — $3M', label: '£1,000,000 — £2,500,000 / $1.2M — $3M' },
  { value: '£2,500,000+ / $3M+', label: '£2,500,000+ / $3M+' },
];

export const ContactPage: React.FC = () => {
  const [submittedInquiryId, setSubmittedInquiryId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      projectType: '',
      location: '',
      timeline: '',
      budgetRange: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactSchemaType) => {
    try {
      const result = await inquiryService.create(data as InquiryFormData);
      setSubmittedInquiryId(result.id);
      reset();
    } catch (err) {
      console.error('Failed to submit inquiry', err);
    }
  };

  return (
    <Layout>
      <div className="w-full bg-[#FBF9F5] pt-8 sm:pt-14 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <FadeIn direction="up">
            <div className="max-w-3xl mb-12 sm:mb-16 text-left">
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#5D6853] font-medium">
                Private Inquiries
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#181716] mt-2">
                Initiate a Commission
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#55504A] mt-4 leading-relaxed">
                We invite prospective clients to discuss upcoming residential and commercial commissions. Complete the inquiry memorandum below or contact our studios directly.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <FadeIn direction="up" delay={0.1}>
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-6 sm:p-10 shadow-sm text-left">
                {submittedInquiryId ? (
                  <div className="py-12 px-4 text-center space-y-5">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-[#EEF1EB] text-[#5D6853] rounded-full mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#181716]">
                      Inquiry Received in Confidence
                    </h3>
                    <p className="text-xs uppercase font-sans tracking-[0.2em] text-[#847262]">
                      Reference Docket: #{submittedInquiryId}
                    </p>
                    <p className="text-sm font-sans text-[#55504A] max-w-md mx-auto leading-relaxed">
                      Thank you for contacting AURELLE Interiors. Our Managing Director reviews every portfolio request personally. We will respond within one business day to arrange a preliminary discussion.
                    </p>
                    <div className="pt-4">
                      <Button variant="outline" size="sm" onClick={() => setSubmittedInquiryId(null)}>
                        Submit Another Inquiry
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="border-b border-[#E7E2D8] pb-3 mb-4">
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-[#181716]">
                        Project Memorandum
                      </h3>
                      <p className="text-xs font-sans text-[#757069]">
                        All inquiries are treated under strict professional non-disclosure.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Name / Principal"
                        required
                        placeholder="e.g. Lord & Lady Harrington"
                        error={errors.fullName?.message}
                        {...register('fullName')}
                      />
                      <Input
                        label="Direct Email"
                        type="email"
                        required
                        placeholder="client@estate.com"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Contact Telephone"
                        required
                        placeholder="+44 (0)7700 900000"
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <Input
                        label="Property Location / City"
                        required
                        placeholder="e.g. Kensington, London"
                        error={errors.location?.message}
                        {...register('location')}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Select
                        label="Project Scope"
                        required
                        placeholder="Select Scope of Work"
                        options={PROJECT_TYPE_OPTIONS}
                        error={errors.projectType?.message}
                        {...register('projectType')}
                      />
                      <Select
                        label="Anticipated Timeline"
                        required
                        placeholder="Select Start Timeline"
                        options={TIMELINE_OPTIONS}
                        error={errors.timeline?.message}
                        {...register('timeline')}
                      />
                    </div>

                    <Select
                      label="Anticipated Capital Investment Bracket"
                      required
                      placeholder="Select Budget Range"
                      options={BUDGET_OPTIONS}
                      error={errors.budgetRange?.message}
                      {...register('budgetRange')}
                    />

                    <Textarea
                      label="Architectural Vision & Spatial Requirements"
                      required
                      rows={5}
                      placeholder="Describe the property's architectural style, approximate square footage, current state, key aspirations, and any bespoke requirements..."
                      error={errors.message?.message}
                      {...register('message')}
                    />

                    <div className="pt-2">
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full sm:w-auto"
                        isLoading={isSubmitting}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        Transmit Project Memorandum
                      </Button>
                    </div>
                  </form>
                )}
              </div>
              </FadeIn>
            </div>

            {/* Right: Studio Directory & Office Information */}
            <div className="lg:col-span-5">
              <FadeIn direction="up" delay={0.2} className="space-y-8 text-left">
                <div className="bg-[#F2EDE4] border border-[#E4DCD0] p-6 sm:p-8 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#5D6853] font-medium block">
                      Direct Contact
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[#181716] mt-1">
                      Atelier Headquarters
                    </h3>
                  </div>

                  <div className="space-y-6 divide-y divide-[#E4DCD0]">
                    {STUDIO_INFO.offices.map((office) => (
                      <div key={office.city} className="pt-5 first:pt-0 space-y-2">
                        <h4 className="font-serif text-lg font-normal text-[#181716]">
                          {office.city} Atelier
                        </h4>
                        <p className="text-xs font-sans text-[#55504A] flex items-start">
                          <MapPin className="w-3.5 h-3.5 mr-2 mt-0.5 text-[#5D6853] flex-shrink-0" />
                          <span>{office.address}</span>
                        </p>
                        <p className="text-xs font-sans text-[#757069] flex items-center">
                          <Phone className="w-3.5 h-3.5 mr-2 text-[#847262] flex-shrink-0" />
                          <span>{office.phone}</span>
                        </p>
                        <p className="text-xs font-sans text-[#757069] flex items-center">
                          <Mail className="w-3.5 h-3.5 mr-2 text-[#847262] flex-shrink-0" />
                          <span>{office.email}</span>
                        </p>
                        <p className="text-[11px] font-sans text-[#847262] flex items-center pt-1">
                          <Clock className="w-3.5 h-3.5 mr-2 flex-shrink-0" />
                          <span>{office.hours}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Press & Career Note */}
                <div className="border border-[#E7E2D8] bg-[#FFFFFF] p-6 space-y-2">
                  <h4 className="font-serif text-lg text-[#181716] font-normal">
                    Press & Media Enquiries
                  </h4>
                  <p className="text-xs font-sans text-[#55504A] leading-relaxed">
                    For architectural publication rights, monograph imagery, and exhibition requests, please direct inquiries to:
                  </p>
                  <p className="text-xs font-sans text-[#5D6853] font-medium">
                    press@aurelleinteriors.com
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

