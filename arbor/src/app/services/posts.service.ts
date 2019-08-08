import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private http: HttpClient ) { }

  /**
   * Method return list of posts
   * @returns list of all classes
   */
  public getCategoryPosts(slug: string): Observable<any> {
    return this.http.get(`/posts/category/${slug}`)
    .pipe(
      map((response: any) => {
        return response.data;
      })
    );
  }
}
