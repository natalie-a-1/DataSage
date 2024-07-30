// openaiApi.js
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_OPENAI;

export const fetchOpenAIResponse = async (messages) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', // or the model you want to use
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          ...messages.map((msg) => ({
            role: msg.isUser ? 'user' : 'assistant',
            content: msg.text,
          })),
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`, // Replace with your OpenAI API key
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching response from OpenAI API:', error);
    throw error;
  }
};
