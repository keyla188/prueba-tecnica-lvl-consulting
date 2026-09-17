export type CategoryType = 'Imágenes' | 'Documento' | 'Videos';

export interface Category {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  date: string;
  type: CategoryType;
  company?: string;
}

export interface NewCategoryPayload {
  name: string;
  subtitle: string;
  description: string;
  type: CategoryType | '';
  company: string;
  imageUrl?: string;
}
