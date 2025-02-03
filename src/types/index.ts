export interface User {
  id: string;
  name: string;
  avatar: string;
  currentLesson: number;
  completedQuizzes: string[];
  quizScores: Record<string, number>;
  learningPreferences: {
    style: 'fun' | 'classic';
    pace: 'fast' | 'moderate' | 'slow';
  };
}

export interface Lesson {
  id: string;
  title: string;
  topics: Topic[];
  quiz: Quiz;
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  codeExample?: string;
}

export interface Quiz {
  id: string;
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}