import React, { useState } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { BudgetBreakdown } from '../types';
import { 
  DollarSign, 
  PieChart, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Building, 
  UtensilsCrossed, 
  Palette, 
  Camera, 
  Music, 
  Layers,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface CategoryConfig {
  key: keyof BudgetBreakdown;
  label: string;
  icon: React.ReactNode;
  recommendedPct: number;
  description: string;
}

const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    key: 'venue',
    label: 'Venue & Banquet Facility',
    icon: <Building className="w-4 h-4 text-[#6B1728]" />,
    recommendedPct: 30,
    description: 'Hall rental, security deposit, parking, bridal dressing suite.',
  },
  {
    key: 'catering',
    label: 'Catering & Beverages',
    icon: <UtensilsCrossed className="w-4 h-4 text-[#6B1728]" />,
    recommendedPct: 30,
    description: 'Food courses, live counters, waitstaff service, drinks & desserts.',
  },
  {
    key: 'decoration',
    label: 'Decoration & Florals',
    icon: <Palette className="w-4 h-4 text-[#6B1728]" />,
    recommendedPct: 15,
    description: 'Stage setup, fresh flowers, table centerpieces, ambiance lighting.',
  },
  {
    key: 'photography',
    label: 'Photography & Cinema',
    icon: <Camera className="w-4 h-4 text-[#6B1728]" />,
    recommendedPct: 12,
    description: 'Lead cameras, 4K videography, drone shots, heirloom print albums.',
  },
  {
    key: 'entertainment',
    label: 'Music & Entertainment',
    icon: <Music className="w-4 h-4 text-[#6B1728]" />,
    recommendedPct: 8,
    description: 'DJ, sound system, MC host, dhol players, acoustic musicians.',
  },
  {
    key: 'other',
    label: 'Other & Contingencies',
    icon: <Layers className="w-4 h-4 text-[#6B1728]" />,
    recommendedPct: 5,
    description: 'Stationery invitations, party favors, permits, emergency buffer.',
  },
];

