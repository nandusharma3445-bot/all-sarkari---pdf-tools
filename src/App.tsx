import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ToolLayout } from './components/ToolLayout';
import { DateCheckerTable } from './components/DateCheckerTable';
import { AuthPages } from './pages/AuthPages';
import { StaticPages } from './pages/StaticPages';
import { TOOLS_DATA } from './data/toolsData';
import { SarkariFormItem } from './types';
import formsData from '../data/forms.json';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Sync document title and meta per page for SEO
  useEffect(() => {
    const baseTitle = 'All Tools - Sarkari & PDF Tools';
    let pageTitle = baseTitle;

    const matchedTool = TOOLS_DATA.find((t) => t.slug === currentPath);
    if (matchedTool) {
      pageTitle = `${matchedTool.title} | ${baseTitle}`;
    } else if (currentPath === '/sarkari-form-tracker') {
      pageTitle = `Sarkari Form Last Date Tracker & Live Countdown 2026 | ${baseTitle}`;
    } else if (currentPath === '/ignou-date') {
      pageTitle = `IGNOU Exam Form, Assignment & Re-Registration Dates | ${baseTitle}`;
    } else if (currentPath === '/nios-date') {
      pageTitle = `NIOS 10th & 12th Exam Dates, TMA & Fee Dates | ${baseTitle}`;
    } else if (currentPath === '/ews-admission-date') {
      pageTitle = `EWS/DG Nursery & RTE 25% Private School Admission Dates | ${baseTitle}`;
    } else if (currentPath === '/login') {
      pageTitle = `Login | ${baseTitle}`;
    } else if (currentPath === '/signup') {
      pageTitle = `Sign Up | ${baseTitle}`;
    } else if (currentPath === '/dashboard' || currentPath === '/profile') {
      pageTitle = `Candidate Dashboard | ${baseTitle}`;
    } else if (currentPath === '/about') {
      pageTitle = `About Us | ${baseTitle}`;
    } else if (currentPath === '/contact') {
      pageTitle = `Contact Support | ${baseTitle}`;
    } else if (currentPath === '/privacy-policy') {
      pageTitle = `Privacy Policy | ${baseTitle}`;
    } else if (currentPath === '/terms') {
      pageTitle = `Terms of Service | ${baseTitle}`;
    }

    document.title = pageTitle;
  }, [currentPath]);

  // Render current view
  const renderContent = () => {
    // 1. Homepage
    if (currentPath === '/' || currentPath === '') {
      return <HomePage onNavigate={navigate} />;
    }

    // 2. Ten Tool Pages
    const tool = TOOLS_DATA.find((t) => t.slug === currentPath);
    if (tool) {
      return <ToolLayout tool={tool} onNavigate={navigate} />;
    }

    // 3. Four Date Checker Pages
    if (currentPath === '/sarkari-form-tracker') {
      const sarkariForms = (formsData.sarkariForms || []) as SarkariFormItem[];
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <DateCheckerTable
            forms={sarkariForms}
            title="Sarkari Exam & Job Application Form Tracker 2026"
            subtitle="Track ongoing application forms, start dates, last dates, exam schedules, and live countdown timers for SSC, UPSC, Railway, Police, and Banking recruitment."
            categoryName="Government Recruitment"
          />
        </div>
      );
    }

    if (currentPath === '/ignou-date') {
      const ignouForms = (formsData.ignouForms || []) as SarkariFormItem[];
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <DateCheckerTable
            forms={ignouForms}
            title="IGNOU Exam, Re-Registration & Assignment Dates 2026"
            subtitle="Indira Gandhi National Open University (IGNOU) TEE examination forms, assignment submission deadlines, and re-registration countdown timers."
            categoryName="IGNOU Open Learning"
          />
        </div>
      );
    }

    if (currentPath === '/nios-date') {
      const niosForms = (formsData.niosForms || []) as SarkariFormItem[];
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <DateCheckerTable
            forms={niosForms}
            title="NIOS 10th & 12th Board Exam & Admission Dates 2026"
            subtitle="National Institute of Open Schooling (NIOS) Secondary and Senior Secondary public examination fees, TMA upload deadlines, and On-Demand exams."
            categoryName="NIOS Open School"
          />
        </div>
      );
    }

    if (currentPath === '/ews-admission-date') {
      const ewsForms = (formsData.ewsForms || []) as SarkariFormItem[];
      return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <DateCheckerTable
            forms={ewsForms}
            title="EWS / DG Nursery & RTE 25% Private School Free Admission Dates"
            subtitle="Right to Education (RTE Act) 25% reserved free seats in recognized private schools for Nursery, KG, and Class 1 online admission and lottery schedules."
            categoryName="EWS/DG & RTE 25%"
          />
        </div>
      );
    }

    // 4. Auth & Dashboard Pages
    if (currentPath === '/login') {
      return <AuthPages mode="login" onNavigate={navigate} />;
    }
    if (currentPath === '/signup') {
      return <AuthPages mode="signup" onNavigate={navigate} />;
    }
    if (currentPath === '/forgot-password') {
      return <AuthPages mode="forgot" onNavigate={navigate} />;
    }
    if (currentPath === '/dashboard' || currentPath === '/profile') {
      return <AuthPages mode="dashboard" onNavigate={navigate} />;
    }

    // 5. Static Pages
    if (currentPath === '/about') {
      return <StaticPages type="about" onNavigate={navigate} />;
    }
    if (currentPath === '/contact') {
      return <StaticPages type="contact" onNavigate={navigate} />;
    }
    if (currentPath === '/privacy-policy') {
      return <StaticPages type="privacy" onNavigate={navigate} />;
    }
    if (currentPath === '/terms') {
      return <StaticPages type="terms" onNavigate={navigate} />;
    }

    // Fallback: 404 / Return to Home
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h2 className="text-4xl font-black text-slate-800">404</h2>
        <p className="mt-2 text-sm text-slate-500">Page Not Found</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-amber-500 selection:text-white">
        <Navbar currentPath={currentPath} onNavigate={navigate} />
        <main className="flex-1">{renderContent()}</main>
        <Footer onNavigate={navigate} />
      </div>
    </AuthProvider>
  );
}
