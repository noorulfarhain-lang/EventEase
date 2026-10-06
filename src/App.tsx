/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { EventEaseProvider, useEventEase } from './context/EventEaseContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ServiceInquiryModal } from './components/ServiceInquiryModal';
import { Toast } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { EventsPage } from './pages/EventsPage';
import { ServicesPage } from './pages/ServicesPage';
import { EventPlannerPage } from './pages/EventPlannerPage';
import { BudgetPlannerPage } from './pages/BudgetPlannerPage';
import { ChecklistPage } from './pages/ChecklistPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

const AppContent: React.FC = () => {
  const { currentPage } = useEventEase();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'events':
        return <EventsPage />;
      case 'services':
        return <ServicesPage />;
      case 'planner':
        return <EventPlannerPage />;
      case 'budget':
        return <BudgetPlannerPage />;
      case 'checklist':
        return <ChecklistPage />;
      case 'favorites':
        return <FavoritesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#232120]">
      <Navbar />
      <main className="flex-1">
        {renderCurrentPage()}
      </main>
      <Footer />
      <ServiceInquiryModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <EventEaseProvider>
      <AppContent />
    </EventEaseProvider>
  );
}
