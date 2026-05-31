import { supabase } from "../utils/supabase";

export type User = {
  id: number;
  name: string;
};

export type Question = {
  id: number;
  question: string;
  answerer_id: number;
};

export type QuestionAnswer = {
  questionId: number;
  answers: string[];
};

export type SurveySubmission = {
  userId: number;
  answers: QuestionAnswer[];
};

export const fetchUsers = async (): Promise<User[]> => {
  const { data, error } = await supabase
    .from("users")
    .select("id, name")
    .order("name", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const fetchQuestions = async (userId: number): Promise<Question[]> => {
  const { data, error } = await supabase
    .from("questions")
    .select("id, question, answerer_id")
    .neq("answerer_id", userId)
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const submitSurvey = async (
  payload: SurveySubmission,
): Promise<void> => {
  // delete existing answers for this user to avoid duplicates
  const { error: deleteError } = await supabase
    .from("answers")
    .delete()
    .eq("user_id", payload.userId);

  if (deleteError) {
    throw deleteError;
  }

  // transform the nested answers into a flat array of rows for insertion
  const rows = payload.answers.flatMap(({ questionId, answers }) =>
    answers
      .filter((answerText) => answerText.trim().length > 0)
      .map((answerText) => ({
        user_id: payload.userId,
        question_id: questionId,
        answer_text: answerText,
      })),
  );

  if (rows.length === 0) {
    return;
  }

  const { error } = await supabase.from("answers").insert(rows);

  if (error) {
    throw error;
  }
};
