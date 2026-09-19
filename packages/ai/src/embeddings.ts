import { embed, embedMany } from "ai";
import type { EmbeddingModel } from "ai";
import { google } from "./providers";

// In ai@7, EmbeddingModel is not generic — cast bridges provider spec-version mismatch.
function makeEmbeddingModel(name: string): EmbeddingModel {
  return google.textEmbeddingModel(name) as unknown as EmbeddingModel;
}

export const embeddingModels = {
  small: makeEmbeddingModel("gemini-embedding-2"),
  large: makeEmbeddingModel("gemini-embedding-2"),
};

/**
 * Generate a vector embedding for a single string.
 */
export async function generateVector(
  text: string,
  model: EmbeddingModel = embeddingModels.small
): Promise<number[]> {
  const { embedding } = await embed({
    model,
    value: text,
  });

  return embedding;
}

/**
 * Batch generate vector embeddings for multiple strings.
 */
export async function generateBatchVectors(
  texts: string[],
  model: EmbeddingModel = embeddingModels.small
): Promise<number[][]> {
  const { embeddings } = await embedMany({
    model,
    values: texts,
  });

  return embeddings;
}
