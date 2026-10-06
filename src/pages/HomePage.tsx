import React from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { EVENT_CATEGORIES, SERVICES_CATALOG, ASSET_IMAGES } from '../data/mockData';
import { 
  ArrowRight, 
  Calendar, 
  Calculator, 
  CheckSquare, 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Star,
  MapPin,
  ChevronRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { 
    setCurrentPage, 
    setSelectedCategoryFilter, 
    toggleFavorite, 
    isFavorite, 
    openInquiryModal 
  } = useEventEase();

  const featuredServices = SERVICES_CATALOG.slice(0, 4);
  const featuredCategories = EVENT_CATEGORIES.slice(0, 4);

  const handleCategoryClick = (categoryName: string) => {
    setCurrentPage('events');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartPlanning = () => {
    setCurrentPage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-10 sm:pt-16 lg:pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Proposition & CTA */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
                <span>Elegance · Clarity · Flawless Execution</span>
              </div>

              <h1 className="font-serif-title text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#232120] leading-[1.1] text-balance">
                Plan Your Perfect Event with Ease
              </h1>

              <p className="text-base sm:text-lg text-[#5A524E] leading-relaxed max-w-xl">
                EventEase simplifies your entire celebration journey. Explore verified venues, allocate your budget with clarity, track tasks, and curate dream services for weddings, birthdays, mehndi, and corporate galas.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={handleStartPlanning}
                  className="px-6 py-3.5 text-sm font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <span>Start Planning</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('services');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 text-sm font-semibold text-[#232120] bg-white hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors"
                >
                  Explore Services
                </button>
              </div>

              {/* Unboxed Proof Metrics (Anti-Slop rule: no static pill enclosures) */}
              <div className="pt-6 border-t border-[#E8E1D9] flex flex-wrap items-center gap-4 text-xs font-medium text-[#736A65]">
                <span>7 Core Event Types</span>
                <span aria-hidden="true">·</span>
                <span>Real-Time Budget Estimator</span>
                <span aria-hidden="true">·</span>
                <span>Interactive Milestone Checklist</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Asset */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#E8E1D9] bg-[#EFE7DE] aspect-16/10">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Luxurious wedding and gala celebration banquet setup"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 sm:p-8">
                  <div className="text-white space-y-1">
                    <p className="text-xs uppercase tracking-wider font-semibold text-[#F4D6DB]">
                      Featured Luxury Setting
                    </p>
                    <h3 className="font-serif-title text-xl sm:text-2xl font-bold">
                      The Grand Royale Crystal Ballroom
                    </h3>
                    <p className="text-xs text-white/80">
                      Metropolitan City Center · Up to 650 Guests · Bespoke Hospitality
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Popular Event Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
              Curated Occasions
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#232120] mt-1">
              Popular Event Categories
            </h2>
            <p className="text-sm text-[#665E5A] mt-1">
              Select your milestone occasion to discover specialized planning workflows.
            </p>
          </div>
          <button
            onClick={() => {
              setCurrentPage('events');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-semibold text-[#6B1728] hover:text-[#561120] inline-flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All 7 Categories</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map(cat => (
            <div
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group cursor-pointer rounded-2xl bg-white border border-[#E8E1D9] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-4/3 relative overflow-hidden bg-[#E8E1D9]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#6B1728]">
                  {cat.typicalGuestRange}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="font-serif-title text-xl font-bold text-[#232120] group-hover:text-[#6B1728] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#665E5A] line-clamp-2 mt-1 leading-relaxed">
                    {cat.tagline}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2ECE4] flex items-center justify-between text-xs">
                  <span className="text-[#8A817C] font-medium">{cat.estimatedBudgetRange}</span>
                  <span className="text-[#6B1728] font-semibold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Explore
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Services Directory Preview */}
      <section className="bg-white py-16 border-y border-[#E8E1D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
                Handpicked Vendors
              </span>
              <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#232120] mt-1">
                Featured Event Services
              </h2>
              <p className="text-sm text-[#665E5A] mt-1">
                Top-rated venues, catering, photography, and decor ateliers verified for quality.
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-sm font-semibold text-[#6B1728] hover:text-[#561120] inline-flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore All Services</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredServices.map(srv => {
              const favorite = isFavorite(srv.id);
              return (
                <div
                  key={srv.id}
                  className="rounded-2xl border border-[#E8E1D9] bg-[#FAF7F2] overflow-hidden flex flex-col justify-between hover:shadow-md transition-all group"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-[#E8E1D9]">
                    <img
                      src={srv.image}
                      alt={srv.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Favorite Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(srv.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#232120] hover:text-[#6B1728] transition-colors shadow-xs"
                      aria-label={favorite ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${favorite ? 'text-[#6B1728] fill-[#6B1728]' : ''}`} />
                    </button>

                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[11px] font-medium">
                      {srv.category}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#665E5A] mb-1">
                        <span className="flex items-center gap-1 font-semibold text-[#232120]">
                          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                          <span>{srv.rating}</span>
                          <span className="text-[#8A817C] font-normal">({srv.reviewCount})</span>
                        </span>
                        <span className="font-semibold text-[#6B1728]">{srv.priceDisplay}</span>
                      </div>

                      <h3 className="font-serif-title text-lg font-bold text-[#232120] leading-snug line-clamp-1">
                        {srv.name}
                      </h3>

                      <p className="text-xs text-[#665E5A] mt-1 line-clamp-2">
                        {srv.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E8E1D9] flex items-center gap-2">
                      <button
                        onClick={() => openInquiryModal(srv)}
                        className="flex-1 py-2 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-lg transition-colors text-center"
                      >
                        Request Quote
                      </button>
                      <button
                        onClick={() => {
                          setCurrentPage('services');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="py-2 px-3 text-xs font-medium text-[#232120] bg-white hover:bg-[#EFE7DE] border border-[#E8E1D9] rounded-lg transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Why Choose EventEase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
            Thoughtful Platform Features
          </span>
          <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-[#232120]">
            Why Event Organizers Choose EventEase
          </h2>
          <p className="text-sm text-[#665E5A]">
            Everything you need to orchestrate milestone occasions without stress or chaos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F4D6DB]/50 flex items-center justify-center text-[#6B1728]">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#232120]">
              Unified Event Planner
            </h3>
            <p className="text-xs text-[#665E5A] leading-relaxed">
              Consolidate event dates, guest estimates, location specifications, and core milestones in a cohesive digital plan.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F4D6DB]/50 flex items-center justify-center text-[#6B1728]">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#232120]">
              Real-Time Budget Planner
            </h3>
            <p className="text-xs text-[#665E5A] leading-relaxed">
              Divide total budget across venue, catering, decoration, and photography with automatic remaining expense indicators.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F4D6DB]/50 flex items-center justify-center text-[#6B1728]">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#232120]">
              Milestone Checklist
            </h3>
            <p className="text-xs text-[#665E5A] leading-relaxed">
              Step-by-step task organizer from booking the venue to finalizing RSVPs. Add, complete, and track tasks at your own pace.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#F4D6DB]/50 flex items-center justify-center text-[#6B1728]">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif-title text-xl font-bold text-[#232120]">
              Saved Favorites & Inquiries
            </h3>
            <p className="text-xs text-[#665E5A] leading-relaxed">
              Bookmark preferred services, compare features, and send direct inquiry requests with one seamless click.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Call To Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#6B1728] text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#F4D6DB]">
              Start Your Celebration Journey
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Design an Unforgettable Event?
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed">
              Create your event plan today. Set your budget, populate your checklist, and discover verified service partners in minutes.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                onClick={handleStartPlanning}
                className="px-6 py-3.5 text-sm font-semibold text-[#6B1728] bg-white hover:bg-[#FAF7F2] rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <span>Create Your Plan Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setCurrentPage('budget');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-xl transition-colors"
              >
                Calculate Budget
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
