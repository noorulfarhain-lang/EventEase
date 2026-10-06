import React, { useState } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { PageType } from '../types';
import { Heart, Menu, X, CalendarCheck, Sparkles, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, favoriteIds } = useEventEase();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);

  const mainLinks: { label: string; page: PageType }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Events', page: 'events' },
    { label: 'Services', page: 'services' },
    { label: 'Event Planner', page: 'planner' },
    { label: 'Budget', page: 'budget' },
    { label: 'Checklist', page: 'checklist' },
  ];

  const secondaryLinks: { label: string; page: PageType }[] = [
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageType) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Zone 1: Brand Wordmark (Single text element in display face) */}
          <button
            onClick={() => handleNavClick('home')}
            className="group flex items-center text-left focus:outline-none"
            aria-label="EventEase Home"
          >
            <span className="font-serif-title text-3xl font-bold tracking-tight text-[#6B1728] transition-colors group-hover:text-[#561120]">
              EventEase
            </span>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-[#232120]/80">
            {mainLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-[#6B1728] font-semibold bg-[#F4D6DB]/40'
                      : 'hover:text-[#6B1728] hover:bg-[#F2ECE4]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* More Dropdown for About & Contact */}
            <div className="relative">
              <button
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                  currentPage === 'about' || currentPage === 'contact'
                    ? 'text-[#6B1728] font-semibold bg-[#F4D6DB]/40'
                    : 'hover:text-[#6B1728] hover:bg-[#F2ECE4]'
                }`}
              >
                <span>Company</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {moreDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-[#E8E1D9] py-1 z-50 animate-fade-in"
                  onMouseLeave={() => setMoreDropdownOpen(false)}
                >
                  {secondaryLinks.map(link => (
                    <button
                      key={link.page}
                      onClick={() => handleNavClick(link.page)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        currentPage === link.page
                          ? 'bg-[#F4D6DB]/30 text-[#6B1728] font-semibold'
                          : 'text-[#232120] hover:bg-[#FAF7F2] hover:text-[#6B1728]'
                      }`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Zone 3: Actions (Favorites + Primary Action) */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('favorites')}
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors border ${
                currentPage === 'favorites'
                  ? 'bg-[#6B1728] text-white border-[#6B1728]'
                  : 'bg-white text-[#232120] border-[#E8E1D9] hover:border-[#6B1728] hover:text-[#6B1728]'
              }`}
              title="Saved Favorites"
              aria-label="Favorites"
            >
              <Heart className={`w-4 h-4 ${favoriteIds.length > 0 && currentPage !== 'favorites' ? 'text-[#6B1728] fill-[#F4D6DB]' : ''}`} />
              {favoriteIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6B1728] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm">
                  {favoriteIds.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('planner')}
              className="px-5 py-2.5 text-sm font-semibold text-white bg-[#6B1728] hover:bg-[#561120] transition-colors rounded-xl shadow-sm hover:shadow whitespace-nowrap flex items-center gap-2"
            >
              <span>Start Planning</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('favorites')}
              className="relative p-2 text-[#232120] hover:text-[#6B1728]"
              aria-label="Favorites"
            >
              <Heart className="w-5 h-5" />
              {favoriteIds.length > 0 && (
                <span className="absolute top-1 right-1 bg-[#6B1728] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {favoriteIds.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#232120] hover:text-[#6B1728] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8E1D9] bg-[#FAF7F2] px-4 pt-3 pb-6 space-y-1">
          {[...mainLinks, ...secondaryLinks].map(link => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-[#F4D6DB]/50 text-[#6B1728] font-bold'
                    : 'text-[#232120] hover:bg-white hover:text-[#6B1728]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
          <div className="pt-3 border-t border-[#E8E1D9]">
            <button
              onClick={() => handleNavClick('planner')}
              className="w-full py-3 text-center text-sm font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-sm"
            >
              Start Planning Event
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
