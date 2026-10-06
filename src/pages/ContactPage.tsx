import React, { useState } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  CheckCircle2, 
  GraduationCap, 
  MessageSquare,
  Sparkles
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useEventEase();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [eventType, setEventType] = useState('Weddings');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please enter your full name';
    if (!email.trim()) {
      errs.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please provide a valid email format';
    }
    if (!subject.trim()) errs.subject = 'Please enter an inquiry subject';
    if (!message.trim() || message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters';
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedMessage(ticketId);
    showToast(`Inquiry #${ticketId} submitted successfully!`, 'success');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setEventType('Weddings');
    setSubject('');
    setMessage('');
    setErrors({});
    setSubmittedMessage(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Title */}
      <div className="max-w-3xl space-y-2">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
          Support & Vendor Requests
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#232120]">
          Contact EventEase
        </h1>
        <p className="text-base text-[#5A524E]">
          Have a question about event coordination, vendor partnerships, or our semester project platform? Send us a message and our team will get back to you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Information Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E1D9] shadow-xs space-y-6">
            <h3 className="font-serif-title text-2xl font-bold text-[#232120]">
              Get in Touch Directly
            </h3>

            <div className="space-y-5 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8E1D9] flex items-center justify-center text-[#6B1728] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#8A817C] uppercase font-semibold block">Email Support</span>
                  <a href="mailto:noorulfarhain@gmail.com" className="font-medium text-[#232120] hover:text-[#6B1728] transition-colors">
                    noorulfarhain@gmail.com
                  </a>
                  <p className="text-xs text-[#736A65] mt-0.5">Average response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8E1D9] flex items-center justify-center text-[#6B1728] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#8A817C] uppercase font-semibold block">Phone Assistance</span>
                  <p className="font-medium text-[#232120]">+92 (81) 289-9911</p>
                  <p className="text-xs text-[#736A65] mt-0.5">Monday – Saturday: 9:00 AM – 6:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8E1D9] flex items-center justify-center text-[#6B1728] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#8A817C] uppercase font-semibold block">University Campus</span>
                  <p className="font-medium text-[#232120]">
                    Department of Information Technology, BUITEMS
                  </p>
                  <p className="text-xs text-[#736A65] mt-0.5">Airport Road, Baleli, Quetta, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E8E1D9] flex items-center justify-center text-[#6B1728] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-[#8A817C] uppercase font-semibold block">Planning Office Hours</span>
                  <p className="font-medium text-[#232120]">9:00 AM – 6:00 PM (PKT)</p>
                  <p className="text-xs text-[#736A65] mt-0.5">Closed on Sundays & Gazetted Holidays</p>
                </div>
              </div>
            </div>

          </div>

          {/* Academic Attribution Badge */}
          <div className="bg-[#FAF7F2] p-6 rounded-3xl border border-[#E8E1D9] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[#6B1728]">
              <GraduationCap className="w-4 h-4 text-[#6B1728]" />
              <span>Project Submission</span>
            </div>
            <p className="text-xs text-[#5A524E] leading-relaxed">
              Designed & Developed by <strong>Noor-Ul-Farhain</strong> (CMS: 66426) for the <strong>Web Technologies Semester Evaluation</strong> at BUITEMS.
            </p>
          </div>

        </div>

        {/* Right Column: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E1D9] shadow-xs">
            
            {submittedMessage ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F4D6DB]/60 flex items-center justify-center text-[#6B1728]">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif-title text-3xl font-bold text-[#232120]">
                  Message Successfully Sent!
                </h3>
                <p className="text-sm text-[#5A524E] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {name}. Your inquiry has been registered with confirmation reference <strong className="text-[#6B1728]">{submittedMessage}</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-xs transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-[#E8E1D9] pb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6B1728]">
                    Inquiry Form
                  </span>
                  <h3 className="font-serif-title text-2xl font-bold text-[#232120] mt-1">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-[#736A65] mt-0.5">
                    Fill in your details below and we will respond to your registered email address.
                  </p>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => {
                        setName(e.target.value);
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      placeholder="e.g. Farhan Ahmed"
                      className={`w-full p-2.5 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] ${
                        errors.name ? 'border-red-500' : 'border-[#E8E1D9]'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      placeholder="farhan@example.com"
                      className={`w-full p-2.5 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] ${
                        errors.email ? 'border-red-500' : 'border-[#E8E1D9]'
                      }`}
                    />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Event Type & Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                      Relevant Event Type
                    </label>
                    <select
                      value={eventType}
                      onChange={e => setEventType(e.target.value)}
                      className="w-full p-2.5 text-sm rounded-xl border border-[#E8E1D9] bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:border-[#6B1728]"
                    >
                      <option value="Weddings">Weddings</option>
                      <option value="Birthdays">Birthdays</option>
                      <option value="Engagements">Engagements</option>
                      <option value="Mehndi">Mehndi & Sangeet</option>
                      <option value="Graduations">Graduations</option>
                      <option value="Baby Showers">Baby Showers</option>
                      <option value="Corporate Events">Corporate Events</option>
                      <option value="General Inquiry">General Platform Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                      Subject Line *
                    </label>
                    <input
                      type="text"
                      value={subject}
                      onChange={e => {
                        setSubject(e.target.value);
                        if (errors.subject) setErrors({ ...errors, subject: '' });
                      }}
                      placeholder="e.g. Venue booking quote or custom checklist help"
                      className={`w-full p-2.5 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] ${
                        errors.subject ? 'border-red-500' : 'border-[#E8E1D9]'
                      }`}
                    />
                    {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1.5">
                    Your Message / Inquiry Details *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={e => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors({ ...errors, message: '' });
                    }}
                    placeholder="Describe your event dates, question, or vendor service inquiry..."
                    className={`w-full p-3 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] resize-none ${
                      errors.message ? 'border-red-500' : 'border-[#E8E1D9]'
                    }`}
                  />
                  {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
                </div>

                {/* Submit button */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-7 py-3 text-sm font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-xs transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
