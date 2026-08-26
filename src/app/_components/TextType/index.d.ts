import type { ComponentType, CSSProperties, ElementType } from 'react';

export type TextTypeProps = {
  text: string | readonly string[];
  as?: ElementType;
  typingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  deletingSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorClassName?: string;
  cursorBlinkDuration?: number;
  textColors?: readonly string[];
  variableSpeed?: {
    min: number;
    max: number;
  };
  onSentenceComplete?: (text: string, index: number) => void;
  startOnVisible?: boolean;
  reverseMode?: boolean;
  style?: CSSProperties;
};

declare const TextType: ComponentType<TextTypeProps>;

export default TextType;
