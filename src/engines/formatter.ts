import type { KeyExpression, AlternativeVersion, TranslateOutput } from '../types.js';

export function assembleOutput(raw: Record<string, unknown>): TranslateOutput {
  const keyExprs: KeyExpression[] = (
    Array.isArray(raw.key_expressions) ? raw.key_expressions : []
  )
    .slice(0, 4)
    .map((e: Record<string, unknown>) => ({
      expression: String(e.expression ?? ''),
      reading: String(e.reading ?? ''),
      romanization: String(e.romanization ?? ''),
      meaning: String(e.meaning ?? ''),
    }));

  const altVersions: AlternativeVersion[] = (
    Array.isArray(raw.alternative_versions) ? raw.alternative_versions : []
  )
    .slice(0, 3)
    .map((v: Record<string, unknown>) => ({
      label: String(v.label ?? ''),
      japanese: String(v.japanese ?? ''),
      romanization: String(v.romanization ?? ''),
      korean_meaning: String(v.korean_meaning ?? ''),
    }));

  return {
    japanese: String(raw.japanese ?? ''),
    romanization: String(raw.romanization ?? ''),
    korean_meaning: String(raw.korean_meaning ?? ''),
    tone_note: String(raw.tone_note ?? ''),
    key_expressions: keyExprs,
    alternative_versions: altVersions,
  };
}
