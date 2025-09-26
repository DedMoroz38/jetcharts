export interface Question {
  category: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface ApiResponse {
  response_code: number;
  results: Question[];
}

export type Data = {
  name: string;
  value: number;
}[]

export type EnrichedData = {
  name: string;
  value: number;
  fill: string;
}[]

export type ErrorT = {
  message: string;
  status?: number;
} | null