import axios from 'axios';
import type { ApiResponse } from '../types';

const API_URL = 'https://opentdb.com/api.php?amount=50';

export const fetchTriviaQuestions = async (): Promise<ApiResponse> => {
  const response = await axios.get(API_URL);
  console.log(response.data.results[0]);
  return response.data;
};
