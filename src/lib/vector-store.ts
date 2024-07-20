import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";

export default async function getVectorStore({ path }: { path: string }) {
    try {
        const client = new Pinecone({
            apiKey: process.env.NEXT_PUBLIC_PINECONE_API_KEY || 'mal'
        });

        const embeddings = new OpenAIEmbeddings({
            apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            batchSize: 1536,
            model: "text-embedding-3-small",
        });

        const index = client.Index(process.env.NEXT_PUBLIC_PINECONE_INDEX_NAME || 'mal');

        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex: index,
            namespace: path,
            textKey: 'text',
        });

        return vectorStore;
    } catch (error) {
        console.log('error ', error);
        throw new Error('Something went wrong while getting vector store !');
    }
}