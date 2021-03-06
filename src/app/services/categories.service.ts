import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Category } from '../models/category';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories = [
    {id: '1', name: 'Метрики', slug: 'metrics', description: ''},
    {id: '1', name: 'Слова, букви', slug: 'letters', description: ''},
    {id: '1', name: 'Весільний декор', slug: 'weding', description: ''},
    {id: '1', name: 'Іграшки', slug: 'toys', description: ''},
    {id: '1', name: 'Фоторамки', slug: 'frames', description: ''},
    {id: '1', name: 'Інше', slug: 'other', description: ''}
  ];
  constructor(private http: HttpClient) {
   }

   public getCategories(): Observable<Category[]> {
    return this.http.get('/category').pipe(
      map(
        (response: { status: string, data: Category[] }) => {
          return response.data;
        }
      )
    );
  }

}
