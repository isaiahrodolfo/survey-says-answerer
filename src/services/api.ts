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
  userId: string;
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

export const fetchQuestions = async (): Promise<Question[]> => {
  const { data, error } = await supabase
    .from("questions")
    .select("id, question, answerer_id")
    .order("id", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
};

export const submitSurvey = async (
  payload: SurveySubmission,
): Promise<void> => {
  const { error } = await supabase.from("survey_submissions").insert({
    user_id: payload.userId,
    answers: payload.answers,
  });

  if (error) {
    throw error;
  }
};
