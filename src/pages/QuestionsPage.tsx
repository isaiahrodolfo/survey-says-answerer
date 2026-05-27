import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import {
  fetchQuestions,
  submitSurvey,
  type Question,
  type QuestionAnswer,
} from "../services/api";

const QuestionsPage = () => {
  const userId = localStorage.getItem("userId");
  const userName =
    localStorage.getItem("userName") ?? localStorage.getItem("name");
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Map<number, string[]>>(new Map());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    const loadQuestions = async () => {
      try {
        const questionList = await fetchQuestions();
        setQuestions(questionList);
      } catch (err) {
        setFetchError(
          err instanceof Error ? err.message : "Unable to load questions",
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, [navigate, userId]);

  const handleAnswersChange = (
    questionId: number,
    questionAnswers: string[],
  ) => {
    const newAnswers = new Map(answers);
    newAnswers.set(questionId, questionAnswers);
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (!userId) {
      setError("Missing user; please select your name again.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const answersArray: QuestionAnswer[] = questions.map((q) => ({
        questionId: q.id,
        answers: answers.get(q.id) || ["", "", ""],
      }));

      await submitSurvey({
        userId,
        answers: answersArray,
      });

      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit survey");
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <section className="questions-screen">
        <h1>Loading questions...</h1>
      </section>
    );
  }

  if (fetchError) {
    return (
      <section className="questions-screen">
        <h1>Unable to load questions</h1>
        <div className="error-message">{fetchError}</div>
      </section>
    );
  }

  return (
    <section className="questions-screen">
      <h1>Hello, {userName}!</h1>

      {questions.map((question) => (
        <QuestionCard
          key={question.id}
          questionId={question.id}
          question={question.question}
          onAnswersChange={handleAnswersChange}
        />
      ))}

      <div className="submit-section">
        {error && <div className="error-message">{error}</div>}
        <button
          className="submit-button"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </div>
    </section>
  );
};

export default QuestionsPage;
