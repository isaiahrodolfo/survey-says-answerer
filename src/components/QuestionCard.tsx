import { useState } from "react";

type QuestionCardProps = {
  questionId: number;
  question: string;
  onAnswersChange: (questionId: number, answers: string[]) => void;
};

const QuestionCard = ({
  questionId,
  question,
  onAnswersChange,
}: QuestionCardProps) => {
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    onAnswersChange(questionId, newAnswers);
  };

  return (
    <div className="question-card">
      <h2 className="question-title">{question}</h2>

      <div className="answers-list">
        <input
          type="text"
          placeholder="Answer 1"
          className="answer-input"
          value={answers[0]}
          onChange={(e) => handleAnswerChange(0, e.target.value)}
        />

        <input
          type="text"
          placeholder="Answer 2"
          className="answer-input"
          value={answers[1]}
          onChange={(e) => handleAnswerChange(1, e.target.value)}
        />

        <input
          type="text"
          placeholder="Answer 3"
          className="answer-input"
          value={answers[2]}
          onChange={(e) => handleAnswerChange(2, e.target.value)}
        />
      </div>
    </div>
  );
};

export default QuestionCard;
