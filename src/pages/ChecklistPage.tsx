import React, { useState, useMemo } from 'react';
import { useEventEase } from '../context/EventEaseContext';
import { ChecklistTask } from '../types';
import { 
  CheckCircle2, 
  Circle, 
  Trash2, 
  Plus, 
  Filter, 
  RotateCcw, 
  ListChecks, 
  Calendar, 
  Clock, 
  Sparkles, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const ChecklistPage: React.FC = () => {
  const { 
    checklistTasks, 
    addTask, 
    toggleTask, 
    deleteTask, 
    resetChecklistToDefaults,
    loadEventSpecificChecklist,
    activePlan,
    setCurrentPage
  } = useEventEase();

  const [activeFilter, setActiveFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Planning');
  const [newPriority, setNewPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [error, setError] = useState('');

  // Stats
  const totalCount = checklistTasks.length;
  const completedCount = checklistTasks.filter(t => t.completed).length;
  const pendingCount = totalCount - completedCount;
  const percentDone = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredTasks = useMemo(() => {
    if (activeFilter === 'pending') {
      return checklistTasks.filter(t => !t.completed);
    }
    if (activeFilter === 'completed') {
      return checklistTasks.filter(t => t.completed);
    }
    return checklistTasks;
  }, [checklistTasks, activeFilter]);

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) {
      setError('Please provide a task description');
      return;
    }
    addTask(newTitle, newCategory, newPriority);
    setNewTitle('');
    setError('');
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Title & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#6B1728]">
            Milestones & Tasks
          </span>
          <h1 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#232120]">
            Event Planning Checklist
          </h1>
          <p className="text-base text-[#5A524E]">
            {activePlan
              ? `Tracking milestones for "${activePlan.name}" (${activePlan.type})`
              : 'Keep your celebration organized with time-tested vendor deadlines and preparation tasks.'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activePlan && (
            <button
              onClick={() => loadEventSpecificChecklist(activePlan.type)}
              className="px-4 py-2 text-xs font-medium text-[#232120] bg-white hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors flex items-center gap-1.5"
              title="Load additional tasks recommended for this event type"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6B1728]" />
              <span>Load {activePlan.type} Tasks</span>
            </button>
          )}

          <button
            onClick={resetChecklistToDefaults}
            className="px-3.5 py-2 text-xs font-medium text-[#736A65] hover:text-[#232120] bg-white hover:bg-[#F2ECE4] border border-[#E8E1D9] rounded-xl transition-colors flex items-center gap-1"
            title="Restore standard checklist template"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Task</span>
          </button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-3xl border border-[#E8E1D9] p-6 sm:p-8 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider text-[#8A817C] font-semibold">
              Execution Progress
            </span>
            <h3 className="font-serif-title text-2xl font-bold text-[#232120]">
              {completedCount} of {totalCount} Tasks Completed ({percentDone}%)
            </h3>
            <p className="text-xs text-[#5A524E]">
              {pendingCount === 0 
                ? 'All milestones reached! You are ready for your event.' 
                : `${pendingCount} important action items remaining.`}
            </p>
          </div>

          <div className="flex items-center gap-6 sm:border-l sm:border-[#E8E1D9] sm:pl-8">
            <div className="text-center">
              <span className="text-xs text-[#8A817C]">Completed</span>
              <p className="font-serif-title text-2xl font-bold text-emerald-700 tabular-nums">
                {completedCount}
              </p>
            </div>
            <div className="text-center">
              <span className="text-xs text-[#8A817C]">Pending</span>
              <p className="font-serif-title text-2xl font-bold text-[#6B1728] tabular-nums">
                {pendingCount}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-3 w-full bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8E1D9]">
          <div
            style={{ width: `${percentDone}%` }}
            className="h-full bg-[#6B1728] transition-all duration-500 rounded-full"
          />
        </div>
      </div>

      {/* Filter Tabs (Segmented Buttons) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="inline-flex p-1 bg-[#FAF7F2] rounded-xl border border-[#E8E1D9] text-xs font-medium w-full sm:w-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'all'
                ? 'bg-white text-[#6B1728] font-bold shadow-xs'
                : 'text-[#5A524E] hover:text-[#232120]'
            }`}
          >
            All Tasks ({totalCount})
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'pending'
                ? 'bg-white text-[#6B1728] font-bold shadow-xs'
                : 'text-[#5A524E] hover:text-[#232120]'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'completed'
                ? 'bg-white text-[#6B1728] font-bold shadow-xs'
                : 'text-[#5A524E] hover:text-[#232120]'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        <span className="text-xs text-[#8A817C]">
          Click any task checkbox to toggle completion status
        </span>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E8E1D9] p-12 text-center space-y-3">
            <ListChecks className="w-10 h-10 text-[#6B1728] mx-auto opacity-40" />
            <h4 className="font-serif-title text-xl font-bold text-[#232120]">
              No tasks found in this view
            </h4>
            <p className="text-xs text-[#736A65]">
              {activeFilter === 'completed'
                ? 'You have not marked any tasks complete yet.'
                : 'You have cleared all pending items or no tasks exist.'}
            </p>
            {activeFilter !== 'all' && (
              <button
                onClick={() => setActiveFilter('all')}
                className="text-xs text-[#6B1728] underline font-semibold"
              >
                View all tasks
              </button>
            )}
          </div>
        ) : (
          filteredTasks.map(task => {
            const isDone = task.completed;
            const priorityColors = {
              high: 'text-rose-700 bg-rose-50 border-rose-200',
              medium: 'text-amber-700 bg-amber-50 border-amber-200',
              low: 'text-slate-600 bg-slate-50 border-slate-200',
            };

            return (
              <div
                key={task.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex items-start sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-[#FAF7F2]/60 border-[#E8E1D9] opacity-75'
                    : 'bg-white border-[#E8E1D9] hover:border-[#6B1728]/40 shadow-xs'
                }`}
              >
                {/* Checkbox & Details */}
                <div className="flex items-start sm:items-center gap-3.5 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 sm:mt-0 p-1 text-[#6B1728] hover:scale-110 transition-transform shrink-0"
                    aria-label={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 fill-[#6B1728] text-white" />
                    ) : (
                      <Circle className="w-5 h-5 text-[#8A817C] hover:text-[#6B1728]" />
                    )}
                  </button>

                  <div className="space-y-1 flex-1">
                    <p className={`text-sm font-medium ${
                      isDone ? 'line-through text-[#8A817C]' : 'text-[#232120]'
                    }`}>
                      {task.title}
                    </p>

                    {/* Unboxed metadata tags per anti-slop */}
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8A817C]">
                      <span>{task.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#8A817C]" />
                        <span>{task.timeline}</span>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded border ${priorityColors[task.priority]}`}>
                        {task.priority} Priority
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-[#A89F99] hover:text-rose-700 transition-colors rounded-lg hover:bg-rose-50"
                  aria-label="Delete task"
                  title="Delete task"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal / Form */}
      {showAddForm && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E8E1D9] animate-fade-in space-y-6">
            
            <div className="border-b border-[#E8E1D9] pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#6B1728]">
                New Action Item
              </span>
              <h3 className="font-serif-title text-2xl font-bold text-[#232120] mt-1">
                Add Checklist Task
              </h3>
            </div>

            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1">
                  Task Title / Description *
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={e => {
                    setNewTitle(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="e.g. Schedule bridal hair & jewelry fitting"
                  className={`w-full p-2.5 text-sm rounded-xl border bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#6B1728]/20 focus:border-[#6B1728] ${
                    error ? 'border-red-500' : 'border-[#E8E1D9]'
                  }`}
                  autoFocus
                />
                {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-xl border border-[#E8E1D9] bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:border-[#6B1728]"
                  >
                    <option value="Planning">Planning</option>
                    <option value="Venues">Venues</option>
                    <option value="Catering">Catering</option>
                    <option value="Decoration">Decoration</option>
                    <option value="Photography">Photography</option>
                    <option value="Beauty">Beauty & Makeup</option>
                    <option value="Music">Entertainment & Music</option>
                    <option value="Invitations">Invitations & RSVP</option>
                    <option value="Logistics">Logistics & Transportation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#232120] mb-1">
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as any)}
                    className="w-full p-2.5 text-xs rounded-xl border border-[#E8E1D9] bg-[#FAF7F2] text-[#232120] focus:bg-white focus:outline-none focus:border-[#6B1728]"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#E8E1D9]">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-xs font-medium text-[#665E5A] hover:text-[#232120]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-xs"
                >
                  Save Task
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Integration with Services */}
      <div className="bg-[#FAF7F2] p-6 rounded-2xl border border-[#E8E1D9] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-serif-title text-xl font-bold text-[#232120]">
            Need help checking off vendor milestones?
          </h4>
          <p className="text-xs text-[#5A524E]">
            Connect with pre-vetted photographers, decorators, and caterers ready to book.
          </p>
        </div>
        <button
          onClick={() => {
            setCurrentPage('services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#6B1728] hover:bg-[#561120] rounded-xl shadow-xs transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Explore Services Directory</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
