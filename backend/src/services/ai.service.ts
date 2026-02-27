import Groq from 'groq-sdk';
import cache from '../config/cache.js';
import env from '../config/env.js';
import { getBlogPostByIdService } from './blog.service.js';
import { AppError } from '../utils/errorHandler.js';
import { HTTP_STATUS } from '../constants/index.js';

const groq = new Groq({ apiKey: env.GROQ_API_KEY });

export interface SummarizeResult {
  summary: string;
  cached: boolean;
}

export const summarizeBlogPostService = async (id: string): Promise<SummarizeResult> => {
  const cached = cache.get<string>(id);
  if (cached !== undefined) {
    return { summary: cached, cached: true };
  }

  
  const post = await getBlogPostByIdService(id);

  
  let summary: string;
  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that writes concise blog post summaries. ' +
            'Return only plain text, no markdown. Keep it under 500 characters. ' +
            'Write it as a compelling preview that makes readers want to read the full post.',
        },
        {
          role: 'user',
          content: `Title: ${post.title}\n\nContent:\n${post.content}`,
        },
      ],
      max_tokens: 150,
      temperature: 0.5,
    });

    summary = completion.choices[0]?.message?.content?.trim() ?? '';

    if (!summary) {
      throw new AppError(HTTP_STATUS.SERVICE_UNAVAILABLE, 'AI returned an empty summary');
    }
  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError(HTTP_STATUS.SERVICE_UNAVAILABLE, 'Failed to generate summary from AI service');
  }

  cache.set(id, summary);

  return { summary, cached: false };
};
