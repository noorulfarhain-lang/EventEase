import React, { useState } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { EVENT_CATEGORIES } from '../data/mockData';
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ListChecks, 
  PieChart, 
  Edit3,
  CalendarDays,
  PlusCircle
} from 'lucide-react';

export const EventPlannerPage: React.FC = () => {
  const { 
    activePlan, 
    allPlans, 
    createOrUpdatePlan, 
    setActivePlanById, 
    setCurrentPage, 
    loadEventSpecificChecklist 
  } = useEventEase();

  // Form State
  const [name, setName] = useState('');
  const [type, setType] = useState('Weddings');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [guests, setGuests] = useState<number | ''>(200);
  const [budget, setBudget] = useState<number | ''>(12000);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showCreateForm, setShowCreateForm] = useState(!activePlan);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide an event name or title';
    if (!date) errs.date = 'Please specify the event date';
    if (!location.trim()) errs.location = 'Please provide the planned location or venue';
    if (!guests || Number(guests) <= 0) errs.guests = 'Please enter a valid guest estimate';
    if (!budget || Number(budget) <= 0) errs.budget = 'Please enter an estimated budget';
    return errs;
  };

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    createOrUpdatePlan({
      name: name.trim(),
      type,
      date,
      location: location.trim(),
      guests: Number(guests),
      budget: Number(budget),
    });

    // Also populate checklist tasks recommended for this event type
    loadEventSpecificChecklist(type);

    setErrors({});
    setShowCreateForm(false);
  };

  // Calculate days remaining
  const getDaysRemaining = (eventDateStr: string) => {
    try {
      const eventDate = new Date(eventDateStr);
      const today = new Date();
      const diffTime = eventDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (isNaN(diffDays)) return null;
      return diffDays;
    } catch {
      return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
          Central Command
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#232120]">
          Event Planner Dashboard
        </h1>
        <p className="text-base text-[#5A524E]">
          Establish your event blueprint. Define date, guest capacity, and budget to generate synchronized task checklists and expenditure allocations.
        </p>
      </div>

      {/* Active Plan Dashboard Card (if exists) */}
      {activePlan && !showCreateForm && (
        <div className="bg-white rounded-3xl border border-[#E8E1D9] shadow-sm overflow-hidden animate-fade-in">
          
          <div className="bg-[#FAF7F2] p-6 sm:p-8 border-b border-[#E8E1D9] flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-[#6B1728] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded">
                  {activePlan.type}
                </span>
                <span className="text-xs text-[#8A817C]">Active Planning Blueprint</span>
              </div>
              <h2 className="font-serif-title text-3xl font-bold text-[#232120]">
                {activePlan.name}
              </h2>
              <p className="text-xs text-[#665E5A] flex items-center gap-1.5 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-[#6B1728]" />
                <span>{activePlan.location}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setName(activePlan.name);
                  setType(activePlan.type);
                  setDate(activePlan.date);
                  setLocation(activePlan.location);
                  setGuests(activePlan.guests);
                  setBudget(activePlan.budget);
                  setShowCreateForm(true);
                }}
                className="px-4 py-2 text-xs font-medium text-[#232120] bg-white hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-[#6B1728]" />
                <span>Edit Plan</span>
              </button>

              <button
                onClick={() => {
                  setName('');
                  setDate('');
                  setLocation('');
                  setGuests(150);
                  setBudget(10000);
                  setShowCreateForm(true);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Event</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#E8E1D9] bg-white">
            <div className="p-6 space-y-1">
              <span className="text-xs text-[#8A817C] uppercase font-medium">Event Date</span>
              <p className="font-serif-title text-xl font-bold text-[#232120] flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-[#6B1728]" />
                <span>{activePlan.date || 'To be scheduled'}</span>
              </p>
              {getDaysRemaining(activePlan.date) !== null && (
                <span className="text-[11px] text-[#6B1728] font-semibold">
                  {getDaysRemaining(activePlan.date)! > 0
                    ? `${getDaysRemaining(activePlan.date)} days remaining`
                    : 'Event date reached'}
                </span>
              )}
            </div>

            <div className="p-6 space-y-1">
              <span className="text-xs text-[#8A817C] uppercase font-medium">Expected Attendance</span>
              <p className="font-serif-title text-xl font-bold text-[#232120] flex items-center gap-2">
                <Users className="w-4 h-4 text-[#6B1728]" />
                <span className="tabular-nums">{activePlan.guests} Guests</span>
              </p>
              <span className="text-[11px] text-[#8A817C]">Seating & hospitality scale</span>
            </div>

            <div className="p-6 space-y-1">
              <span className="text-xs text-[#8A817C] uppercase font-medium">Total Allocated Budget</span>
              <p className="font-serif-title text-xl font-bold text-[#6B1728] flex items-center gap-1">
                <span className="tabular-nums">${activePlan.budget.toLocaleString()}</span>
              </p>
              <span className="text-[11px] text-[#8A817C]">Synchronized with Budget Tool</span>
            </div>

            <div className="p-6 space-y-1">
              <span className="text-xs text-[#8A817C] uppercase font-medium">Planning Status</span>
              <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Blueprint Active</span>
              </p>
              <span className="text-[11px] text-[#8A817C]">Checklist & budget ready</span>
            </div>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="p-6 bg-[#FAF7F2] border-t border-[#E8E1D9] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-[#5A524E]">
              Next steps: Fine-tune your budget allocations or manage preparation tasks.
            </span>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  setCurrentPage('budget');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-[#232120] bg-white hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <PieChart className="w-3.5 h-3.5 text-[#6B1728]" />
                <span>Open Budget Calculator</span>
              </button>

              <button
                onClick={() => {
                  setCurrentPage('checklist');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <ListChecks className="w-3.5 h-3.5" />
                <span>Open Event Checklist</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Plan Switcher (if multiple plans exist) */}
      {allPlans.length > 1 && !showCreateForm && (
        <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-3">
          <h3 className="font-serif-title text-xl font-bold text-[#232120]">
            Your Saved Event Blueprints ({allPlans.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {allPlans.map(plan => {
              const isSelected = activePlan?.id === plan.id;
              return (
                <div
                  key={plan.id}
                  onClick={() => setActivePlanById(plan.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-[#6B1728] bg-[#F4D6DB]/20 shadow-xs'
                      : 'border-[#E8E1D9] bg-[#FAF7F2] hover:bg-white'
                  }`}
                >
                  <div className="flex justify-between items-start text-xs">
                    <span className="font-semibold text-[#6B1728]">{plan.type}</span>
                    <span className="tabular-nums font-medium text-[#736A65]">${plan.budget.toLocaleString()}</span>
                  </div>
                  <h4 className="font-medium text-sm text-[#232120] mt-1 truncate">
                    {plan.name}
                  </h4>
                  <p className="text-xs text-[#8A817C] mt-0.5 truncate">{plan.date || 'TBD'} · {plan.guests} guests</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* The Create/Edit Plan Form */}
      {(showCreateForm || !activePlan) && (
        <div className="bg-white rounded-3xl border border-[#E8E1D9] p-6 sm:p-10 shadow-sm max-w-3xl mx-auto space-y-8 animate-fade-in">
          
          <div className="border-b border-[#E8E1D9] pb-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B1728]">
                Step 1: Event Configuration
              </span>
              <h2 className="font-serif-title text-3xl font-bold text-[#232120] mt-1">
                {activePlan ? 'Update Event Plan' : 'Create Your Event Plan'}
              </h2>
              <p className="text-xs text-[#665E5A] mt-1">
                Provide core parameters so EventEase can tailor checklists and budget guidelines.
              </p>
            </div>
            {activePlan && (
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="text-xs text-[#8A817C] hover:text-[#232120] underline"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleCreatePlan} className="space-y-6">
            
            {/* Event Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                Event Name / Celebration Title *
              </label>
              <input
                type="text"
                value={name}
                onChange={e => {
                  setName(e.target.value);
                  if (errors.name) setErrors({ ...errors, name: '' });
                }}
                placeholder="e.g. Zaid & Sarah’s Grand Wedding Gala"
                className={`w-full p-3 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                  errors.name ? 'border-red-500' : 'border-[#E8E1D9]'
                }`}
              />
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
            </div>

            {/* Event Type & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                  Event Category *
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value)}
                  className="w-full p-3 text-sm rounded-xl border border-[#E8E1D9] bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors"
                >
                  {EVENT_CATEGORIES.map(c => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                  Planned Event Date *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={e => {
                      setDate(e.target.value);
                      if (errors.date) setErrors({ ...errors, date: '' });
                    }}
                    className={`w-full p-3 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                      errors.date ? 'border-red-500' : 'border-[#E8E1D9]'
                    }`}
                  />
                </div>
                {errors.date && <p className="text-xs text-red-600 mt-1">{errors.date}</p>}
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                Event Location / City / Venue *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={e => {
                    setLocation(e.target.value);
                    if (errors.location) setErrors({ ...errors, location: '' });
                  }}
                  placeholder="e.g. Serena Hotel Ballroom, Quetta or Crystal Banquet"
                  className={`w-full p-3 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                    errors.location ? 'border-red-500' : 'border-[#E8E1D9]'
                  }`}
                />
              </div>
              {errors.location && <p className="text-xs text-red-600 mt-1">{errors.location}</p>}
            </div>

            {/* Guests & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                  Number of Guests *
                </label>
                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={e => {
                    setGuests(e.target.value ? Number(e.target.value) : '');
                    if (errors.guests) setErrors({ ...errors, guests: '' });
                  }}
                  placeholder="e.g. 250"
                  className={`w-full p-3 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                    errors.guests ? 'border-red-500' : 'border-[#E8E1D9]'
                  }`}
                />
                {errors.guests && <p className="text-xs text-red-600 mt-1">{errors.guests}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                  Estimated Total Budget ($) *
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={budget}
                  onChange={e => {
                    setBudget(e.target.value ? Number(e.target.value) : '');
                    if (errors.budget) setErrors({ ...errors, budget: '' });
                  }}
                  placeholder="e.g. 15000"
                  className={`w-full p-3 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                    errors.budget ? 'border-red-500' : 'border-[#E8E1D9]'
                  }`}
                />
                {errors.budget && <p className="text-xs text-red-600 mt-1">{errors.budget}</p>}
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E8E1D9]">
              {activePlan && (
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-5 py-3 text-xs font-medium text-[#665E5A] hover:text-[#232120]"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-7 py-3 text-sm font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl transition-colors shadow-sm flex items-center gap-2"
              >
                <span>{activePlan ? 'Save & Update Plan' : 'Create Plan & Generate Blueprint'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        </div>
      )}

    </div>
  );
};
