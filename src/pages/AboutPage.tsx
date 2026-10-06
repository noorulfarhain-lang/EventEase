import React, { useState } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { ACADEMIC_PROJECT_INFO, FAQ_ITEMS } from '../data/mockData';
import { 
  GraduationCap, 
  Code, 
  CheckCircle, 
  Sparkles, 
  Users, 
  Calendar, 
  ChevronDown, 
  Layers, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setCurrentPage } = useEventEase();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. Header / Hero */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
          Our Vision & Mission
        </span>
        <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#232120]">
          About EventEase
        </h1>
        <p className="text-base sm:text-lg text-[#5A524E] leading-relaxed">
          EventEase is a modern, responsive event planning and management platform designed to make event organization easier, faster, and more convenient for host families, students, and organizations.
        </p>
      </div>

      {/* 2. Academic Project Credentials Banner */}
      <div className="bg-[#FAF7F2] rounded-3xl border border-[#E8E1D9] p-8 sm:p-10 shadow-xs relative overflow-hidden">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
            <GraduationCap className="w-4 h-4 text-[#6B1728]" />
            <span>Academic Capstone Project</span>
          </div>

          <h2 className="font-serif-title text-3xl font-bold text-[#232120]">
            Web Technologies Semester Project
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-sm text-[#5A524E]">
            <div>
              <span className="text-xs text-[#8A817C] uppercase font-semibold block">Prepared By:</span>
              <strong className="text-base text-[#232120]">{ACADEMIC_PROJECT_INFO.studentName}</strong>
              <p className="text-xs text-[#665E5A]">CMS ID: {ACADEMIC_PROJECT_INFO.cmsId}</p>
            </div>

            <div>
              <span className="text-xs text-[#8A817C] uppercase font-semibold block">Institution:</span>
              <strong className="text-base text-[#232120]">{ACADEMIC_PROJECT_INFO.university}</strong>
              <p className="text-xs text-[#665E5A]">{ACADEMIC_PROJECT_INFO.department}</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E8E1D9] flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8A817C] font-medium mr-2">Built With:</span>
            {ACADEMIC_PROJECT_INFO.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="text-xs text-[#6B1728] bg-white px-2.5 py-1 rounded-md border border-[#E8E1D9] font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. The Problem & The Solution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Problem */}
        <div className="bg-white p-8 rounded-3xl border border-[#E8E1D9] space-y-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-rose-700">
            The Problem
          </span>
          <h3 className="font-serif-title text-2xl font-bold text-[#232120]">
            Fragmented Event Coordination
          </h3>
          <p className="text-sm text-[#5A524E] leading-relaxed">
            Planning an event typically requires juggling multiple independent vendors across disparate messaging apps, notebook scraps, and mental calculations. People struggle to track escalating expenses, forget critical timeline tasks, and lose visibility into overall progress.
          </p>
          <ul className="text-xs text-[#665E5A] space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Budget overruns due to lack of category breakdown</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Last-minute vendor discovery panics</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Missed milestones such as tasting sessions & RSVP cutoffs</span>
            </li>
          </ul>
        </div>

        {/* Solution */}
        <div className="bg-white p-8 rounded-3xl border border-[#E8E1D9] space-y-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#6B1728]">
            The Solution
          </span>
          <h3 className="font-serif-title text-2xl font-bold text-[#232120]">
            EventEase Unified Ecosystem
          </h3>
          <p className="text-sm text-[#5A524E] leading-relaxed">
            EventEase brings together all required components into one cohesive, beautifully designed interface. From instant budget estimations and dynamic task checklists to curated vendor shortlists and streamlined service inquiries.
          </p>
          <ul className="text-xs text-[#665E5A] space-y-2 pt-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B1728]" />
              <span>Real-time budget calculator with remaining balance alerts</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B1728]" />
              <span>Interactive checklists tailored to specific event types</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6B1728]" />
              <span>Direct service inquiries with transparent pricing previews</span>
            </li>
          </ul>
        </div>

      </div>

      {/* 4. Target Users */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B1728]">
            Audience
          </span>
          <h3 className="font-serif-title text-3xl font-bold text-[#232120]">
            Designed For Every Host
          </h3>
          <p className="text-xs text-[#736A65]">
            Tailored tools for diverse celebratory needs and scales.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-2">
            <h4 className="font-serif-title text-lg font-bold text-[#232120]">
              Couples & Families
            </h4>
            <p className="text-xs text-[#665E5A] leading-relaxed">
              Planning weddings, mehndi, sangeet, and engagements with grand traditional and modern aesthetics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-2">
            <h4 className="font-serif-title text-lg font-bold text-[#232120]">
              Students & Youth
            </h4>
            <p className="text-xs text-[#665E5A] leading-relaxed">
              Organizing graduation banquets, university farewells, milestone birthday parties, and casual gatherings.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-2">
            <h4 className="font-serif-title text-lg font-bold text-[#232120]">
              New Parents
            </h4>
            <p className="text-xs text-[#665E5A] leading-relaxed">
              Hosting baby showers, gender reveals, and infant welcoming luncheons with gentle pastel aesthetics.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-[#E8E1D9] space-y-2">
            <h4 className="font-serif-title text-lg font-bold text-[#232120]">
              Businesses & Teams
            </h4>
            <p className="text-xs text-[#665E5A] leading-relaxed">
              Managing corporate conferences, annual stakeholder galas, award dinners, and product reveals.
            </p>
          </div>
        </div>
      </div>

      {/* 5. Frequently Asked Questions */}
      <div className="space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6B1728]">
            Common Queries
          </span>
          <h3 className="font-serif-title text-3xl font-bold text-[#232120]">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E8E1D9] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif-title text-lg font-bold text-[#232120] hover:text-[#6B1728] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#8A817C] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm text-[#5A524E] border-t border-[#F2ECE4] leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. CTA Footer */}
      <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#E8E1D9] flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif-title text-2xl font-bold text-[#232120]">
            Experience the EventEase Difference
          </h4>
          <p className="text-xs text-[#665E5A]">
            Take the first step toward stress-free celebration management.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentPage('planner');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-6 py-3 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Start Planning Now</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
