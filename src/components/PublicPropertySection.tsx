import React, { useState } from 'react';
import { Landmark, Shield, FileCheck2, ArrowLeft, ArrowRight, Volume2, AlertCircle, CheckCircle, ThumbsUp } from 'lucide-react';
import { soundManager, SpeechNarrator } from '../utils/audioUtils';

interface PublicPropertySectionProps {
  onContinue: () => void;
  onBack: () => void;
  markCompleted: () => void;
}

export const PublicPropertySection: React.FC<PublicPropertySectionProps> = ({
  onContinue,
  onBack,
  markCompleted,
}) => {
  // Scenario choices for public civic stewardship
  const [selectedScenario, setSelectedScenario] = useState<Record<string, string>>({});
  const [showLawExplanation, setShowLawExplanation] = useState<boolean>(false);

  const publicScenarios = [
    {
      id: 'sc-school',
      title: 'مرافق المدرسة والفصول الدراسية',
      situation: 'طالب يكتب بقلم حبر على الطاولة المدرسية أو يعبث بمفاتيح الإضاءة ومكيف الهواء.',
      options: [
        { id: 'opt-bad', text: 'لا بأس بذلك لأنها ليست ملكاً خاصاً لأحد', isCorrect: false },
        { id: 'opt-good', text: 'سلوك مدمر ومحرم شرعاً وقانوناً، وواجبي الحفاظ عليها كأنها ملكي الخاص', isCorrect: true }
      ],
      explanation: 'المدرسة مال عام مخصص لأجيال الطلاب، وإتلافها اعتداء على حق المجتمع كاملاً.'
    },
    {
      id: 'sc-park',
      title: 'المتنزهات والحدائق العامة',
      situation: 'أسرة تقضي وقتاً في الحديقة العامة، وعند المغادرة تركت النفايات والأكياس على العشب.',
      options: [
        { id: 'opt-bad', text: 'عمال النظافة سيتولون ذلك وتلك وظيفتهم', isCorrect: false },
        { id: 'opt-good', text: 'واجب ديني وأخلاقي ووطني جمع المخلفات وترك المكان أنظف مما كان', isCorrect: true }
      ],
      explanation: 'قال النبي ﷺ: «إماطة الأذى عن الطريق صدقة»، ونظافة المرافق العامة من صميم الإيمان.'
    },
    {
      id: 'sc-energy',
      title: 'ترشيد موارد المياه والكهرباء بالمساجد والدوائر',
      situation: 'مصلٍ يتوضأ في المسجد تاركاً صنبور المياه يتدفق بغزارة مفرطة تفوق حاجته.',
      options: [
        { id: 'opt-bad', text: 'المياه مجانية متوفرة والوضوء عبادة فلا حرج', isCorrect: false },
        { id: 'opt-good', text: 'إسراف مذموم ومخالف لهدي النبي ﷺ حتى لو كان على نهر جارٍ', isCorrect: true }
      ],
      explanation: 'نهى النبي ﷺ عن الإسراف في ماء الوضوء ولو كان المتوضئ على نهر جارٍ.'
    }
  ];

  const handleScenarioSelect = (scenarioId: string, optionId: string, isCorrect: boolean) => {
    setSelectedScenario(prev => ({
      ...prev,
      [scenarioId]: optionId,
    }));
    if (isCorrect) {
      soundManager.playSuccess();
    } else {
      soundManager.playNotice();
    }
  };

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-2">
          <span>الوحدة الرابعة</span>
          <span aria-hidden="true">·</span>
          <span>الكتاب المدرسي (الصفحة 99)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
          واجباتي تجاه المال العام والمسؤولية المدنية والشرعية
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
          المال العام ليس مالاً مباحاً للاستباحة أو التضييع، بل هو ملك مشترك لجميع أفراد المجتمع،
          والاعتداء عليه أو التقصير في صيانته أشد إثماً ومسؤولية من التعدي على المال الخاص.
        </p>
      </section>

      {/* Visual & Concept Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6 shadow-xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                مفهوم الملكية العامة وأمثلتها (الكتاب ص 99)
              </h3>
              <button
                onClick={() => {
                  SpeechNarrator.speak(
                    'هنالك من الأموال ما يدخل تحت الملكية العامة، وهو حق ينتفع به الجميع، وليس لأحدهم حصة محددة فيه، ومن الأمثلة على ذلك: المساجد، والطرق، والبحار، والمستشفيات، والدوائر الحكومية، والمدارس، والحدائق العامة.'
                  );
                }}
                className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>استماع</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              «هُنَالِكَ مِنَ الْأَمْوَالِ مَا يَدْخُلُ تَحْتَ الْمِلْكِيَّةِ الْعَامَّةِ، وَهُوَ حَقٌّ يَنْتَفِعُ بِهِ الْجَمِيعُ،
              وَلَيْسَ لِأَحَدِهِمْ حِصَّةٌ مُحَدَّدَةٌ فِيهِ.»
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
              {[
                'المساجد ودور العبادة',
                'الشوارع والطرق والجسور',
                'المستشفيات والمراكز الصحية',
                'المدارس والجامعات',
                'الحدائق والمتنزهات',
                'الشواطئ والبحار والمحميات'
              ].map((item, i) => (
                <div key={i} className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 text-center">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 leading-relaxed">
            🌿 <strong>الفارق الجوهري:</strong> في المال الخاص، يرجع الإذن لمالك واحد، بينما في المال العام يرجع الحق للأمة جمعاء، فالتعدي عليه تعدٍّ على حقوق ملايين البشر.
          </div>
        </div>

        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col shadow-xs">
          <div className="aspect-4/3 overflow-hidden bg-slate-100">
            <img
              src="/src/assets/images/public_parks_infrastructure_1792751983699.jpg"
              alt="المرافق والخدمات العامة"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="p-5 flex-1 flex flex-col justify-between bg-slate-50 border-t border-slate-100 space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <Landmark className="w-4 h-4 text-emerald-700" />
              <span>أمانة الأجيال والمواطنة الصالحة</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              توفير الدولة للمرافق العامة يتطلب وعياً مجتمعياً بالحفاظ على مقدرات الوطن وحسن استغلالها لتدوم للأجيال القادمة.
            </p>
          </div>
        </div>
      </section>

      {/* Oman Penal Code Law Highlight (المادة 11 من قانون الجزاء العماني) */}
      <section className="bg-white border-2 border-slate-200 rounded-xl p-6 sm:p-8 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-emerald-700" />
            <h3 className="text-lg font-bold text-slate-900">
              تعلّم: من قانون الجزاء العماني (المادة 11) - مرسوم سلطاني رقم 7/2018
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
            صدر في: 23 ربيع الثاني 1439هـ / 11 يناير 2018م
          </span>
        </div>

        <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            «يُقْصَدُ بِالْأَمْوَالِ الْعَامَّةِ فِي تَطْبِيقِ أَحْكَامِ هَذَا الْقَانُونِ مَا يَكُونُ كُلُّهُ أَوْ بَعْضُهُ مَمْلُوكًا لِإِحْدَى الْجِهَاتِ الْآتِيَةِ أَوْ خَاضِعًا لِإِشْرَافِهَا أَوْ لِإِدَارَتِهَا:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
              <strong className="text-emerald-800 block">أ. الدولة أو وحدات الجهاز الإداري بها</strong>
              <p className="text-slate-600">كافة الوزارات والهيئات والمؤسسات الحكومية والبلديات ومرافقها.</p>
            </div>

            <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs space-y-1">
              <strong className="text-emerald-800 block">ب. الشركات الحكومية وشبه الحكومية</strong>
              <p className="text-slate-600">الشركات المملوكة بالكامل للحكومة، أو التي تساهم في رأس مالها بنسبة تزيد على (40%).</p>
            </div>
          </div>
        </div>

        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 flex items-start gap-2">
          <Shield className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <strong>الحماية القانونية والجزائية:</strong> يعاقب القانون كل من يختلس أو يعتدي أو يتلف الأموال والمرافق العامة بعقوبات مغلظة لحماية الاقتصاد الوطني وحفظ حقوق كافة المواطنين والمقيمين.
          </div>
        </div>
      </section>

      {/* Activity 4: Interactive Scenarios on Public Facilities (الكتاب ص 99 - النشاط الرابع) */}
      <section className="bg-slate-50 border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
            <span>الكتاب المدرسي (الصفحة 99)</span>
            <span aria-hidden="true">·</span>
            <span>النشاط التفاعلي الرابع</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            ما واجبك العملي تجاه ما توفره الدولة من مرافق عامة؟
          </h3>
          <p className="text-xs text-slate-600 mt-1">
            اختر السلوك الصحيح لكل موقف حياتي واقعي لتطبيق قيمة الحفاظ على المال العام:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {publicScenarios.map((sc) => {
            const chosen = selectedScenario[sc.id];

            return (
              <div key={sc.id} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{sc.title}</h4>
                  <span className="text-[11px] text-slate-400">موقف يومي</span>
                </div>

                <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                  {sc.situation}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sc.options.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleScenarioSelect(sc.id, opt.id, opt.isCorrect)}
                      className={`text-right p-3 rounded-lg border text-xs transition-colors flex items-start gap-2 ${
                        chosen === opt.id
                          ? opt.isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                            : 'bg-red-50 border-red-300 text-red-950'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {chosen === opt.id ? (
                          opt.isCorrect ? <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> : <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                        ) : (
                          <div className="w-3.5 h-3.5 rounded-full border border-slate-300" />
                        )}
                      </div>
                      <span>{opt.text}</span>
                    </button>
                  ))}
                </div>

                {chosen && (
                  <div className="p-2.5 rounded-lg text-xs bg-slate-50 border border-slate-200 text-slate-700 flex items-center gap-1.5">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span><strong>التوجيه الشرعي: </strong>{sc.explanation}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="pt-4 flex items-center justify-between border-t border-slate-200">
        <button
          onClick={onBack}
          className="px-4 py-2 border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5"
        >
          <ArrowRight className="w-4 h-4" />
          <span>السابق: واجبات الفرد</span>
        </button>

        <button
          onClick={() => {
            markCompleted();
            onContinue();
          }}
          className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
        >
          <span>التالي: الملخص الشامل والخريطة الذهنية</span>
          <ArrowLeft className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
