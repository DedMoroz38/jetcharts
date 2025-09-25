import { useState, useEffect } from 'react';
import type { Question } from '../types';
import { fetchTriviaQuestions } from '../services/triviaApi';

export const useTriviaData = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<{ message: string; status?: number } | null>(null);

  const getData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTriviaQuestions();
      setQuestions(data.results);
    } catch (err: any) {
      let errorMessage = 'An error occurred';
      const errorStatus = err.response?.status;
      
      if (errorStatus === 429) {
        errorMessage = 'Too many requests';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (errorStatus) {
        errorMessage = `HTTP Error ${errorStatus}`;
      }
      
      setError({ message: errorMessage, status: errorStatus });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('called');
    getData();
  }, []);

  const filteredQuestions = selectedCategory
    ? questions.filter((q) => q.category === selectedCategory)
    : questions;

  const categoryDistribution = filteredQuestions.reduce((acc, q) => {
    const category = q.category;
    const existingCategory = acc.find((item) => item.name === category);
    if (existingCategory) {
      existingCategory.value += 1;
    } else {
      acc.push({ name: category, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const difficultyDistribution = filteredQuestions.reduce((acc, q) => {
    const difficulty = q.difficulty;
    const existingDifficulty = acc.find((item) => item.name === difficulty);
    if (existingDifficulty) {
      existingDifficulty.value += 1;
    } else {
      acc.push({ name: difficulty, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const typeDistribution = filteredQuestions.reduce((acc, q) => {
    const type = q.type === 'multiple' ? 'Multiple Choice' : 
                 q.type === 'boolean' ? 'True/False' : 
                 q.type;
    const existingType = acc.find((item) => item.name === type);
    if (existingType) {
      existingType.value += 1;
    } else {
      acc.push({ name: type, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const categories = [...new Set(questions.map((q) => q.category))];

  return {
    loading,
    error,
    categories,
    selectedCategory,
    setSelectedCategory,
    categoryDistribution,
    typeDistribution,
    difficultyDistribution,
    retryFetch: getData,
  };
};
