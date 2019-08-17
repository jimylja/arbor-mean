import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from '../models/post';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  receivedPosts = new BehaviorSubject<Post[]>(null);
  constructor( private http: HttpClient ) { }

  /**
   * Method return list of posts
   * @returns list of all classes
   */
  public getCategoryPosts(slug: string): Observable<Post[]> {
    return this.http.get(`/posts/category/${slug}`)
    .pipe(
      map(
        (response: { status: number, data: Post[] }) => {
        this.receivedPosts.next([...response.data]);
        return response.data;
      })
    );
  }

  /**
   * Method return posts by Id
   * if not in the received posts sends a request to the server
   * @params id - post id
   * @returns object with post data
   */
  public getPost(id: string): Observable<Post> {
    const posts = this.receivedPosts.getValue();
    let postData: Post;

    if (posts) {
      postData =  posts.find(
        post => post._id === id
      );
    }
    if (postData) {
       return of(postData);
    } else {
      return this.getPostFromServer(id);
    }
  }

  /**
   * Method return post by Id from server
   * @params id - post id
   * @returns object with post data
   */
  private getPostFromServer(id: string): Observable<Post> {
    return this.http.get(`/posts/${id}`)
    .pipe(
      map(
        (response: { status: number, data: Post}) => {
          return response.data; }
      )
    );
  }

}
