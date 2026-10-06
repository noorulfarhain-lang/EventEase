import React, { useState, useMemo } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { SERVICES_CATALOG } from '../data/mockData';
import { ServiceItem, ServiceCategoryType } from '../types';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Heart, 
  SlidersHorizontal, 
  X, 
  Check, 
  Mail, 
  Phone,
  Info
} from 'lucide-react';

const CATEGORIES: ('All' | ServiceCategoryType)[] = [
  'All',
  'Venues',
  'Catering',
  'Decoration',
  'Photography',
  'Makeup & Beauty',
  'Music & Entertainment',
  'Invitation Services',
];

export const ServicesPage: React.FC = () => {
  const { 
    selectedCategoryFilter, 
    setSelectedCategoryFilter,
    toggleFavorite, 
    isFavorite, 
    openInquiryModal 
  } = useEventEase();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | ServiceCategoryType>(
    (selectedCategoryFilter as ServiceCategoryType) || 'All'
  );
  const [sortBy, setSortBy] = useState<'recommended' | 'rating' | 'price-asc' | 'price-desc'>('recommended');
  const [selectedServiceDetails, setSelectedServiceDetails] = useState<ServiceItem | null>(null);

  // Sync with context filter if set externally
  React.useEffect(() => {
    if (selectedCategoryFilter) {
      setActiveCategory(selectedCategoryFilter as ServiceCategoryType);
    }
  }, [selectedCategoryFilter]);

  const handleCategorySelect = (cat: 'All' | ServiceCategoryType) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setSelectedCategoryFilter(null);
    } else {
      setSelectedCategoryFilter(cat);
    }
  };

  const filteredServices = useMemo(() => {
    return SERVICES_CATALOG.filter(item => {
      // Category filter
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.shortDescription.toLowerCase().includes(query) || item.fullDescription.toLowerCase().includes(query);
        const matchesLoc = item.location.toLowerCase().includes(query);
        const matchesCat = item.category.toLowerCase().includes(query);
        const matchesFeatures = item.features.some(f => f.toLowerCase().includes(query));
        return matchesName || matchesDesc || matchesLoc || matchesCat || matchesFeatures;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-asc') return a.estimatedCost - b.estimatedCost;
      if (sortBy === 'price-desc') return b.estimatedCost - a.estimatedCost;
      return 0; // recommended
    });
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Introduction */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
          Curated Directory
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#232120]">
          Explore Event Services
        </h1>
        <p className="text-base text-[#5A524E]">
          Discover top-tier venues, gourmet catering, floral decorators, heirloom photographers, and entertainment specialists for your special event.
        </p>
      </div>

      {/* Search & Sort Controls Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E8E1D9] shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#8A817C]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by vendor name, service, location..."
              className="w-full pl-10 pr-9 py-2.5 text-sm rounded-xl border border-[#E8E1D9] bg-[#FAF7F2] text-[#232120] placeholder-[#8A817C] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8A817C] hover:text-[#232120]"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-[#5A524E] w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#8A817C]" />
            <span className="font-medium">Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="bg-[#FAF7F2] border border-[#E8E1D9] rounded-lg px-2.5 py-1.5 text-xs text-[#232120] focus:outline-none focus:border-[#6B1728]"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Category Tabs (Segmented Button Controls per anti-slop guidelines) */}
        <div className="pt-2 border-t border-[#F2ECE4] flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(category => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => handleCategorySelect(category)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  isSelected
                    ? 'bg-[#6B1728] text-white shadow-xs'
                    : 'bg-[#FAF7F2] text-[#5A524E] hover:bg-[#F2ECE4] hover:text-[#232120] border border-[#E8E1D9]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs text-[#736A65]">
        <div>
          Showing <span className="font-semibold text-[#232120]">{filteredServices.length}</span> verified services
          {activeCategory !== 'All' && <span> in <strong className="text-[#6B1728]">{activeCategory}</strong></span>}
          {searchQuery && <span> matching "<strong className="text-[#232120]">{searchQuery}</strong>"</span>}
        </div>
        {(activeCategory !== 'All' || searchQuery) && (
          <button
            onClick={() => {
              setActiveCategory('All');
              setSelectedCategoryFilter(null);
              setSearchQuery('');
            }}
            className="text-[#6B1728] hover:underline font-medium"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#E8E1D9] p-12 text-center space-y-3">
          <p className="font-serif-title text-2xl font-bold text-[#232120]">
            No services match your search
          </p>
          <p className="text-sm text-[#736A65] max-w-md mx-auto">
            Try adjusting your search keywords or switching categories to discover available venues and specialists.
          </p>
          <button
            onClick={() => {
              setActiveCategory('All');
              setSelectedCategoryFilter(null);
              setSearchQuery('');
            }}
            className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl"
          >
            View All Services
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => {
            const favorite = isFavorite(service.id);
            return (
              <div
                key={service.id}
                className="bg-white rounded-3xl border border-[#E8E1D9] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div className="relative aspect-16/10 overflow-hidden bg-[#E8E1D9]">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Chip & Favorite Button */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <span className="bg-white/95 backdrop-blur-xs text-[#6B1728] text-[11px] font-semibold px-2.5 py-1 rounded-md shadow-xs">
                      {service.category}
                    </span>

                    <button
                      onClick={() => toggleFavorite(service.id)}
                      className="w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-[#232120] hover:text-[#6B1728] transition-colors shadow-xs"
                      aria-label={favorite ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Heart className={`w-4 h-4 ${favorite ? 'text-[#6B1728] fill-[#6B1728]' : ''}`} />
                    </button>
                  </div>

                  {service.capacity && (
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2 py-0.5 rounded">
                      Capacity: {service.capacity}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-semibold text-[#232120]">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        <span>{service.rating}</span>
                        <span className="text-[#8A817C] font-normal">({service.reviewCount} reviews)</span>
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

                    <p className="text-xs text-[#5A524E] leading-relaxed line-clamp-2 pt-1">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="pt-2 border-t border-[#F2ECE4] space-y-1.5">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#8A817C]">
                      Key Highlights:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.features.slice(0, 3).map((feat, i) => (
                        <span
                          key={i}
                          className="text-[11px] text-[#5A524E] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#E8E1D9]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
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
                      onClick={() => setSelectedServiceDetails(service)}
                      className="py-2.5 px-3.5 text-xs font-medium text-[#232120] bg-[#FAF7F2] hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors"
                      title="View complete vendor profile"
                    >
                      Details
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Service Details Drawer / Modal */}
      {selectedServiceDetails && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E8E1D9] animate-fade-in">
            <div className="relative aspect-16/9 bg-[#E8E1D9]">
              <img
                src={selectedServiceDetails.image}
                alt={selectedServiceDetails.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedServiceDetails(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B1728]">
                  {selectedServiceDetails.category}
                </span>
                <h3 className="font-serif-title text-3xl font-bold text-[#232120]">
                  {selectedServiceDetails.name}
                </h3>
                <div className="flex flex-wrap items-center gap-4 text-xs text-[#5A524E] pt-1">
                  <span className="flex items-center gap-1 font-semibold text-[#232120]">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{selectedServiceDetails.rating}</span>
                    <span className="text-[#8A817C]">({selectedServiceDetails.reviewCount} client reviews)</span>
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8A817C]" />
                    <span>{selectedServiceDetails.location}</span>
                  </span>
                  <span>·</span>
                  <span className="font-bold text-[#6B1728]">{selectedServiceDetails.priceDisplay}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase text-[#8A817C] mb-2">
                  Detailed Service Overview
                </h4>
                <p className="text-sm text-[#5A524E] leading-relaxed">
                  {selectedServiceDetails.fullDescription}
                </p>
              </div>

              {/* Highlights & Features */}
              <div>
                <h4 className="text-xs font-semibold uppercase text-[#8A817C] mb-2.5">
                  Package Inclusions & Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedServiceDetails.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#232120] bg-[#FAF7F2] p-2 rounded-lg border border-[#E8E1D9]">
                      <Check className="w-3.5 h-3.5 text-[#6B1728] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Vendor Contact details */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#E8E1D9] flex flex-col sm:flex-row justify-between gap-4 text-xs">
                <div>
                  <span className="font-semibold text-[#232120]">Direct Coordination Desk:</span>
                  <p className="text-[#5A524E] mt-0.5">{selectedServiceDetails.contactEmail}</p>
                </div>
                <div>
                  <span className="font-semibold text-[#232120]">Contact Phone:</span>
                  <p className="text-[#5A524E] mt-0.5">{selectedServiceDetails.contactPhone}</p>
                </div>
              </div>

              {/* Actions footer */}
              <div className="pt-4 border-t border-[#E8E1D9] flex items-center justify-between">
                <button
                  onClick={() => toggleFavorite(selectedServiceDetails.id)}
                  className="flex items-center gap-2 text-xs font-medium text-[#232120] hover:text-[#6B1728] transition-colors"
                >
                  <Heart className={`w-4 h-4 ${isFavorite(selectedServiceDetails.id) ? 'text-[#6B1728] fill-[#6B1728]' : ''}`} />
                  <span>{isFavorite(selectedServiceDetails.id) ? 'Saved in Favorites' : 'Add to Favorites'}</span>
                </button>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedServiceDetails(null)}
                    className="px-4 py-2 text-xs font-medium text-[#665E5A] hover:text-[#232120]"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const srv = selectedServiceDetails;
                      setSelectedServiceDetails(null);
                      openInquiryModal(srv);
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-xs"
                  >
                    Send Inquiry Request
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
