import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';
import { Categories } from '../../../../models/categories';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  @Output() categoryChange = new EventEmitter();
  categoriesList: Categories[];

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
