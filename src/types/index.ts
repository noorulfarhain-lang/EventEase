export type PageType = 
  | 'home' 
  | 'events' 
  | 'services' 
  | 'planner' 
  | 'budget' 
  | 'checklist' 
  | 'favorites' 
  | 'about' 
  | 'contact';

export interface EventCategory {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  popularServices: string[];
  estimatedBudgetRange: string;
  typicalGuestRange: string;
  recommendedChecklistCount: number;
}

export type ServiceCategoryType = 
  | 'Venues' 
  | 'Catering' 
  | 'Decoration' 
  | 'Photography' 
  | 'Makeup & Beauty' 
  | 'Music & Entertainment' 
  | 'Invitation Services';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategoryType;
  shortDescription: string;
  fullDescription: string;
  priceDisplay: string;
  estimatedCost: number;
  location: string;
  rating: number;
  reviewCount: number;
  image: string;
  features: string[];
  capacity?: string;
  contactEmail: string;
  contactPhone: string;
}

export interface EventPlan {
  id: string;
  name: string;
  type: string;
  date: string;
  location: string;
  guests: number;
  budget: number;
  createdAt: string;
}

export interface BudgetBreakdown {
  venue: number;
  catering: number;
  decoration: number;
  photography: number;
  entertainment: number;
  other: number;
}

export interface ExpenseItem {
  id: string;
  title: string;
  category: keyof BudgetBreakdown;
  amount: number;
  paid: boolean;
  notes?: string;
}

export interface ChecklistTask {
  id: string;
  title: string;
  category: string;
  timeline: string; // e.g. "3 Months Before", "1 Month Before", "Event Week"
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface InquiryFormState {
  serviceId?: string;
  serviceName?: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  eventDate: string;
  guestCount: number | '';
  notes: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  eventType: string;
  subject: string;
  message: string;
}
