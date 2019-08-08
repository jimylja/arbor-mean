import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';
import { Category } from '../../../../models/category';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Output() categoryChange = new EventEmitter();
  categoriesList: Category[];

  categoriesIcons = {
    metrics: 'fas fa-clipboard-list',
    frames: 'fas fa-image',
    toys: 'fab fa-avianex',
    weding: 'fab fa-slideshare',
    letters: 'fab fa-sass',
    other: 'fas fa-puzzle-piece'
  };

  constructor( private categoriesService: CategoriesService ) { }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(
      data => this.categoriesList = data
    );
  }

}
