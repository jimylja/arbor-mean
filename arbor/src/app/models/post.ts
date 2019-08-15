import { Category } from './category';

export interface Post {
  _id: string;
  title: string;
  thumb: string;
  slider: boolean;
  status: 'published' | 'draft';
  category: Category;
  createdAt: Date;
  uploads: {_id: string; path: string }[];
}
