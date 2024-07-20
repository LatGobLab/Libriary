import { ChatOpenAI, OpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
  RunnableMap,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from '@pinecone-database/pinecone';

import { Document } from "langchain/document";

type ArgumentsRAG = {
  question: string;
  chatHistory: [string, string][];
  path: string;
}

export default async function langchain({ question, chatHistory, path }: ArgumentsRAG) {
  try {
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const model = new ChatOpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      modelName: "gpt-4o-mini",
      temperature: 0,
    });

    const condenseQuestionTemplate = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.
    
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:`;
    const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(
      condenseQuestionTemplate
    );

    const answerTemplate = `You are an enthusiastic AI assistant. Use the following pieces of context to answer the question at the end.
  1. If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
  2. If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
    {context}
    
    Question: {question}
    
    Helpful answer in markdown:`;
    const ANSWER_PROMPT = PromptTemplate.fromTemplate(answerTemplate);

    const formatChatHistory = (chatHistory: [string, string][]) => {
      const formattedDialogueTurns = chatHistory.map(
        (dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`
      );
      return formattedDialogueTurns.join("\n");
    };

    async function getVectorStore() {
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

    const vectorStore = await getVectorStore();

    const retriever = vectorStore.asRetriever();

    type ConversationalRetrievalQAChainInput = {
      question: string;
      chat_history: [string, string][];
    };

    const standaloneQuestionChain = RunnableSequence.from([
      {
        question: (input: ConversationalRetrievalQAChainInput) => input.question,
        chat_history: (input: ConversationalRetrievalQAChainInput) => formatChatHistory(input.chat_history),
      },
      CONDENSE_QUESTION_PROMPT,
      model,
      new StringOutputParser(),
    ]);


    const answerChain = RunnableMap.from({
      context: retriever,
      question: new RunnablePassthrough(),
    }).assign({
      answer: RunnableSequence.from([
        (input: { context: Document[]; question: string }) => ({
          context: formatDocumentsAsString(input.context),
          question: input.question,
        }),
        ANSWER_PROMPT,
        model,
        new StringOutputParser(),
      ]),
    });

    const conversationalRetrievalQAChain = standaloneQuestionChain.pipe(answerChain);

    const result = await conversationalRetrievalQAChain.invoke({
      question: sanitizedQuestion,
      chat_history: chatHistory,
    });

    return result;

  } catch (error) {
    console.log('error ', error);
    throw new Error('Something went wrong :(');
  }

}
