import React from 'react';
import { BookOpen, Award, Volume2, VolumeX, Edit3 } from 'lucide-react';
import { SpeechNarrator } from '../utils/audioUtils';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  progressPercent: number;
  isSpeaking: boolean;
  onOpenNotebook: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  progressPercent,
  isSpeaking,
  onOpenNotebook,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-xs">
              <BookOpen className="w-5 h-5" />
            </div>
            <button 
              onClick={() => setActiveTab('intro')}
              className="text-lg font-bold text-slate-900 tracking-tight whitespace-nowrap hover:text-emerald-700 transition-colors"
            >
              الدرس الرابع: حق التملك
            </button>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('intro')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeTab === 'intro'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              المدخل والقصة
            </button>
            <button
              onClick={() => setActiveTab('definition')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeTab === 'definition'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              مفهوم الملكية
            </button>
            <button
              onClick={() => setActiveTab('legitimacy')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeTab === 'legitimacy'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              مشروعية التملك
            </button>
            <button
              onClick={() => setActiveTab('duties')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeTab === 'duties'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              واجبات المالك
            </button>
            <button
              onClick={() => setActiveTab('public')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeTab === 'public'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              المال العام
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`whitespace-nowrap pb-1 border-b-2 transition-colors ${
                activeTab === 'summary'
                  ? 'border-emerald-600 text-emerald-800 font-semibold'
                  : 'border-transparent hover:text-slate-900 hover:border-slate-300'
              }`}
            >
              ملخص المفاهيم
            </button>
          </nav>

          {/* Zone 3: 1 primary action + helper utilities */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Audio narrator toggle */}
            <button
              onClick={() => {
                if (isSpeaking) {
                  SpeechNarrator.stop();
                } else {
                  SpeechNarrator.speak('أهلاً بك في الدرس التفاعلي: حق التملك، من مادة التربية الإسلامية.');
                }
              }}
              title={isSpeaking ? 'إيقاف القراءة الصوتية' : 'تشغيل القارئ الصوتي'}
              className={`p-2 rounded-lg border transition-colors flex items-center gap-1.5 text-xs font-medium ${
                isSpeaking 
                  ? 'bg-amber-50 border-amber-300 text-amber-800 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden sm:inline">{isSpeaking ? 'إيقاف الصوت' : 'القارئ الصوتي'}</span>
            </button>

            {/* Personal Notes */}
            <button
              onClick={onOpenNotebook}
              className="p-2 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-xs font-medium"
              title="دفتر ملاحظات الطالب"
            >
              <Edit3 className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">دفتر الملاحظات</span>
            </button>

            {/* Assessment CTA */}
            <button
              onClick={() => setActiveTab('quiz')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Award className="w-4 h-4" />
              <span>التقويم الختامي</span>
              <span className="bg-emerald-800/80 px-1.5 py-0.5 rounded text-[10px] tabular-nums font-mono">
                {progressPercent}%
              </span>
            </button>
          </div>
        </div>

        {/* Linear progress bar indicating learning journey */}
        <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mb-0.5">
          <div
            className="bg-emerald-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </header>
  );
};
