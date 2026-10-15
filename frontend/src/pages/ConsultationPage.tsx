import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Layout } from '../components/layout/Layout';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { consultationService } from '../services/api';
import { ConsultationFormData } from '../types';
import { CheckCircle2, Calendar, Shield, ArrowRight, UserCheck } from 'lucide-react';
import { FadeIn } from '../components/ui/Motion';

const consultationSchema = z.object({
  fullName: z.string().min(2, 'Please provide your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(6, 'Please provide your telephone number'),
  propertyLocation: z.string().min(2, 'Please specify property location (City / Area)'),
  serviceInterest: z.string().min(1, 'Please select your service of interest'),
  propertyType: z.string().min(1, 'Please select property type'),
  estimatedSquareFootage: z.string().min(1, 'Please select estimated square footage'),
  budgetBracket: z.string().min(1, 'Please select your investment tier'),
  preferredDate: z.string().min(1, 'Please choose a preferred consultation date'),
  preferredTimeSlot: z.string().min(1, 'Please select a preferred time slot'),
  notesAndVision: z.string().min(10, 'Please share your key goals for this consultation (minimum 10 characters)'),
});

type ConsultationSchemaType = z.infer<typeof consultationSchema>;

const SERVICE_OPTIONS = [
  { value: 'Full Interior Architecture', label: 'Full Interior Architecture' },
  { value: 'Bespoke Millwork & Material Craft', label: 'Bespoke Millwork & Material Craft' },
  { value: 'Curated FF&E & Art Advisory', label: 'Curated FF&E & Art Advisory' },
  { value: 'Turnkey Project Management', label: 'Turnkey Project Management' },
  { value: 'Comprehensive Masterplan (All Disciplines)', label: 'Comprehensive Masterplan (All Disciplines)' },
];

const PROPERTY_TYPES = [
  { value: 'Listed Heritage Townhouse / Residence', label: 'Listed Heritage Townhouse / Residence' },
  { value: 'Penthouse or Loft Space', label: 'Penthouse or Loft Space' },
  { value: 'Detached Country or Coastal Villa', label: 'Detached Country or Coastal Villa' },
  { value: 'New Development Bare-Shell', label: 'New Development Bare-Shell' },
  { value: 'Commercial Atelier or Luxury Retail', label: 'Commercial Atelier or Luxury Retail' },
];

const SQ_FOOTAGE_OPTIONS = [
  { value: 'Under 2,500 sq.ft (approx 230 sq.m)', label: 'Under 2,500 sq.ft (approx 230 sq.m)' },
  { value: '2,500 — 5,000 sq.ft (230 — 465 sq.m)', label: '2,500 — 5,000 sq.ft (230 — 465 sq.m)' },
  { value: '5,000 — 10,000 sq.ft (465 — 930 sq.m)', label: '5,000 — 10,000 sq.ft (465 — 930 sq.m)' },
  { value: '10,000+ sq.ft (930+ sq.m)', label: '10,000+ sq.ft (930+ sq.m)' },
];

const BUDGET_BRACKETS = [
  { value: '£350,000 — £750,000', label: '£350,000 — £750,000' },
  { value: '£750,000 — £1,500,000', label: '£750,000 — £1,500,000' },
  { value: '£1,500,000 — £3,000,000', label: '£1,500,000 — £3,000,000' },
  { value: '£3,000,000+', label: '£3,000,000+' },
];

const TIME_SLOTS = [
  { value: 'Morning (10:00 AM — 11:30 AM BST/EST)', label: 'Morning (10:00 AM — 11:30 AM BST/EST)' },
  { value: 'Early Afternoon (01:00 PM — 02:30 PM BST/EST)', label: 'Early Afternoon (01:00 PM — 02:30 PM BST/EST)' },
  { value: 'Late Afternoon (04:00 PM — 05:30 PM BST/EST)', label: 'Late Afternoon (04:00 PM — 05:30 PM BST/EST)' },
];

export const ConsultationPage: React.FC = () => {
  const routerLocation = useLocation();
  const searchParams = new URLSearchParams(routerLocation.search);
  const prefillService = searchParams.get('service') || '';
  const prefillProject = searchParams.get('project') || '';

  const [bookingConfirmedId, setBookingConfirmedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ConsultationSchemaType>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      propertyLocation: '',
      serviceInterest: prefillService || '',
      propertyType: '',
      estimatedSquareFootage: '',
      budgetBracket: '',
      preferredDate: '',
      preferredTimeSlot: '',
      notesAndVision: prefillProject ? `Inquiring based on interest in ${prefillProject}. ` : '',
    },
  });

  useEffect(() => {
    if (prefillService) {
      setValue('serviceInterest', prefillService);
    }
  }, [prefillService, setValue]);

  const onSubmit = async (data: ConsultationSchemaType) => {
    try {
      const result = await consultationService.create(data as ConsultationFormData);
      setBookingConfirmedId(result.id);
      reset();
    } catch (err) {
      console.error('Failed to book consultation', err);
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
                Private Architecture Session
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#181716] mt-2">
                Book a Private Consultation
              </h1>
              <p className="text-sm sm:text-base font-sans text-[#55504A] mt-4 leading-relaxed">
                Schedule a dedicated 60-minute spatial discovery session with an AURELLE Partner Architect. We conduct consultations virtually or at our London, New York, and Paris ateliers.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <FadeIn direction="up" delay={0.1}>
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-6 sm:p-10 shadow-sm text-left">
                {bookingConfirmedId ? (
                  <div className="py-12 px-4 text-center space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#EEF1EB] text-[#5D6853] rounded-full mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#5D6853] font-medium">
                        Confirmation Pending Review
                      </span>
                      <h3 className="font-serif text-3xl font-light text-[#181716]">
                        Consultation Request Reserved
                      </h3>
                      <p className="text-xs uppercase font-sans tracking-[0.2em] text-[#847262]">
                        Booking Reference: #{bookingConfirmedId}
                      </p>
                    </div>
                    <p className="text-sm font-sans text-[#55504A] max-w-lg mx-auto leading-relaxed">
                      Our Studio Coordinator is reviewing your architectural dossier. You will receive an official calendar invitation and video conference link via email within 24 hours.
                    </p>
                    <div className="pt-4">
                      <Button variant="outline" size="sm" onClick={() => setBookingConfirmedId(null)}>
                        Book Another Session
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="border-b border-[#E7E2D8] pb-3 mb-4">
                      <h3 className="font-serif text-xl sm:text-2xl font-light text-[#181716]">
                        Client & Architectural Profile
                      </h3>
                      <p className="text-xs font-sans text-[#757069]">
                        Please provide foundational details about your space and aesthetic intent.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Full Legal Name / Principal"
                        required
                        placeholder="e.g. Julian Henderson"
                        error={errors.fullName?.message}
                        {...register('fullName')}
                      />
                      <Input
                        label="Primary Email Address"
                        type="email"
                        required
                        placeholder="julian@residence.com"
                        error={errors.email?.message}
                        {...register('email')}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Input
                        label="Contact Phone"
                        required
                        placeholder="+44 7911 000000"
                        error={errors.phone?.message}
                        {...register('phone')}
                      />
                      <Input
                        label="Property Location / City"
                        required
                        placeholder="e.g. Chelsea, London or Tribeca, NYC"
                        error={errors.propertyLocation?.message}
                        {...register('propertyLocation')}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Select
                        label="Primary Discipline of Interest"
                        required
                        placeholder="Select Service"
                        options={SERVICE_OPTIONS}
                        error={errors.serviceInterest?.message}
                        {...register('serviceInterest')}
                      />
                      <Select
                        label="Property Archetype"
                        required
                        placeholder="Select Property Type"
                        options={PROPERTY_TYPES}
                        error={errors.propertyType?.message}
                        {...register('propertyType')}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Select
                        label="Estimated Spatial Footprint"
                        required
                        placeholder="Select Square Footage"
                        options={SQ_FOOTAGE_OPTIONS}
                        error={errors.estimatedSquareFootage?.message}
                        {...register('estimatedSquareFootage')}
                      />
                      <Select
                        label="Allocated Capital Investment Bracket"
                        required
                        placeholder="Select Budget Range"
                        options={BUDGET_BRACKETS}
                        error={errors.budgetBracket?.message}
                        {...register('budgetBracket')}
                      />
                    </div>

                    <div className="border-t border-[#E7E2D8] pt-6">
                      <h4 className="text-xs font-sans uppercase tracking-[0.18em] text-[#181716] font-medium mb-4">
                        Preferred Consultation Window
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Input
                          label="Target Consultation Date"
                          type="date"
                          required
                          min={new Date().toISOString().split('T')[0]}
                          error={errors.preferredDate?.message}
                          {...register('preferredDate')}
                        />
                        <Select
                          label="Preferred Time Window"
                          required
                          placeholder="Select Time Slot"
                          options={TIME_SLOTS}
                          error={errors.preferredTimeSlot?.message}
                          {...register('preferredTimeSlot')}
                        />
                      </div>
                    </div>

                    <Textarea
                      label="Key Objectives & Architectural Aspirations"
                      required
                      rows={4}
                      placeholder="Share your goals for this session: e.g. reconfiguring Victorian layout, custom bronze joinery, art placement, or full turnkey execution..."
                      error={errors.notesAndVision?.message}
                      {...register('notesAndVision')}
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
                        Confirm Private Consultation Request
                      </Button>
                    </div>
                  </form>
                )}
              </div>
              </FadeIn>
            </div>

            {/* Right: What to Expect */}
            <div className="lg:col-span-4">
              <FadeIn direction="up" delay={0.2} className="space-y-6 text-left">
                <div className="bg-[#F2EDE4] border border-[#E4DCD0] p-6 sm:p-8 space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#5D6853] font-medium block">
                      What To Anticipate
                    </span>
                    <h3 className="font-serif text-2xl font-light text-[#181716] mt-1">
                      The 60-Minute Discovery
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs font-sans text-[#55504A] leading-relaxed">
                    <div className="flex items-start space-x-3">
                      <UserCheck className="w-4 h-4 text-[#5D6853] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-[#181716] block font-medium">Principal Attention</strong>
                        Consultations are held directly with Partner Architects, not junior account managers.
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Calendar className="w-4 h-4 text-[#5D6853] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-[#181716] block font-medium">Preliminary Spatial Review</strong>
                        We analyze architectural floorplans, structural opportunities, and planning constraints.
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <Shield className="w-4 h-4 text-[#5D6853] mt-0.5 flex-shrink-0" />
                      <div>
                        <strong className="text-[#181716] block font-medium">Confidential NDA</strong>
                        All submitted plans, property addresses, and personal requirements remain strictly privileged.
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E4DCD0]">
                    <p className="text-[11px] font-sans text-[#757069]">
                      Need immediate assistance? Speak directly to our London salon: <span className="text-[#181716] font-medium">+44 (0)20 7946 0812</span>
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
