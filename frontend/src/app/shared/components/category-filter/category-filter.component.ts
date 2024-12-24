import {Component, HostListener, OnInit} from '@angular/core';
import {CategoryType} from "../../../../types/category.type";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";

@Component({
  selector: 'category-filter',
  templateUrl: './category-filter.component.html',
  styleUrls: ['./category-filter.component.scss']
})
export class CategoryFilterComponent implements OnInit {

  filterCategories: CategoryType[] = [];
  open: boolean = false;
  activeParams: ActiveParamsType = {categories: []};

  constructor(private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories()
      .subscribe(data => {
        this.filterCategories = data;
      });
  }

  toggle(): void {
    this.open = !this.open;
  }

  updateFilterParam(url: string, checked: boolean): void {

    if (this.activeParams && this.activeParams.categories) {
      const existingTypeInParams = this.activeParams.categories.find(item => item === url);
      if (existingTypeInParams && !checked) {
        this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
      } else if (!existingTypeInParams && checked) {
        this.activeParams.categories.push(url);
      }
    } else if (checked) {
      this.activeParams.categories = [url];
    }

    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    })
  }

  @HostListener('document:click', ['$event'])
  click(event: Event): void {
    if (this.open && (event.target as HTMLElement).className.indexOf('catalog-blog-filters') === 1) {
      this.open = false;
    }
  }

}
