import React, { useState } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { X, Send, Calendar, Users, Mail, Phone, User, CheckCircle2 } from 'lucide-react';

export const ServiceInquiryModal: React.FC = () => {
  const { inquiryModal, closeInquiryModal, showToast } = useEventEase();
  const { isOpen, service } = inquiryModal;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [guestCount, setGuestCount] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!phone.trim()) errs.phone = 'Please provide a contact phone number';
    if (!eventDate) errs.eventDate = 'Please select your anticipated event date';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setSubmitted(true);
    showToast(`Inquiry sent for ${service?.name || 'Selected Service'}!`, 'success');

    setTimeout(() => {
      setSubmitted(false);
      setFullName('');
      setEmail('');
      setPhone('');
      setEventDate('');
      setGuestCount('');
      setNotes('');
      setErrors({});
      closeInquiryModal();
    }, 2200);
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#E8E1D9] animate-fade-in"
      >
        {/* Header */}
        <div className="bg-[#FAF7F2] p-6 border-b border-[#E8E1D9] flex items-start justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6B1728]">
              Service Inquiry & Booking Request
            </span>
            <h3 className="font-serif-title text-2xl font-bold text-[#232120] mt-1">
              {service ? service.name : 'Request Event Service'}
            </h3>
            {service && (
              <p className="text-xs text-[#665E5A] mt-1">
                {service.category} · {service.priceDisplay} · {service.location}
              </p>
            )}
          </div>
          <button
            onClick={closeInquiryModal}
            className="p-1 rounded-full text-[#665E5A] hover:text-[#232120] hover:bg-black/5 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-14 h-14 mx-auto rounded-full bg-[#F4D6DB]/50 flex items-center justify-center text-[#6B1728]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-serif-title text-2xl font-bold text-[#232120]">
                Inquiry Successfully Submitted!
              </h4>
              <p className="text-sm text-[#665E5A] max-w-sm mx-auto">
                Thank you, {fullName}. The team at {service?.name || 'EventEase'} will reach out to you via {email} shortly to confirm availability.
              </p>
              <div className="pt-2 text-xs text-[#801B2E] font-medium">
                Inquiry Reference: #EE-{Math.floor(100000 + Math.random() * 900000)}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-medium text-[#232120] mb-1">
                  Your Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A817C]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Amina Tariq"
                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                      errors.fullName ? 'border-red-500' : 'border-[#E8E1D9]'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-xs text-red-600 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#232120] mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A817C]">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="amina@example.com"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#E8E1D9]'
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#232120] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A817C]">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors({ ...errors, phone: '' });
                      }}
                      placeholder="+92 300 1234567"
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-[#E8E1D9]'
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone}</p>}
                </div>
              </div>

              {/* Event Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#232120] mb-1">
                    Event Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A817C]">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={e => {
                        setEventDate(e.target.value);
                        if (errors.eventDate) setErrors({ ...errors, eventDate: '' });
                      }}
                      className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors ${
                        errors.eventDate ? 'border-red-500' : 'border-[#E8E1D9]'
                      }`}
                    />
                  </div>
                  {errors.eventDate && <p className="text-xs text-red-600 mt-1">{errors.eventDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#232120] mb-1">
                    Estimated Guests
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A817C]">
                      <Users className="w-4 h-4" />
                    </div>
                    <input
                      type="number"
                      min="1"
                      value={guestCount}
                      onChange={e => setGuestCount(e.target.value ? Number(e.target.value) : '')}
                      placeholder="e.g. 250"
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-[#E8E1D9] bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-medium text-[#232120] mb-1">
                  Special Notes or Requirements
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Tell the vendor about specific themes, dietary preferences, or timing..."
                  className="w-full p-3 text-sm rounded-lg border border-[#E8E1D9] bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] transition-colors resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={closeInquiryModal}
                  className="px-4 py-2 text-xs font-medium text-[#665E5A] hover:text-[#232120] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Inquiry Request</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
