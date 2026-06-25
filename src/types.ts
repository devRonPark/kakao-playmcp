import { z } from 'zod';

// ─── 공유 열거형 ───────────────────────────────────────────────────────────────

export const RelationshipEnum = z.enum([
  'friend', 'partner', 'family', 'coworker', 'manager', 'client', 'stranger', 'unknown',
]);
export const ToneEnum = z.enum(['casual', 'polite', 'cute', 'apologetic', 'short', 'natural']);
export const LearnerLevelEnum = z.enum(['absolute_beginner', 'beginner', 'intermediate']);
export const DifficultyEnum = z.enum(['easy', 'normal', 'hard']);

export type Relationship = z.infer<typeof RelationshipEnum>;
export type Tone = z.infer<typeof ToneEnum>;
export type LearnerLevel = z.infer<typeof LearnerLevelEnum>;

// ─── translate_kakao_message ────────────────────────────────────────────────

export const TranslateInputSchema = z.object({
  korean_text: z.string().min(1).max(1000).describe('일본어로 바꾸고 싶은 한국어 문장'),
  relationship: RelationshipEnum.optional().default('unknown'),
  tone: ToneEnum.optional().default('natural'),
  learner_level: LearnerLevelEnum.optional().default('absolute_beginner'),
  include_romanization: z.boolean().optional().default(true),
  include_expression_breakdown: z.boolean().optional().default(true),
});

export type TranslateInput = z.infer<typeof TranslateInputSchema>;

export interface KeyExpression {
  expression: string;
  reading: string;
  romanization: string;
  meaning: string;
}

export interface AlternativeVersion {
  label: string;
  japanese: string;
  romanization: string;
  korean_meaning: string;
}

export interface TranslateOutput {
  japanese: string;
  romanization: string;
  korean_meaning: string;
  tone_note: string;
  key_expressions: KeyExpression[];
  alternative_versions: AlternativeVersion[];
  suggested_next?: string;
}

// ─── correct_japanese_sentence ──────────────────────────────────────────────

export const CorrectInputSchema = z.object({
  user_sentence: z.string().min(1).max(1000).describe('사용자가 작성한 일본어 문장 또는 로마자 문장'),
  intended_meaning: z.string().max(500).optional(),
  tone: z.enum(['casual', 'polite', 'business', 'natural', 'unknown']).optional().default('unknown'),
  learner_level: LearnerLevelEnum.optional().default('absolute_beginner'),
});

export type CorrectInput = z.infer<typeof CorrectInputSchema>;

export interface CorrectOutput {
  corrected_japanese: string;
  romanization: string;
  korean_meaning: string;
  correction_summary: string;
  beginner_explanation: string;
  mistake_tags: string[];
  suggested_next?: string;
}

// ─── create_review_card ─────────────────────────────────────────────────────

export const ReviewCardInputSchema = z.object({
  expression: z.string().min(1).max(200),
  reading: z.string().max(200).optional().default(''),
  romanization: z.string().min(1).max(200),
  korean_meaning: z.string().min(1).max(500),
  example_sentence: z.string().max(1000).optional().default(''),
  context: z.string().max(500).optional().default(''),
  difficulty: DifficultyEnum.optional().default('normal'),
});

export type ReviewCardInput = z.infer<typeof ReviewCardInputSchema>;

export interface ReviewCard {
  card_id: string;
  expression: string;
  reading: string;
  romanization: string;
  korean_meaning: string;
  example_sentence: string;
  context: string;
  difficulty: string;
  created_at: string;
  review_count: number;
  mistake_count: number;
  suggested_next?: string;
}

// ─── explain_expression ─────────────────────────────────────────────────────

export const ExplainInputSchema = z.object({
  expression: z.string().min(1).max(200).describe('설명을 원하는 일본어 표현 또는 문장'),
  context: z.string().max(500).optional().default(''),
  learner_level: LearnerLevelEnum.optional().default('absolute_beginner'),
});

export type ExplainInput = z.infer<typeof ExplainInputSchema>;

export interface ExplainOutput {
  expression: string;
  reading: string;
  romanization: string;
  meaning: string;
  usage_note: string;
  beginner_explanation: string;
  example_sentence: string;
  example_romanization: string;
  example_meaning: string;
  suggested_next?: string;
}

// ─── generate_daily_quiz ────────────────────────────────────────────────────

export const QuizInputSchema = z.object({
  quiz_count: z.number().int().min(1).max(10).optional().default(3),
  level: LearnerLevelEnum.optional().default('absolute_beginner'),
  focus: z.enum(['meaning', 'pronunciation', 'expression', 'grammar', 'mixed']).optional().default('mixed'),
  reveal_answers: z.boolean().optional().default(false),
});

export type QuizInput = z.infer<typeof QuizInputSchema>;

export interface QuizItem {
  question: string;
  hint: string;
  answer: string;
  explanation: string;
}

export interface QuizOutput {
  quiz_items: QuizItem[];
  suggested_next?: string;
}

// ─── MistakeLog ─────────────────────────────────────────────────────────────

export interface MistakeLog {
  mistake_id: string;
  input_sentence: string;
  corrected_sentence: string;
  mistake_tags: string[];
  explanation: string;
  created_at: string;
}
