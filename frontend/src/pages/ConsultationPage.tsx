import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
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
import { CheckCircle2, Calendar, Shield, ArrowRight, ArrowLeft, UserCheck, Sparkles, Check } from 'lucide-react';
import { FadeIn } from '../components/ui/Motion';
import { motion, AnimatePresence } from 'motion/react';

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
  { value: 'Custom Furniture & Bespoke Commission', label: 'Custom Furniture & Bespoke Commission' },
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
  const rawService = searchParams.get('service') || '';
  const prefillProject = searchParams.get('project') || '';
  const prefillItem = searchParams.get('item') || '';

  // Map incoming service query to exact select option if related to furniture
  const prefillService = rawService.toLowerCase().includes('furniture')
    ? 'Custom Furniture & Bespoke Commission'
    : rawService;

  const initialNotes = prefillItem
    ? `Inquiring regarding order of "${prefillItem}". `
    : prefillProject
    ? `Inquiring based on interest in ${prefillProject}. `
    : '';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [bookingConfirmedId, setBookingConfirmedId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
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
      notesAndVision: initialNotes,
    },
  });

  const watchedValues = watch();

  useEffect(() => {
    if (prefillService) {
      setValue('serviceInterest', prefillService);
    }
    if (prefillItem) {
      setValue('notesAndVision', `Inquiring regarding order of "${prefillItem}". `);
    }
  }, [prefillService, prefillItem, setValue]);

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await trigger([
        'serviceInterest',
        'propertyType',
        'estimatedSquareFootage',
        'budgetBracket',
      ]);
      if (isValid) setStep(2);
    } else if (step === 2) {
      const isValid = await trigger([
        'preferredDate',
        'preferredTimeSlot',
        'notesAndVision',
      ]);
      if (isValid) setStep(3);
    }
  };

  const onSubmit = async (data: ConsultationSchemaType) => {
    try {
      const result = await consultationService.create(data as ConsultationFormData);
      setBookingConfirmedId(result.id);
      reset();
      setStep(1);
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
            <div className="max-w-3xl mb-10 sm:mb-14 text-left">
              <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#E05A2B] font-bold">
                Private Architecture Session
              </span>
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111111] tracking-tight mt-2">
                Book a Private Consultation
              </h1>
              <p className="text-sm sm:text-base font-sans text-neutral-600 mt-4 leading-relaxed">
                Schedule a dedicated 60-minute spatial discovery session with an AURELLE Partner Architect. We conduct consultations virtually or at our London, New York, and Paris ateliers.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Form Column */}
            <div className="lg:col-span-8">
              <FadeIn direction="up" delay={0.1}>
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-6 sm:p-10 rounded-3xl shadow-sm text-left">
                  {bookingConfirmedId ? (
                    <div className="py-12 px-4 text-center space-y-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 text-green-700 rounded-full mx-auto">
                        <CheckCircle2 className="w-10 h-10 text-[#E05A2B]" />
                      </div>
                      <div className="space-y-2">
                        <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#E05A2B] font-bold">
                          Confirmation Pending Review
                        </span>
                        <h3 className="font-sans font-extrabold text-3xl text-[#111111]">
                          Consultation Request Reserved
                        </h3>
                        <p className="text-xs uppercase font-sans tracking-[0.2em] text-neutral-500 font-bold">
                          Booking Reference: #{bookingConfirmedId}
                        </p>
                      </div>
                      <p className="text-sm font-sans text-neutral-600 max-w-lg mx-auto leading-relaxed">
                        Our Studio Coordinator is reviewing your architectural dossier. You will receive an official calendar invitation and video conference link via email within 24 hours.
                      </p>
                      <div className="pt-4 flex items-center justify-center space-x-4">
                        <Button variant="outline" size="sm" onClick={() => setBookingConfirmedId(null)}>
                          Book Another Session
                        </Button>
                        <Link to="/projects">
                          <Button variant="primary" size="sm">
                            Explore Archive Works
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* Step Progress Stepper Bar */}
                      <div className="mb-8 pb-6 border-b border-neutral-100">
                        <div className="flex items-center justify-between mb-3 text-xs font-sans font-bold uppercase tracking-wider">
                          <span className={step >= 1 ? 'text-[#E05A2B]' : 'text-neutral-400'}>
                            1. Scope & Disciplines
                          </span>
                          <span className={step >= 2 ? 'text-[#E05A2B]' : 'text-neutral-400'}>
                            2. Schedule & Vision
                          </span>
                          <span className={step >= 3 ? 'text-[#E05A2B]' : 'text-neutral-400'}>
                            3. Contact & Confirm
                          </span>
                        </div>
                        {/* Progress Indicator Bar */}
                        <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#E05A2B] transition-all duration-400 ease-out"
                            style={{ width: `${(step / 3) * 100}%` }}
                          />
                        </div>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* STEP 1: SCOPE & DISCIPLINES */}
                        {step === 1 && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-5"
                          >
                            <div className="pb-1">
                              <h3 className="font-sans font-bold text-xl text-[#111111]">
                                Step 1: Architectural Project Scope
                              </h3>
                              <p className="text-xs font-sans text-neutral-500 mt-1">
                                Tell us about your spatial needs and intended investment bracket.
                              </p>
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

                            <div className="pt-4 flex justify-end">
                              <button
                                type="button"
                                onClick={handleNextStep}
                                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#111111] text-white hover:bg-[#E05A2B] text-xs font-bold uppercase tracking-wider transition-all shadow-md group"
                              >
                                <span>Next: Schedule & Vision</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 2: SCHEDULE & VISION */}
                        {step === 2 && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-5"
                          >
                            <div className="pb-1">
                              <h3 className="font-sans font-bold text-xl text-[#111111]">
                                Step 2: Preferred Time & Architectural Vision
                              </h3>
                              <p className="text-xs font-sans text-neutral-500 mt-1">
                                Select a convenient consultation date and outline key goals.
                              </p>
                            </div>

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

                            <Textarea
                              label="Key Objectives & Architectural Aspirations"
                              required
                              rows={4}
                              placeholder="Share your goals for this session: e.g. reconfiguring Victorian layout, custom bronze joinery, art placement, or full turnkey execution..."
                              error={errors.notesAndVision?.message}
                              {...register('notesAndVision')}
                            />

                            <div className="pt-4 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="inline-flex items-center space-x-1 text-xs font-bold font-sans uppercase text-neutral-500 hover:text-black py-2.5 px-4"
                              >
                                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                                <span>Back</span>
                              </button>

                              <button
                                type="button"
                                onClick={handleNextStep}
                                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-[#111111] text-white hover:bg-[#E05A2B] text-xs font-bold uppercase tracking-wider transition-all shadow-md group"
                              >
                                <span>Next: Contact Details</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                              </button>
                            </div>
                          </motion.div>
                        )}

                        {/* STEP 3: CONTACT & CONFIRM */}
                        {step === 3 && (
                          <motion.div
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="space-y-5"
                          >
                            <div className="pb-1">
                              <h3 className="font-sans font-bold text-xl text-[#111111]">
                                Step 3: Principal Contact & Dossier Confirmation
                              </h3>
                              <p className="text-xs font-sans text-neutral-500 mt-1">
                                Where should we deliver your meeting link and confirmation?
                              </p>
                            </div>

                            {/* Summary Chips */}
                            <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-100 flex flex-wrap gap-2 text-xs font-sans">
                              {watchedValues.serviceInterest && (
                                <span className="bg-white px-3 py-1 rounded-full border border-neutral-200 text-neutral-800">
                                  <strong>Service:</strong> {watchedValues.serviceInterest}
                                </span>
                              )}
                              {watchedValues.propertyType && (
                                <span className="bg-white px-3 py-1 rounded-full border border-neutral-200 text-neutral-800">
                                  <strong>Property:</strong> {watchedValues.propertyType}
                                </span>
                              )}
                              {watchedValues.preferredDate && (
                                <span className="bg-white px-3 py-1 rounded-full border border-neutral-200 text-neutral-800">
                                  <strong>Date:</strong> {watchedValues.preferredDate}
                                </span>
                              )}
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

                            <div className="pt-4 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() => setStep(2)}
                                className="inline-flex items-center space-x-1 text-xs font-bold font-sans uppercase text-neutral-500 hover:text-black py-2.5 px-4"
                              >
                                <ArrowLeft className="w-3.5 h-3.5 mr-1" />
                                <span>Back</span>
                              </button>

                              <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="bg-[#E05A2B] hover:bg-[#C94A1F] text-white shadow-md font-sans font-bold uppercase tracking-wider text-xs"
                                isLoading={isSubmitting}
                                rightIcon={<Check className="w-4 h-4" />}
                              >
                                Confirm Private Consultation Request
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </form>
                    </div>
                  )}
                </div>
              </FadeIn>
            </div>

            {/* Right: What to Expect */}
            <div className="lg:col-span-4">
              <FadeIn direction="up" delay={0.2} className="space-y-6 text-left">
                <div className="bg-[#FFFFFF] border border-[#E7E2D8] p-6 sm:p-8 rounded-3xl space-y-6 shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#E05A2B] font-bold block">
                      What To Anticipate
                    </span>
                    <h3 className="font-sans font-extrabold text-2xl text-[#111111] mt-1">
                      The 60-Minute Discovery
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs font-sans text-neutral-600 leading-relaxed">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <UserCheck className="w-3.5 h-3.5 text-[#E05A2B]" />
                      </div>
                      <div>
                        <strong className="text-[#111111] block font-bold">Principal Attention</strong>
                        Consultations are held directly with Partner Architects, not junior account managers.
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E05A2B]" />
                      </div>
                      <div>
                        <strong className="text-[#111111] block font-bold">Preliminary Spatial Review</strong>
                        We analyze architectural floorplans, structural opportunities, and planning constraints.
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-3.5 h-3.5 text-[#E05A2B]" />
                      </div>
                      <div>
                        <strong className="text-[#111111] block font-bold">Confidential NDA</strong>
                        All submitted plans, property addresses, and personal requirements remain strictly privileged.
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-neutral-100">
                    <p className="text-[11px] font-sans text-neutral-500">
                      Need immediate concierge assistance? Speak directly to our London salon: <span className="text-black font-bold block mt-1">+44 (0)20 7946 0812</span>
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
