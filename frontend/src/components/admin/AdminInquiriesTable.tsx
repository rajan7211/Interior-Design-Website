import React, { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, ChevronDown } from 'lucide-react';
import { CustomerInquiry, InquiryStatus } from '../../types';

interface AdminInquiriesTableProps {
  inquiries: CustomerInquiry[];
  onStatusChange: (id: string, status: InquiryStatus, notes?: string) => Promise<void>;
}

const STATUS_OPTIONS: InquiryStatus[] = ['New', 'Reviewed', 'Contacted', 'Scheduled', 'Archived'];

export const AdminInquiriesTable: React.FC<AdminInquiriesTableProps> = ({
  inquiries,
  onStatusChange,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [notesState, setNotesState] = useState<Record<string, string>>({});

  const handleNotesSave = (id: string) => {
    const note = notesState[id];
    const inquiry = inquiries.find((i) => i.id === id);
    if (inquiry) {
      onStatusChange(id, inquiry.status, note);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E7E2D8] overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E2D8] bg-[#FBF9F5] text-[10px] font-sans uppercase tracking-[0.2em] text-[#757069]">
              <th className="py-4 px-6">Client / Contact</th>
              <th className="py-4 px-6">Project Scope & Location</th>
              <th className="py-4 px-6">Budget Bracket</th>
              <th className="py-4 px-6">Inquiry Date</th>
              <th className="py-4 px-6">Status Pipeline</th>
              <th className="py-4 px-6 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E2D8] text-xs font-sans">
            {inquiries.map((inq) => {
              const isExpanded = expandedId === inq.id;

              return (
                <React.Fragment key={inq.id}>
                  <tr className="hover:bg-[#FDFCF9] transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-serif text-base text-[#181716] font-normal">
                        {inq.fullName}
                      </p>
                      <div className="flex flex-col space-y-0.5 text-[11px] text-[#757069] mt-0.5">
                        <span className="flex items-center">
                          <Mail className="w-3 h-3 mr-1 text-[#847262]" />
                          {inq.email}
                        </span>
                        {inq.phone && (
                          <span className="flex items-center">
                            <Phone className="w-3 h-3 mr-1 text-[#847262]" />
                            {inq.phone}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <p className="font-medium text-[#181716]">{inq.projectType}</p>
                      <div className="flex items-center text-[11px] text-[#757069] mt-0.5">
                        <MapPin className="w-3 h-3 mr-1 text-[#847262]" />
                        {inq.location}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <span className="text-[#5D6853] font-medium font-serif text-sm">
                        {inq.budgetRange}
                      </span>
                      <p className="text-[11px] text-[#757069]">{inq.timeline}</p>
                    </td>

                    <td className="py-4 px-6 text-[#757069]">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(inq.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="relative inline-block">
                        <select
                          value={inq.status}
                          onChange={(e) => onStatusChange(inq.id, e.target.value as InquiryStatus)}
                          className="bg-[#F2EDE4] border border-[#D4CDBC] text-[#181716] text-xs font-sans px-3 py-1.5 pr-7 appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#181716]"
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {st}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 absolute right-2 top-2 pointer-events-none text-[#757069]" />
                      </div>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : inq.id)}
                        className="text-xs uppercase font-sans tracking-[0.14em] text-[#5D6853] hover:text-[#181716] underline underline-offset-2"
                      >
                        {isExpanded ? 'Collapse' : 'Review'}
                      </button>
                    </td>
                  </tr>

                  {isExpanded && (
                    <tr className="bg-[#FAF8F5]">
                      <td colSpan={6} className="p-6 border-b border-[#E7E2D8]">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                          <div className="space-y-2">
                            <h4 className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#847262] font-semibold">
                              Client Vision & Message
                            </h4>
                            <p className="text-xs sm:text-sm font-sans text-[#181716] bg-white p-4 border border-[#E7E2D8] leading-relaxed whitespace-pre-wrap">
                              {inq.message || 'No additional message provided.'}
                            </p>
                          </div>

                          <div className="space-y-2">
                            <h4 className="text-[10px] uppercase font-sans tracking-[0.2em] text-[#847262] font-semibold">
                              Director Notes / Internal Memo
                            </h4>
                            <div className="space-y-2">
                              <textarea
                                rows={3}
                                defaultValue={inq.notes || ''}
                                onChange={(e) =>
                                  setNotesState((prev) => ({ ...prev, [inq.id]: e.target.value }))
                                }
                                placeholder="Add confidential notes (e.g. Architect assigned, meeting scheduled)..."
                                className="w-full bg-white border border-[#E7E2D8] p-3 text-xs font-sans text-[#181716] focus:outline-none focus:border-[#181716]"
                              />
                              <button
                                type="button"
                                onClick={() => handleNotesSave(inq.id)}
                                className="px-3 py-1.5 bg-[#181716] text-[#FBF9F5] text-[10px] font-sans uppercase tracking-[0.16em] hover:bg-[#2A2724]"
                              >
                                Save Note
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
