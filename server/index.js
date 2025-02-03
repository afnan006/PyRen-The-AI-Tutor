// // // import express from 'express';
// // // import cors from 'cors';
// // // import dotenv from 'dotenv';
// // // import OpenAI from 'openai';
// // // import { initializeApp, cert } from 'firebase-admin/app';
// // // import { getAuth } from 'firebase-admin/auth';
// // // import { getFirestore } from 'firebase-admin/firestore';

// // // dotenv.config();

// // // const app = express();
// // // app.use(cors());
// // // app.use(express.json());

// // // // Initialize Firebase Admin
// // // initializeApp({
// // //   credential: cert({
// // //     projectId: process.env.FIREBASE_PROJECT_ID,
// // //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
// // //     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
// // //   }),
// // // });

// // // const db = getFirestore();
// // // const auth = getAuth();

// // // // Initialize OpenAI
// // // const openai = new OpenAI({
// // //   apiKey: process.env.OPENAI_API_KEY,
// // // });

// // // // Middleware to verify Firebase auth token
// // // const authenticateUser = async (req, res, next) => {
// // //   try {
// // //     const token = req.headers.authorization?.split('Bearer ')[1];
// // //     if (!token) {
// // //       return res.status(401).json({ error: 'No token provided' });
// // //     }

// // //     const decodedToken = await auth.verifyIdToken(token);
// // //     req.user = decodedToken;
// // //     next();
// // //   } catch (error) {
// // //     res.status(401).json({ error: 'Invalid token' });
// // //   }
// // // };

// // // // Chat endpoint
// // // app.post('/api/chat', authenticateUser, async (req, res) => {
// // //   try {
// // //     const { message, context } = req.body;
// // //     const userId = req.user.uid;

// // //     // Get user's learning progress
// // //     const userDoc = await db.collection('users').doc(userId).get();
// // //     const userData = userDoc.data();

// // //     const completion = await openai.chat.completions.create({
// // //       model: "gpt-4",
// // //       messages: [
// // //         {
// // //           role: "system",
// // //           content: `You are PyBot, a friendly Python tutor for kids. The student is currently on lesson ${userData.currentLesson}. 
// // //                    Keep explanations simple and fun. Use analogies and examples that kids can understand.
// // //                    Current learning style: ${userData.learningPreferences.style}
// // //                    Learning pace: ${userData.learningPreferences.pace}`
// // //         },
// // //         ...context,
// // //         { role: "user", content: message }
// // //       ],
// // //       temperature: 0.7,
// // //       max_tokens: 150,
// // //     });

// // //     res.json({ response: completion.choices[0].message.content });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // Execute Python code
// // // app.post('/api/execute', authenticateUser, async (req, res) => {
// // //   try {
// // //     const { code } = req.body;
    
// // //     // TODO: Initialize Pyodide and execute code
// // //     // For now, return mock response
// // //     res.json({ 
// // //       output: "Hello from Python!",
// // //       error: null
// // //     });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // Get user progress
// // // app.get('/api/progress', authenticateUser, async (req, res) => {
// // //   try {
// // //     const userId = req.user.uid;
// // //     const userDoc = await db.collection('users').doc(userId).get();
    
// // //     if (!userDoc.exists) {
// // //       return res.status(404).json({ error: 'User not found' });
// // //     }

// // //     res.json(userDoc.data());
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // // Update user progress
// // // app.post('/api/progress', authenticateUser, async (req, res) => {
// // //   try {
// // //     const userId = req.user.uid;
// // //     const { currentLesson, completedQuizzes, quizScores } = req.body;

// // //     await db.collection('users').doc(userId).update({
// // //       currentLesson,
// // //       completedQuizzes,
// // //       quizScores,
// // //       updatedAt: new Date(),
// // //     });

// // //     res.json({ success: true });
// // //   } catch (error) {
// // //     res.status(500).json({ error: error.message });
// // //   }
// // // });

// // // const PORT = process.env.PORT || 3000;
// // // app.listen(PORT, () => {
// // //   console.log(`Server running on port ${PORT}`);
// // // });
// // import express from 'express';
// // import cors from 'cors';
// // import dotenv from 'dotenv';
// // import OpenAI from 'openai';
// // import { initializeApp, cert } from 'firebase-admin/app';
// // import { getAuth } from 'firebase-admin/auth';
// // import { getFirestore } from 'firebase-admin/firestore';
// // import { loadPyodide } from 'pyodide';
// // import { createClient } from '@supabase/supabase-js';

// // dotenv.config();

// // const app = express();
// // app.use(cors());
// // app.use(express.json());

// // // Initialize Firebase Admin
// // initializeApp({
// //   credential: cert({
// //     projectId: process.env.FIREBASE_PROJECT_ID,
// //     clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
// //     privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
// //   }),
// // });

// // const db = getFirestore();
// // const auth = getAuth();

// // // Initialize OpenAI
// // const openai = new OpenAI({
// //   apiKey: process.env.OPENAI_API_KEY,
// // });

// // let pyodide;

