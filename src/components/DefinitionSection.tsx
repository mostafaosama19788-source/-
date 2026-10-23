import React, { useState } from 'react';
import { BookOpen, Check, HelpCircle, ArrowLeft, ArrowRight, ShieldAlert, Award, FileText, ChevronDown } from 'lucide-react';
import { ADVANCED_TERMS_DATA } from '../data/lessonData';
import { soundManager, SpeechNarrator } from '../utils/audioUtils';

interface DefinitionSectionProps {
  onContinue: () => void;
  onBack: () => void;
  markCompleted: () => void;
}

export const DefinitionSection: React.FC<DefinitionSectionProps> = ({
  onContinue,
  onBack,
  markCompleted,
}) => {
  // Activity 2: Impediments to Financial Disposal (الموانع الشرعية)
  const [selectedImpediments, setSelectedImpediments] = useState<string[]>([]);
  const [revealedAnalysis, setRevealedAnalysis] = useState<boolean>(false);

  // Case study interactive rulings
  const [carCaseChoice, setCarCaseChoice] = useState<string | null>(null);
  const [inheritanceCaseChoice, setInheritanceCaseChoice] = useState<string | null>(null);

  // Terminology accordion tab
  const [activeTermIndex, setActiveTermIndex] = useState<number>(0);

  const potentialImpediments = [
    { id: 'imp-minor', text: 'الصِّغَرُ (عدم بلوغ سن الرشد وحسن التدبير)', isCorrect: true, reason: 'لأن الصغير لم تكتمل أهليته وقد يضيع أمواله بغير وعي فيحجر عليه وليه.' },
    { id: 'imp-insanity', text: 'الْجُنُونُ وفقدان العقل والأهلية', isCorrect: true, reason: 'مناط التكليف هو العقل، وفاقد العقل لا تصح تصرفاته المالية منعاً للضرر.' },
    { id: 'imp-gender', text: 'نوع الإنسان (ذكر أو أنثى)', isCorrect: false, reason: 'غير صحيح! فالإسلام ساوى بين الرجل والمرأة في ذمة التملك والتصرف المالي التام.' },
    { id: 'imp-prodigal', text: 'السَّفَهُ (تبذير المال وتضييعه في غير منفعة)', isCorrect: true, reason: 'السفيه يحجر عليه القاضي حماية لماله ومال أسرته ومجتمعه من الضياع.' },
    { id: 'imp-bankruptcy', text: 'الْإِفْلاَسُ ودين الغرماء المحكوم به قضائياً', isCorrect: true, reason: 'يمنع المدين المفلس من التصرف في أعيان أمواله صيانة لحقوق الدائنين.' },
    { id: 'imp-work', text: 'طبيعة مهنة الفرد أو تخصصه العلمي', isCorrect: false, reason: 'غير صحيح؛ فالمهنة أو التخصص لا علاقة لهما بأهلية التملك الشرعي.' }
  ];

  const toggleImpediment = (id: string) => {
    setSelectedImpediments(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCheckImpediments = () => {
    setRevealedAnalysis(true);
    soundManager.playSuccess();
    markCompleted();
  };

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
          <span>الوحدة الأولى</span>
          <span aria-hidden="true">·</span>
          <span>الكتاب المدرسي (الصفحتان 96 - 97)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          مفهوم الملكية وأركانها والموانع الشرعية
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
          أحكم الفقه الإسلامي مفهوم الملكية بضوابط دقيقة تضمن للإنسان حرية الانتفاع بما يملكه،
          وتحميه من تعدي الآخرين، مع وضع حواجز حكيمة تقيد التصرف عند وجود علة شرعية.
        </p>
      </section>

      {/* Language vs Terminology Breakdown */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* In Language */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4 hover:border-slate-300 transition-colors shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-400 font-mono">01. فِي اللُّغَةِ</span>
            <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">المدلول اللغوي</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            حيازة الإنسان للمال، والانفراد بالتصرّف فيه
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            الحيازة تعني وضع اليد والاستيلاء المشروع على الشيء، والانفراد بالتصرف يعني أن صاحب المال هو الوحيد الذي له سلطة إدارته ونقله دون مشاركة غير مرخص بها.
          </p>
          <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700">
            📌 <strong>مثال لغوي:</strong> ملكتُ الكتاب أي حزته وأصبح لي حق قراءته أو إهدائه.
          </div>
        </div>

        {/* In Islamic Jurisprudence */}
        <div className="bg-emerald-50/60 border border-emerald-200 rounded-xl p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-emerald-100">
            <span className="text-xs font-bold text-emerald-700 font-mono">02. فِي الاصْطِلاحِ الشَّرْعِي</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">التعريف الفقهي المعتمد</span>
          </div>
          <h3 className="text-xl font-bold text-emerald-950 leading-snug">
            «اختصاص بالشيء يمنع الغير منه، ويُمكّن صاحبه من التصرّف فيه ابتداءً إلا لمانع شرعي»
          </h3>
          <p className="text-xs text-emerald-900 leading-relaxed">
            المصدر: د. الحسين محمد شواط وعبدالحق حميش، كتاب نظرية التملك في الفقه الإسلامي.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-center">
            <div className="p-2 bg-white rounded border border-emerald-100 text-[11px]">
              <strong className="block text-emerald-900 mb-0.5">1. اختصاص يمنع الغير</strong>
              حاجز يمنع أي شخص من التعدي.
            </div>
            <div className="p-2 bg-white rounded border border-emerald-100 text-[11px]">
              <strong className="block text-emerald-900 mb-0.5">2. يُمكّن من التصرّف</strong>
              بيع، إيجار، رهن، هبة، وصية.
            </div>
            <div className="p-2 bg-white rounded border border-emerald-100 text-[11px]">
              <strong className="block text-emerald-900 mb-0.5">3. إلا لمانع شرعي</strong>
              صغر، جنون، سفه، أو حجر.
            </div>
          </div>
        </div>
      </section>

      {/* Practical Real-World Example from Page 97 */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-emerald-700" />
          <span>تطبيقات التصرّف في الملك الخاص (الكتاب ص 97)</span>
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed">
          لو أنك ملكت شيئاً من المال (<strong className="text-slate-800">سيارة - منزل - مزرعة - حاسوب</strong>) ستكون وحدك قادراً على التصرف فيه بكافة الأوجه الجائزة شرعاً:
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { label: 'البيع', desc: 'نقل ملكية العين بمقابل مالي' },
            { label: 'الإيجار', desc: 'تمليك منفعة العين مدة معلومة بعوض' },
            { label: 'الهبة', desc: 'تمليك العين لآخر بغير عوض تكرماً' },
            { label: 'الرهن', desc: 'توثيق دين بعين يمكن استيفاؤه منها' },
            { label: 'الوصية', desc: 'تصرف مالي ينفذ بعد الوفاة بالثلث' },
          ].map((action, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-center space-y-1">
              <span className="font-bold text-sm text-slate-800 block">{action.label}</span>
              <span className="text-[11px] text-slate-500 block leading-tight">{action.desc}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 italic">
          ⚠️ ولا يحق لأي إنسان آخر التصرف فيها أو الانتفاع بها إلا بإذنك أو بإذن شرعي معتبر.
        </p>
      </section>

      {/* Activity 2: Interactive Impediments Selection */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <span>الكتاب المدرسي (الصفحة 97)</span>
              <span aria-hidden="true">·</span>
              <span>النشاط التفاعلي الثاني</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              استكشف الموانع الشرعية التي تسقط أو تقيّد حق الإنسان في التصرف بماله
            </h3>
          </div>
          <button
            onClick={() => {
              SpeechNarrator.speak(
                'النشاط الثاني: من خلال فهمك لتعريف الملكية، حدد أهم الموانع الشرعية التي تسقط حق تصرف الإنسان في ماله. اختر الحالات الصحيحة ثم تحقق من إجابتك.'
              );
            }}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1 self-start sm:self-auto"
          >
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>تعليمات النشاط</span>
          </button>
        </div>

        <p className="text-xs text-slate-600">
          حدد من الخيارات الآتية الأسباب التي تمنع الشخص شرعاً من إدارة ماله أو بيعه (اختر كل ما ينطبق):
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {potentialImpediments.map(item => {
            const isSelected = selectedImpediments.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleImpediment(item.id)}
                className={`text-right p-3.5 rounded-lg border text-xs transition-colors flex items-start gap-3 ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-medium'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className={`w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 ${
                  isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
                }`}>
                  {isSelected && <Check className="w-3 h-3" />}
                </div>
                <div>
                  <div className="font-semibold text-sm mb-1">{item.text}</div>
                  {revealedAnalysis && (
                    <div className={`mt-1 text-[11px] leading-relaxed ${
                      item.isCorrect ? 'text-emerald-800' : 'text-red-700'
                    }`}>
                      {item.isCorrect ? `✅ مانع شرعي معتبر: ${item.reason}` : `❌ ليس مانعاً شرعياً: ${item.reason}`}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <button
            onClick={handleCheckImpediments}
            disabled={selectedImpediments.length === 0}
            className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
          >
            <ShieldAlert className="w-4 h-4" />
            <span>تحقق من صحة الموانع الشرعية المختارة</span>
          </button>

          {revealedAnalysis && (
            <span className="text-xs text-emerald-700 font-bold">
              🎉 تم التحقق وإتقان مفهوم الموانع الشرعية!
            </span>
          )}
        </div>
      </section>

      {/* Real Jurisprudential Cases from Page 100 */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div>
          <div className="text-xs font-semibold text-emerald-700 mb-1">الكتاب المدرسي (الصفحة 100) - ثالثاً</div>
          <h3 className="text-xl font-bold text-slate-900">
            تطبيق عملي: أعطِ الحكم الشرعي في المواقف الآتية
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Case 1: Selling borrowed car */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <span className="text-xs font-bold text-slate-500 font-mono">الحالة الأولى:</span>
            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              «استعار رجل سيارة جاره للذهاب لقضاء حاجة، ثم أعجبه سعر عُرض عليه فقام ببيعها للمشتري.»
            </h4>

            <div className="space-y-2">
              {[
                { id: 'c1-invalid', label: 'البيع باطل ومحرم شرعاً', correct: true, detail: 'لأن المستعير يملك حق الانتفاع فقط ولا يملك عين السيارة، والملكية تمنع الغير من التصرف فيها بغير إذن صريح.' },
                { id: 'c1-valid', label: 'البيع صحيح ما دام الجار سيأخذ المال', correct: false, detail: 'غير صحيح! قال ﷺ: «لا تبع ما ليس عندك»، والتعدي على مال الجار خيانة وظلم.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setCarCaseChoice(opt.id);
                    if (opt.correct) soundManager.playSuccess();
                    else soundManager.playNotice();
                  }}
                  className={`w-full text-right p-3 rounded-lg border text-xs transition-colors ${
                    carCaseChoice === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-red-50 border-red-300 text-red-950'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>{opt.label}</div>
                  {carCaseChoice === opt.id && (
                    <p className="mt-1 text-[11px] font-normal leading-relaxed text-slate-600">
                      {opt.detail}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Case 2: Inherited property */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <span className="text-xs font-bold text-slate-500 font-mono">الحالة الثانية:</span>
            <h4 className="text-sm font-bold text-slate-900 leading-snug">
              «تملكت فاطمة أرضاً سكنية من ميراث أبيها المتوفى، وسجلتها باسمها رسمياً.»
            </h4>

            <div className="space-y-2">
              {[
                { id: 'c2-valid', label: 'تملك مشروع وحلال شرعاً', correct: true, detail: 'أحسنت! الميراث هو أحد الأسباب الشرعية الأصيلة لنقل الملكية، وللمرأة ذمة مالية تامة ومستقلة كالمرد تماماً.' },
                { id: 'c2-invalid', label: 'تملك معلق على إذن إخوتها الذكور', correct: false, detail: 'خطأ؛ نصيب المرأة في الميراث فريضة من الله تعالى ولا يحق لأحد منعها من حقها الثابت.' }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setInheritanceCaseChoice(opt.id);
                    if (opt.correct) soundManager.playSuccess();
                    else soundManager.playNotice();
                  }}
                  className={`w-full text-right p-3 rounded-lg border text-xs transition-colors ${
                    inheritanceCaseChoice === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                        : 'bg-red-50 border-red-300 text-red-950'
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>{opt.label}</div>
                  {inheritanceCaseChoice === opt.id && (
                    <p className="mt-1 text-[11px] font-normal leading-relaxed text-slate-600">
                      {opt.detail}
                    </p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Research Terms from Page 100: (الولاية - الوصية - الوكالة) */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-5">
        <div>
          <div className="text-xs font-semibold text-emerald-700 mb-1">الكتاب المدرسي (الصفحة 100) - خامساً</div>
          <h3 className="text-xl font-bold text-slate-900">
            إثراء وبحث: المصطلحات الفقهية ذات الصلة بالتصرف المالي
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            قارن بين (الولاية - الوصية - الوكالة) واكتشف الفوارق الجوهرية بينها:
          </p>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          {ADVANCED_TERMS_DATA.map((item, idx) => (
            <button
              key={item.term}
              onClick={() => {
                setActiveTermIndex(idx);
                soundManager.playNotice();
              }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTermIndex === idx
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {item.term}
            </button>
          ))}
        </div>

        {/* Term detail display */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-emerald-900">
              {ADVANCED_TERMS_DATA[activeTermIndex].term}
            </h4>
            <span className="text-xs text-slate-500 font-medium">
              {ADVANCED_TERMS_DATA[activeTermIndex].sub}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {ADVANCED_TERMS_DATA[activeTermIndex].definition}
          </p>

          <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600">
            <strong>💡 مثال واقعي:</strong> {ADVANCED_TERMS_DATA[activeTermIndex].example}
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
          <span>السابق: المدخل والقصة</span>
        </button>

        <button
          onClick={onContinue}
          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
        >
          <span>التالي: مشروعية التملك وطرق الكسب</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
