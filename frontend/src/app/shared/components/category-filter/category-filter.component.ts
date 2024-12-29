import {Component, HostListener, OnInit} from '@angular/core';
import {CategoryType} from "../../../../types/category.type";
import {CategoryService} from "../../services/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {ActiveParamsUtil} from "../../utils/active-params.util";

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
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    // this.categoryService.getCategories()
    //   .subscribe(data => {
    //     this.filterCategories = data;
    //   });
    //
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.activeParams = ActiveParamsUtil.processParams(params);
    //   if (params['categories']) {
    //     this.activeParams.categories = Array.isArray(params['categories']) ? params['categories'] : [params['categories']];
    //     this.open = true;
    //   }
    // });
  }

  // toggle(): void {
  //   this.open = !this.open;
  // }

  // updateFilterParam(url: string, checked: boolean): void {
  //
  //   if (this.activeParams && this.activeParams.categories) {
  //     const existingTypeInParams = this.activeParams.categories.find(item => item === url);
  //     if (existingTypeInParams && !checked) {
  //       this.activeParams.categories = this.activeParams.categories.filter(item => item !== url);
  //     } else if (!existingTypeInParams && checked) {
  //       // не использовать push так как он работает криво(багнутый)
  //       // this.activeParams.categories.push(url);
  //       this.activeParams.categories = [...this.activeParams.categories, url];
  //     }
  //   } else if (checked) {
  //     this.activeParams.categories = [url];
  //   }
  //   this.activeParams.page = 1;
  //   this.router.navigate(['/catalog'], {
  //     queryParams: this.activeParams
  //   });
  // }

  @HostListener('document:click', ['$event'])
  click(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.closest('.catalog-blog-filters-head') || target.closest('.catalog-blog-filters-body')) {
      return;
    }
    this.open = false;
  }

}