// // (async () => {
// //   pyodide = await loadPyodide();
// //   console.log('Pyodide loaded successfully');
// // })();

// // // Middleware to verify Firebase auth token
// // const authenticateUser = async (req, res, next) => {
// //   try {
// //     const token = req.headers.authorization?.split('Bearer ')[1];
// //     if (!token) {
// //       return res.status(401).json({ error: 'No token provided' });
// //     }
// //     const decodedToken = await auth.verifyIdToken(token);
// //     req.user = decodedToken;
// //     next();
// //   } catch (error) {
// //     console.error('Authentication error:', error);
// //     res.status(401).json({ error: 'Invalid token', details: error.message });
// //   }
// // };

// // // Chat endpoint
// // app.post('/api/chat', authenticateUser, async (req, res) => {
// //   try {
// //     const { message, context } = req.body;
// //     const userId = req.user.uid;

// //     // Get user's learning progress
// //     const userDoc = await db.collection('users').doc(userId).get();
// //     if (!userDoc.exists) {
// //       return res.status(404).json({ error: 'User not found' });
// //     }

// //     const userData = userDoc.data();

// //     const completion = await openai.chat.completions.create({
// //       model: "gpt-4",
// //       messages: [
// //         {
// //           role: "system",
// //           content: `You are PyBot, a friendly Python tutor for kids. The student is currently on lesson ${userData.currentLesson}. 
// //                    Keep explanations simple and fun. Use analogies and examples that kids can understand.
// //                    Current learning style: ${userData.learningPreferences.style}
// //                    Learning pace: ${userData.learningPreferences.pace}`
// //         },
// //         ...context,
// //         { role: "user", content: message }
// //       ],
// //       temperature: 0.7,
// //       max_tokens: 150,
// //     });

// //     res.json({ response: completion.choices[0].message.content });
// //   } catch (error) {
// //     console.error('OpenAI API error:', error);
// //     res.status(500).json({ error: 'Failed to generate response', details: error.message });
// //   }
// // });

// // // Execute Python code
// // app.post('/api/execute', authenticateUser, async (req, res) => {
// //   try {
// //     const { code } = req.body;

// //     if (!pyodide) {
// //       return res.status(503).json({ error: 'Pyodide not ready' });
// //     }

// //     let output = '';
// //     let error = null;

// //     try {
// //       output = pyodide.runPython(code);
// //     } catch (err) {
// //       error = err.message;
// //     }

// //     res.json({ output, error });
// //   } catch (error) {
// //     console.error('Code execution error:', error);
// //     res.status(500).json({ error: 'Failed to execute code', details: error.message });
// //   }
// // });

// // // Get user progress
// // app.get('/api/progress', authenticateUser, async (req, res) => {
// //   try {
// //     const userId = req.user.uid;
// //     const userDoc = await db.collection('users').doc(userId).get();

// //     if (!userDoc.exists) {
// //       return res.status(404).json({ error: 'User not found' });
// //     }

// //     res.json(userDoc.data());
// //   } catch (error) {
// //     console.error('Progress retrieval error:', error);
// //     res.status(500).json({ error: 'Failed to retrieve progress', details: error.message });
// //   }
// // });

// // // Update user progress
// // app.post('/api/progress', authenticateUser, async (req, res) => {
// //   try {
// //     const userId = req.user.uid;
// //     const { currentLesson, completedQuizzes, quizScores } = req.body;

// //     await db.collection('users').doc(userId).update({
// //       currentLesson,
// //       completedQuizzes,
// //       quizScores,
// //       updatedAt: new Date(),
// //     });

