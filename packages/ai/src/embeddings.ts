import { embed, embedMany, EmbeddingModel } from 'ai';
import { openai } from './providers.js';

/**
 * Universal Embedding Helper
 * Useful for vector databases (pgvector in Supabase, Pinecone, etc) or semantic search.
 */
export async function generateTextEmbedding(
  text: string, 
  model: EmbeddingModel = openai.embedding('text-embedding-3-small')
): Promise<number[]> {
  const { embedding } = await embed({
    model,
    value: text,
  });
  return embedding;
}

export async function generateBatchEmbeddings(
  texts: string[],
  model: EmbeddingModel = openai.embedding('text-embedding-3-small')
): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model,
    values: texts,
  });
  return embeddings;
}
