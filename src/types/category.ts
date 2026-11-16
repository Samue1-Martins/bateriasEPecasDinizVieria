export interface Category {
  id: string;
  name: string;
  slug: string;
  order: number;
  iconKey: string;
  active: boolean;
  description?: string;
}
