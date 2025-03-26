import { Company } from './company.model';

export interface QuizQuestion {
  id?: string;
  question: string;
  answerOptions: string[];
  correctAnswer: string;
}

export interface Quiz {
  id?: string;
  title: string;
  description: string;
  company: Company;
  questions: QuizQuestion[];
  createdAt?: Date;
  updatedAt?: Date;
}