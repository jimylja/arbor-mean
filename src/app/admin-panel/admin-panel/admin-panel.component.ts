import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { CategoriesService } from '../../services/categories.service';
import { Category } from '../../models/category';
@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  newPostForm: FormGroup;
  enteredTitle = '';
  enteredContent = '';
  isLoading = false;
  form: FormGroup;
  imagePreview: any;
  categories: Category[];

  constructor(
    private categoryService: CategoriesService,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.newPostForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      slider: new FormControl(false, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl( 'other', {validators: [Validators.required]})
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    );
  }

  onSavePost(postStatus: 'published' | 'draft') {
    this.isLoading = true;
    const postData = this.newPostForm.value;
    postData.status = postStatus;
    this.postsService.addPost(postData);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newPostForm.patchValue({ image: file });
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
