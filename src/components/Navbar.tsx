import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { TOOLS_DATA, DATE_CHECKER_TOOLS } from '../data/toolsData';
import {
  Search, Menu, X, ChevronDown, User, LogOut, LayoutDashboard,
  Calendar, Heart
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { currentUser, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false);

  const allItems = [...TOOLS_DATA, ...DATE_CHECKER_TOOLS];

  const searchResults = searchQuery.trim()
    ? allItems.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.titleHindi.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleLinkClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setUserDropdownOpen(false);
    setToolsDropdownOpen(false);
    setDateDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-2xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-3 cursor-pointer group"
        >
<img src="/logo.png" alt="All Tools Logo" className="h-10 w-10 
rounded-xl object-contain 
bg-white p-1 shadow-md" />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                All Tools
              </span>
              <span className="hidden sm:inline-block rounded-md bg-amber-100 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-800">
                Sarkari & PDF
              </span>
            </div>
            <p className="text-[10px] font-medium text-slate-500 -mt-0.5">
              100% Free Online Portal • Sarkari & PDF Tools
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-semibold text-slate-700">
          <button
            onClick={() => handleLinkClick('/')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              currentPath === '/' ? 'text-blue-600 bg-blue-50 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          {/* Photo & PDF Tools Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setToolsDropdownOpen(!toolsDropdownOpen);
                setDateDropdownOpen(false);
              }}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              <span>All Tools</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white p-3 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Photo & Signature Tools
                </div>
                {TOOLS_DATA.filter((t) => t.category === 'photo').map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleLinkClick(tool.slug)}
                    className="w-full flex items-center justify-between rounded-lg p-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <span>{tool.title}</span>
                    <span className="text-[10px] text-amber-600 font-bold">{tool.badge}</span>
                  </button>
                ))}

                <div className="my-1.5 border-t border-slate-100"></div>

                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  PDF & Converter Tools
                </div>
                {TOOLS_DATA.filter((t) => t.category === 'pdf').map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => handleLinkClick(tool.slug)}
                    className="w-full flex items-center justify-between rounded-lg p-2 text-left text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <span>{tool.title}</span>
                    <span className="text-[10px] text-slate-400">{tool.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sarkari Dates Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setDateDropdownOpen(!dateDropdownOpen);
                setToolsDropdownOpen(false);
              }}
              className="flex items-center gap-1 rounded-lg px-3 py-1.5 hover:text-blue-600 hover:bg-slate-50 transition-colors"
            >
              <Calendar className="h-4 w-4 text-amber-500" />
              <span>Sarkari Dates</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${dateDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {dateDropdownOpen && (
              <div className="absolute left-0 mt-2 w-72 rounded-2xl bg-white p-3 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">
                  Live Dates & Countdowns
                </div>
                {DATE_CHECKER_TOOLS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.slug)}
                    className="w-full flex items-center justify-between rounded-lg p-2 text-left text-xs font-semibold text-slate-700 hover:bg-amber-50 hover:text-amber-800 transition-colors"
                  >
                    <div>
                      <div>{item.title}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{item.titleHindi}</div>
                    </div>
                    <span className="text-[10px] font-bold text-rose-600">Live</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleLinkClick('/about')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              currentPath === '/about' ? 'text-blue-600 bg-blue-50 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            About
          </button>
          <button
            onClick={() => handleLinkClick('/contact')}
            className={`rounded-lg px-3 py-1.5 transition-colors ${
              currentPath === '/contact' ? 'text-blue-600 bg-blue-50 font-bold' : 'hover:text-blue-600 hover:bg-slate-50'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Right Action Icons: Search + Auth */}
        <div className="flex items-center gap-2">
          {/* Quick Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 px-3 py-1.5 text-xs text-slate-500 font-medium transition-all"
            title="Search tools or forms..."
          >
            <Search className="h-4 w-4 text-slate-500" />
            <span className="hidden sm:inline">Search tools or forms...</span>
            <kbd className="hidden sm:inline rounded-sm bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 border border-slate-200">
              Ctrl+K
            </kbd>
          </button>

          {/* Auth Button or User Profile Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 rounded-xl p-1 hover:bg-slate-100 transition-colors"
              >
                <img
                  src={currentUser.photoURL || 'https://api.dicebear.com/7.x/initials/svg?seed=Aspirant'}
                  alt={currentUser.displayName}
                  className="h-8 w-8 rounded-full border border-slate-200 object-cover shadow-2xs"
                />
                <span className="hidden md:inline text-xs font-bold text-slate-800 max-w-[100px] truncate">
                  {currentUser.displayName}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white p-2 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <div className="text-xs font-bold text-slate-900">{currentUser.displayName}</div>
                    <div className="text-[11px] text-slate-500 truncate">{currentUser.email}</div>
                  </div>
                  <button
                    onClick={() => handleLinkClick('/dashboard')}
                    className="w-full flex items-center gap-2 rounded-lg p-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <LayoutDashboard className="h-4 w-4 text-blue-600" />
                    <span>Dashboard / Profile</span>
                  </button>
                  <button
                    onClick={() => handleLinkClick('/dashboard')}
                    className="w-full flex items-center gap-2 rounded-lg p-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span>Saved Tools ({currentUser.savedTools.length})</span>
                  </button>
                  <div className="my-1 border-t border-slate-100"></div>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2 rounded-lg p-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleLinkClick('/login')}
                className="rounded-xl px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:text-blue-600 hover:bg-slate-100 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => handleLinkClick('/signup')}
                className="hidden sm:inline-flex rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 active:scale-95 transition-all"
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => handleLinkClick('/')}
            className="w-full text-left py-2 font-bold text-slate-800 text-sm border-b border-slate-100"
          >
            Home
          </button>

          <div className="pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Photo & Signature Tools
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
              {TOOLS_DATA.filter((t) => t.category === 'photo').map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleLinkClick(t.slug)}
                  className="p-2 text-left rounded-lg bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              PDF Tools
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
              {TOOLS_DATA.filter((t) => t.category === 'pdf').map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleLinkClick(t.slug)}
                  className="p-2 text-left rounded-lg bg-slate-50 text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Sarkari Dates
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
              {DATE_CHECKER_TOOLS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleLinkClick(t.slug)}
                  className="p-2 text-left rounded-lg bg-amber-50 text-amber-900 hover:bg-amber-100"
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
            <button onClick={() => handleLinkClick('/about')}>About Us</button>
            <button onClick={() => handleLinkClick('/contact')}>Contact Support</button>
            <button onClick={() => handleLinkClick('/privacy-policy')}>Privacy</button>
            <button onClick={() => handleLinkClick('/terms')}>Terms</button>
          </div>
        </div>
      )}

      {/* Global Quick Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-slate-900/50 p-4 pt-20 backdrop-blur-xs">
          <div className="w-full max-w-xl rounded-2xl bg-white p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Search className="h-5 w-5 text-slate-400" />
              <input
                autoFocus
                type="text"
                placeholder="Search tools or forms (e.g. Resizer, SSC, IGNOU, Compress)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-hidden"
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-3 max-h-80 overflow-y-auto space-y-1">
              {searchQuery.trim() === '' ? (
                <div className="p-4 text-center text-xs text-slate-400">
                  Type tool name or exam name to search...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No results found. Try another keyword.
                </div>
              ) : (
                searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleLinkClick(item.slug)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50 cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="text-sm font-bold text-slate-800">{item.title}</div>
                      <div className="text-xs text-slate-500">{item.titleHindi}</div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
