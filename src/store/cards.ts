import { readFileSync, writeFileSync, existsSync, mkdirSync, renameSync } from 'fs';
import { randomUUID } from 'crypto';
import type { ReviewCard, ReviewCardInput, MistakeLog } from '../types.js';

const CARDS_PATH = new URL('../../store/cards.json', import.meta.url).pathname;
const MISTAKES_PATH = new URL('../../store/mistakes.json', import.meta.url).pathname;

function ensureDir(filePath: string): void {
  const dir = filePath.slice(0, filePath.lastIndexOf('/'));
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

function readJson<T>(path: string, fallback: T): T {
  if (!existsSync(path)) return fallback;
  return JSON.parse(readFileSync(path, 'utf-8')) as T;
}

function writeJson(path: string, data: unknown): void {
  ensureDir(path);
  const tmp = path + '.tmp';
  writeFileSync(tmp, JSON.stringify(data, null, 2), 'utf-8');
  renameSync(tmp, path);
}

export function saveCard(input: ReviewCardInput): ReviewCard {
  const cards = readJson<ReviewCard[]>(CARDS_PATH, []);
  const card: ReviewCard = {
    card_id: randomUUID(),
    expression: input.expression,
    reading: input.reading ?? '',
    romanization: input.romanization,
    korean_meaning: input.korean_meaning,
    example_sentence: input.example_sentence ?? '',
    context: input.context ?? '',
    difficulty: input.difficulty ?? 'normal',
    created_at: new Date().toISOString(),
    review_count: 0,
    mistake_count: 0,
  };
  cards.push(card);
  writeJson(CARDS_PATH, cards);
  return card;
}

export function loadCards(): ReviewCard[] {
  return readJson<ReviewCard[]>(CARDS_PATH, []);
}

export function saveMistake(log: Omit<MistakeLog, 'mistake_id' | 'created_at'>): void {
  try {
    const logs = readJson<MistakeLog[]>(MISTAKES_PATH, []);
    logs.push({ ...log, mistake_id: randomUUID(), created_at: new Date().toISOString() });
    writeJson(MISTAKES_PATH, logs);
  } catch (err) {
    console.error('[saveMistake error]', err instanceof Error ? err.message : String(err));
  }
}
