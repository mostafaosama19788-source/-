import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StoryIntro } from './components/StoryIntro';
import { DefinitionSection } from './components/DefinitionSection';
import { LegitimacySection } from './components/LegitimacySection';
import { DutiesSection } from './components/DutiesSection';
import { PublicPropertySection } from './components/PublicPropertySection';
import { MindmapSummary } from './components/MindmapSummary';
import { FinalQuiz } from './components/FinalQuiz';
import { NotebookModal } from './components/NotebookModal';
import { SpeechNarrator } from './utils/audioUtils';
import { LEARNING_OBJECTIVES } from './data/lessonData';
import { BookOpen, CheckCircle, ChevronLeft, ChevronRight, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('intro');
  const [completedObjectives, setCompletedObjectives] = useState<string[]>(['obj-1']);
  const [completedSections, setCompletedSections] = useState<string[]>(['intro']);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [notebookOpen, setNotebookOpen] = useState<boolean>(false);

  useEffect(() => {
    SpeechNarrator.registerListener((speaking) => {
      setIsSpeaking(speaking);
    });

    return () => {
      SpeechNarrator.stop();
    };
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (!completedSections.includes(tab)) {
      setCompletedSections(prev => [...prev, tab]);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleObjective = (id: string) => {
    setCompletedObjectives(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const markSectionDone = (sectionKey: string, objectiveIds: string[] = []) => {
    if (!completedSections.includes(sectionKey)) {
      setCompletedSections(prev => [...prev, sectionKey]);
    }
    objectiveIds.forEach(id => {
      if (!completedObjectives.includes(id)) {
        setCompletedObjectives(prev => [...prev, id]);
      }
    });
  };

  // Progression calculation: based on section visits, objectives fulfilled, and completed milestones
  const progressPercent = Math.min(
    100,
    Math.round(
      ((completedSections.length / 7) * 0.5 + (completedObjectives.length / LEARNING_OBJECTIVES.length) * 0.5) * 100
    )
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* 3-Zone Clean Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        progressPercent={progressPercent}
        isSpeaking={isSpeaking}
        onOpenNotebook={() => setNotebookOpen(true)}
      />

      {/* Main Interactive Stage Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Unit & Breadcrumbs indicator */}
        <div className="flex items-center justify-between gap-4 mb-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>التربية الإسلامية</span>
            <span aria-hidden="true">/</span>
            <span>الوحدة الرابعة: الحقوق والواجبات</span>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-emerald-800">الدرس الرابع: حق التملك</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs">
            <span>مستوى الإنجاز العام:</span>
            <span className="font-mono font-bold text-emerald-700">{progressPercent}%</span>
          </div>
        </div>

        {/* Tab view routing */}
        {activeTab === 'intro' && (
          <StoryIntro
            onContinue={() => {
              markSectionDone('intro', ['obj-1']);
              handleTabChange('definition');
            }}
            completedObjectives={completedObjectives}
            toggleObjective={toggleObjective}
          />
        )}

        {activeTab === 'definition' && (
          <DefinitionSection
            onContinue={() => {
              markSectionDone('definition', ['obj-1', 'obj-6']);
              handleTabChange('legitimacy');
            }}
            onBack={() => handleTabChange('intro')}
            markCompleted={() => markSectionDone('definition', ['obj-1', 'obj-6'])}
          />
        )}

        {activeTab === 'legitimacy' && (
          <LegitimacySection
            onContinue={() => {
              markSectionDone('legitimacy', ['obj-2', 'obj-3']);
              handleTabChange('duties');
            }}
            onBack={() => handleTabChange('definition')}
            markCompleted={() => markSectionDone('legitimacy', ['obj-2', 'obj-3'])}
          />
        )}

        {activeTab === 'duties' && (
          <DutiesSection
            onContinue={() => {
              markSectionDone('duties', ['obj-4']);
              handleTabChange('public');
            }}
            onBack={() => handleTabChange('legitimacy')}
            markCompleted={() => markSectionDone('duties', ['obj-4'])}
          />
        )}

        {activeTab === 'public' && (
          <PublicPropertySection
            onContinue={() => {
              markSectionDone('public', ['obj-5']);
              handleTabChange('summary');
            }}
            onBack={() => handleTabChange('duties')}
            markCompleted={() => markSectionDone('public', ['obj-5'])}
          />
        )}

        {activeTab === 'summary' && (
          <MindmapSummary
            onContinueToQuiz={() => {
              markSectionDone('summary');
              handleTabChange('quiz');
            }}
            onBack={() => handleTabChange('public')}
          />
        )}

        {activeTab === 'quiz' && (
          <FinalQuiz
            onRetake={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLessonComplete={() => {
              // mark all objectives completed
              setCompletedObjectives(LEARNING_OBJECTIVES.map(o => o.id));
              setCompletedSections(['intro', 'definition', 'legitimacy', 'duties', 'public', 'summary', 'quiz']);
            }}
          />
        )}
      </main>

      {/* Persistent Note-Taking Modal */}
      <NotebookModal
        isOpen={notebookOpen}
        onClose={() => setNotebookOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">حق التملك · منصة تعليمية تفاعلية</span>
            <span aria-hidden="true">·</span>
            <span>مبني استناداً لمنهاج التربية الإسلامية الرسمي (سلطنة عُمان)</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>المرسوم السلطاني 7/2018 (المادة 11)</span>
            <span aria-hidden="true">·</span>
            <span>الربيع بن حبيب والدارقطني</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
