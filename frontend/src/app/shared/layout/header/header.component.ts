import { Component, OnInit } from '@angular/core';
import {CategoryService} from "../../services/category.service";
import {CategoryType} from "../../../../types/category.type";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Логика для категорий в фильтре
  categories: CategoryType[] = [];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    // Логика для категорий в фильтре
    this.categoryService.getCategories()
      .subscribe((categories:CategoryType[]) => {
        this.categories = categories;
      })
  }

}
