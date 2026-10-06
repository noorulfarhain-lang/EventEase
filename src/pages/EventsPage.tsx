import React, { useState } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { EVENT_CATEGORIES } from '../data/mockData';
import { EventCategory } from '../types';
import { 
  Users, 
  DollarSign, 
  CheckSquare, 
  ArrowRight, 
  Sparkles, 
  Filter,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { setCurrentPage, setSelectedCategoryFilter, loadEventSpecificChecklist } = useEventEase();
  const [selectedCategoryModal, setSelectedCategoryModal] = useState<EventCategory | null>(null);

  const handlePlanEvent = (category: EventCategory) => {
    // Navigate to event planner and auto-populate
    setCurrentPage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleViewServices = (category: EventCategory) => {
    // Select filter and navigate to services
    setSelectedCategoryFilter(null); // Or relevant filter
    setCurrentPage('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
          Occasions & Milestones
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#232120]">
          Event Categories
        </h1>
        <p className="text-base text-[#5A524E] leading-relaxed">
          Explore specialized planning frameworks for every milestone. From opulent wedding receptions and lively traditional mehndi nights to graduation convocations and corporate galas.
        </p>
      </div>

      {/* Grid of 7 Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENT_CATEGORIES.map(category => (
          <div
            key={category.id}
            className="rounded-3xl bg-white border border-[#E8E1D9] overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
          >
            {/* Image Header */}
            <div className="relative aspect-16/10 overflow-hidden bg-[#E8E1D9]">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-5">
                <div>
                  <h3 className="font-serif-title text-2xl font-bold text-white">
                    {category.name}
                  </h3>
                  <p className="text-xs text-[#F4D6DB] line-clamp-1">
                    {category.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <p className="text-sm text-[#5A524E] leading-relaxed">
                {category.description}
              </p>

              {/* Metadata details */}
              <div className="space-y-2 py-3 border-y border-[#F2ECE4] text-xs">
                <div className="flex items-center justify-between text-[#5A524E]">
                  <span className="flex items-center gap-1.5 text-[#8A817C]">
                    <Users className="w-3.5 h-3.5 text-[#6B1728]" />
                    <span>Typical Scale:</span>
                  </span>
                  <span className="font-semibold text-[#232120]">{category.typicalGuestRange}</span>
                </div>

                <div className="flex items-center justify-between text-[#5A524E]">
                  <span className="flex items-center gap-1.5 text-[#8A817C]">
                    <DollarSign className="w-3.5 h-3.5 text-[#6B1728]" />
                    <span>Estimated Budget:</span>
                  </span>
                  <span className="font-semibold text-[#6B1728]">{category.estimatedBudgetRange}</span>
                </div>

                <div className="flex items-center justify-between text-[#5A524E]">
                  <span className="flex items-center gap-1.5 text-[#8A817C]">
                    <CheckSquare className="w-3.5 h-3.5 text-[#6B1728]" />
                    <span>Key Milestones:</span>
                  </span>
                  <span className="font-semibold text-[#232120]">{category.recommendedChecklistCount} tasks recommended</span>
                </div>
              </div>

              {/* Popular Services list */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8A817C]">
                  Core Services Needed:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {category.popularServices.map((serviceName, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#5A524E] bg-[#FAF7F2] px-2.5 py-1 rounded-md border border-[#E8E1D9]"
                    >
                      {serviceName}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => handlePlanEvent(category)}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl transition-colors shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>Plan This Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setSelectedCategoryModal(category)}
                  className="py-2.5 px-3 text-xs font-medium text-[#232120] bg-[#FAF7F2] hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors"
                  title="View full category guide"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Category Details Modal */}
      {selectedCategoryModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-[#E8E1D9] animate-fade-in">
            <div className="relative aspect-16/9 bg-[#E8E1D9]">
              <img
                src={selectedCategoryModal.image}
                alt={selectedCategoryModal.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                <div>
                  <span className="text-xs font-semibold text-[#F4D6DB] uppercase tracking-wider">
                    Category Overview
                  </span>
                  <h3 className="font-serif-title text-3xl font-bold text-white">
                    {selectedCategoryModal.name}
                  </h3>
                  <p className="text-xs text-white/90">{selectedCategoryModal.tagline}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-sm text-[#5A524E] leading-relaxed">
                {selectedCategoryModal.description}
              </p>

              <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8E1D9] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#8A817C]">Recommended Budget:</span>
                  <strong className="text-[#6B1728]">{selectedCategoryModal.estimatedBudgetRange}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A817C]">Typical Guest Capacity:</span>
                  <strong className="text-[#232120]">{selectedCategoryModal.typicalGuestRange}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8A817C]">Checklist Guidance:</span>
                  <strong className="text-[#232120]">{selectedCategoryModal.recommendedChecklistCount} key tasks</strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-[#8A817C] mb-2">
                  Recommended Service Checklist
                </h4>
                <ul className="text-xs text-[#5A524E] space-y-1.5 list-disc pl-4">
                  {selectedCategoryModal.popularServices.map((srv, i) => (
                    <li key={i}>{srv}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E8E1D9]">
                <button
                  onClick={() => setSelectedCategoryModal(null)}
                  className="px-4 py-2 text-xs font-medium text-[#665E5A] hover:text-[#232120]"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedCategoryModal(null);
                    handlePlanEvent(selectedCategoryModal);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl"
                >
                  Start Planning {selectedCategoryModal.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
