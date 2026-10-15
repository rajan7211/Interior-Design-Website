import React from 'react';
import { Layers, Mail, Calendar, Compass } from 'lucide-react';
import { Project, CustomerInquiry, ConsultationAppointment } from '../../types';

interface AdminStatsProps {
  projects: Project[];
  inquiries: CustomerInquiry[];
  appointments: ConsultationAppointment[];
}

export const AdminStats: React.FC<AdminStatsProps> = ({
  projects,
  inquiries,
  appointments,
}) => {
  const newInquiriesCount = inquiries.filter((i) => i.status === 'New').length;
  const pendingAppointmentsCount = appointments.filter((a) => a.status === 'Pending').length;

  const stats = [
    {
      label: 'Published Works',
      value: projects.filter((p) => p.published).length.toString(),
      helper: `${projects.length} Total in Archives`,
      icon: Layers,
    },
    {
      label: 'New Client Inquiries',
      value: newInquiriesCount.toString(),
      helper: `${inquiries.length} Total Inquiries`,
      icon: Mail,
      highlight: newInquiriesCount > 0,
    },
    {
      label: 'Consultation Pipeline',
      value: pendingAppointmentsCount.toString(),
      helper: `${appointments.length} Total Scheduled`,
      icon: Calendar,
      highlight: pendingAppointmentsCount > 0,
    },
    {
      label: 'Global Atelier Studios',
      value: '3',
      helper: 'London • New York • Paris',
      icon: Compass,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 text-left">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className={`p-6 border bg-[#FFFFFF] shadow-sm transition-all ${
              stat.highlight
                ? 'border-[#5D6853] ring-1 ring-[#5D6853]/20'
                : 'border-[#E7E2D8]'
            }`}
          >
            <div className="flex items-center justify-between text-[#757069] mb-3">
              <span className="text-[10px] uppercase font-sans tracking-[0.2em]">
                {stat.label}
              </span>
              <Icon className="w-4 h-4 text-[#847262]" />
            </div>
            <p className="font-serif text-3xl font-light text-[#181716]">
              {stat.value}
            </p>
            <p className="text-[11px] font-sans text-[#757069] mt-1">
              {stat.helper}
            </p>
          </div>
        );
      })}
    </div>
  );
};

