import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  PageType, 
  EventPlan, 
  BudgetBreakdown, 
  ChecklistTask, 
  ServiceItem 
} from '../types';
import { 
  DEFAULT_CHECKLIST_TASKS, 
  INITIAL_BUDGET_BREAKDOWN,
  SERVICES_CATALOG
} from '../data/mockData';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface EventEaseContextType {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  selectedCategoryFilter: string | null;
  setSelectedCategoryFilter: (category: string | null) => void;
  
  // Event Plans
  activePlan: EventPlan | null;
  allPlans: EventPlan[];
  createOrUpdatePlan: (data: Omit<EventPlan, 'id' | 'createdAt'>) => void;
  setActivePlanById: (id: string) => void;

  // Budget
  budgetBreakdown: BudgetBreakdown;
  totalBudgetLimit: number;
  setTotalBudgetLimit: (amount: number) => void;
  updateBudgetCategory: (category: keyof BudgetBreakdown, amount: number) => void;
  resetBudgetToDefaults: () => void;

  // Checklist
  checklistTasks: ChecklistTask[];
  addTask: (title: string, category: string, priority?: 'low' | 'medium' | 'high') => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  resetChecklistToDefaults: () => void;
  loadEventSpecificChecklist: (eventType: string) => void;

  // Favorites
  favoriteIds: string[];
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;

  // Inquiry Modal
  inquiryModal: {
    isOpen: boolean;
    service?: ServiceItem;
  };
  openInquiryModal: (service?: ServiceItem) => void;
  closeInquiryModal: () => void;

  // Toast feedback
  toast: Toast | null;
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
}

const EventEaseContext = createContext<EventEaseContextType | undefined>(undefined);

const DEFAULT_PLAN: EventPlan = {
  id: 'plan-default-1',
  name: 'Amina & Farhan’s Royal Wedding',
  type: 'Weddings',
  date: '2026-11-20',
  location: 'The Grand Royale Crystal Ballroom, City Center',
  guests: 350,
  budget: 15000,
  createdAt: new Date().toISOString(),
};

