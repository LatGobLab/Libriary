import { PromptTemplate } from "@langchain/core/prompts";

export const CONDENSE_QUESTION_PROMPT = PromptTemplate.fromTemplate(`
    Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question, in its original language.
    
    Chat History:
    {chat_history}
    Follow Up Input: {question}
    Standalone question:`);

export const ANSWER_PROMPT = PromptTemplate.fromTemplate(`
      You are an enthusiastic AI assistant. Use the following pieces of context to answer the question at the end.
      1. If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
      2. If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
      {context}
      
      Question: {question}
      
      Helpful answer in markdown:`);