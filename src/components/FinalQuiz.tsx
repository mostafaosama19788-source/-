import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, Printer, Share2, Sparkles, BookOpen, User, Check, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/lessonData';
import { soundManager } from '../utils/audioUtils';

interface FinalQuizProps {
  onRetake: () => void;
  onLessonComplete: () => void;
}

export const FinalQuiz: React.FC<FinalQuizProps> = ({
  onRetake,
  onLessonComplete,
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [studentName, setStudentName] = useState<string>('طالب مجتهد');
  const [showCertificate, setShowCertificate] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, optionId: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
    soundManager.playNotice();
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      const selectedOptId = userAnswers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (selectedOptId && correctOpt && selectedOptId === correctOpt.id) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    const score = calculateScore();
    const percent = Math.round((score / QUIZ_QUESTIONS.length) * 100);

    if (percent >= 70) {
      soundManager.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Confetti fallback
      }
      onLessonComplete();
    } else {
      soundManager.playNotice();
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  const score = calculateScore();
  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
  const hasPassed = percentage >= 70;

  return (
    <div className="space-y-10 py-4">
      {/* Header */}
      <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
              <span>التقويم الختامي الشامل</span>
              <span aria-hidden="true">·</span>
              <span>الكتاب المدرسي (الصفحة 100)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              اختبار قياس الفهم والإتقان: درس «حق التملك»
            </h2>
          </div>

          <div className="text-xs bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-lg text-slate-600 self-start sm:self-auto">
            عدد الأسئلة: <span className="font-bold text-slate-900 font-mono">{QUIZ_QUESTIONS.length}</span> أسئلة معتمدة
          </div>
        </div>
      </section>

      {/* Questions Form */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selectedOptId = userAnswers[q.id];
          const correctOpt = q.options.find(o => o.isCorrect);

          return (
            <div
              key={q.id}
              className={`p-6 rounded-xl border bg-white shadow-xs transition-colors ${
                submitted
                  ? selectedOptId === correctOpt?.id
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-red-300 bg-red-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 font-mono">
                  <span>السؤال {idx + 1}</span>
                  {q.sourceNote && (
                    <span className="font-sans text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-normal">
                      {q.sourceNote}
                    </span>
                  )}
                </div>

                {submitted && (
                  <div>
                    {selectedOptId === correctOpt?.id ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>إجابة صحيحة</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>إجابة خاطئة</span>
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
                {q.question}
              </h3>

              {q.context && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 mb-4">
                  <strong>الواقعة: </strong>{q.context}
                </div>
              )}

              {/* Options */}
              <div className="space-y-2 mt-4">
                {q.options.map(opt => {
                  const isSelected = selectedOptId === opt.id;
                  let optStyle = 'border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700';

                  if (isSelected && !submitted) {
                    optStyle = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                  }

                  if (submitted) {
                    if (opt.isCorrect) {
                      optStyle = 'border-emerald-500 bg-emerald-100/70 text-emerald-950 font-bold';
                    } else if (isSelected && !opt.isCorrect) {
                      optStyle = 'border-red-400 bg-red-100/70 text-red-950';
                    } else {
                      optStyle = 'border-slate-200 opacity-60 bg-white text-slate-600';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      disabled={submitted}
                      className={`w-full text-right p-3.5 rounded-lg border text-xs sm:text-sm transition-colors flex items-start gap-3 ${optStyle}`}
                    >
                      <div className={`w-4 h-4 rounded-full border mt-0.5 shrink-0 flex items-center justify-center ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-600 text-white'
                          : 'border-slate-300'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1">
                        <div>{opt.text}</div>
                        {submitted && (isSelected || opt.isCorrect) && (
                          <div className={`mt-1.5 text-xs font-normal leading-relaxed ${
                            opt.isCorrect ? 'text-emerald-900' : 'text-red-900'
                          }`}>
                            💡 {opt.explanation}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Panel */}
      {!submitted ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            أجبت عن <span className="font-bold text-emerald-700 font-mono">{Object.keys(userAnswers).length}</span> من <span className="font-bold font-mono">{QUIZ_QUESTIONS.length}</span> أسئلة.
          </div>

          <button
            onClick={handleSubmitQuiz}
            disabled={Object.keys(userAnswers).length === 0}
            className="w-full sm:w-auto px-8 py-3 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-sm font-bold transition-colors flex items-center justify-center gap-2 shadow-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>تسليم الإجابات وإظهار النتيجة</span>
          </button>
        </div>
      ) : (
        /* Results & Certificate Section */
        <div className="space-y-8">
          <div className={`p-6 sm:p-8 rounded-xl border text-center space-y-4 ${
            hasPassed
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}>
            <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-white shadow-2xs">
              {hasPassed ? (
                <Award className="w-10 h-10 text-emerald-600" />
              ) : (
                <ShieldAlert className="w-10 h-10 text-amber-600" />
              )}
            </div>

            <div>
              <h3 className="text-2xl font-bold">
                {hasPassed ? 'مبارك! لقد اجتزت اختبار درس حق التملك بنجاح باهر' : 'أحسنت المحاولة! يمكنك مراجعة المفاهيم وإعادة الاختبار'}
              </h3>
              <p className="text-sm mt-1 opacity-80">
                حصلت على <span className="font-bold font-mono text-lg">{score}</span> من <span className="font-bold font-mono text-lg">{QUIZ_QUESTIONS.length}</span> درجات (بنسبة <span className="font-bold font-mono text-lg">{percentage}%</span>)
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setUserAnswers({});
                  setSubmitted(false);
                  setShowCertificate(false);
                  onRetake();
                }}
                className="px-4 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة الاختبار</span>
              </button>

              {hasPassed && (
                <button
                  onClick={() => setShowCertificate(!showCertificate)}
                  className="px-6 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{showCertificate ? 'إخفاء الشهادة' : 'عرض شهادة الإتقان والتفوق'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Printable Completion Certificate */}
          {showCertificate && (
            <div className="bg-white border-4 border-double border-emerald-800 rounded-2xl p-8 sm:p-12 shadow-md relative overflow-hidden print:p-6 print:border-2">
              {/* Decorative corners */}
              <div className="absolute top-3 right-3 text-emerald-800/20 font-serif text-3xl select-none">❖</div>
              <div className="absolute top-3 left-3 text-emerald-800/20 font-serif text-3xl select-none">❖</div>
              <div className="absolute bottom-3 right-3 text-emerald-800/20 font-serif text-3xl select-none">❖</div>
              <div className="absolute bottom-3 left-3 text-emerald-800/20 font-serif text-3xl select-none">❖</div>

              <div className="text-center space-y-4 max-w-2xl mx-auto">
                <div className="text-xs tracking-widest text-emerald-800 font-bold">
                  سَلْطَنَةُ عُمَان · وِزَارَةُ التَّرْبِيَةِ وَالتَّعْلِيمِ · التَّرْبِيَةُ الإِسْلامِيَّةُ
                </div>

                <h3 className="font-quran text-3xl sm:text-4xl font-extrabold text-emerald-950 tracking-tight">
                  شَهَادَةُ إِتْقَانِ وَتَفَوُّقٍ
                </h3>

                <p className="text-xs text-slate-500">
                  تُشهد المنصة التعليمية التفاعلية بأن الطالب / الطالبة:
                </p>

                {/* Name Input / Display */}
                <div className="py-2">
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="text-center font-bold text-xl sm:text-2xl text-emerald-900 border-b-2 border-emerald-600 focus:outline-hidden pb-1 bg-transparent max-w-sm"
                    placeholder="اكتب اسمك هنا"
                  />
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  قد أتمّ بنجاح واقتدار متطلبات دراسة <strong>«الدرس الرابع: حق التملك»</strong> (من مادة التربية الإسلامية - وحدة الحقوق والواجبات)،
                  واجتاز التقييم الختامي الشامل بنسبة إتقان بلغت (<strong className="font-mono text-emerald-800 text-base">{percentage}%</strong>).
                </p>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 text-xs text-slate-600">
                  <div>
                    <span className="block font-bold text-slate-800">تاريخ الإنجاز:</span>
                    <span className="font-mono text-[11px]">{new Date().toLocaleDateString('ar-OM', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-800">حالة الاعتماد:</span>
                    <span className="text-emerald-700 font-bold">مُجتاز بدرجة امتياز ✓</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center gap-3 print:hidden">
                  <button
                    onClick={handlePrintCertificate}
                    className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة الشهادة رسمياً</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
