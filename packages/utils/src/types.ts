export type HandledResult<T> = {
  data: T;
  ok: true;
} | {
  error: string;
  ok: false;
}
