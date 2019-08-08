import { Category } from './category';

export interface Post {
  _id: number;
  title: string;
  thumb: string;
  slider: boolean;
  status: 'published' | 'draft';
  category: Category;
  createdAt: Date;
}
