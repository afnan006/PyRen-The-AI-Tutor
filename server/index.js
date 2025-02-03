import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
});

const db = getFirestore();
const auth = getAuth();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware to verify Firebase auth token
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Chat endpoint
app.post('/api/chat', authenticateUser, async (req, res) => {
  try {
    const { message, context } = req.body;
    const userId = req.user.uid;

    // Get user's learning progress
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are PyBot, a friendly Python tutor for kids. The student is currently on lesson ${userData.currentLesson}. 
                   Keep explanations simple and fun. Use analogies and examples that kids can understand.
                   Current learning style: ${userData.learningPreferences.style}
                   Learning pace: ${userData.learningPreferences.pace}`
        },
        ...context,
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Execute Python code
app.post('/api/execute', authenticateUser, async (req, res) => {
  try {
    const { code } = req.body;
    
    // TODO: Initialize Pyodide and execute code
    // For now, return mock response
    res.json({ 
      output: "Hello from Python!",
      error: null
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user progress
app.get('/api/progress', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const userDoc = await db.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(userDoc.data());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user progress
app.post('/api/progress', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { currentLesson, completedQuizzes, quizScores } = req.body;

    await db.collection('users').doc(userId).update({
      currentLesson,
      completedQuizzes,
      quizScores,
      updatedAt: new Date(),
    });

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});