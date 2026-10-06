import React from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { SERVICES_CATALOG } from '../data/mockData';
import { Heart, Trash2, ArrowRight, Star, MapPin, Sparkles } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favoriteIds, toggleFavorite, openInquiryModal, setCurrentPage } = useEventEase();

  const favoriteServices = SERVICES_CATALOG.filter(service =>
    favoriteIds.includes(service.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
          Curated Shortlist
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#232120]">
          Saved Favorite Services
        </h1>
        <p className="text-base text-[#5A524E]">
          Compare your top shortlisted venues, catering partners, and event specialists in one private collection.
        </p>
      </div>

      {favoriteServices.length === 0 ? (
        <div className="bg-white rounded-3xl border border-[#E8E1D9] p-12 sm:p-16 text-center space-y-4 max-w-2xl mx-auto">
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FAF7F2] border border-[#E8E1D9] flex items-center justify-center text-[#8A817C]">
            <Heart className="w-8 h-8 text-[#A89F99]" />
          </div>
          <h3 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#232120]">
            Your favorites list is currently empty
          </h3>
          <p className="text-sm text-[#5A524E] max-w-md mx-auto leading-relaxed">
            As you browse our event catalog, click the heart icon on any venue or service to save them here for quick side-by-side comparison.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-6 py-3 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-xs transition-colors inline-flex items-center gap-2"
            >
              <span>Explore Event Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#736A65]">
            <span>Showing <strong className="text-[#232120]">{favoriteServices.length}</strong> saved services</span>
            <button
              onClick={() => {
                setCurrentPage('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#6B1728] font-semibold hover:underline inline-flex items-center gap-1"
            >
              <span>Browse More Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteServices.map(service => (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-[#E8E1D9] overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#E8E1D9]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="bg-white/95 backdrop-blur-xs text-[#6B1728] text-[11px] font-semibold px-2.5 py-1 rounded-md">
                      {service.category}
                    </span>
                    <button
                      onClick={() => toggleFavorite(service.id)}
                      className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-rose-600 hover:text-rose-800 transition-colors shadow-xs"
                      title="Remove from favorites"
                      aria-label="Remove from favorites"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-semibold text-[#232120]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{service.rating}</span>
                        <span className="text-[#8A817C]">({service.reviewCount})</span>
                      </span>
                      <span className="font-bold text-sm text-[#6B1728]">
                        {service.priceDisplay}
                      </span>
                    </div>

                    <h3 className="font-serif-title text-xl font-bold text-[#232120] leading-snug">
                      {service.name}
                    </h3>

                    <div className="flex items-center gap-1 text-xs text-[#8A817C]">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{service.location}</span>
                    </div>

                    <p className="text-xs text-[#5A524E] leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-[#E8E1D9] flex items-center gap-2">
                    <button
                      onClick={() => openInquiryModal(service)}
                      className="flex-1 py-2.5 px-3 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl transition-colors shadow-xs text-center"
                    >
                      Request Quote
                    </button>
                    <button
                      onClick={() => toggleFavorite(service.id)}
                      className="py-2.5 px-3 text-xs font-medium text-[#736A65] hover:text-rose-700 bg-[#FAF7F2] hover:bg-rose-50 border border-[#E8E1D9] rounded-xl transition-colors"
                      title="Remove"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
