import { Component, OnInit, ViewEncapsulation, HostBinding } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from '../../../services/posts.service';
import { Post } from '../../../models/post';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PostsComponent implements OnInit {
  @HostBinding('class') classes = 'category_content';
  constructor( private route: ActivatedRoute, private postService: PostsService) { }
  posts: Post[];
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if ( this.posts ) {
          this.posts = [];
        }
        this.postService.getCategoryPosts(params.category).subscribe(
          data => {
            console.log(data);
            this.posts = data;
          }
        );
      }
    );
  }
}


