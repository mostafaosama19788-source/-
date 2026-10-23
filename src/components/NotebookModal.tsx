import React, { useState, useEffect } from 'react';
import { X, Save, Trash2, Check, BookOpen } from 'lucide-react';
import { soundManager } from '../utils/audioUtils';

interface NotebookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotebookModal: React.FC<NotebookModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [notes, setNotes] = useState<string>('');
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('lesson_ownership_notes');
      if (saved) {
        setNotes(saved);
      } else {
        setNotes(
`ملاحظاتي الشخصية حول درس حق التملك:
- الملكية اصطلاحاً: اختصاص بالشيء يمنع الغير منه، ويمكّن صاحبه من التصرف فيه إلا لمانع شرعي.
- موانع التصرف: الصغر، السفه، الجنون، الإفلاس.
- حديث الفواكه: «لا يحل مال امرئ مسلم إلا بطيب نفسه».
- المال العام: المادة 11 من قانون الجزاء العماني لحماية مقدرات الوطن.`
        );
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lesson_ownership_notes', notes);
      setSavedStatus(true);
      soundManager.playSuccess();
      setTimeout(() => setSavedStatus(false), 2000);
    }
  };

  const handleClear = () => {
    if (window.confirm('هل أنت متأكد من مسح كافة الملاحظات المدونة؟')) {
      setNotes('');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('lesson_ownership_notes');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-xl w-full p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-700" />
            <h3 className="font-bold text-slate-900 text-base">
              دفتر ملاحظات الطالب (تدوين الأفكار والفوائد)
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-500">
          اكتب ملاحظاتك، استفساراتك الصفية، أو ملخصاتك الخاصة. تُحفظ الملاحظات تلقائياً على جهازك.
        </p>

        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={10}
          className="w-full p-3.5 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans text-slate-800 leading-relaxed focus:outline-emerald-600 focus:border-emerald-600 resize-none bg-slate-50/50"
          placeholder="سجل ملاحظاتك وفوائد الدرس هنا..."
        />

        <div className="flex items-center justify-between pt-2">
          <button
            onClick={handleClear}
            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 p-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>مسح الملاحظات</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              {savedStatus ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              <span>{savedStatus ? 'تم الحفظ بنجاح!' : 'حفظ الملاحظات'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
