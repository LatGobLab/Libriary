import { Pinecone } from '@pinecone-database/pinecone';
import { env } from 'process';

export default async function initPineconeClient() {
    try {
        const pc = new Pinecone({
            apiKey: env.PINECONE_API_KEY || 'mal',
        });
        console.log('Pinecone client initialized');
        return pc;
    } catch (e) {
        console.error(e);
        return;
    }
}
