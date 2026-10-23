import React, { useState } from 'react';
import { Network, RotateCw, Volume2, Printer, ArrowLeft, ArrowRight, BookOpen, Layers, CheckCircle } from 'lucide-react';
import { FLASHCARDS_LIST } from '../data/lessonData';
import { soundManager, SpeechNarrator } from '../utils/audioUtils';

interface MindmapSummaryProps {
  onContinueToQuiz: () => void;
  onBack: () => void;
}

export const MindmapSummary: React.FC<MindmapSummaryProps> = ({
  onContinueToQuiz,
  onBack,
}) => {
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('all');

  const currentCard = FLASHCARDS_LIST[activeFlashcardIndex];

  const handleNextCard = () => {
    setIsFlipped(false);
    setActiveFlashcardIndex((prev) => (prev + 1) % FLASHCARDS_LIST.length);
    soundManager.playNotice();
  };

  const handlePrevCard = () => {
    setIsFlipped(false);
    setActiveFlashcardIndex((prev) => (prev - 1 + FLASHCARDS_LIST.length) % FLASHCARDS_LIST.length);
    soundManager.playNotice();
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    soundManager.playNotice();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <span>ملخص الوحدة</span>
              <span aria-hidden="true">·</span>
              <span>مراجعة شاملة قبل الاختبار</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              الملخص الشامل والخريطة المفاهيمية لدرس «حق التملك»
            </h2>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto"
          >
            <Printer className="w-4 h-4 text-emerald-700" />
            <span>طباعة أو حفظ ملخص الدرس</span>
          </button>
        </div>
      </section>

      {/* Interactive Concept Mindmap Tree */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Network className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-900">
              الخريطة الذهنية التفاعلية لمفاهيم الدرس
            </h3>
          </div>
          <span className="text-xs text-slate-500">انقر على أي محور لتركيز العرض</span>
        </div>

        {/* Branch Filter Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'كافة المحاور' },
            { id: 'definition', label: '1. المفهوم والموانع' },
            { id: 'legitimacy', label: '2. الحكمة والمشروعية' },
            { id: 'earning', label: '3. طرق الكسب' },
            { id: 'duties', label: '4. واجبات المالك' },
            { id: 'public', label: '5. المال العام والقانون' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedBranch(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                selectedBranch === tab.id
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Visual Node Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(selectedBranch === 'all' || selectedBranch === 'definition') && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-800 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>المفهوم والأركان</span>
                <span className="font-mono text-[10px] text-slate-400">01</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>• <strong>لغة:</strong> حيازة المال والانفراد بالتصرف فيه.</li>
                <li>• <strong>اصطلاحاً:</strong> اختصاص بالشيء يمنع الغير منه ويمكّن صاحبه من التصرف ابتداءً.</li>
                <li>• <strong>الموانع الشرعية:</strong> الصغر، الجنون، السفه، الإفلاس.</li>
              </ul>
            </div>
          )}

          {(selectedBranch === 'all' || selectedBranch === 'legitimacy') && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-800 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>مشروعية التملك</span>
                <span className="font-mono text-[10px] text-slate-400">02</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>• <strong>الفطرة:</strong> ﴿وتحبون المال حباً جما﴾.</li>
                <li>• <strong>الإنتاج:</strong> ﴿هو أنشأكم من الأرض واستعمركم فيها﴾.</li>
                <li>• <strong>الضوابط:</strong> عدم الإضرار بالغير («وإن كان قضيباً من أراك»).</li>
              </ul>
            </div>
          )}

          {(selectedBranch === 'all' || selectedBranch === 'earning') && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-800 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>طرق الكسب</span>
                <span className="font-mono text-[10px] text-slate-400">03</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>• <strong>حلال مشروع:</strong> تجارة عن تراضٍ، عمل، ميراث، وصية.</li>
                <li>• <strong>حرام ممنوع:</strong> ربا، سرقة، تطفيف، رشوة، غش، احتكار.</li>
                <li>• <strong>قاعدة البركة:</strong> ﴿يمحق الله الربا ويربي الصدقات﴾.</li>
              </ul>
            </div>
          )}

          {(selectedBranch === 'all' || selectedBranch === 'duties') && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-800 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>واجبات المالك</span>
                <span className="font-mono text-[10px] text-slate-400">04</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>• <strong>الاستخلاف:</strong> الله المالك الحقيقي والإنسان أمين.</li>
                <li>• <strong>النفقة الأسرية:</strong> أعظم الصدقات أجراً.</li>
                <li>• <strong>الزكاة والصدقات:</strong> حقوق الفقراء وتطهير المال.</li>
                <li>• <strong>الاعتدال:</strong> النهي عن الإسراف والتبذير أو الكنز.</li>
              </ul>
            </div>
          )}

          {(selectedBranch === 'all' || selectedBranch === 'public') && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-800 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>المال العام والقانون</span>
                <span className="font-mono text-[10px] text-slate-400">05</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>• <strong>المفهوم:</strong> حق ينتفع به الجميع دون حصة حصرية.</li>
                <li>• <strong>قانون الجزاء العماني (المادة 11):</strong> حماية أموال الدولة والشركات الحكومية {'>'} 40%.</li>
                <li>• <strong>المسؤولية:</strong> الحفاظ على المرافق ونظافتها وترشيد الموارد.</li>
              </ul>
            </div>
          )}

          {(selectedBranch === 'all' || selectedBranch === 'definition') && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
              <div className="text-xs font-bold text-emerald-800 pb-1 border-b border-slate-200 flex items-center justify-between">
                <span>المصطلحات الفقهية</span>
                <span className="font-mono text-[10px] text-slate-400">06</span>
              </div>
              <ul className="text-xs space-y-1.5 text-slate-700">
                <li>• <strong>الولاية:</strong> سلطة شرعية على القاصر أو ماله لمصلحته.</li>
                <li>• <strong>الوصية:</strong> تصرف مالي مضاف لما بعد الموت في حدود الثلث.</li>
                <li>• <strong>الوكالة:</strong> إنابة شخص لآخر ليتصرف في حياته بإذنه.</li>
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Flippable Flashcards */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 mb-1">بطاقات الاستذكار السريع</div>
            <h3 className="text-xl font-bold text-slate-900">
              بطاقات المراجعة الذكية (Flashcards)
            </h3>
          </div>
          <div className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
            بطاقة <span className="font-bold text-emerald-700 font-mono">{activeFlashcardIndex + 1}</span> من <span className="font-bold font-mono">{FLASHCARDS_LIST.length}</span>
          </div>
        </div>

        {/* The 3D-effect Card */}
        <div className="max-w-xl mx-auto">
          <div
            onClick={handleFlip}
            className={`min-h-[220px] p-6 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-xs ${
              isFlipped
                ? 'bg-emerald-800 text-white border-emerald-700'
                : 'bg-white text-slate-900 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className={`px-2 py-0.5 rounded font-medium ${
                isFlipped ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-100 text-slate-600'
              }`}>
                {currentCard.category}
              </span>
              <span className="flex items-center gap-1 opacity-70">
                <RotateCw className="w-3.5 h-3.5" />
                <span>انقر لقلب البطاقة</span>
              </span>
            </div>

            <div className="py-4 text-center">
              {!isFlipped ? (
                <p className="text-base sm:text-lg font-bold leading-relaxed">
                  {currentCard.front}
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm sm:text-base font-semibold leading-relaxed whitespace-pre-line text-amber-100">
                    {currentCard.back}
                  </p>
                  <p className="text-xs text-emerald-200 pt-2 border-t border-emerald-700">
                    💡 {currentCard.detail}
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100/30 text-xs">
              <span className="opacity-60 text-[11px]">الدرس الرابع: حق التملك</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  SpeechNarrator.speak(isFlipped ? currentCard.back : currentCard.front);
                }}
                className={`flex items-center gap-1 text-[11px] p-1 rounded hover:opacity-100 transition-opacity ${
                  isFlipped ? 'text-emerald-200 hover:text-white' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>نطق</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handlePrevCard}
              className="px-4 py-2 border border-slate-300 hover:bg-white text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <ArrowRight className="w-3.5 h-3.5" />
              <span>البطاقة السابقة</span>
            </button>

            <button
              onClick={handleFlip}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>قلب الإجابة</span>
            </button>

            <button
              onClick={handleNextCard}
              className="px-4 py-2 border border-slate-300 hover:bg-white text-slate-700 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1"
            >
              <span>البطاقة التالية</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق: المال العام</span>
        </button>

        <button
          onClick={onContinueToQuiz}
          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
        >
          <span>خوض التقويم الختامي والحصول على الشهادة</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
