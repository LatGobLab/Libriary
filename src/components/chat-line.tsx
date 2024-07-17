import Balancer from "react-wrap-balancer";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";
import { formattedText } from "@/lib/utils";
import { TypeAnimation } from 'react-type-animation';
import { useEffect, useState } from "react";

interface ChatLineProps extends Partial<Message> {
  isLastMessage: boolean;
}

export function ChatLine({ role = "assistant", content, isLastMessage }: ChatLineProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    if (isLastMessage) {
      setShouldAnimate(true);
    }
  }, [isLastMessage]);

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
            {role == "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <Balancer>
            {(shouldAnimate && role === "assistant") ? (
              <TypeAnimation
                sequence={[content]}
                wrapper="span"
                cursor={false}
                repeat={0}
                style={{ whiteSpace: 'pre-line', display: 'inline-block' }}
                speed={90}
              />
            ) : (
              <span style={{ whiteSpace: 'pre-line' }}>{content}</span>
            )}
          </Balancer>
        </CardContent>
      </Card>
    </div>
  );
}