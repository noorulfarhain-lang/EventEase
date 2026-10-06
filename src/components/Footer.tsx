import React from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { PageType } from '../types';
import { ACADEMIC_PROJECT_INFO } from '../data/mockData';
import { MapPin, Mail, Phone, Calendar, Heart, ShieldCheck, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategoryFilter } = useEventEase();

  const handleNav = (page: PageType, categoryFilter?: string) => {
    if (categoryFilter) {
      setSelectedCategoryFilter(categoryFilter);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#201D1E] text-[#ECE7E3] pt-16 pb-12 border-t border-[#3A3335]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#3A3335]">
          
          {/* Col 1 & 2: Brand & Academic Recognition */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif-title text-3xl font-bold tracking-tight text-white">
                EventEase
              </span>
            </div>
            <p className="text-sm text-[#BDB2AC] leading-relaxed max-w-sm">
              Event Planning & Management Platform designed to streamline celebrations, vendor discovery, budgeting, and milestone checklists with elegance.
            </p>

            {/* Academic badge card */}
            <div className="p-4 rounded-xl bg-[#2D282A] border border-[#443D3F] space-y-2 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E8A5B2]">
                <GraduationCap className="w-4 h-4 text-[#E8A5B2]" />
                <span>{ACADEMIC_PROJECT_INFO.courseName}</span>
              </div>
              <p className="text-xs text-[#E3DDD9]">
                <strong className="text-white">Developer:</strong> {ACADEMIC_PROJECT_INFO.studentName} · CMS {ACADEMIC_PROJECT_INFO.cmsId}
              </p>
              <p className="text-xs text-[#A89F99]">
                {ACADEMIC_PROJECT_INFO.department}, {ACADEMIC_PROJECT_INFO.university}
              </p>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#E8A5B2] mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D1C7C1]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                  Event Types
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('services')} className="hover:text-white transition-colors">
                  Service Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('planner')} className="hover:text-white transition-colors">
                  Event Planner
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('budget')} className="hover:text-white transition-colors">
                  Budget Calculator
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('checklist')} className="hover:text-white transition-colors">
                  Event Checklist
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('favorites')} className="hover:text-white transition-colors">
                  Saved Favorites
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Event Categories */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#E8A5B2] mb-4">
              Event Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-[#D1C7C1]">
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                  Royal Weddings
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                  Birthday Celebrations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                  Mehndi & Sangeet
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                  Engagement Ceremonies
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                  Graduation Convocations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('events')} className="hover:text-white transition-colors">
                  Corporate Galas & Summits
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Academic Campus */}
          <div>
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#E8A5B2] mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-[#D1C7C1]">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E8A5B2] shrink-0 mt-0.5" />
                <span>BUITEMS Campus, Airport Road, Quetta, Pakistan</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E8A5B2] shrink-0" />
                <a href="mailto:noorulfarhain@gmail.com" className="hover:text-white transition-colors">
                  noorulfarhain@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8A5B2] shrink-0" />
                <span>+92 (81) 289-9911</span>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#3A3335]">
              <button
                onClick={() => handleNav('contact')}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#801B2E] rounded-lg transition-colors text-center"
              >
                Send Us an Inquiry
              </button>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E948F] gap-4">
          <p>
            © 2026 EventEase Platform. Built for Web Technologies Semester Evaluation at BUITEMS.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
              About Project
            </button>
            <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors">
              Support & Inquiries
            </button>
            <span>v1.0 Release</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
