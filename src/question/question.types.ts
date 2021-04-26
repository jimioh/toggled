import { RefObject } from 'react';

export type Answer = Record<string, string>;

export interface ToggleOption {
    value: string;
    label: string;
}

export interface ToggleConfig {
    name: string;
    options: ToggleOption[];
}

export interface SetAnswerCallback {
    (name: string, value: string): void;
}

export interface QuestionRenderProps {
    (
        isCorrect: boolean,
        setAnswer: SetAnswerCallback,
        firstToggleRef: RefObject<HTMLInputElement>
    ): React.ReactNode;
}

export interface QuestionProps {
    question: string;
    correctAnswer: Answer;
    defaultAnswer: Answer;
    children: QuestionRenderProps;
}

export interface QuestionState {
    correctAnswer: Answer;
    currentAnswer: Answer;
    isCorrect: boolean;
    percentageCorrect: number;
}

export type QuestionAction = {
    type: 'set-answer';
    name: string;
    value: string;
};
