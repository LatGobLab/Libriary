import { env } from 'process';

import { OpenAIEmbeddings } from "@langchain/openai";

import { PineconeStore } from "@langchain/pinecone";

import { Pinecone } from '@pinecone-database/pinecone';

export async function getVectorStore(client: Pinecone) {
    try {
        const embeddings = new OpenAIEmbeddings({
            apiKey: env.OPENAI_API_KEY,
            batchSize: 1536,
            model: "text-embedding-3-small",
        });

        const index = client.Index(env.PINECONE_INDEX_NAME || 'mal');

        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            namespace: env.PINECONE_ENVIRONMENT,
            textKey: 'text',
        });

        return vectorStore;
    } catch (error) {
        console.log('error ', error);
        throw new Error('Something went wrong while getting vector store !');
    }
}