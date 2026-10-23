export interface LearningObjective {
  id: string;
  text: string;
  completed: boolean;
}

export interface VocabularyItem {
  term: string;
  pronunciation?: string;
  meaning: string;
  context: string;
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: string;
  category: 'mcq' | 'ruling' | 'reasoning' | 'terms';
  question: string;
  context?: string;
  options: QuestionOption[];
  sourceNote?: string;
}

export interface CaseScenario {
  id: string;
  title: string;
  story: string;
  question: string;
  options: {
    id: string;
    text: string;
    verdict: 'correct' | 'incorrect' | 'partially';
    feedback: string;
  }[];
}

export interface ClassificationItem {
  id: string;
  text: string;
  type: 'halal' | 'haram';
  evidenceOrReason: string;
}

export interface Flashcard {
  id: string;
  category: string;
  front: string;
  back: string;
  detail: string;
}
