import React, { useState } from 'react';
import { SarkariFormItem } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { Search, ExternalLink, Calendar, Info, AlertCircle } from 'lucide-react';

interface DateCheckerTableProps {
  forms: SarkariFormItem[];
  title: string;
  subtitle: string;
  categoryName: string;
}

export const DateCheckerTable: React.FC<DateCheckerTableProps> = ({
  forms,
  title,
  subtitle,
  categoryName
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeFormModal, setActiveFormModal] = useState<SarkariFormItem | null>(null);

  const filteredForms = forms.filter((item) => {
    const matchesSearch =
      item.formName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.qualification.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' || item.status.toLowerCase() === selectedStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full">
      {/* Header Info */}
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 md:p-8 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-bold text-amber-300 backdrop-blur-xs">
              <Calendar className="h-3.5 w-3.5" />
              {categoryName} Live Tracker 2026
            </span>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl text-white">
              {title}
            </h1>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              {subtitle}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white/10 px-4 py-2 backdrop-blur-xs text-center border border-white/10">
              <div className="text-xl font-extrabold text-amber-300">{forms.length}</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider">Total Forms</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls / Filter Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by form or organization name (e.g. SSC, UPSC, Class 10)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Active', 'Upcoming'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === status
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status === 'All' ? 'All Forms' : status === 'Active' ? 'Active' : 'Upcoming'}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700">
            <thead className="bg-slate-100/80 text-xs uppercase tracking-wider text-slate-600 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-5 py-4 font-bold">Form Name</th>
                <th scope="col" className="px-4 py-4 font-bold whitespace-nowrap">Starting Date</th>
                <th scope="col" className="px-4 py-4 font-bold whitespace-nowrap">Last Date</th>
                <th scope="col" className="px-4 py-4 font-bold whitespace-nowrap">Exam Date</th>
                <th scope="col" className="px-4 py-4 font-bold text-center">Status</th>
                <th scope="col" className="px-4 py-4 font-bold text-center">Countdown</th>
                <th scope="col" className="px-5 py-4 font-bold text-right">Apply Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredForms.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    <AlertCircle className="mx-auto h-8 w-8 mb-2 text-slate-300" />
                    No forms found. Please try a different search keyword.
                  </td>
                </tr>
              ) : (
                filteredForms.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="px-5 py-4">
                      <div className="font-bold text-slate-900 group">
                        <span className="hover:text-blue-600 cursor-pointer" onClick={() => setActiveFormModal(item)}>
                          {item.formName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 font-medium">{item.organization}</span>
                        <button
                          onClick={() => setActiveFormModal(item)}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-0.5"
                        >
                          <Info className="h-3 w-3" /> View Details
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap font-medium text-slate-600">
                      {new Date(item.startingDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap font-bold text-rose-600">
                      {new Date(item.lastDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-4 py-4 text-xs whitespace-nowrap font-medium text-slate-700">
                      {item.examDate.includes('-')
                        ? new Date(item.examDate).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
                        : item.examDate}
                    </td>
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        item.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${item.status === 'Active' ? 'bg-emerald-500' : 'bg-blue-500'}`}></span>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center whitespace-nowrap">
                      <CountdownTimer targetDate={item.lastDate} compact={true} />
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap">
                      <a
                        href={item.applyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 active:scale-95 transition-all"
                      >
                        <span>Apply Online</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {activeFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{activeFormModal.organization}</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{activeFormModal.formName}</h3>
              </div>
              <button
                onClick={() => setActiveFormModal(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Qualification:</span>
                <span className="font-semibold text-slate-800">{activeFormModal.qualification}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Total Vacancies / Seats:</span>
                <span className="font-semibold text-slate-800">{activeFormModal.totalPosts}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Age Limit:</span>
                <span className="font-semibold text-slate-800">{activeFormModal.ageLimit}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-xs text-slate-500 block">Application Fee:</span>
                <span className="font-semibold text-slate-800">{activeFormModal.fee}</span>
              </div>
            </div>

            <div className="mt-4">
              <CountdownTimer targetDate={activeFormModal.lastDate} label="Time Left Until Application Closes:" />
            </div>

            <p className="mt-4 text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-100">
              {activeFormModal.description}
            </p>

            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveFormModal(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <a
                href={activeFormModal.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
              >
                <span>Apply on Official Portal</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
