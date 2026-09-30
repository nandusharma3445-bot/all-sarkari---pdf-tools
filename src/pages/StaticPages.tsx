import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

interface StaticPageProps {
  type: 'about' | 'contact' | 'privacy' | 'terms';
  onNavigate: (path: string) => void;
}

export const StaticPages: React.FC<StaticPageProps> = ({ type, onNavigate }) => {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  if (type === 'about') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-10">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
            About Us • Overview & Purpose
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            The Story & Mission Behind All Tools
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
            Empowering students and competitive examination applicants with private, high-speed, and free digital document utilities.
          </p>
        </div>

        <AdBanner format="horizontal" />

        <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-6 text-sm text-slate-700 leading-relaxed shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h2>
            <p>
              Every year, tens of millions of Indian youth register for examinations conducted by the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Railway Recruitment Boards (RRB), State Police departments, and central universities. A large proportion of applicants struggle with strict 20KB - 50KB image limits, background color restrictions, or multiple PDF upload requirements.
            </p>
            <p className="mt-3">
              <strong>All Tools</strong> was built to ensure that every applicant, regardless of background or internet speed, can create compliant examination photos, adjust signatures, merge marksheets, and compress documents directly on their smartphones without paying unnecessary fees or sharing private documents.
            </p>
          </div>

          <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-5">
            <h3 className="font-bold text-blue-900 mb-2">Our Three Core Principles:</h3>
            <ul className="space-y-2 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero Server Storage:</strong> Your photographs, marksheets, and certificates are never stored on any remote cloud server. All operations run directly in your browser.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>100% Free Forever:</strong> We do not charge subscription fees or place watermarks on your processed files.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Government Specification Accuracy:</strong> Presets are pre-configured to match official notifications from SSC, UPSC, and IBPS.</span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Engineering & Support Team</h2>
            <p>
              Our team consists of dedicated software engineers and former competitive exam mentors who continuously study official recruitment gazettes to keep dimensions, deadlines, and portal compatibility up to date.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'contact') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-10">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
            Contact Support • Help & Partnerships
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">
            Get in Touch with All Tools
          </h1>
          <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
            Need assistance with a tool, want to report a deadline update, or discuss advertising opportunities? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Details Card */}
          <div className="rounded-2xl bg-gradient-to-b from-blue-900 to-indigo-950 p-6 text-white shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold mb-4">Direct Contact</h3>
              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Official Email:</span>
                    <a href="mailto:nandusharma3445@gmail.com" className="hover:text-amber-300 transition-colors">
                      nandusharma3445@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Official Phone:</span>
                    <a href="tel:9625766541" className="hover:text-amber-300 transition-colors">
                      +91 9625766541
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-amber-400 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Office Location:</span>
                    <span>New Delhi, India</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-xl bg-white/10 p-4 border border-white/10 text-xs">
              <span className="font-bold text-amber-300 block mb-1">Response Time:</span>
              <p className="text-slate-300 text-[11px]">
                Our support team responds to all queries within 24 to 48 business hours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 rounded-2xl bg-white border border-slate-200 p-6 md:p-8 shadow-xs">
            {contactSubmitted ? (
              <div className="p-8 text-center animate-in fade-in">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Your message has been sent!</h3>
                <p className="mt-1 text-xs text-slate-500">
                  Thank you! Our support team will reach out to your email ({formData.email}) shortly.
                </p>
                <button
                  onClick={() => setContactSubmitted(false)}
                  className="mt-6 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Anand Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address:</label>
                  <input
                    type="email"
                    required
                    placeholder="you@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subject:</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Bug Report / Tool Issue">Bug Report / Tool Issue</option>
                    <option value="Exam Date Update Request">Exam Date Update Request</option>
                    <option value="Advertising & Partnerships">Advertising & Partnerships</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message:</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your question, feedback, or suggestion in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 p-2.5 text-xs text-slate-800 focus:bg-white focus:outline-hidden"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-xs font-bold text-white shadow-md hover:bg-blue-700 active:scale-95 transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (type === 'privacy') {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="text-center mb-8">
          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
            Legal • Privacy & Compliance
          </span>
          <h1 className="text-3xl font-black text-slate-900 mt-2">
            Privacy Policy
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            Last Updated: September 2026 | Google AdSense, GDPR & CCPA Compliant
          </p>
        </div>

        <AdBanner format="horizontal" />

        <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-6 text-xs md:text-sm text-slate-700 leading-relaxed shadow-xs">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">1. Introduction</h2>
            <p>
              At All Tools (accessible at desialltools.com / alltools.com), user privacy is of paramount importance. This Privacy Policy outlines the types of information collected and how it is used when you interact with our website and tools.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">2. Zero Server Storage Policy</h2>
            <p>
              When you upload photographs, signatures, or PDF documents to resize, compress, or convert, <strong>files are never uploaded to or stored on our servers</strong>. All processing is executed client-side using native HTML5 and JavaScript Web APIs inside your device's browser memory. Once processing finishes or you close the browser tab, the data is instantly purged.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">3. Google AdSense & DoubleClick DART Cookies</h2>
            <p>
              Google is a third-party vendor on our site. It uses cookies, known as DART cookies, to serve ads to site visitors based on their visit to our site and other sites on the internet. Visitors may choose to decline the use of DART cookies by visiting the Google Ad and Content Network Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">4. Log Files</h2>
            <p>
              All Tools follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and number of clicks. These are not linked to any personally identifiable information.
            </p>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900 mb-2">5. Contact Information</h2>
            <p>
              If you have any questions about this Privacy Policy, please reach out via email to nandusharma3445@gmail.com or call +91 9625766541.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Terms of Service
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center mb-8">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200">
          Terms • Conditions of Use
        </span>
        <h1 className="text-3xl font-black text-slate-900 mt-2">
          Terms of Service
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Please review these terms carefully prior to using All Tools services.
        </p>
      </div>

      <div className="rounded-2xl bg-white border border-slate-200 p-8 space-y-6 text-xs md:text-sm text-slate-700 leading-relaxed shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing and utilizing All Tools, you acknowledge and agree to comply with these Terms of Service. If you do not agree with any part of these terms, please discontinue use of the portal.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">2. Government Affiliation Disclaimer</h2>
          <p>
            All Tools is an independent, non-governmental educational and utility platform. We are not affiliated with, endorsed by, or connected to the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), National Testing Agency (NTA), Railway Recruitment Boards (RRB), or any State/Central Government ministry. All dates, vacancy numbers, and qualification guidelines are compiled from official gazettes for public informational convenience. Users are strongly advised to verify details with official recruitment authorities before submitting applications.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">3. Acceptable Use Policy</h2>
          <p>
            You agree to use this website solely for lawful purposes. You shall not attempt to inject malicious code, overload the service, or disrupt the operation of the portal.
          </p>
        </div>

        <div>
          <h2 className="text-base font-bold text-slate-900 mb-2">4. Limitation of Liability</h2>
          <p>
            While we strive for 100% precision in all photo resizing, compression, and date tracking utilities, All Tools and its creators shall not be liable for any application rejection, technical interruption, or indirect damages resulting from the use of this website.
          </p>
        </div>
      </div>
    </div>
  );
};
