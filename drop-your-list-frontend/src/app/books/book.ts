export interface Book {
  id: number;
  title: string;
  author: string | null;
  isbn: string;
  imageUrl: string;
  subscribers: string[];
}