// //     res.json({ success: true });
// //   } catch (error) {
// //     console.error('Progress update error:', error);
// //     res.status(500).json({ error: 'Failed to update progress', details: error.message });
// //   }
// // });

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import OpenAI from 'openai';
// import { loadPyodide } from 'pyodide';
// import { createClient } from '@supabase/supabase-js';

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cors({
//   origin: 'http://localhost:5173', // Replace with your client's origin
//   credentials: true,
// }));
// // Initialize Supabase
// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
// const supabase = createClient(supabaseUrl, supabaseAnonKey);

// // Initialize OpenAI
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// let pyodide;
// (async () => {
//   pyodide = await loadPyodide();
//   console.log('Pyodide loaded successfully');
// })();

// // Middleware to verify Supabase auth token
// const authenticateUser = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split('Bearer ')[1];
//     if (!token) {
//       return res.status(401).json({ error: 'No token provided' });
//     }
//     // Verify the Supabase JWT token
//     const { data: { user }, error } = await supabase.auth.getUser(token);
//     if (error || !user) {
//       return res.status(401).json({ error: 'Invalid token' });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     res.status(401).json({ error: 'Authentication failed' });
//   }
// };

// // Chat endpoint
// app.post('/api/chat', authenticateUser, async (req, res) => {
//   try {
//     const { message, context } = req.body;
//     const userId = req.user.id; // Updated from `uid` to `id` for Supabase compatibility
//     // Get user's learning progress
//     const userDoc = await supabase
//       .from('users')
//       .select('*')
//       .eq('user_id', userId)
//       .single();
//     if (userDoc.error || !userDoc.data) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     const userData = userDoc.data;
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         {
//           role: "system",
//           content: `You are PyBot, a friendly Python tutor for kids. The student is currently on lesson ${userData.currentLesson}. 
//                    Keep explanations simple and fun. Use analogies and examples that kids can understand.
//                    Current learning style: ${userData.learningPreferences.style}
//                    Learning pace: ${userData.learningPreferences.pace}`
//         },
//         ...context,
//         { role: "user", content: message }
//       ],
//       temperature: 0.7,
//       max_tokens: 150,
//     });
//     res.json({ response: completion.choices[0].message.content });
//   } catch (error) {
//     console.error('OpenAI API error:', error);
//     res.status(500).json({ error: 'Failed to generate response', details: error.message });
//   }
// });

// // Execute Python code
// app.post('/api/execute', authenticateUser, async (req, res) => {
//   try {
//     const { code } = req.body;
//     if (!pyodide) {
//       return res.status(503).json({ error: 'Pyodide not ready' });
//     }
//     let output = '';
//     let error = null;
//     try {
//       output = pyodide.runPython(code);
//     } catch (err) {
//       error = err.message;
//     }
//     res.json({ output, error });
//   } catch (error) {
//     console.error('Code execution error:', error);
//     res.status(500).json({ error: 'Failed to execute code', details: error.message });
//   }
// });

// // Get user progress
// app.get('/api/progress', authenticateUser, async (req, res) => {
//   try {
//     const userId = req.user.id; // Updated from `uid` to `id` for Supabase compatibility
//     const userDoc = await supabase
//       .from('users')
//       .select('*')
//       .eq('user_id', userId)
//       .single();
//     if (userDoc.error || !userDoc.data) {
//       return res.status(404).json({ error: 'User not found' });
//     }
//     res.json(userDoc.data);
//   } catch (error) {
//     console.error('Progress retrieval error:', error);
//     res.status(500).json({ error: 'Failed to retrieve progress', details: error.message });
//   }
// });

// // Update user progress
// app.post('/api/progress', authenticateUser, async (req, res) => {
//   try {
//     const userId = req.user.id; // Updated from `uid` to `id` for Supabase compatibility
//     const { currentLesson, completedQuizzes, quizScores } = req.body;
//     const { error } = await supabase
//       .from('users')
//       .update({
//         currentLesson,
//         completedQuizzes,
//         quizScores,
//         updated_at: new Date(),
//       })
//       .eq('user_id', userId);
//     if (error) {
//       throw error;
//     }
//     res.json({ success: true });
//   } catch (error) {
//     console.error('Progress update error:', error);
//     res.status(500).json({ error: 'Failed to update progress', details: error.message });
//   }
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { loadPyodide } from 'pyodide';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173', // Replace with your client's origin
  credentials: true,
}));

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL and Anon Key are required in the .env file.');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let pyodide;
(async () => {
  pyodide = await loadPyodide();
  console.log('Pyodide loaded successfully');
})();

// Middleware to verify Supabase auth token
const authenticateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    // Verify the Supabase JWT token
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Chat endpoint
app.post('/api/chat', authenticateUser, async (req, res) => {
  try {
    const { message, context } = req.body;
    const userId = req.user.id; // Updated from `uid` to `id` for Supabase compatibility
    // Get user's learning progress
    const userDoc = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (userDoc.error || !userDoc.data) {
      return res.status(404).json({ error: 'User not found' });
    }
    const userData = userDoc.data;
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
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
});

// Execute Python code
app.post('/api/execute', authenticateUser, async (req, res) => {
  try {
    const { code } = req.body;
    if (!pyodide) {
      return res.status(503).json({ error: 'Pyodide not ready' });
    }
    let output = '';
    let error = null;
    try {
      output = pyodide.runPython(code);
    } catch (err) {
      error = err.message;
    }
    res.json({ output, error });
  } catch (error) {
    console.error('Code execution error:', error);
    res.status(500).json({ error: 'Failed to execute code', details: error.message });
  }
});

// Get user progress
app.get('/api/progress', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id; // Updated from `uid` to `id` for Supabase compatibility
    const userDoc = await supabase
      .from('users')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (userDoc.error || !userDoc.data) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(userDoc.data);
  } catch (error) {
    console.error('Progress retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve progress', details: error.message });
  }
});

// Update user progress
app.post('/api/progress', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id; // Updated from `uid` to `id` for Supabase compatibility
    const { currentLesson, completedQuizzes, quizScores } = req.body;
    const { error } = await supabase
      .from('users')
      .update({
        currentLesson,
        completedQuizzes,
        quizScores,
        updated_at: new Date(),
      })
      .eq('user_id', userId);
    if (error) {
      throw error;
    }
    res.json({ success: true });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ error: 'Failed to update progress', details: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
console.log('Supabase URL:', process.env.SUPABASE_URL);
console.log('Supabase Anon Key:', process.env.SUPABASE_ANON_KEY);
// console.log('Request URL:', `${API_URL}${endpoint}`);
// console.log('Request Headers:', headers);