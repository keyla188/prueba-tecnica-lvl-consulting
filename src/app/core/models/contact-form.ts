export interface ContactFormField {
  key: string;
  label: string;
  show: boolean;
  required: boolean;
}

export interface ContactFormPayload {
  name: string;
  fields: ContactFormField[];
  thankYouMessage: string;
  customTerms: boolean;
  termsUrl: string;
}

export interface ContactFormRecord extends ContactFormPayload {
  id: number;
  createdAt: string;
}
