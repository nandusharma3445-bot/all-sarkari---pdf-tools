import React, { useState } from 'react';
import { TOOLS_DATA, DATE_CHECKER_TOOLS } from '../data/toolsData';
import { CountdownTimer } from '../components/CountdownTimer';
import { AdBanner } from '../components/AdBanner';
import {
  Search, ArrowRight, Image, FileText, Calendar,
  ShieldCheck, CheckCircle2, ChevronRight
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'photo' | 'pdf' | 'sarkari'>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const photoTools = TOOLS_DATA.filter((t) => t.category === 'photo');
  const pdfTools = TOOLS_DATA.filter((t) => t.category === 'pdf');

  const filteredTools = [...TOOLS_DATA, ...DATE_CHECKER_TOOLS].filter((t) => {
    const matchesCategory = activeTab === 'all' || t.category === activeTab;
    const matchesSearch =
      t.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.titleHindi.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-900 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-bold text-amber-300 backdrop-blur-md border border-white/10 mb-6 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
            <span>Premier Online Sarkari & PDF Utilities • 100% Free Forever</span>
          </div>

          {/* Main Title - "All Tools - Sarkari & PDF Tools" */}
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white">
            All Tools
            <span className="block text-2xl sm:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
              Sarkari & PDF Tools
            </span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
            Free online utilities for competitive examination forms: <span className="text-amber-300 font-bold">20KB - 50KB Photo Resizer</span>, Background Remover, PDF Converters, and Real-Time Exam Last Date Trackers.
          </p>

          {/* Search Bar in Hero */}
          <div className="mt-8 mx-auto max-w-2xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search tools or forms..."
                className="w-full rounded-2xl border-2 border-white/20 bg-white/10 py-3.5 pl-12 pr-4 text-sm font-medium text-white placeholder-slate-400 backdrop-blur-md shadow-lg focus:border-amber-400 focus:bg-white/20 focus:outline-hidden transition-all"
              />
            </div>

            {/* Quick Keyword Pills */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-slate-400">Popular Searches:</span>
              {[
                { label: '20KB Photo Resizer', path: '/photo-resizer' },
                { label: 'Background Remover', path: '/background-remover' },
                { label: 'Merge PDFs', path: '/pdf-merge' },
                { label: 'Compress PDF (<100KB)', path: '/pdf-compress' },
                { label: 'Sarkari Form Tracker', path: '/sarkari-form-tracker' }
              ].map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onNavigate(item.path)}
                  className="rounded-lg bg-white/10 px-2.5 py-1 text-slate-200 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Highlights bar */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-white/10 text-center">
            <div>
              <div className="text-2xl font-extrabold text-amber-300">14+</div>
              <div className="text-xs text-slate-300 mt-0.5">Free Online Tools</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-400">100% Free</div>
              <div className="text-xs text-slate-300 mt-0.5">Zero Fees, No Watermarks</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-sky-300">0 Server Storage</div>
              <div className="text-xs text-slate-300 mt-0.5">Client-Side Browser Safe</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-purple-300">24×7 Live</div>
              <div className="text-xs text-slate-300 mt-0.5">Deadline Timers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Leaderboard Ad */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <AdBanner format="horizontal" />
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'All Tools', count: 14 },
            { id: 'photo', label: 'Photo Tools', count: 3 },
            { id: 'pdf', label: 'PDF Tools', count: 7 },
            { id: 'sarkari', label: 'Sarkari Dates', count: 4 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`rounded-full px-1.5 py-0.2 text-[11px] ${
                activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* SECTION 1: PHOTO & SIGNATURE TOOLS */}
        {(activeTab === 'all' || activeTab === 'photo') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                  <Image className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    1. Photo & Signature Tools
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Create exam-compliant photos and signatures for SSC, UPSC, and State Police forms
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {photoTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onNavigate(tool.slug)}
                  className="group relative cursor-pointer rounded-2xl bg-white p-6 border border-slate-200/90 shadow-2xs hover:border-orange-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700 border border-orange-200">
                        {tool.badge}
                      </span>
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> 100% Free
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs font-bold text-blue-700 mt-0.5">
                      {tool.titleHindi}
                    </p>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                      {tool.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      {tool.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                          <span className="h-1.5 w-1.5 rounded-full bg-orange-400"></span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs font-bold text-orange-600 group-hover:translate-x-1 transition-transform">
                    <span>Open Tool</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: PDF TOOLS */}
        {(activeTab === 'all' || activeTab === 'pdf') && (
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    2. PDF Tools & Converters
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Compress, merge, edit, and convert marksheets and identity certificates
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {pdfTools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => onNavigate(tool.slug)}
                  className="group relative cursor-pointer rounded-2xl bg-white p-5 border border-slate-200/90 shadow-2xs hover:border-blue-500 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-700 border border-blue-200">
                        {tool.badge}
                      </span>
                      <span className="text-[10px] text-slate-400">Instant</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs font-semibold text-blue-700 mt-0.5">
                      {tool.titleHindi}
                    </p>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                      {tool.shortDesc}
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                    <span>Convert Now</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* In-Feed Mid Ad */}
        <AdBanner format="horizontal" />

        {/* SECTION 3: SARKARI DATE TOOLS & COUNTDOWN TIMERS */}
        {(activeTab === 'all' || activeTab === 'sarkari') && (
          <div className="my-14">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                    3. Sarkari Dates & Live Deadline Trackers
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Live countdown timers for SSC, UPSC, Railway, IGNOU, NIOS, and EWS Admissions
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {DATE_CHECKER_TOOLS.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNavigate(item.slug)}
                  className="group cursor-pointer rounded-2xl bg-gradient-to-b from-white to-amber-50/30 p-6 border-2 border-amber-200/80 shadow-2xs hover:border-amber-500 hover:shadow-xl transition-all duration-200 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-extrabold text-rose-700 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping"></span>
                        Live Countdown
                      </span>
                      <span className="text-xs font-bold text-amber-700">2026</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-amber-800 mt-0.5">
                      {item.titleHindi}
                    </p>
                    <p className="mt-2 text-xs text-slate-600">
                      {item.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-amber-200/60">
                      <CountdownTimer targetDate="2026-10-31" compact={true} />
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:translate-x-1 transition-transform">
                    <span>View Dates & Apply Links</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Rules Matrix */}
        <div className="my-14 rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Quick Guide (Official Photo Specifications)
            </span>
            <h3 className="text-lg md:text-xl font-extrabold text-slate-900 mt-1">
              Official Photograph & Signature Rules for Major Indian Examinations
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-[11px] uppercase font-bold text-slate-600 border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Examination Board</th>
                  <th className="px-4 py-3">Photo Size Limit</th>
                  <th className="px-4 py-3">Signature Size Limit</th>
                  <th className="px-4 py-3">Background Requirement</th>
                  <th className="px-4 py-3">Recommended Tool</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">SSC CGL / CHSL / MTS / GD</td>
                  <td className="px-4 py-3 text-blue-700 font-semibold">20 KB to 50 KB (3.5 × 4.5 cm)</td>
                  <td className="px-4 py-3">10 KB to 20 KB (4.0 × 2.0 cm)</td>
                  <td className="px-4 py-3">Plain White or Light Blue</td>
                  <td className="px-4 py-3">
                    <button onClick={() => onNavigate('/photo-resizer')} className="text-blue-600 font-bold hover:underline">
                      Resize Photo →
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">UPSC Civil Services (IAS/IPS)</td>
                  <td className="px-4 py-3 text-blue-700 font-semibold">20 KB to 300 KB (Min 350×350 px)</td>
                  <td className="px-4 py-3">20 KB to 300 KB</td>
                  <td className="px-4 py-3">Plain White Background</td>
                  <td className="px-4 py-3">
                    <button onClick={() => onNavigate('/photo-resizer')} className="text-blue-600 font-bold hover:underline">
                      Resize Photo →
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">Railway RRB NTPC / Group D</td>
                  <td className="px-4 py-3 text-blue-700 font-semibold">30 KB to 70 KB (Color Photo)</td>
                  <td className="px-4 py-3">30 KB to 70 KB</td>
                  <td className="px-4 py-3">Light Uniform Background</td>
                  <td className="px-4 py-3">
                    <button onClick={() => onNavigate('/photo-resizer')} className="text-blue-600 font-bold hover:underline">
                      Resize Photo →
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900">State Police Recruitments</td>
                  <td className="px-4 py-3 text-blue-700 font-semibold">20 KB to 50 KB (JPG)</td>
                  <td className="px-4 py-3">5 KB to 20 KB</td>
                  <td className="px-4 py-3">Light Gray or White</td>
                  <td className="px-4 py-3">
                    <button onClick={() => onNavigate('/background-remover')} className="text-blue-600 font-bold hover:underline">
                      Change Background →
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Candidates Trust All Tools */}
        <div className="my-14 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 md:p-12 text-white">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              100% Free & Secure Online Platform
            </span>
            <h3 className="text-2xl md:text-3xl font-black mt-2">
              Why Candidates Rely on All Tools
            </h3>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              No more visiting internet cafes or leaving confidential documents on shared computers. All Tools runs entirely inside your browser with zero remote storage.
            </p>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Photos and certificates are never stored on external servers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Fast performance even on mobile 4G and 5G connections</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Up-to-date deadline schedules and official application links</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>No subscriptions, no fees, no watermarks - completely free</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
