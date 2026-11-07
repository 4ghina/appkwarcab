import React, { useState } from 'react';
import { HelpCircle, X, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../types/scout';
import { getHelpTopics, HelpTopic } from './help/helpTopicsData';

const HelpTopicSidebar: React.FC<{
  topics: HelpTopic[];
  selectedId: string;
  onSelect: (id: string) => void;
}> = ({ topics, selectedId, onSelect }) => (
  <div className="w-full sm:w-1/3 bg-stone-50 border-r border-stone-200 overflow-y-auto p-2 sm:p-3 space-y-1">
    {topics.map((topic) => {
      const Icon = topic.icon;
      const isActive = topic.id === selectedId;
      return (
        <button
          key={topic.id}
          onClick={() => onSelect(topic.id)}
          className={`w-full text-left p-2.5 rounded-2xl transition-all flex items-start gap-2.5 ${
            isActive ? 'bg-white shadow-xs border border-amber-300 text-stone-900 font-bold' : 'hover:bg-stone-100 text-stone-700'
          }`}
        >
          <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${isActive ? 'bg-amber-100 text-[#5D4037]' : 'bg-stone-200/70 text-stone-600'}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] text-stone-400 font-medium block truncate">{topic.category}</span>
            <p className="text-xs font-bold leading-tight truncate">{topic.title}</p>
          </div>
        </button>
      );
    })}
  </div>
);

const HelpTopicDetail: React.FC<{ topic: HelpTopic }> = ({ topic }) => (
  <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-white space-y-4">
    <div className="flex items-center justify-between pb-3 border-b border-stone-100">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">{topic.category}</span>
        <h4 className="text-base font-extrabold text-stone-900">{topic.title}</h4>
      </div>
      <span className="px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 text-[10px] font-bold">{topic.badge}</span>
    </div>
    <p className="text-xs text-stone-600 italic">{topic.summary}</p>
    {topic.content}
  </div>
);

export const ContextualHelpModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  currentUser?: UserProfile | null;
  initialTopic?: string;
}> = ({ isOpen, onClose, initialTopic = 'gudep' }) => {
  const { config } = useApp();
  const [activeTopic, setActiveTopic] = useState<string>(initialTopic);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;
  const topics = getHelpTopics(config);
  const filtered = topics.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.summary.toLowerCase().includes(searchQuery.toLowerCase()));
  const selected = topics.find(t => t.id === activeTopic) || topics[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-[#5D4037] flex items-center justify-center shrink-0"><HelpCircle className="w-5 h-5 text-amber-700" /></div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-stone-900">Pusat Bantuan & Panduan Pengguna</h3>
              <p className="text-[11px] text-stone-500">Panduan praktis alur aplikasi SIM-KWARCAB</p>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600"><X className="w-4 h-4" /></button>
        </div>
        <div className="px-4 py-2.5 bg-white/70 border-b border-stone-200">
          <div className="relative">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Cari panduan..." className="w-full pl-9 pr-3 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs focus:bg-white focus:outline-none" />
          </div>
        </div>
        <div className="flex-1 overflow-hidden flex flex-col sm:flex-row">
          <HelpTopicSidebar topics={filtered} selectedId={selected.id} onSelect={setActiveTopic} />
          <HelpTopicDetail topic={selected} />
        </div>
      </div>
    </div>
  );
};
