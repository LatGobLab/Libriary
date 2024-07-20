import { ChatOpenAI } from "@langchain/openai";
import { formatDocumentsAsString } from "langchain/util/document";
import {
  RunnableSequence,
  RunnablePassthrough,
  RunnableMap,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { Document } from "langchain/document";

import { ANSWER_PROMPT, CONDENSE_QUESTION_PROMPT } from "./prompt-templates";
import getVectorStore from "./vector-store";

type ArgumentsRAG = {
  question: string;
  chatHistory: [string, string][];
  path: string;
}

type ConversationalRetrievalQAChainInput = {
  question: string;
  chat_history: [string, string][];
};


const formatChatHistory = (chatHistory: [string, string][]) =>
  chatHistory.map(([human, ai]) => `Human: ${human}\nAssistant: ${ai}`).join("\n");

export default async function langchain({ question, chatHistory, path }: ArgumentsRAG) {
  try {
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");

    const model = new ChatOpenAI({
      apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
      modelName: "gpt-4o-mini",
      temperature: 0,
    });

    const vectorStore = await getVectorStore({ path });
    const retriever = vectorStore.asRetriever();

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

    return await conversationalRetrievalQAChain.invoke({
      question: sanitizedQuestion,
      chat_history: chatHistory,
    });

  } catch (error) {
    console.log('error ', error);
    throw new Error('Something went wrong :(');
  }

}
