import { auth } from './firebase';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function getAuthToken() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No user logged in');
  }
  return user.getIdToken();
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = await getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export async function sendChatMessage(message: string, context: Array<{ role: string; content: string }>) {
  return fetchWithAuth('/chat', {
    method: 'POST',
    body: JSON.stringify({ message, context }),
  });
}

export async function executePythonCode(code: string) {
  return fetchWithAuth('/execute', {
    method: 'POST',
    body: JSON.stringify({ code }),
  });
}

export async function getUserProgress() {
  return fetchWithAuth('/progress');
}

export async function updateUserProgress(progress: {
  currentLesson: number;
  completedQuizzes: string[];
  quizScores: Record<string, number>;
}) {
  return fetchWithAuth('/progress', {
    method: 'POST',
    body: JSON.stringify(progress),
  });
}