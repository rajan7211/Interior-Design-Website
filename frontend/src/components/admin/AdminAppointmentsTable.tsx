import React from 'react';
import { Mail, Phone, Calendar, Clock, Video, ChevronDown } from 'lucide-react';
import { ConsultationAppointment, AppointmentStatus } from '../../types';

interface AdminAppointmentsTableProps {
  appointments: ConsultationAppointment[];
  onStatusChange: (id: string, status: AppointmentStatus, meetingLink?: string) => Promise<void>;
}

const APPOINTMENT_STATUS_OPTIONS: AppointmentStatus[] = [
  'Pending',
  'Confirmed',
  'Rescheduled',
  'Completed',
  'Cancelled',
];

export const AdminAppointmentsTable: React.FC<AdminAppointmentsTableProps> = ({
  appointments,
  onStatusChange,
}) => {
  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E2D8] bg-[#FBF9F5] text-[10px] font-sans uppercase tracking-[0.2em] text-[#757069]">
              <th className="py-4 px-6">Client Details</th>
              <th className="py-4 px-6">Service Interest & Space</th>
              <th className="py-4 px-6">Budget Bracket</th>
              <th className="py-4 px-6">Consultation Schedule</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 text-right">Meeting Link</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E2D8] text-xs font-sans">
            {appointments.map((apt) => (
              <tr key={apt.id} className="hover:bg-[#FDFCF9] transition-colors">
                <td className="py-4 px-6">
                  <p className="font-serif text-base text-[#181716] font-normal">
                    {apt.fullName}
                  </p>
                  <div className="flex flex-col space-y-0.5 text-[11px] text-[#757069] mt-0.5">
                    <span className="flex items-center">
                      <Mail className="w-3 h-3 mr-1 text-[#847262]" />
                      {apt.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="w-3 h-3 mr-1 text-[#847262]" />
                      {apt.phone}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-6">
                  <p className="font-medium text-[#181716]">{apt.serviceInterest}</p>
                  <p className="text-[11px] text-[#757069]">
                    {apt.propertyType} • {apt.estimatedSquareFootage || 'N/A'}
                  </p>
                  <p className="text-[11px] text-[#847262] italic mt-0.5">
                    {apt.propertyLocation}
                  </p>
                </td>

                <td className="py-4 px-6">
                  <span className="text-[#5D6853] font-medium font-serif text-sm">
                    {apt.budgetBracket}
                  </span>
                </td>

                <td className="py-4 px-6 text-[#757069]">
                  <div className="flex items-center text-[#181716] font-medium">
                    <Calendar className="w-3 h-3 mr-1 text-[#847262]" />
                    {apt.preferredDate}
                  </div>
                  <div className="flex items-center text-[11px] mt-0.5">
                    <Clock className="w-3 h-3 mr-1 text-[#847262]" />
                    {apt.preferredTimeSlot}
                  </div>
                </td>

                <td className="py-4 px-6">
                  <div className="relative inline-block">
                    <select
                      value={apt.status}
                      onChange={(e) => onStatusChange(apt.id, e.target.value as AppointmentStatus)}
                      className="bg-[#F2EDE4] border border-[#D4CDBC] text-[#181716] text-xs font-sans px-3 py-1.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#181716]"
                    >
                      {APPOINTMENT_STATUS_OPTIONS.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2 pointer-events-none text-[#757069]" />
                  </div>
                </td>

                <td className="py-4 px-6 text-right">
                  {apt.meetingLink ? (
                    <a
                      href={apt.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-xs font-sans uppercase tracking-[0.14em] text-[#5D6853] hover:text-[#181716]"
                    >
                      <Video className="w-3.5 h-3.5 mr-1" />
                      <span>Join Call</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        const link = prompt('Enter Google Meet or Zoom URL:');
                        if (link) {
                          onStatusChange(apt.id, apt.status, link);
                        }
                      }}
                      className="text-[11px] font-sans text-[#757069] hover:text-[#181716] underline underline-offset-2"
                    >
                      + Add Link
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
