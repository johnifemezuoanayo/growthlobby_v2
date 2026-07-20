export type FormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type FormErrors = Partial<Record<keyof FormData, string>>;
