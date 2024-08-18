import React, { useEffect, useState, useMemo, useCallback } from "react";
import Balancer from "react-wrap-balancer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Message } from "ai/react";
import { TypeAnimation } from "react-type-animation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ChatLineProps extends Partial<Message> {
  isLastMessage: boolean;
  annotations?: any[];
}

const MarkdownContent = React.memo(({ content }: { content: string }) => (
  <ReactMarkdown
    className="markdown-content"
    remarkPlugins={[remarkGfm, remarkMath]}
    rehypePlugins={[rehypeKatex]}
    components={{
      ol: ({ node, ...props }) => (
        <ol className="list-decimal list-outside" {...props} />
      ),
      ul: ({ node, ...props }) => (
        <ul className="list-disc list-outside" {...props} />
      ),
    }}
  >
    {content}
  </ReactMarkdown>
));
MarkdownContent.displayName = "MarkdownContent";

const AnimatedContent = React.memo(
  ({ content, onComplete }: { content: string; onComplete: () => void }) => (
    <TypeAnimation
      sequence={[content, onComplete]}
      wrapper="span"
      cursor={false}
      repeat={0}
      style={{ whiteSpace: "pre-line", display: "inline-block" }}
      speed={90}
    />
  )
);
AnimatedContent.displayName = "AnimatedContent";

const Annotations = React.memo(({ annotations }: { annotations: any[] }) => (
  <Accordion type="single" collapsible>
    <AccordionItem value="annotations">
      <AccordionTrigger>Fuentes</AccordionTrigger>
      <AccordionContent>
        {annotations.map((annotation, index) => (
          <div
            key={index}
            className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-sm"
          >
            <p className="line-clamp-3">{annotation?.pageContent}</p>
            <p className="text-xs text-gray-500 mt-1">
              Fuente: {annotation?.metadata.source}, Página:{" "}
              {annotation?.metadata.page}
            </p>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
));
Annotations.displayName = "Annotations";

export const ChatLine = React.memo(
  ({
    role = "assistant",
    content,
    isLastMessage,
    annotations,
  }: ChatLineProps) => {
    const [shouldAnimate, setShouldAnimate] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);

    useEffect(() => {
      if (isLastMessage) {
        setShouldAnimate(true);
        setAnimationComplete(false);
      } else {
        setAnimationComplete(true);
      }
    }, [isLastMessage]);

    const handleAnimationComplete = useCallback(
      () => setAnimationComplete(true),
      []
    );

    const contentToRender = useMemo(() => {
      if (!content) {
        return null;
      }

      if (shouldAnimate && role === "assistant" && !animationComplete) {
        return (
          <AnimatedContent
            content={content}
            onComplete={handleAnimationComplete}
          />
        );
      }
      return <MarkdownContent content={content} />;
    }, [
      shouldAnimate,
      role,
      animationComplete,
      content,
      handleAnimationComplete,
    ]);

    if (!content) {
      return null;
    }

    return (
      <div>
        <Card className="mb-2">
          <CardHeader>
            <CardTitle
              className={
                role != "assistant"
                  ? "text-amber-500 dark:text-amber-200"
                  : "text-blue-500 dark:text-blue-200"
              }
            >
              {role == "assistant" ? "AI" : "Tú"}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-base">
            <Balancer>{contentToRender}</Balancer>
          </CardContent>
          {role === "assistant" && annotations && annotations.length > 0 && (
            <CardContent>
              <Annotations annotations={annotations} />
            </CardContent>
          )}
        </Card>
      </div>
    );
  }
);
ChatLine.displayName = "ChatLine";
