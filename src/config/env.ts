import env from 'env-var';

export const GOOGLE_CLIENT_ID = env
  .get('GOOGLE_CLIENT_ID')
  .required()
  .asString();
export const GOOGLE_CLIENT_SECRET = env
  .get('GOOGLE_CLIENT_SECRET')
  .required()
  .asString();
export const NEXTAUTH_SECRET = env.get('NEXTAUTH_SECRET').required().asString();
export const CONFERENCE_DATE = env
  .get('NEXT_PUBLIC_CONFERENCE_DATE')
  .default('2026-03-24')
  .asString();