export const BudgetPlannerPage: React.FC = () => {
  const { 
    budgetBreakdown, 
    updateBudgetCategory, 
    totalBudgetLimit, 
    setTotalBudgetLimit, 
    resetBudgetToDefaults,
    activePlan,
    setCurrentPage,
    showToast
  } = useEventEase();

  const [customTotalInput, setCustomTotalInput] = useState<number>(totalBudgetLimit);

  // Calculate totals
  const totalExpenses = Object.values(budgetBreakdown).reduce((acc, curr) => acc + curr, 0);
  const remainingBudget = totalBudgetLimit - totalExpenses;
  const isOverBudget = remainingBudget < 0;
  const percentSpent = totalBudgetLimit > 0 ? Math.round((totalExpenses / totalBudgetLimit) * 100) : 0;

  const handleApplyNewBudgetTotal = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTotalInput <= 0) return;
    setTotalBudgetLimit(customTotalInput);
    showToast(`Total budget updated to $${customTotalInput.toLocaleString()}`, 'success');
  };

  const handleAutoDistribute = () => {
    CATEGORY_CONFIGS.forEach(cat => {
      const allocated = Math.round(totalBudgetLimit * (cat.recommendedPct / 100));
      updateBudgetCategory(cat.key, allocated);
    });
    showToast('Auto-allocated budget based on standard event benchmarks', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
            Financial Clarity
          </span>
          <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#232120]">
            Budget Planner & Expense Calculator
          </h1>
          <p className="text-base text-[#5A524E]">
            {activePlan 
              ? `Managing budget for "${activePlan.name}" (${activePlan.type})` 
              : 'Calculate and distribute estimated expenses across all core event categories.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAutoDistribute}
            className="px-4 py-2 text-xs font-medium text-[#232120] bg-white hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors flex items-center gap-1.5"
            title="Auto-calculate based on recommended percentages"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#6B1728]" />
            <span>Smart Auto-Distribute</span>
          </button>
          <button
            onClick={resetBudgetToDefaults}
            className="px-3 py-2 text-xs font-medium text-[#736A65] hover:text-[#232120] bg-white hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors"
            title="Reset allocations"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top 3 Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Budget */}
        <div className="bg-white rounded-2xl border border-[#E8E1D9] p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-[#8A817C]">
            <span className="font-semibold uppercase tracking-wider">Total Planned Budget</span>
            <DollarSign className="w-4 h-4 text-[#6B1728]" />
          </div>
          <div className="font-serif-title text-3xl sm:text-4xl font-bold text-[#232120] tabular-nums">
            ${totalBudgetLimit.toLocaleString()}
          </div>
          <form onSubmit={handleApplyNewBudgetTotal} className="flex gap-2 pt-1">
            <input
              type="number"
              min="100"
              step="100"
              value={customTotalInput}
              onChange={e => setCustomTotalInput(Number(e.target.value))}
              className="w-full text-xs p-2 rounded-lg border border-[#E8E1D9] bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:border-[#6B1728]"
              placeholder="Set total budget"
            />
            <button
              type="submit"
              className="px-3 py-2 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-lg shrink-0"
            >
              Update
            </button>
          </form>
        </div>

        {/* Card 2: Total Estimated Expenses */}
        <div className="bg-white rounded-2xl border border-[#E8E1D9] p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-xs text-[#8A817C]">
            <span className="font-semibold uppercase tracking-wider">Total Estimated Expenses</span>
            <TrendingUp className="w-4 h-4 text-[#6B1728]" />
          </div>
          <div className="font-serif-title text-3xl sm:text-4xl font-bold text-[#6B1728] tabular-nums">
            ${totalExpenses.toLocaleString()}
          </div>
          <div className="text-xs text-[#5A524E] flex items-center justify-between pt-2">
            <span>Allocated: <strong>{percentSpent}%</strong> of total budget</span>
            <span>6 Categories</span>
          </div>
        </div>

        {/* Card 3: Remaining Budget */}
        <div className={`rounded-2xl border p-6 shadow-xs space-y-3 ${
          isOverBudget 
            ? 'bg-rose-50/50 border-rose-200' 
            : 'bg-emerald-50/40 border-emerald-200'
        }`}>
          <div className="flex items-center justify-between text-xs text-[#8A817C]">
            <span className="font-semibold uppercase tracking-wider">
              {isOverBudget ? 'Budget Exceeded By' : 'Remaining Unallocated Budget'}
            </span>
            {isOverBudget ? (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
          </div>
          <div className={`font-serif-title text-3xl sm:text-4xl font-bold tabular-nums ${
            isOverBudget ? 'text-rose-700' : 'text-emerald-800'
          }`}>
            {isOverBudget ? `-$${Math.abs(remainingBudget).toLocaleString()}` : `$${remainingBudget.toLocaleString()}`}
          </div>
          <p className="text-xs text-[#5A524E]">
            {isOverBudget 
              ? 'Warning: Total estimated expenses exceed your budget ceiling.' 
              : 'Safe: You have healthy surplus funds for unexpected costs.'}
          </p>
        </div>

      </div>

      {/* Visual Spending Allocation Bar */}
      <div className="bg-white rounded-2xl border border-[#E8E1D9] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between text-xs text-[#5A524E]">
          <span className="font-semibold uppercase tracking-wider text-[#232120]">
            Category Expense Proportions
          </span>
          <span className="tabular-nums font-medium text-[#736A65]">
            ${totalExpenses.toLocaleString()} / ${totalBudgetLimit.toLocaleString()}
          </span>
        </div>

        {/* Progress Bar Container */}
        <div className="h-4 w-full bg-[#EFE7DE] rounded-full overflow-hidden flex shadow-inner">
          {CATEGORY_CONFIGS.map((cat, idx) => {
            const amount = budgetBreakdown[cat.key];
            const pct = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;
            // Diverse cohesive wine/earthy shades for segments
            const colors = ['bg-[#6B1728]', 'bg-[#801B2E]', 'bg-[#A33B4D]', 'bg-[#C26B7B]', 'bg-[#D98A9A]', 'bg-[#E8A5B2]'];
            return (
              <div
                key={cat.key}
                style={{ width: `${pct}%` }}
                className={`${colors[idx % colors.length]} transition-all duration-300 relative group`}
                title={`${cat.label}: $${amount.toLocaleString()} (${Math.round(pct)}%)`}
              />
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 pt-2 text-xs">
          {CATEGORY_CONFIGS.map((cat, idx) => {
            const amount = budgetBreakdown[cat.key];
            const pct = totalExpenses > 0 ? Math.round((amount / totalExpenses) * 100) : 0;
            const colors = ['bg-[#6B1728]', 'bg-[#801B2E]', 'bg-[#A33B4D]', 'bg-[#C26B7B]', 'bg-[#D98A9A]', 'bg-[#E8A5B2]'];
            return (
              <div key={cat.key} className="flex items-center gap-1.5 text-[#5A524E]">
                <div className={`w-3 h-3 rounded-xs ${colors[idx % colors.length]}`} />
                <span>{cat.label.split(' ')[0]}:</span>
                <span className="font-semibold text-[#232120] tabular-nums">${amount.toLocaleString()} ({pct}%)</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Adjustment Inputs Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif-title text-2xl font-bold text-[#232120]">
            Category Expense Breakdown
          </h2>
          <span className="text-xs text-[#8A817C]">Enter or adjust each category allocation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORY_CONFIGS.map(config => {
            const currentAmount = budgetBreakdown[config.key];
            const pctOfTotal = totalBudgetLimit > 0 ? Math.round((currentAmount / totalBudgetLimit) * 100) : 0;

            return (
              <div
                key={config.key}
                className="bg-white rounded-2xl border border-[#E8E1D9] p-5 shadow-xs space-y-4 flex flex-col justify-between hover:border-[#6B1728]/40 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E8E1D9] flex items-center justify-center">
                        {config.icon}
                      </div>
                      <h3 className="font-serif-title text-lg font-bold text-[#232120]">
                        {config.label}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-[#736A65] leading-relaxed">
                    {config.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F2ECE4] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#8A817C]">Allocated Amount:</span>
                    <span className="font-semibold text-[#6B1728] tabular-nums">
                      {pctOfTotal}% of total budget
                    </span>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A817C] text-sm font-semibold">
                      $
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="50"
                      value={currentAmount}
                      onChange={e => updateBudgetCategory(config.key, Number(e.target.value))}
                      className="w-full pl-8 pr-3 py-2 text-sm font-semibold text-[#232120] rounded-xl border border-[#E8E1D9] bg-[#FAF7F2] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] tabular-nums"
                    />
                  </div>

                  {/* Benchmark note */}
                  <div className="flex items-center justify-between text-[11px] text-[#8A817C]">
                    <span>Suggested benchmark:</span>
                    <span>~{config.recommendedPct}% (${Math.round(totalBudgetLimit * (config.recommendedPct / 100)).toLocaleString()})</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Integration with Services & Checklist */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E1D9] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif-title text-xl font-bold text-[#232120]">
            Ready to find vendors matching your budget?
          </h4>
          <p className="text-xs text-[#5A524E]">
            Browse venues and caterers with transparent pricing that align with your numbers.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentPage('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Find Services</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
