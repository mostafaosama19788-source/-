import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight, Volume2, ShieldCheck, HelpCircle } from 'lucide-react';
import { CLASSIFICATION_ITEMS } from '../data/lessonData';
import { soundManager, SpeechNarrator } from '../utils/audioUtils';

interface LegitimacySectionProps {
  onContinue: () => void;
  onBack: () => void;
  markCompleted: () => void;
}

export const LegitimacySection: React.FC<LegitimacySectionProps> = ({
  onContinue,
  onBack,
  markCompleted,
}) => {
  // Sorting activity state: mapped by item id -> 'halal' | 'haram' | null
  const [userClassifications, setUserClassifications] = useState<Record<string, 'halal' | 'haram'>>({});
  const [showClassificationResults, setShowClassificationResults] = useState(false);

  // Verse analysis reflection reveal
  const [revealedVerseReflection, setRevealedVerseReflection] = useState(false);

  const handleClassify = (id: string, type: 'halal' | 'haram') => {
    setUserClassifications(prev => ({
      ...prev,
      [id]: type,
    }));
    soundManager.playNotice();
  };

  const checkClassification = () => {
    setShowClassificationResults(true);
    soundManager.playSuccess();
    markCompleted();
  };

  const correctCount = Object.entries(userClassifications).filter(([id, type]) => {
    const item = CLASSIFICATION_ITEMS.find(it => it.id === id);
    return item && item.type === type;
  }).length;

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
          <span>الوحدة الثانية</span>
          <span aria-hidden="true">·</span>
          <span>الكتاب المدرسي (الصفحتان 97 - 98)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          مشروعية حق التملك والضوابط الشرعية للكسب
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
          أباح الإسلام التملك لحكمة سامية تتوافق مع الفطرة وتعمر الكون، لكنه لم يتركه مطلقاً دون قيد،
          بل وضع ميزاناً حاسماً بين الحلال الطيب الذي ينفع الفرد والأمة، والحرام الخبيث الذي يمحق البركة وينشر الفساد.
        </p>
      </section>

      {/* Why Islam Sanctioned Ownership + Visual Card */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                علل: لماذا أباح الإسلام للفرد حق التملك؟
              </h3>
              <button
                onClick={() => {
                  SpeechNarrator.speak(
                    'أعطى الإسلام الفرد حق التملك وحيازة الأشياء والانتفاع بها لأن ذلك من مقتضيات الفطرة، قال تعالى: وتحبون المال حباً جما. ولأن في ذلك دافعاً له لزيادة الإنتاج وتحسينه، وهو بذلك يحقق هدف الاستعمار في الأرض.'
                  );
                }}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>استماع</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-mono">1</span>
                  <span>مقتضيات الفطرة الإنسانية السليمة</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  الإنسان مجبول بطبعه على حب التملك، وقد قرر القرآن هذه الحقيقة الفطرية في قوله تعالى:
                </p>
                <div className="p-2.5 bg-white border border-slate-200 rounded text-center">
                  <span className="font-quran text-base sm:text-lg text-emerald-950 font-bold">
                    ﴿وَتُحِبُّونَ الْمَالَ حُبًّا جَمًّا﴾
                  </span>
                  <span className="text-[11px] text-slate-500 mr-2 font-mono">[الفجر: 20]</span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs flex items-center justify-center font-mono">2</span>
                  <span>حافز لزيادة الإنتاج وإعمار الأرض</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  شعور الإنسان بأنه سيجني ثمرة تعبه يحثه على العمل والابتكار، محققاً بذلك الغاية الاستخلافية الأولى:
                </p>
                <div className="p-2.5 bg-white border border-slate-200 rounded text-center">
                  <span className="font-quran text-base sm:text-lg text-emerald-950 font-bold">
                    ﴿هُوَ أَنشَأَكُم مِّنَ الْأَرْضِ وَاسْتَعْمَرَكُمْ فِيهَا﴾
                  </span>
                  <span className="text-[11px] text-slate-500 mr-2 font-mono">[هود: 61]</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 leading-relaxed">
            ⚠️ <strong>ضابط شرعي جوهري:</strong> إقرار الإسلام للتملك ليس «مطلقاً بغير حساب»، بل قيده بعدم الإضرار بالآخرين أو المجتمع، وعدم استخدام المال وسيلة للبغي والاستغلال.
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-xs">
          <div className="aspect-4/3 overflow-hidden bg-slate-100">
            <img
              src="/src/assets/images/property_halal_wealth_1792751982507.jpg"
              alt="المال الحلال والنماء والعدل"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between bg-emerald-50/50 border-t border-slate-100 space-y-3">
            <div>
              <div className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1">
                <Scale className="w-4 h-4 text-emerald-700" />
                <span>ميزان العدل والبركة في المال الحلال</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                المال في الإسلام وسيلة لعمارة الكون وخدمة الإنسانية ونيل مرضاة الله، وليس غاية للاكتناز أو الطغيان.
              </p>
            </div>

            <div className="text-[11px] text-slate-500 pt-2 border-t border-emerald-200/60">
              ﴿وَلَقَدْ مَكَّنَّاكُمْ فِي الْأَرْضِ وَجَعَلْنَا لَكُمْ فِيهَا مَعَايِشَ قَلِيلًا مَّا تَشْكُرُونَ﴾
            </div>
          </div>
        </div>
      </section>

      {/* Prophetic Warning on Violating Others' Rights (Page 97) */}
      <section className="bg-emerald-900 text-white rounded-xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <h3 className="text-lg font-bold">تأمَّل في خطورة اقتطاع حقوق الآخرين ولو بشيء يسير</h3>
          </div>
          <button
            onClick={() => {
              SpeechNarrator.speak(
                'عن أنس بن مالك قال: قال رسول الله صلى الله عليه وسلم: من اقتطع حق مسلم بيمينه حرم الله عليه الجنة وأوجب له النار. فقال له رجل: وإن كان شيئاً يسيراً يا رسول الله؟ فقال: وإن كان قضيباً من أراك. رواه الربيع في المسند.'
              );
            }}
            className="text-xs text-emerald-200 hover:text-white flex items-center gap-1 self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>استمع للحديث الشريف</span>
          </button>
        </div>

        <div className="py-2 text-center bg-emerald-950/60 rounded-xl p-5 border border-emerald-800/80">
          <p className="font-quran text-lg sm:text-xl font-bold leading-relaxed text-amber-200">
            أَبُو عُبَيْدَةَ، عَنْ جَابِرٍ، عَنْ أَنَسِ بْنِ مَالِكٍ، قَالَ: قَالَ رَسُولُ اللهِ ﷺ:
            <br />
            «مَنِ اقْتَطَعَ حَقَّ مُسْلِمٍ بِيَمِينِهِ حَرَّمَ اللهُ عَلَيْهِ الْجَنَّةَ وَأَوْجَبَ لَهُ النَّارَ»
            <br />
            <span className="text-base text-slate-200 font-normal">
              فَقَالَ لَهُ رَجُلٌ: وَإِنْ كَانَ شَيْئًا يَسِيرًا يَا رَسُولَ اللهِ؟
            </span>
            <br />
            فَقَالَ رَسُولُ اللهِ ﷺ: «وَإِنْ كَانَ قَضِيبًا مِنْ أَرَاكٍ»
          </p>
          <div className="text-[11px] text-emerald-300 mt-2 font-mono">
            [الربيع بن حبيب، الجامع الصحيح - المسند، كتاب الأيمان والنذور، رقم الحديث: 660]
          </div>
        </div>

        <p className="text-xs text-emerald-100 leading-relaxed">
          🌿 <strong>قضيب من أراك:</strong> عود سواك صغير لا تكاد قيمته تذكر! ومع ذلك رتب الشرع الشريف عليه هذا الوعيد الشديد،
          ترسيخاً لحرمة حقوق الناس وحفظاً لسلامة المعاملات من أي اعتداء.
        </p>
      </section>

      {/* Activity: Interactive Sorting (Halal vs Haram Earnings) */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 mb-1">نشاط تفاعلي تطبيقي</div>
            <h3 className="text-xl font-bold text-slate-900">
              مختبر الفرز الشرعي: التمييز بين الكسب الحلال والكسب الحرام
            </h3>
          </div>
          <div className="text-xs text-slate-500 bg-white border border-slate-200 px-3 py-1.5 rounded-lg">
            تم تصنيف <span className="font-bold text-emerald-700 font-mono">{Object.keys(userClassifications).length}</span> من <span className="font-bold font-mono">{CLASSIFICATION_ITEMS.length}</span> معاملات
          </div>
        </div>

        <p className="text-xs text-slate-600">
          صنّف كل وسيلة مالية بالضغط على الزر المناسب (حلال مشروع أو حرام ممنوع) لمشاهدة الدليل الفقهي:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {CLASSIFICATION_ITEMS.map((item) => {
            const userChoice = userClassifications[item.id];
            const isEvaluated = showClassificationResults && userChoice;
            const isCorrect = userChoice === item.type;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-xl border bg-white space-y-3 transition-all ${
                  isEvaluated
                    ? isCorrect
                      ? 'border-emerald-300 bg-emerald-50/30'
                      : 'border-red-300 bg-red-50/30'
                    : 'border-slate-200'
                }`}
              >
                <div className="text-sm font-semibold text-slate-800 leading-snug">
                  {item.text}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleClassify(item.id, 'halal')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                      userChoice === 'halal'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    حلال مشروع
                  </button>

                  <button
                    onClick={() => handleClassify(item.id, 'haram')}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-colors ${
                      userChoice === 'haram'
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    حرام ممنوع
                  </button>
                </div>

                {/* Evidence & feedback */}
                {(userChoice || showClassificationResults) && (
                  <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-700">الدليل والعلة: </span>
                    {item.evidenceOrReason}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={checkClassification}
            disabled={Object.keys(userClassifications).length < 4}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تقييم إجابات الفرز الشرعي</span>
          </button>

          {showClassificationResults && (
            <div className="text-xs font-bold text-slate-800 bg-white border border-slate-200 px-4 py-2 rounded-lg">
              درجتك في النشاط: <span className="text-emerald-700 font-mono text-sm">{correctCount}</span> / <span className="font-mono text-sm">{CLASSIFICATION_ITEMS.length}</span>
            </div>
          )}
        </div>
      </section>

      {/* Analysis of Quranic Verse (Page 100 - رابعاً) */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div>
          <div className="text-xs font-semibold text-emerald-700 mb-1">الكتاب المدرسي (الصفحة 100) - رابعاً</div>
          <h3 className="text-xl font-bold text-slate-900">
            تدبر قرآني: استنتاج التحذير والإغراء في آيات المال
          </h3>
        </div>

        <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-center space-y-1">
          <p className="font-quran text-xl sm:text-2xl font-bold text-emerald-950">
            ﴿يَمْحَقُ اللَّهُ الرِّبَا وَيُرْبِي الصَّدَقَاتِ﴾
          </p>
          <span className="text-xs text-emerald-800 font-mono">[سورة البقرة: 276]</span>
        </div>

        <div className="space-y-3">
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            في الآية الكريمة أسلوب تربوي رباني يجمع بين «الترهيب بالتحذير» و«الترغيب بالإغراء». انقر لكشف التفصيل البلاغي والشرعي:
          </p>

          <button
            onClick={() => {
              setRevealedVerseReflection(!revealedVerseReflection);
              soundManager.playNotice();
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
          >
            {revealedVerseReflection ? 'إخفاء الاستنتاج' : 'كشف التحذير والإغراء المستنتج من الآية'}
          </button>

          {revealedVerseReflection && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-red-50/80 border border-red-200 rounded-lg space-y-1">
                <div className="text-xs font-bold text-red-900 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span>التحذير في الآية: ﴿يَمْحَقُ اللَّهُ الرِّبَا﴾</span>
                </div>
                <p className="text-xs text-red-950 leading-relaxed">
                  تحذير شديد ووعيد قاطع من التعامل بالربا، لأن الله يستأصل بركته، ويهلك المال المرابي، ويصيب صاحبه بالخسارة النفسية والمالية في الدنيا والآخرة.
                </p>
              </div>

              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-lg space-y-1">
                <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>الإغراء والترغيب: ﴿وَيُرْبِي الصَّدَقَاتِ﴾</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  ترغيب وحث كريم على بذل الصدقات، لأن الله ينميها ويبارك فيها ويزيد صاحبها رزقاً وثواباً ويضاعف له الحسنات أضعافاً كثيرة.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق: مفهوم الملكية</span>
        </button>

        <button
          onClick={onContinue}
          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
        >
          <span>التالي: واجبات الفرد تجاه ما يملك</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
