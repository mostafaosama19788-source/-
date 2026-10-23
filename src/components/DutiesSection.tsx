import React, { useState } from 'react';
import { Heart, Coins, ShieldCheck, PiggyBank, ArrowLeft, ArrowRight, Volume2, Calculator, Sparkles } from 'lucide-react';
import { soundManager, SpeechNarrator } from '../utils/audioUtils';

interface DutiesSectionProps {
  onContinue: () => void;
  onBack: () => void;
  markCompleted: () => void;
}

export const DutiesSection: React.FC<DutiesSectionProps> = ({
  onContinue,
  onBack,
  markCompleted,
}) => {
  // Mini interactive Zakat / Stewardship calculator
  const [totalWealth, setTotalWealth] = useState<number>(1000);
  const [familyNeeds, setFamilyNeeds] = useState<number>(500);
  const [calculatedZakat, setCalculatedZakat] = useState<number>(25);

  const handleWealthChange = (val: number) => {
    const num = Math.max(0, val);
    setTotalWealth(num);
    // 2.5% standard zakat on liquid eligible wealth
    setCalculatedZakat(Math.round(num * 0.025 * 100) / 100);
  };

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
          <span>الوحدة الثالثة</span>
          <span aria-hidden="true">·</span>
          <span>الكتاب المدرسي (الصفحة 98)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          واجبات الفرد ومسؤولياته تجاه ما يملك
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
          أكدت الشريعة الإسلامية مبدأً عقدياً عظيماً: المالك الحقيقي لكل ما في الوجود هو الله سبحانه،
          والإنسان إنما هو وكيل ومستخلف ومؤتمن على هذا المال ليؤدي فيه حقوق الله وحقوق عباده.
        </p>
      </section>

      {/* Stewardship Principle (مبدأ الاستخلاف) */}
      <section className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
              أصل الملكية في الفكر الإسلامي
            </div>
            <h3 className="text-xl font-bold text-emerald-950 mt-1">
              مبدأ الاستخلاف: الله هو المالك الحقيقي والإنسان أمين
            </h3>
          </div>
          <button
            onClick={() => {
              SpeechNarrator.speak(
                'تؤكد النصوص الشرعية أن المالك الحقيقي هو الله تعالى: لله ملك السماوات والأرض وما فيهن، وأن الإنسان مستخلف فيه: آمنوا بالله ورسوله وأنفقوا مما جعلكم مستخلفين فيه.'
              );
            }}
            className="text-xs font-medium text-emerald-800 hover:text-emerald-950 flex items-center gap-1 self-start sm:self-auto"
          >
            <Volume2 className="w-4 h-4" />
            <span>استمع لآيات الاستخلاف</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl border border-emerald-100 space-y-2">
            <span className="text-xs text-slate-500 font-medium">1. إثبات الملكية الحقيقية لله تعالى:</span>
            <div className="text-center py-2">
              <span className="font-quran text-lg text-emerald-950 font-bold">
                ﴿لِلَّهِ مُلْكُ السَّمَاوَاتِ وَالْأَرْضِ وَمَا فِيهِنَّ﴾
              </span>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">[سورة المائدة: 120]</div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              الخالق هو واهب النعم وموجد الموارد ومجري الأرزاق، فملكه للكون ملك إيجاد وتدبير مطلق.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-emerald-100 space-y-2">
            <span className="text-xs text-slate-500 font-medium">2. إنابة الإنسان وتكليفه بالأمانة:</span>
            <div className="text-center py-2">
              <span className="font-quran text-lg text-emerald-950 font-bold">
                ﴿آمِنُوا بِاللَّهِ وَرَسُولِهِ وَأَنفِقُوا مِمَّا جَعَلَكُم مُّسْتَخْلَفِينَ فِيهِ﴾
              </span>
              <div className="text-[11px] text-slate-500 mt-1 font-mono">[سورة الحديد: 7]</div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              الإنسان ليس حراً حرية هوجاء، بل يتصرف كوكيل ومؤتمن يحاسب على مصدر ماله وأوجه إنفاقه.
            </p>
          </div>
        </div>
      </section>

      {/* The 4 Core Duties (Page 98) */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <div className="text-xs font-semibold text-emerald-700 mb-1">الكتاب المدرسي (الصفحة 98)</div>
          <h3 className="text-xl font-bold text-slate-900">
            أبرز واجبات المسلم في ماله الخاص
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Duty 1: Family & Personal Needs */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Heart className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">١. الإنفاق في مصالحه ومصالح عياله</h4>
                <span className="text-xs text-emerald-700 font-medium">أعظم الصدقات أجراً عند الله</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              النفقة على النفس والأهل والأبناء فريضة وواجب شرعي متقدم، وقد بين رسول الله ﷺ مكانتها العالية:
            </p>

            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <p className="font-quran text-sm font-bold text-emerald-950 leading-relaxed text-center">
                «دِينَارٌ أَنْفَقْتَهُ فِي سَبِيلِ اللهِ، وَدِينَارٌ فِي الْمَسَاكِينِ، وَدِينَارٌ فِي رَقَبَةٍ،
                وَدِينَارٌ فِي أَهْلِكَ أَعْظَمُهَا أَجْرًا الدِّينَارُ الَّذِي تُنْفِقُهُ عَلَى أَهْلِكَ»
              </p>
              <div className="text-[10px] text-slate-400 mt-1 text-center font-mono">
                [مسند أحمد، رقم الحديث: 10387]
              </div>
            </div>
          </div>

          {/* Duty 2: Zakat */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Coins className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">٢. أداء فريضة الزكاة</h4>
                <span className="text-xs text-emerald-700 font-medium">الركن الثالث من أركان الإسلام</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              حق مالي محدد ومعلوم فرضه الله على الأموال البالغة للنصاب الشرعي بعد حولان الحول،
              وتصرف في مصارفها الثمانية المحددة بالقرآن لتطهير المال والنفس وسد حاجة المحتاجين.
            </p>

            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
              📌 <strong>مقدارها في عروض التجارة والنقدين:</strong> 2.5% (ربع العشر) إذا بلغ النصاب وحال عليه الحول.
            </div>
          </div>

          {/* Duty 3: Voluntary Charity */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">٣. الصدقات ونوافل البر</h4>
                <span className="text-xs text-emerald-700 font-medium">النفقات الزائدة عن الزكاة المفروضة</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              الإحسان التطوعي لدعم المشاريع الإنسانية وكفالة الأيتام وتفريج كربات المكروبين،
              وهي من أعظم أسباب نماء الرزق ودفع البلاء واستنزال الرحمات.
            </p>

            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
              📌 <strong>أثرها المبارك:</strong> تزيد المال نماءً وبركة وتطفئ الخطيئة كما يطفئ الماء النار.
            </div>
          </div>

          {/* Duty 4: Preserving Wealth & Anti-Waste */}
          <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <PiggyBank className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <h4 className="text-base font-bold text-slate-900">٤. حفظ المال وعدم التبذير أو الكنز</h4>
                <span className="text-xs text-emerald-700 font-medium">التوازن المالي والاعتدال الرشيد</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              حرم الإسلام التبذير والإسراف كما حرم البخل وتجميد الأموال وكنزها وحرمان المجتمع من دورتها الاقتصادية:
            </p>

            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-700">
              📌 <strong>الوعيد من الكنز:</strong> ﴿وَالَّذِينَ يَكْنِزُونَ الذَّهَبَ وَالْفِضَّةَ وَلَا يُنفِقُونَهَا فِي سَبِيلِ اللَّهِ فَبَشِّرْهُم بِعَذَابٍ أَلِيمٍ﴾.
            </div>
          </div>
        </div>
      </section>

      {/* Practical Application: Stewardship Budget Simulation */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-emerald-700 mb-1">محاكاة عملية تفاعلية</div>
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600" />
              <span>مختبر التطبيق: حاسبة الزكاة والموازنة الشرعية</span>
            </h3>
          </div>
          <span className="text-xs text-slate-500">طبّق مفهوم الاستخلاف على أرقام واقعية</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-6 space-y-4 bg-white p-5 rounded-xl border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                المال المدخر الفائض الذي حال عليه الحول (ريال / دينار / درهم):
              </label>
              <input
                type="number"
                min="0"
                step="50"
                value={totalWealth}
                onChange={(e) => handleWealthChange(Number(e.target.value))}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                النفقة الشهرية المخصصة للأهل والاحتياجات الأساسية:
              </label>
              <input
                type="number"
                min="0"
                step="20"
                value={familyNeeds}
                onChange={(e) => setFamilyNeeds(Number(e.target.value))}
                className="w-full px-3.5 py-2 border border-slate-300 rounded-lg text-sm font-mono text-slate-900 focus:outline-emerald-600"
              />
            </div>
          </div>

          <div className="lg:col-span-6 bg-emerald-900 text-white p-5 rounded-xl space-y-4">
            <h4 className="text-sm font-bold text-emerald-200 border-b border-emerald-800 pb-2">
              توزيع الحقوق المالية الشرعية تلقائياً:
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span>الزكاة الشرعية المفروضة (2.5%):</span>
                <span className="font-mono text-base font-bold text-amber-300">{calculatedZakat}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>النفقة الأسرية (أعظمها أجراً):</span>
                <span className="font-mono text-base font-bold text-emerald-200">{familyNeeds}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-emerald-800 text-slate-300">
                <span>الادخار الرشيد المتبقي لإعمار الأرض:</span>
                <span className="font-mono text-base font-bold text-white">
                  {Math.max(0, totalWealth - calculatedZakat)}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-emerald-300 leading-snug">
              ✨ التوازن المالي يجمع بين أداء الحق الواجب (الزكاة)، وإكرام الأسرة (النفقة)، والاستثمار المثمر دون سفه أو تبذير.
            </p>
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
          <span>السابق: مشروعية التملك</span>
        </button>

        <button
          onClick={() => {
            markCompleted();
            onContinue();
          }}
          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
        >
          <span>التالي: حماية المال العام والمسؤولية المجتمعية</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
