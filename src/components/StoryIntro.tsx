import React, { useState } from 'react';
import { CheckCircle2, Play, Volume2, Sparkles, AlertCircle, ArrowLeft, HeartHandshake, ShieldCheck } from 'lucide-react';
import { LEARNING_OBJECTIVES, VOCABULARY_LIST } from '../data/lessonData';
import { soundManager, SpeechNarrator } from '../utils/audioUtils';

interface StoryIntroProps {
  onContinue: () => void;
  completedObjectives: string[];
  toggleObjective: (id: string) => void;
}

export const StoryIntro: React.FC<StoryIntroProps> = ({
  onContinue,
  completedObjectives,
  toggleObjective,
}) => {
  const [selectedYoussefAction, setSelectedYoussefAction] = useState<string | null>(null);
  const [selectedMohamedAction, setSelectedMohamedAction] = useState<string | null>(null);
  const [showStoryLesson, setShowStoryLesson] = useState<boolean>(false);

  const handleYoussefChoice = (choice: string) => {
    setSelectedYoussefAction(choice);
    soundManager.playNotice();
  };

  const handleMohamedChoice = (choice: string) => {
    setSelectedMohamedAction(choice);
    if (choice === 'correct') {
      soundManager.playSuccess();
    } else {
      soundManager.playNotice();
    }
  };

  return (
    <div className="space-y-12 py-4">
      {/* Hero Banner with Islamic Aesthetic */}
      <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-3">
                <span>الوحدة الرابعة: الحقوق والواجبات</span>
                <span aria-hidden="true">·</span>
                <span>التربية الإسلامية</span>
                <span aria-hidden="true">·</span>
                <span>مدة التعلم: 15 دقيقة</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4 tracking-tight">
                الدرس الرابع: حـقُّ التَّـمَلُّـك
              </h1>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                مرحباً بك في هذه الرحلة التعليمية التفاعلية. ستكتشف في هذا الدرس كيف أقر الإسلام
                حق الإنسان في تملك الأموال، ولماذا يعد حافزاً فطرياً لإعمار الأرض، وما هي الحدود والواجبات
                الأخلاقية والشرعية التي تصون هذا الحق وتمنع التعدي على حقوق الآخرين والمال العام.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  const el = document.getElementById('story-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-xs"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>ابدأ النشاط التفاعلي الأول</span>
              </button>

              <button
                onClick={() => {
                  SpeechNarrator.speak(
                    'الدرس الرابع: حق التملك. الوحدة الرابعة: الحقوق والواجبات. أهداف التعلم: تعريف الملكية لغة واصطلاحاً، بيان مشروعية حق التملك في الإسلام، التمييز بين طرق الكسب الحلال والحرام، ومعرفة واجبات المسلم نحو ماله والمال العام.'
                  );
                }}
                className="px-4 py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-emerald-700" />
                <span>استمع لمقدمة الدرس</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full bg-slate-100">
            <img
              src="/src/assets/images/hero_islamic_architecture_1792751981343.jpg"
              alt="العمارة الإسلامية والتراث العلمي"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent lg:hidden" />
            <div className="absolute bottom-3 right-3 left-3 text-xs text-white/90 drop-shadow-sm font-medium lg:hidden">
              أصالة الشريعة في صيانة الحقوق والكرامة الإنسانية
            </div>
          </div>
        </div>
      </section>

      {/* Learning Objectives Dashboard */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1">
              مخرجات التعلم
            </div>
            <h2 className="text-xl font-bold text-slate-900">ماذا ستتعلم في هذا الدرس؟</h2>
          </div>
          <div className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs self-start sm:self-auto">
            أنجزت <span className="font-bold text-emerald-700 tabular-nums">{completedObjectives.length}</span> من <span className="font-bold tabular-nums">{LEARNING_OBJECTIVES.length}</span> أهداف
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {LEARNING_OBJECTIVES.map((obj, idx) => {
            const isDone = completedObjectives.includes(obj.id);
            return (
              <div
                key={obj.id}
                onClick={() => toggleObjective(obj.id)}
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isDone
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  <CheckCircle2
                    className={`w-5 h-5 ${
                      isDone ? 'text-emerald-600 fill-emerald-100' : 'text-slate-300'
                    }`}
                  />
                </div>
                <div className="text-sm leading-snug">
                  <span className="font-semibold text-slate-400 text-xs ml-1.5 font-mono">
                    0{idx + 1}.
                  </span>
                  {obj.text}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 mt-4 text-center">
          💡 يمكنك النقر على أي هدف لتحديد إنجازه، وستُحدد تلقائياً عند إتمام الأنشطة ذات الصلة.
        </p>
      </section>

      {/* Opening Story & Activity 1 */}
      <section id="story-section" className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <span>الكتاب المدرسي (الصفحة 96)</span>
              <span aria-hidden="true">·</span>
              <span>النشاط التفاعلي الأول</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              مدخل الدرس: موقف في محل الفواكه
            </h2>
          </div>
          <button
            onClick={() => {
              SpeechNarrator.speak(
                'دخل يوسف وأخوه محمد محلاً لشراء بعض الفواكه للبيت، وبينما كان العامل يجهز المطلوب أخذ يوسف يتذوق بعض الفواكه، فاعترضه أخوه محمد مستنكراً فعله. ناقش مع زملائك تصرف كل من يوسف ومحمد.'
              );
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 self-start md:self-auto"
          >
            <Volume2 className="w-4 h-4 text-emerald-600" />
            <span>استمع للموقف القصصي</span>
          </button>
        </div>

        {/* Narrative Box with Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-slate-50 rounded-xl p-4 sm:p-6 border border-slate-200">
          <div className="lg:col-span-5 rounded-lg overflow-hidden border border-slate-200 bg-white aspect-4/3">
            <img
              src="/src/assets/images/story_fruit_market_1792751982861.jpg"
              alt="يوسف ومحمد في محل الفواكه"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
              <p className="text-base text-slate-800 leading-relaxed font-medium">
                «دَخَلَ يُوسُفُ وَأَخُوهُ مُحَمَّدٌ مَحَلًّا لِشِرَاءِ بَعْضِ الْفَوَاكِهِ لِلْبَيْتِ،
                وَبَيْنَمَا كَانَ الْعَامِلُ يُجَهِّزُ الْمَطْلُوبَ أَخَذَ يُوسُفُ يَتَذَوَّقُ بَعْضَ الْفَوَاكِهِ،
                فَاعْتَرَضَهُ أَخُوهُ مُحَمَّدٌ مُسْتَنْكِرًا فِعْلَهُ.»
              </p>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>النشاط الأول:</strong> ناقش مع زملائك تصرّف كل من يوسف ومحمد، وحدد الصواب والخطأ بالدليل الشرعي.
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Scenario Decider */}
        <div className="space-y-6 pt-2">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>المختبر التفاعلي: تحليل تصرف الأخوين</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Youssef's action */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>1. تصرّف يوسف (أخذ الفاكهة وتذوقها دون إذن)</span>
                <span className="text-xs text-slate-500 font-normal">ما تقييمك؟</span>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'wrong', label: 'تصرّف خاطئ وغير لائق', desc: 'لأن الفاكهة مال يملكه البائع ولا يحل أخذ شيء منه إلا بإذنه ورضاه.' },
                  { id: 'ok', label: 'تصرّف مباح وطبيعي', desc: 'لأنها مجرد حبة فاكهة صغيرة للتجربة وقيمتها يسيرة جداً.' },
                  { id: 'smart', label: 'تصرّف ذكي لحماية المشتري', desc: 'للتأكد من جودة المنتج قبل دفع المال مهما كان الثمن.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleYoussefChoice(opt.id)}
                    className={`w-full text-right p-3 rounded-lg border text-xs transition-colors ${
                      selectedYoussefAction === opt.id
                        ? opt.id === 'wrong'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold'
                          : 'border-red-400 bg-red-50 text-red-950'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    <div className="font-bold mb-0.5">{opt.label}</div>
                    <div className="text-slate-500">{opt.desc}</div>
                  </button>
                ))}
              </div>

              {selectedYoussefAction && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                  selectedYoussefAction === 'wrong'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}>
                  {selectedYoussefAction === 'wrong' ? (
                    <div>
                      ✅ <strong>أحسنت القول!</strong> تذوق السلعة دون إذن صاحب المحل اعتداء على مال الغير، ولو كان شيئاً يسيراً، لأن الملكية تمنع الغير من التصرف أو الانتفاع بالمال بغير رضا مالكه.
                    </div>
                  ) : (
                    <div>
                      ⚠️ <strong>تنبيه تربوي وشرعي:</strong> حتى لو كانت السلعة يسيرة كحبة عنب أو تمرة، فإن أصل الملكية للبائع. والمسلم لا يأخذ شيئاً إلا بإذن صريح أو عرف مأذون به في المحل.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mohamed's action */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white space-y-3">
              <div className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center justify-between">
                <span>2. تصرّف محمد (استنكار فعل أخيه واعتراضه)</span>
                <span className="text-xs text-slate-500 font-normal">ما تقييمك؟</span>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'correct', label: 'تصرّف سليم وموقف واعٍ', desc: 'من باب النصح والأمر بالمعروف وتنبيه أخيه لحفظ حقوق الناس وأموالهم.' },
                  { id: 'exaggerated', label: 'تشديد ومبالغة في غير موضعها', desc: 'كان يمكنه السكوت حتى لا يحرج أخاه أمام البائع.' },
                  { id: 'embarrassing', label: 'تدخل غير مرغوب فيه', desc: 'يوسف مسؤول عن تصرفه بنفسه.' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleMohamedChoice(opt.id)}
                    className={`w-full text-right p-3 rounded-lg border text-xs transition-colors ${
                      selectedMohamedAction === opt.id
                        ? opt.id === 'correct'
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold'
                          : 'border-red-400 bg-red-50 text-red-950'
                        : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                    }`}
                  >
                    <div className="font-bold mb-0.5">{opt.label}</div>
                    <div className="text-slate-500">{opt.desc}</div>
                  </button>
                ))}
              </div>

              {selectedMohamedAction && (
                <div className={`p-3 rounded-lg text-xs leading-relaxed ${
                  selectedMohamedAction === 'correct'
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                    : 'bg-amber-50 text-amber-900 border border-amber-200'
                }`}>
                  {selectedMohamedAction === 'correct' ? (
                    <div>
                      ✅ <strong>إجابة متميزة!</strong> تصرف محمد يجسد الأمانة والنصح الأخوي، وحماية أخيه من الوقوع في أكل أموال الناس بالباطل امتثالاً لتوجيهات الشريعة الإسلامية.
                    </div>
                  ) : (
                    <div>
                      ⚠️ <strong>إرشاد:</strong> حرص الأخ على تنبيه أخيه بأدب ولطف هو من أعظم حقوق الأخوة، وصيانة له من الاعتياد على التساهل في أموال الآخرين.
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Deep Insight Box */}
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>القاعدة النبوية العظيمة (أفهم وأحفظ)</span>
              </span>
              <button
                onClick={() => {
                  SpeechNarrator.speak(
                    'عن أنس بن مالك رضي الله عنه أن رسول الله صلى الله عليه وسلم قال: لا يَحِلُّ مَالُ امْرِئٍ مُسْلِمٍ إِلَّا بِطِيبِ نَفْسِهِ. رواه الدارقطني في كتاب البيوع رقم الحديث ألفين وتسعمائة وأربعة وعشرين.'
                  );
                }}
                className="text-xs font-medium text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>استماع للحديث</span>
              </button>
            </div>

            <div className="text-center py-2 px-4 bg-white/80 rounded-lg border border-emerald-100">
              <p className="font-quran text-lg sm:text-xl text-emerald-950 font-bold leading-relaxed">
                عَنْ أَنَسِ بْنِ مَالِكٍ رضي الله عنه أَنَّ رَسُولَ اللهِ ﷺ قَالَ:
                <br />
                «لا يَحِلُّ مَالُ امْرِئٍ مُسْلِمٍ إِلَّا بِطِيبِ نَفْسِهِ»
              </p>
              <div className="text-[11px] text-emerald-800 mt-1 font-mono">
                [الدارقطني، كتاب البيوع، رقم الحديث: 2924]
              </div>
            </div>

            <p className="text-xs text-emerald-900 leading-relaxed">
              <strong>الدلالة التربوية:</strong> الحديث يقرر أصلاً أصيلاً في المعاملات المالية، فلا يجوز لأحد أن يأخذ
              أو يتصرف في شيء يملكه غيره صغيراً كان أو كبيراً إلا بإرادته الحرة ورضاه التام.
            </p>
          </div>
        </div>

        {/* Vocabulary breakdown */}
        <div className="space-y-4 pt-2">
          <h3 className="text-base font-bold text-slate-900">
            المفردات والتراكيب الواردة في الموقف
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VOCABULARY_LIST.slice(0, 2).map((item) => (
              <div key={item.term} className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-sm">{item.term}</span>
                  <span className="text-[11px] font-mono text-slate-400">{item.pronunciation}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.meaning}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Continue button */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={() => {
              toggleObjective('obj-1');
              onContinue();
            }}
            className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2 shadow-xs"
          >
            <span>الانتقال إلى الجزء التالي: مفهوم الملكية والموانع الشرعية</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