export const EventEaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string | null>(null);

  // Load from localStorage or defaults
  const [activePlan, setActivePlan] = useState<EventPlan | null>(() => {
    try {
      const saved = localStorage.getItem('eventease_active_plan');
      return saved ? JSON.parse(saved) : DEFAULT_PLAN;
    } catch {
      return DEFAULT_PLAN;
    }
  });

  const [allPlans, setAllPlans] = useState<EventPlan[]>(() => {
    try {
      const saved = localStorage.getItem('eventease_all_plans');
      return saved ? JSON.parse(saved) : [DEFAULT_PLAN];
    } catch {
      return [DEFAULT_PLAN];
    }
  });

  const [totalBudgetLimit, setTotalBudgetLimit] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('eventease_budget_limit');
      return saved ? Number(saved) : 15000;
    } catch {
      return 15000;
    }
  });

  const [budgetBreakdown, setBudgetBreakdown] = useState<BudgetBreakdown>(() => {
    try {
      const saved = localStorage.getItem('eventease_budget_breakdown');
      return saved ? JSON.parse(saved) : INITIAL_BUDGET_BREAKDOWN;
    } catch {
      return INITIAL_BUDGET_BREAKDOWN;
    }
  });

  const [checklistTasks, setChecklistTasks] = useState<ChecklistTask[]>(() => {
    try {
      const saved = localStorage.getItem('eventease_checklist');
      return saved ? JSON.parse(saved) : DEFAULT_CHECKLIST_TASKS;
    } catch {
      return DEFAULT_CHECKLIST_TASKS;
    }
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('eventease_favorites');
      return saved ? JSON.parse(saved) : ['srv-1', 'srv-6', 'srv-8'];
    } catch {
      return ['srv-1', 'srv-6', 'srv-8'];
    }
  });

  const [inquiryModal, setInquiryModal] = useState<{ isOpen: boolean; service?: ServiceItem }>({
    isOpen: false,
  });

  const [toast, setToast] = useState<Toast | null>(null);

  // Persistence Effects
  useEffect(() => {
    if (activePlan) {
      localStorage.setItem('eventease_active_plan', JSON.stringify(activePlan));
    }
  }, [activePlan]);

  useEffect(() => {
    localStorage.setItem('eventease_all_plans', JSON.stringify(allPlans));
  }, [allPlans]);

  useEffect(() => {
    localStorage.setItem('eventease_budget_limit', totalBudgetLimit.toString());
  }, [totalBudgetLimit]);

  useEffect(() => {
    localStorage.setItem('eventease_budget_breakdown', JSON.stringify(budgetBreakdown));
  }, [budgetBreakdown]);

  useEffect(() => {
    localStorage.setItem('eventease_checklist', JSON.stringify(checklistTasks));
  }, [checklistTasks]);

  useEffect(() => {
    localStorage.setItem('eventease_favorites', JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast(prev => (prev?.id === id ? null : prev));
    }, 3800);
  };

  const createOrUpdatePlan = (data: Omit<EventPlan, 'id' | 'createdAt'>) => {
    const newPlan: EventPlan = {
      ...data,
      id: `plan-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setActivePlan(newPlan);
    setAllPlans(prev => [newPlan, ...prev]);
    setTotalBudgetLimit(data.budget);

    // Auto-adjust default category proportions based on total budget
    const total = data.budget;
    setBudgetBreakdown({
      venue: Math.round(total * 0.32),
      catering: Math.round(total * 0.28),
      decoration: Math.round(total * 0.15),
      photography: Math.round(total * 0.12),
      entertainment: Math.round(total * 0.08),
      other: Math.round(total * 0.05),
    });

    showToast(`Event Plan "${data.name}" created successfully!`, 'success');
  };

  const setActivePlanById = (id: string) => {
    const found = allPlans.find(p => p.id === id);
    if (found) {
      setActivePlan(found);
      setTotalBudgetLimit(found.budget);
      showToast(`Switched active plan to "${found.name}"`, 'info');
    }
  };

  const updateBudgetCategory = (category: keyof BudgetBreakdown, amount: number) => {
    setBudgetBreakdown(prev => ({
      ...prev,
      [category]: Math.max(0, amount),
    }));
  };

  const resetBudgetToDefaults = () => {
    setBudgetBreakdown(INITIAL_BUDGET_BREAKDOWN);
    showToast('Budget allocations reset to default estimates', 'info');
  };

  const addTask = (title: string, category: string, priority: 'low' | 'medium' | 'high' = 'medium') => {
    const newTask: ChecklistTask = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      category: category.trim() || 'General',
      timeline: 'Upcoming Milestone',
      completed: false,
      priority,
    };
    setChecklistTasks(prev => [newTask, ...prev]);
    showToast(`Task added: "${newTask.title}"`, 'success');
  };

  const toggleTask = (id: string) => {
    setChecklistTasks(prev =>
      prev.map(task => {
        if (task.id === id) {
          const nextState = !task.completed;
          showToast(nextState ? `Completed: "${task.title}"` : `Marked incomplete: "${task.title}"`, 'info');
          return { ...task, completed: nextState };
        }
        return task;
      })
    );
  };

  const deleteTask = (id: string) => {
    setChecklistTasks(prev => prev.filter(task => task.id !== id));
    showToast('Task removed from checklist', 'info');
  };

  const resetChecklistToDefaults = () => {
    setChecklistTasks(DEFAULT_CHECKLIST_TASKS);
    showToast('Checklist restored to standard template', 'info');
  };

  const loadEventSpecificChecklist = (eventType: string) => {
    let customItems: ChecklistTask[] = [];
    if (eventType.toLowerCase().includes('mehndi')) {
      customItems = [
        { id: `m-${Date.now()}-1`, title: 'Book Traditional Mehndi Artist & Assistants', category: 'Beauty', timeline: '1 Month Before', completed: false, priority: 'high' },
        { id: `m-${Date.now()}-2`, title: 'Arrange Dholak Players & Choreography Practice', category: 'Music', timeline: '3 Weeks Before', completed: false, priority: 'high' },
        { id: `m-${Date.now()}-3`, title: 'Order Fresh Yellow & Orange Marigold Canopies', category: 'Decor', timeline: '2 Weeks Before', completed: false, priority: 'medium' },
        { id: `m-${Date.now()}-4`, title: 'Coordinate Chaat & Street Food Live Counters', category: 'Catering', timeline: '2 Weeks Before', completed: false, priority: 'medium' },
      ];
    } else if (eventType.toLowerCase().includes('corporate')) {
      customItems = [
        { id: `c-${Date.now()}-1`, title: 'Confirm AV Projector, Podiums & Lavalier Mics', category: 'AV & Tech', timeline: '1 Month Before', completed: false, priority: 'high' },
        { id: `c-${Date.now()}-2`, title: 'Print Corporate Name Badges & Agenda Booklets', category: 'Collateral', timeline: '2 Weeks Before', completed: false, priority: 'medium' },
        { id: `c-${Date.now()}-3`, title: 'Finalize Keynote Speaker Run-of-Show', category: 'Program', timeline: '1 Week Before', completed: false, priority: 'high' },
        { id: `c-${Date.now()}-4`, title: 'Coordinate Executive VIP Lounge & Refreshments', category: 'Hospitality', timeline: 'Event Week', completed: false, priority: 'medium' },
      ];
    } else {
      customItems = [
        { id: `g-${Date.now()}-1`, title: `Finalize Guest RSVP List for ${eventType}`, category: 'Planning', timeline: '2 Weeks Before', completed: false, priority: 'high' },
        { id: `g-${Date.now()}-2`, title: 'Order Custom Cake & Dessert Installation', category: 'Catering', timeline: '10 Days Before', completed: false, priority: 'medium' },
        { id: `g-${Date.now()}-3`, title: 'Coordinate Backdrop Photography Lighting', category: 'Media', timeline: '1 Week Before', completed: false, priority: 'medium' },
      ];
    }

    setChecklistTasks(prev => [...customItems, ...prev]);
    showToast(`Loaded recommended tasks for ${eventType}`, 'success');
  };

  const toggleFavorite = (serviceId: string) => {
    setFavoriteIds(prev => {
      const exists = prev.includes(serviceId);
      const service = SERVICES_CATALOG.find(s => s.id === serviceId);
      const name = service ? service.name : 'Service';
      if (exists) {
        showToast(`Removed "${name}" from Favorites`, 'info');
        return prev.filter(id => id !== serviceId);
      } else {
        showToast(`Saved "${name}" to Favorites`, 'success');
        return [...prev, serviceId];
      }
    });
  };

  const isFavorite = (serviceId: string) => favoriteIds.includes(serviceId);

  const openInquiryModal = (service?: ServiceItem) => {
    setInquiryModal({ isOpen: true, service });
  };

  const closeInquiryModal = () => {
    setInquiryModal({ isOpen: false });
  };

  return (
    <EventEaseContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        activePlan,
        allPlans,
        createOrUpdatePlan,
        setActivePlanById,
        budgetBreakdown,
        totalBudgetLimit,
        setTotalBudgetLimit,
        updateBudgetCategory,
        resetBudgetToDefaults,
        checklistTasks,
        addTask,
        toggleTask,
        deleteTask,
        resetChecklistToDefaults,
        loadEventSpecificChecklist,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        inquiryModal,
        openInquiryModal,
        closeInquiryModal,
        toast,
        showToast,
      }}
    >
      {children}
    </EventEaseContext.Provider>
  );
};

export const useEventEase = () => {
  const context = useContext(EventEaseContext);
  if (!context) {
    throw new Error('useEventEase must be used within an EventEaseProvider');
  }
  return context;
};
