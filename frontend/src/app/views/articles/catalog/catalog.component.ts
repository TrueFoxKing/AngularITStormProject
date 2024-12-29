import {Component, HostListener, OnInit} from '@angular/core';
import {ArticlesService} from "../../../shared/services/articles.service";
import {ArticlesType} from "../../../../types/articles.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsUtil} from "../../../shared/utils/active-params.util";
import {ActiveParamsType} from "../../../../types/active-params.type";
import {AppliedFilter} from "../../../../types/applied-filter";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  open: boolean = false;
  allArticles: ArticlesType[] = [];
  filterCategories: CategoryType[] = [];
  activeParams: ActiveParamsType = {categories: []};
  appliedFilters: AppliedFilter[] = [];
  pages: number[] = [];

  constructor(private articlesService: ArticlesService,
              private activatedRoute: ActivatedRoute,
              private categoryService: CategoryService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.categoryService.getCategories()
      .pipe(
        debounceTime(500)
      )
      .subscribe((data: CategoryType[]) => {
        this.filterCategories = data;
        this.activatedRoute.queryParams
          .subscribe(params => {
            this.activeParams = ActiveParamsUtil.processParams(params);
            this.appliedFilters = [];
            this.activeParams.categories?.forEach(url => {
              const category = this.filterCategories.find(item => item.url === url);
              if (category) {
                this.appliedFilters.push({
                  name: category.name,
                  urlParam: category.url
                });
              }
            });
           this.articlesService.getAllArticles(this.activeParams)
              .subscribe((data: { count: number, pages: number, items: ArticlesType[] }) => {
                this.pages = [];
                for (let i = 1; i <= data.pages; i++) {
                  this.pages.push(i);
                }
                this.allArticles = data.items;
              });
          });
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
        // не использовать push так как он работает криво(багнутый)
        // this.activeParams.categories.push(url);
        this.activeParams.categories = [...this.activeParams.categories, url];
      }
    } else if (checked) {
      this.activeParams.categories = [url];
    }
    this.activeParams.page = 1;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    });
  }

  removeAppliedFilter(appliedFilter: AppliedFilter): void {
    this.activeParams.categories = this.activeParams.categories?.filter(item => item !== appliedFilter.urlParam);

    this.activeParams.page = 1;
    this.router.navigate(['/catalog'], {
      queryParams: this.activeParams
    });
  }

  openPage(page: number): void {
    if (this.activeParams.page !== page) {
      this.activeParams.page = page;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }

  openPrevPage(): void {
    console.log('назад')
    if (this.activeParams.page && this.activeParams.page > 1) {
      console.log('Navigating to previous page');
      this.activeParams.page--;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }

  openNextPage(): void {
    console.log('вперёд')
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.activeParams.page++;
      this.router.navigate(['/catalog'], {
        queryParams: this.activeParams
      });
    }
  }


  @HostListener('document:click', ['$event'])
  click(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.closest('.catalog-blog-filters-head') || target.closest('.catalog-blog-filters-body')) {
      return;
    }
    this.open = false;
  }


}
