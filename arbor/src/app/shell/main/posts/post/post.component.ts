import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalService } from '../../../../services/modal.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, AfterViewInit {
  postId: string;
  catalogMode = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params.id;
    if (this.router.url.includes('/posts/')) {
      this.catalogMode = true;
    }
    this.route.params.subscribe(
      (params: Params) => {
        this.postId = params.id;
      }
    );
   }

  ngAfterViewInit() {
    this.modalService.open('post');
  }

  nextImage() {
    this.router.navigate(['../5d3e7fd70b9af70004920180'], { relativeTo: this.route });
  }

  prevImage() {
    this.router.navigate(['../5ba75045636bc50004292692'], { relativeTo: this.route });
  }

  /**
   * close modal specified by id and navigate 1 level up
   * @params id- id atribute of modal component
   */
  closeModal(id: string): void {
    this.modalService.close(id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
