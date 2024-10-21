export function timestamp(): string {
  return Math.floor(Date.now() / 1000).toString();
}
