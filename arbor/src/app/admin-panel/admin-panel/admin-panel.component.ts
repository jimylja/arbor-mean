import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
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

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.newPostForm = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      slider: new FormControl(false, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required] }),
      category: new FormControl( 'other', {validators: [Validators.required]})
    });
  }

  onSavePost(postStatus: 'published' | 'draft') {
    this.isLoading = true;
    this.postsService.addPost(
      {
        title: this.newPostForm.value.title,
        category: {id: '5d4ec0247c213e60b8edf646'},
        slider: true,
        status: postStatus,
        image: this.newPostForm.value.image
      },
    );
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
