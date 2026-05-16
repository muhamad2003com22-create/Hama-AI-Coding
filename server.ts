import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Gemini API Setup
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'GEMINI_API_KEY is not configured in the environment.' });
    }

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `You are Hama's highly professional AI Agent. Your role is exclusively to represent Hama (AI Coding Developer).
        Strict Knowledge Base:
        - Technical Expertise: Python, HTML5, CSS3, JavaScript (JS).
        - Services: Building next-generation websites, applications, and AI models.
        - Portfolio: Showcase Hama's technical skillset and projects.
        - Contact/Hiring: Direct potential clients to Hama's social media nodes or professional links for collaboration.
        
        Guidelines:
        - Persona: Professional, innovative, futuristic, and helpful.
        - Domain Restriction: Politely decline answering general questions unrelated to Hama's work. Redirect focus to his services.
        - Languages: Fluently support English, Kurdish (Sorani), Arabic, and Persian (Farsi).
        - Conciseness: Keep responses impactful and strictly relevant to the user's professional inquiry.`,
      },
      history: history || [],
    });

    const result = await chat.sendMessage({ message });
    res.json({ text: result.text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
