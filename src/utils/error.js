export const castingError = (e) => {
  if (e instanceof Error) return e;

  return new Error(`Unknown error: ${e}`);
};
