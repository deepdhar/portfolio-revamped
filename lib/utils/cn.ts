type ClassValue = string | number | boolean | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
