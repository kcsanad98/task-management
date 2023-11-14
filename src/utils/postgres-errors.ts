export enum PostgresErrorCodes {
  MISSING_PRIMARY_KEY = '23503',
  UNIQUE_CONSTRAINT_VIOLATED = '23505'
}

export const doErrorCodesMatch = (error: unknown, errorCode: PostgresErrorCodes): boolean =>
  (error as { code: string })?.code === errorCode;
