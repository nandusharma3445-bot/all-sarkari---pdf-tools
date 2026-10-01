import React from 'react';
import { TOOLS_DATA, DATE_CHECKER_TOOLS } from '../data/toolsData';
import { ShieldCheck, Heart, ArrowUp, Mail, Phone, CheckCircle } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-200 bg-slate-900 text-slate-300">
      {/* Top Value Proposition Banner */}
      <div className="border-b border-slate-800 bg-slate-950/60 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">100% Data Privacy</h4>
                <p className="text-xs text-slate-400">All files are processed entirely in your web browser.</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Exam Compliant</h4>
                <p className="text-xs text-slate-400">Built for SSC, UPSC, Railway, and Police 20KB-50KB rules.</p>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Free Forever</h4>
                <p className="text-xs text-slate-400">Unlimited conversions without hidden fees or watermarks.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('/')}>
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-600 to-indigo-900 text-white font-black text-lg">
                A
              </div>
              <span className="text-xl font-black text-white">All Tools</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400 max-w-sm">
              India's premier online utility portal. Precision photo resizers for government job applications (20KB - 50KB), background changers, PDF converters, and real-time exam deadline trackers.
            </p>

            {/* Email and Phone as requested in Task 3 */}
            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="mailto:nandusharma3445@gmail.com" className="hover:text-amber-300 transition-colors">
                  nandusharma3445@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-amber-400 shrink-0" />
                <a href="tel:9625766541" className="hover:text-amber-300 transition-colors">
                  +91 9625766541
                </a>
              </div>
            </div>

            <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-1.5 text-[11px] text-amber-300 border border-slate-700">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Google AdSense & SEO Optimized Portal
            </div>
          </div>

          {/* Photo Tools Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Photo Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {TOOLS_DATA.filter((t) => t.category === 'photo').map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => onNavigate(tool.slug)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* PDF Tools Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              PDF Tools
            </h4>
            <ul className="space-y-2 text-xs">
              {TOOLS_DATA.filter((t) => t.category === 'pdf').map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => onNavigate(tool.slug)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {tool.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sarkari Dates & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Exam Dates & Legal
            </h4>
            <ul className="space-y-2 text-xs mb-4">
              {DATE_CHECKER_TOOLS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.slug)}
                    className="hover:text-amber-400 transition-colors text-left text-amber-300/90 font-medium"
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
            <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
              <div><button onClick={() => onNavigate('/about')} className="hover:text-white">About Us</button></div>
              <div><button onClick={() => onNavigate('/contact')} className="hover:text-white">Contact Us</button></div>
              <div><button onClick={() => onNavigate('/privacy-policy')} className="hover:text-white">Privacy Policy</button></div>
              <div><button onClick={() => onNavigate('/terms')} className="hover:text-white">Terms of Service</button></div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center md:text-left">
            Disclaimer: All Tools is an independent utility website dedicated to job applicants and students. It is not affiliated with any government recruitment agency or board. Please verify dates and notifications with official government websites.
          </p>
          <div className="flex items-center gap-4 shrink-0">
            <span>© 2026 All Tools. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
