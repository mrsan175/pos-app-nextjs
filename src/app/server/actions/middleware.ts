export type ActionState = {
  success?: string;
  error?: string | Record<string, string>; // Bisa berupa string atau object untuk error per field
};
